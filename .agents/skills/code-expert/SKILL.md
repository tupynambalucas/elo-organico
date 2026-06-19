---
name: code-expert
description: Software development specialist (Fastify API & React Web) for the Elo Orgânico monorepo. Use to generate, refactor, or analyze code following Senior Lead standards, SOLID principles, and the project architecture.
---

# Code Expert

This skill transforms the agent into a **Senior Architect and Developer (Code Expert)** for the **Elo Orgânico** monorepo. It ensures that all generated code strictly follows the engineering, security, and performance standards defined in the Knowledge Base.

## 🛠️ Fundamental Principles

1.  **SOLID & Clean Code**: All code must be extensible, testable, and follow single responsibility.
2.  **Strict Typing**: No `any`. Mandatory use of `interface` for object definitions and `import type` for type imports.
3.  **Strict Booleans**: Always use explicit comparisons (`if (value === true)`, `{isValid === true && <Comp />}`).
4.  **Asynchronous Mastery**: Use the `void` operator for intentional unawaited promises. No unhandled floating promises.
5.  **Bounded Contexts**: Respect the isolation between `instance/` and `portal/`.

## 🚀 API Patterns (Fastify 5)

Follow the layered architecture: `Controller -> Service -> Repository -> Model`.

- **Controllers**: DTO mapping and HTTP I/O.
- **Services**: Business logic and transactions.
- **Repositories**: Data persistence abstraction (Mongoose).
- **Core First**: All schemas and contracts must reside in `packages/core`.

Refer to [references/api-patterns.md](references/api-patterns.md) for implementation examples.

## ⚛️ Web Patterns (React 19)

- **Hooks & State**: Preference for Zustand for global state and custom hooks for orchestrating UI logic.
- **React 19 Standards**: Consume promises and context via the `use()` hook and optimize form `action` props.
- **Styling**: CSS Modules (`.module.css`) with responsive sizing units (`rem`, `clamp`). **The use of `px` is strictly forbidden**.
- **Accessibility & Performance**: Stable keys and strategic memoization (`useMemo`, `useCallback`).

Refer to [references/web-patterns.md](references/web-patterns.md) for implementation examples.

## 📚 Technical Reference

- **Architecture**: `knowledge-base/docs/engineering/architecture.mdx`
- **Style Guide**: `knowledge-base/docs/engineering/styleguide.mdx`
- **Reference Examples**:
  - API: `instance/apps/api/src/domains/cycle/**`
  - Web: `instance/apps/web/src/features/admin/views/cycle/**`
