# @elo-instance/api - Community Instance API

This directory contains the core API for the Elo Orgânico system. In our architectural model, this is an **Instance-based Application**, meaning it is designed to be deployed specifically for each community (ecovillage, condominium, or tenant).

## 🏗️ Architectural Role: Instance-based

While the project currently focuses on **"Single-Instance Mastery"**, the backend is built to support a future SaaS evolution:
- **Isolation**: Each instance manages its own business logic, database connections, and community-specific workflows.
- **Portability**: Designed to be containerized and scaled independently per tenant.
- **Contract-Driven**: Strictly follows the data contracts defined in `@elo-instance/core`.

### 📖 Documentation
Detailed technical documentation is available in our **[Knowledge Base](https://tupynambalucas.github.io/elo-organico)**:
- **[Architecture Overview](https://tupynambalucas.github.io/elo-organico/docs/engineering/architecture)**: Technical decisions and domain modeling details.
- **[Style Guide](https://tupynambalucas.github.io/elo-organico/docs/engineering/styleguide)**: Coding standards and conventions.

---

## 📂 Project Structure

The source code follows a domain-driven approach within the Fastify ecosystem:

```text
src/
├── config/           # Global configurations (Env, Queues, Fastify)
├── domains/          # Application Core (Domain Logic)
│   ├── auth/         # Authentication and Session Management
│   ├── cycle/        # Sharing Cycle Management
│   └── product/      # Product Catalog and Ingestion
├── models/           # Mongoose Schemas (Persistence)
├── plugins/          # Fastify Plugins (DB, Security, Registry)
├── scripts/          # Automation Scripts
├── types/            # TypeScript type definitions and interfaces
└── utils/            # Shared Backend Utilities
```

---

## ⚙️ Environment Configuration

Create a `.env` file in this directory with the variables defined in the root `.env.example` template. Key backend-specific variables include:

```properties
# Server
NODE_ENV=development
SERVER_PORT=3000

# Connectivity
MONGO_URI=mongodb://localhost:27017/elo-organico
REDIS_HOST=localhost
REDIS_PORT=6379

# Security
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Integrations
EFI_CLIENT_ID=your_efi_id
EFI_CLIENT_SECRET=your_efi_secret
```

---

## 🚀 Operation Scripts

- **`pnpm dev`**: Starts server in watch mode.
- **`pnpm build`**: Transpiles TypeScript to `dist/`.
- **`pnpm start`**: Executes the compiled application.
- **`pnpm typecheck`**: Verifies type integrity.
- **`pnpm lint`**: Executes code style verification.
