# Elo Orgânico - Global Portal Workspace

This directory contains the global orchestration and platform-wide domain packages. It is designed to act as the Multi-Tenant SaaS Hub framework (currently in the skeleton stage of development).

---

## Workspace Structure

The workspace is split into three main packages:

### 1. [Global Web Client](./apps/web/README.md) (`apps/web/`)

A React 19 Single Page Application serving the global landing page, SaaS dashboard, and onboarding forms.

- **Detailed Guide:** Refer to the [Web Client README](./apps/web/README.md).

### 2. [Global Orchestration API](./apps/api/README.md) (`apps/api/`)

A Fastify 5 REST API handling global tenant configurations, platform subscriptions, and SaaS administration logic.

- **Detailed Guide:** Refer to the [Orchestration API README](./apps/api/README.md).

### 3. [Portal Core Library](./packages/core/README.md) (`packages/core/`)

The Single Source of Truth (SSOT) for data contracts, global validation schemas, and types shared across the platform domain.

- **Detailed Guide:** Refer to the [Core Library README](./packages/core/README.md).

---

## Technical & Domain Isolation

To comply with our architectural rules, the portal workspace is completely isolated from the community instance workspace. It manages global platform logic and does not import or share domain code with community instances.

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
    pnpm portal:up
    ```

3.  **Run development services:**
    ```bash
    pnpm portal:dev
    ```

---

## Lifecycle Commands

Manage the workspace from the monorepo root:

- `pnpm portal:up`: Boots global MongoDB and Redis containers in detached mode.
- `pnpm portal:down`: Tears down the infrastructure containers.
- `pnpm portal:dev`: Runs the API and Web applications concurrently.
- `pnpm portal:build`: Compiles the typescript files.
- `pnpm portal:typecheck`: Validates TypeScript type safety.
