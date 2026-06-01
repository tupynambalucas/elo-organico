# @elo-portal/api - Global Platform API

The **Portal API** is the administrative and orchestration heart of the Elo Orgânico ecosystem. Unlike community-specific APIs, this is a **Singleton Application** that manages global business logic, tenant orchestration, and platform-wide data.

## 🏗️ Architectural Role: Global Singleton

As the central authority for the multi-tenant SaaS model, the Portal API handles:
- **Tenant Management**: Orchestrating the creation, configuration, and subscription status of community instances.
- **Global Auth**: Managing platform-wide user identities and administrative roles.
- **SaaS Orchestration**: Integrating with billing systems (e.g., subscription management) and managing the global marketplace registry.
- **Cross-Instance Data**: Aggregating high-level metrics and global product/producer information for the main portal.

### 📖 Documentation
Detailed technical documentation is available in our **[Knowledge Base](https://tupynambalucas.github.io/elo-organico)**:
- **[Architecture Overview](https://tupynambalucas.github.io/elo-organico/docs/engineering/architecture)**: Technical decisions and global domain modeling.
- **[Style Guide](https://tupynambalucas.github.io/elo-organico/docs/engineering/styleguide)**: Coding standards and Fastify 5 architecture.

---

## 📂 Project Structure

The source code follows a domain-driven approach tailored for platform management:

```text
src/
├── config/           # Global platform configs (Env, Queues, Fastify)
├── domains/          # Platform Core Logic
│   ├── auth/         # Global User & Admin Authentication
│   ├── tenant/       # Community Instance Registry and Management
│   └── billing/      # Subscription and SaaS Payment Logic
├── models/           # Mongoose Schemas (Global Persistence)
├── plugins/          # Fastify Plugins (DB, Security, Registry)
├── scripts/          # Automation Scripts (Platform Seeds)
└── utils/            # Global Backend Utilities
```

---

## ⚙️ Environment Configuration

Create a `.env` file in this directory. Key portal-specific variables include:

```properties
# Server
NODE_ENV=development
SERVER_PORT=3001

# Connectivity
MONGO_URI=mongodb://localhost:27018/elo-organico-portal
REDIS_HOST=localhost
REDIS_PORT=6380

# Security
JWT_SECRET=your_global_jwt_secret
SESSION_SECRET=your_global_session_secret

# SaaS Integrations
STRIPE_SECRET=your_stripe_key
PLATFORM_ADMIN_EMAIL=admin@elo-organico.com
```

---

## 🚀 Operation Scripts

- **`pnpm dev`**: Starts server in watch mode.
- **`pnpm build`**: Transpiles TypeScript to `dist/`.
- **`pnpm start`**: Executes the compiled application.
- **`pnpm seed`**: Populates the global database with platform data.
- **`pnpm typecheck`**: Verifies type integrity.
- **`pnpm lint`**: Executes code style verification.
