#!/bin/bash
set -e

# --- Geração de Keyfile para Replica Set ---
KEYFILE=/data/mongo-keyfile
if [ ! -f "$KEYFILE" ]; then
    echo "🔑 Generating mongo-keyfile..."
    openssl rand -base64 756 > "$KEYFILE"
    chmod 400 "$KEYFILE"
    chown 999:999 "$KEYFILE"
fi

echo "🎬 Starting MongoDB with Replica Set..."
# Repassamos todos os argumentos
exec docker-entrypoint.sh "$@"
