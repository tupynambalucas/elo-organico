# Elo Orgânico - Master Context & AI Orchestration

This file establishes the authoritative context and professional standards for Gemini CLI within the **Elo Orgânico** monorepo. It ensures high-fidelity execution by aligning AI behavior with our specific architecture and coding rigor.

## 📚 Single Source of Truth (SSOT)

Deep context is maintained in our Docusaurus Knowledge Base. Refer to these files for granular details:

- **Architecture:** `knowledge-base/docs/engineering/architecture.mdx` (Bounded Contexts & Isolation).
- **Style Guide:** `knowledge-base/docs/engineering/styleguide.mdx` (Strict Booleans, Asynchronous Patterns).
- **Git Workflow:** `knowledge-base/docs/engineering/gitflow.mdx` (Git Flow, `gh` CLI, Conventional Commits).
- **Tech Stack:** Defined in `pnpm-workspace.yaml` via **Catalogs**.

## 🏗️ Monorepo Architecture

We use **PNPM Workspaces (v11)** and **Turborepo** with a strict **Bounded Context** isolation strategy. Cross-context imports (e.g., Portal importing from Instance) are prohibited.

- **`instance/`**: Community-specific operations ("Community Shop"). **Primary focus.**
  - `@elo-instance/web` (React 19), `@elo-instance/api` (Fastify 5), `@elo-instance/core` (Domain SSOT).
- **`portal/`**: Future Global SaaS Hub and platform management foundation (Skeleton stage).
- **`studio/`**: Design tokens, brand assets (Penpot), and global styling.
- **`tools/`**: MCP servers, infrastructure (Docker), and automation scripts.
- **`knowledge-base/`**: Authoritative Documentation Hub (EloDocs) and technical landing page.

## 🛡️ Senior Engineering Guardrails (Non-Negotiable)

1.  **Domain Core First:** Models, schemas, and contracts MUST be defined in `packages/core` before usage.
2.  **No Floating Promises:** Use the `void` operator for intentional unawaited async calls (`void asyncFn()`).
3.  **Strict Boolean Logic:** Expressions MUST be explicit (`if (value === true)`, `if (value !== undefined)`).
4.  **React 19 Standards:** Use the `use()` hook for promises/context. In JSX, always use explicit comparisons: `{isValid === true && <Comp />}`.
5.  **Fastify 5 Architecture:** Layered as `Controller -> Service -> Repository -> Model`.
6.  **Git Integrity:** Use Conventional Commits with scopes (e.g., `feat(instance): ...`). Squash & Merge via `gh`.
7.  **Context7 Research:** ALWAYS use `mcp_context7_query-docs` before implementing logic for core libraries (React 19, Fastify 5, GSAP, Three.js).
8.  **Strict English Rule:** All code, comments, documentation, and commits MUST be in English (en-US), except for explicit i18n translation files. Refer to [styleguide.mdx](knowledge-base/docs/engineering/styleguide.mdx#L125-L139) for details.
9.  **Skill Activation:** ALWAYS read and activate the [doc-expert](.agents/skills/doc-expert/SKILL.md) skill when creating, modifying, or analyzing documentation. Similarly, ALWAYS read and activate the [code-expert](.agents/skills/code-expert/SKILL.md) skill when writing, refactoring, or analyzing source code.

## ⚡ Key Orchestration Commands

- `pnpm instance:dev`: Start Community Stack (Infra + API + Web).
- `pnpm instance:down`: Stop Community Stack (Infra + Apps).
- `pnpm portal:dev`: Start Platform Stack (Infra + API + Web).
- `pnpm portal:down`: Stop Platform Stack (Infra + Apps).
- `pnpm docs:dev`: Start Knowledge Base.
- `pnpm typecheck`: Validate TypeScript across the entire monorepo.
- `pnpm lint`: Run linting for all workspaces.
- `pnpm build`: Perform a full production build.

## 🤖 AI Interaction Persona

- **Role:** Senior Software Engineer / Lead Architect.
- **Tone:** Concise, direct, and technical. No conversational filler.
- **Proactiveness:** Persist through obstacles, diagnose failures, and ensure implementation completeness (including tests).
- **Validation:** Always verify changes via `pnpm lint` and `pnpm typecheck` before concluding a task (only required when source code or configurations are modified; no need to execute these when only documentation or skill files are changed).
- **Double-Check:** Always use `git diff` after modifications to ensure precision, avoid regressions, and verify a clean working tree.

---

_High-fidelity operational context for Elo Orgânico. Adhere to the Style Guide at all times._
