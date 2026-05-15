#!/bin/bash
set -e

echo "⏳ Waiting for MongoDB to start..."
until mongosh --host portal-db --port 27017 --quiet --eval "db.adminCommand('ping').ok" > /dev/null 2>&1; do
  sleep 2
done
echo "🚀 MongoDB is up."

# Argumentos de autenticação para o root
AUTH_ARGS="-u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin"

# 1. Inicializa o Replica Set
# Tentativa de inicialização silenciosa
if ! mongosh --host portal-db --port 27017 $AUTH_ARGS --quiet --eval "rs.status().ok" 2>/dev/null | grep -q "1"; then
    echo "🌀 Initiating Replica Set (rs0)..."
    # Usamos o hostname definido no docker network: 'portal-db'
    mongosh --host portal-db --port 27017 $AUTH_ARGS --quiet --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'portal-db:27017'}]})"
    
    echo "⏱️ Waiting for node to become PRIMARY..."
    until mongosh --host portal-db --port 27017 $AUTH_ARGS --quiet --eval "rs.isMaster().ismaster" 2>/dev/null | grep -q "true"; do
        sleep 2
    done
    echo "✅ Node is now PRIMARY."
fi

# 2. Seed do Usuário Admin
# Hash gerado: $2b$10$k5UsEXEq0wC9jGg3f3TReeGTBeRRVxOmBwW9hS1Rm9Lokjh3AKwpS (senha: admin)
ADMIN_PASS_HASH="\$2b\$10\$k5UsEXEq0wC9jGg3f3TReeGTBeRRVxOmBwW9hS1Rm9Lokjh3AKwpS"

echo "👤 Checking admin user in ${MONGO_INITDB_DATABASE}..."
mongosh --host portal-db --port 27017 $AUTH_ARGS --quiet <<EOF
use ${MONGO_INITDB_DATABASE}
if (db.users.countDocuments({ role: 'admin' }) === 0) {
  db.users.insertOne({
    email: "${ADMIN_EMAIL_SEED}",
    username: "${ADMIN_USER_SEED}",
    password: "${ADMIN_PASS_HASH}",
    icon: "quati",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  });
  print('🚀 Admin user seeded successfully.');
} else {
  print('⚠️ Admin user already exists.');
}
EOF

echo "🏁 Seed complete."
