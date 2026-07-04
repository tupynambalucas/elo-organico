# Portal (Global Hub)

This directory contains the Portal domain workspace, which manages the global platform hub, multi-instance orchestration, centralized billing, and geolocation-based discovery.

---

## Workspace Structure

The workspace is split into three main packages:

### 1. [Portal Web Client](./services/web/README.md) (`services/web/`)

A React 19 Single Page Application serving the global Portal Dashboard, tenant orchestration, and logistics hubs.

- **Detailed Guide:** Refer to the [Web Client README](./services/web/README.md).

### 2. [Portal REST API](./services/api/README.md) (`services/api/`)

A Fastify 5 REST API handling global domain routing, central billing logic, and platform orchestration.

- **Detailed Guide:** Refer to the [REST API README](./services/api/README.md).

### 3. [Portal Core Library](./packages/core/README.md) (`packages/core/`)

The Single Source of Truth (SSOT) for data contracts, validation rules, schemas, and type definitions shared across the portal.

- **Detailed Guide:** Refer to the [Core Library README](./packages/core/README.md).

---

## Technical & Domain Isolation

To comply with our architectural rules, the portal workspace is completely decoupled from the instance workspace. Cross-domain imports (e.g., importing instance components inside portal apps) are strictly prohibited. All dependencies must rely on the `@elo-portal/core` package.

---

## Quick Start & Dev Setup

Ensure you have initialized the local infrastructure first:

1. Copy environment files and add your local secrets:

   ```bash
   cp infrastructure/docker/.env.dev.example infrastructure/docker/.env.dev
   ```

2. Start database infrastructure (MongoDB on port 27018, Redis on port 6380):

   ```bash
   pnpm portal:up
   ```

3. Run development services:
   ```bash
   pnpm portal:dev
   ```

---

## Lifecycle Commands

Manage the workspace from the monorepo root:

- `pnpm portal:up`: Boots MongoDB and Redis Docker containers in detached mode.
- `pnpm portal:down`: Tears down the infrastructure containers.
- `pnpm portal:dev`: Runs the API and Web applications concurrently.
- `pnpm portal:build`: Compiles the TypeScript files.
- `pnpm portal:typecheck`: Validates TypeScript type safety.
