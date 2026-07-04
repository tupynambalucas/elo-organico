# Local Guardrails: Portal Core Library

This file defines the strict architectural rules for the `@elo-portal/core` library.

---

## Bounded Context Integrity

1. **Absolute Isolation**: You MUST NEVER import from `@elo-instance/core` or any `instance/` path.
2. **Framework Agnostic**: You MUST NEVER import Fastify, React, Mongoose, or any infrastructure-specific libraries. The `core` library is strictly for Zod schemas, TypeScript types, and domain pure logic.

## Type Generation Standards

- ALWAYS declare Zod schemas first, then use `z.infer` to export the matching TypeScript types.
- Export all schemas and types from the main entrypoint (`src/index.ts`).
