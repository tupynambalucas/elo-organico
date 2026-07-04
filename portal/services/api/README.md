# Portal REST API (`@elo-portal/api`)

This Fastify application serves as the core backend for the Portal platform hub. It orchestrates tenants, billing logic, and global routing.

---

## Architecture Overview

- **Framework**: Fastify v5 for high-performance HTTP routing.
- **Database**: Mongoose for data persistence (MongoDB).
- **Validation**: `@elo-portal/core` Zod schemas strictly validate all incoming payloads and outgoing responses.
- **Queueing**: BullMQ for background job processing.

---

## Developer Guide

1. Ensure the Portal MongoDB and Redis containers are running (`pnpm portal:up`).
2. Run the development server via the monorepo root: `pnpm portal:dev`.
