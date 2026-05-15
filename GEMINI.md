# Elo Orgânico - Master Context & AI Guidelines

> [!IMPORTANT]
> **CRITICAL MANDATE: DOCUMENTATION MANAGEMENT**
> You MUST ALWAYS activate the `doc-expert` skill (using `activate_skill`) as your VERY FIRST ACTION whenever the user query involves Markdown files (.md), documentation analysis, or technical writing.

This file is the authoritative context entry point for Gemini CLI. It distills the architecture, rules, and workflows of the **Elo Orgânico** monorepo to ensure high-fidelity, senior-level AI orchestration.

## 📚 Knowledge Base (Docusaurus) - SSOT
All project documentation is centralized in Docusaurus. Refer to these for deep context:
- **Architecture:** `./knowledge-base/docs/engineering/architecture.mdx` (Monorepo strategy & Bounded Contexts).
- **Style Guide:** `./knowledge-base/docs/engineering/styleguide.mdx` (Strict coding standards & guardrails).
- **Git Workflow:** `./knowledge-base/docs/engineering/gitflow.mdx` (Git Flow, `gh` CLI, & Conventional Commits).
- **Product Vision:** `./knowledge-base/docs/product/vision.mdx` (Mission & "Single-Instance Mastery").
- **Cheat Sheet:** `./knowledge-base/docs/cheat-sheet.mdx` (Quick commands & orchestration).

## 🏗️ Monorepo Architecture: Context-Driven Root
We use **PNPM Workspaces** with a strict **Bounded Context** isolation. Cross-context imports (e.g., Portal importing from Instance) are prohibited.

- **`instance/`**: Community-specific operations ("Community Shop"). **Primary development focus.**
  - `@elo-instance/web` (React 19), `@elo-instance/api` (Fastify 5), `@elo-instance/core` (SSOT).
- **`portal/`**: Global platform and SaaS onboarding singleton.
  - `@elo-portal/web`, `@elo-portal/api`, `@elo-portal/core`.
- **`studio/`**: Design tokens, brand assets (Penpot), and global styling.
- **`tools/`**: MCP servers, infrastructure (Docker), and automation scripts.
- **`knowledge-base/`**: Docusaurus-based technical and product documentation.

## 🚀 Technology Stack & Standards
- **Runtime:** Node.js 22 (LTS), PNPM v10 (using **Catalogs** for unified versions).
- **Orchestration:** **Turborepo** for caching, parallel execution, and infra-app coupling.
- **Backend:** Fastify v5, MongoDB (Replica Set `rs0` for ACID), Mongoose, Redis, BullMQ.
- **Frontend:** React 19, Zustand, TailwindCSS v4 (CSS Modules), GSAP, Three.js (WebGPU).
- **Quality:** TypeScript 6 (Strict), ESLint 9 (Flat Config), Prettier 3, Zod (Validation).

## 🛡️ Strict Engineering Guardrails (Non-Negotiable)
1.  **Domain Core First:** Shared models/schemas MUST be in `packages/core` before usage in apps.
2.  **No Floating Promises:** Use the `void` operator for intentional unawaited async calls.
3.  **Strict Boolean Logic:** Expressions must be explicit (`if (value === true)`, `if (value !== undefined)`).
4.  **Single-Instance Mastery:** Focus on a polished `@elo-instance/*`. Do not introduce SaaS complexity prematurely.
5.  **Git Integrity:** Follow Git Flow. Use Conventional Commits with monorepo scopes (e.g., `feat(instance): ...`).
6.  **Context7 Research:** ALWAYS use `mcp_context7_query-docs` before implementing logic for core libraries (Fastify, React 19, Three.js).

## ⚡ Key Commands
- `pnpm instance:dev`: Orchestrate Community (Infra + Apps + Core).
- `pnpm portal:dev`: Orchestrate Platform (Infra + Apps + Core).
- `pnpm docs:dev`: Start Knowledge Base.
- `pnpm typecheck`: Validate TypeScript across all workspaces.
- `pnpm lint`: Run linting for the entire monorepo.
- `pnpm build`: Perform a full production build.

---
_High-fidelity operational context for Elo Orgânico. Adhere to the Style Guide at all times._
