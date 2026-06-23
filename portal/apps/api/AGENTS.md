# Local Context: Portal API Application

This workspace (`@elo-portal/api`) contains the Fastify 5 REST API for global tenant orchestration, billing, and platform-wide administration.

---

## Local Architecture & Directory Map

The source code under `src/` follows a domain-driven, layered responsibility model:

- **[src/domains/](./src/domains/)**: Layered domain implementations:
  - `auth/`: Global administrative user session management.
  - `tenant/`: Tenant registration, instance mapping, and system telemetry registry.
  - `billing/`: Stripe subscriptions and billing webhook endpoints.
- **[src/plugins/](./src/plugins/)**: Fastify decorators and middleware:
  - `mongoosePlugin.ts`: Platform database connectivity (`elodb-portal`).
  - `seedPlugin.ts`: Triggers initial setup seeding.
- **[src/models/](./src/models/)**: Database models (`tenant.model.ts`, `platformUser.model.ts`).
- **[src/config/](./src/config/)**: Environment variable schemas and billing options.

---

## API Coding Guardrails

### A. Layered Architecture
Every workflow MUST adhere to the following sequence:
```
Controller (Validation/Routing) ➔ Service (Business Logic) ➔ Repository (Persistence) ➔ Model (Mongoose)
```
- **Controllers**: Define routes, request schemas (Zod via `fastify-type-provider-zod`), and handle HTTP responses.
- **Services**: Contain business workflows and billing transactions.
- **Repositories**: Abstract database access. **You MUST inject the Mongoose model into the repository constructor.**
- **Models**: Declare Mongoose schemas. Avoid placing business rules inside models.

### B. Security & Billing Standards
- **Payment Verification**: Webhook handlers for payment gateways (e.g. Stripe) must verify signature validity using official cryptographic headers before processing.
- **Access Control**: Enforce strict validation policies on routes managing tenant orchestration to restrict access solely to authenticated platform admins.

---

## Local Lifecycle Commands

- `pnpm dev`: Starts the local API server using `tsx watch` at `http://localhost:3001`.
- `pnpm build`: Transpiles TypeScript files into `dist/`.
- `pnpm seed`: Populates the global database with initial platform configurations.
- `pnpm typecheck`: Validates local TypeScript typing.
- `pnpm lint`: Runs ESLint validation.
