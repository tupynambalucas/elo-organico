# Elo Orgânico - Community Instance Workspace

This directory contains the community-specific domain workspace, which manages the Community Shop and local Administration Panel. This is the primary focus of the project's current phase (Single-Instance Mastery).

---

## Workspace Structure

The workspace is split into three main packages:

### 1. [Community Web Client](file:///D:/projects/elo-organico/instance/apps/web/README.md) (`apps/web/`)

A React 19 Single Page Application serving the Customer Shop and local Administration Dashboard.

- **Detailed Guide:** Refer to the [Web Client README](file:///D:/projects/elo-organico/instance/apps/web/README.md).

### 2. [Community REST API](file:///D:/projects/elo-organico/instance/apps/api/README.md) (`apps/api/`)

A Fastify 5 REST API handling domain routing, database persistence, and community-specific service logic.

- **Detailed Guide:** Refer to the [REST API README](file:///D:/projects/elo-organico/instance/apps/api/README.md).

### 3. [Instance Core Library](file:///D:/projects/elo-organico/instance/packages/core/README.md) (`packages/core/`)

The Single Source of Truth (SSOT) for data contracts, validation rules, schemas, and type definitions shared across the instance.

- **Detailed Guide:** Refer to the [Core Library README](file:///D:/projects/elo-organico/instance/packages/core/README.md).

---

## Technical & Domain Isolation

To comply with our architectural rules, the instance workspace is completely decoupled from the portal workspace. Cross-domain imports (e.g. importing instance components inside portal apps) are strictly prohibited.

---

## Quick Start & Dev Setup

Ensure you have initialized the local infrastructure first:

1.  **Configure environment files:**
    Copy templates and add your local secrets:

    ```bash
    cp .env.dev.example .env.dev
    ```

2.  **Start database infrastructure (MongoDB, Redis):**

    ```bash
    pnpm instance:up
    ```

3.  **Run development services:**
    ```bash
    pnpm instance:dev
    ```

---

## Lifecycle Commands

Manage the workspace from the monorepo root:

- `pnpm instance:up`: Boots MongoDB and Redis Docker containers in detached mode.
- `pnpm instance:down`: Tears down the infrastructure containers.
- `pnpm instance:dev`: Runs the API and Web applications concurrently.
- `pnpm instance:build`: Compiles the typescript files.
- `pnpm instance:typecheck`: Validates TypeScript type safety.
