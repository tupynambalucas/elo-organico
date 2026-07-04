# Portal Core Library (`@elo-portal/core`)

This library acts as the Single Source of Truth (SSOT) for the Portal bounded context. It defines the validation rules, data shapes, type definitions, and Data Transfer Objects (DTOs) using Zod.

---

## Design Principles

- **No Framework Coupling:** This library must remain completely agnostic to fastify, mongoose, or React. It relies purely on standard TypeScript and Zod.
- **Strict Validation:** All domain shapes must be defined via Zod schemas, from which standard TypeScript types are inferred.
- **Context Isolation:** This core library belongs strictly to the Portal domain. It must not contain logic or structures meant for the Community Instance.

---

## Workspace Usage

To use this library within the Portal context:

```typescript
import { UserSchema, type UserDTO } from '@elo-portal/core';
```
