# Local Guardrails: Portal REST API

This file dictates the rules for modifying the `@elo-portal/api` backend service.

---

## Architectural Rules

1. **Strict Core Dependency**: All domain schemas, input validation (DTOs), and types MUST be imported from `@elo-portal/core`. You MUST NEVER define standalone Zod schemas in the API directory.
2. **Context Isolation**: You MUST NEVER import from `instance/` or `@elo-instance/core`.
3. **Repository Pattern**: All database interactions (Mongoose) must be encapsulated within a Repository class. Controllers must not invoke Mongoose models directly.

## Workflow Rules

- ALWAYS type route handlers using Fastify's `ZodTypeProvider`.
- All asynchronous functions must be properly awaited.
