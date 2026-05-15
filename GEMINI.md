# Elo Orgânico - Master Context & AI Guidelines

> [!IMPORTANT]
> **CRITICAL MANDATE: DOCUMENTATION MANAGEMENT**
> You MUST ALWAYS activate the `doc-expert` skill (using `activate_skill`) as your VERY FIRST ACTION whenever the user query involves Markdown files (.md), documentation analysis, or technical writing.

This file is the main context entry point for Gemini CLI in the **Elo Orgânico** project. It distills the core rules and structure from our Knowledge Base to ensure high-performance, strictly-typed AI-assisted engineering.

## 📚 Knowledge Base (Docusaurus) - Single Source of Truth
All project documentation is centralized in Docusaurus. For deep deep architecture or product context, refer to:
- **Architecture:** `./knowledge-base/docs/engineering/architecture.mdx`
- **Style Guide:** `./knowledge-base/docs/engineering/styleguide.mdx`
- **Product Vision:** `./knowledge-base/docs/product/vision.mdx`
- **Cheat Sheet:** `./knowledge-base/docs/cheat-sheet.mdx`

## 🏗️ Monorepo Architecture & Bounded Contexts
We use **PNPM Workspaces** with a **Context-Driven Root** layout. **Cross-context imports are strictly prohibited** via ESLint.
- **`instance/`**: Community-specific operations ("Community Shop"). **Current primary development focus.**
  - `@elo-instance/web`: React SPA (Admin & Shop).
  - `@elo-instance/api`: Fastify REST API.
  - `@elo-instance/core`: Domain-specific logic, SSOT for instance scope.
- **`portal/`**: Global platform face and SaaS onboarding.
  - `@elo-portal/web`: Official landing page.
  - `@elo-portal/api`: Global orchestration and tenant management.
  - `@elo-portal/core`: Platform-specific logic, SSOT for portal scope.
- **`studio/`**: Design assets (Penpot), brand tokens, icons, and global styling.
- **`tools/`**: Infrastructure, MCP servers, and technical automation scripts.

## 🚀 Technology Stack
- **Runtime & Orchestration:** Node.js 22+, PNPM v10 (Catalogs), Turborepo.
- **Backend (API):** Fastify v5, MongoDB (Replica Set `rs0`), Mongoose, BullMQ, Redis.
- **Frontend (UI):** React 19, Zustand, TailwindCSS v4 (CSS Modules), GSAP, React Three Fiber (WebGPU).
- **Quality & Safety:** TypeScript 6 (Strict), ESLint 9 (Flat Config), Prettier 3, Zod (Validation).

## 🛡️ Strict Engineering Directives (Guardrails)
1.  **Domain Core First:** All shared models, DTOs, and schemas MUST be defined in the context's `packages/core` before being used in `apps/api` or `apps/web`.
2.  **No Floating Promises:** Never leave promises floating. Use the `void` operator for intentional non-blocking side-effects.
3.  **Strict Boolean Logic:** Expressions must be explicit. Use `if (value !== undefined)` or `=== true` rather than implicit truthiness.
4.  **Single-Instance Mastery:** Current priority is a polished single-instance community system. Avoid SaaS complexity in `@elo-instance/*`.
5.  **Context7 Research:** Before implementing logic for Fastify, React 19, or Three.js, ALWAYS use `mcp_context7_query-docs` to fetch up-to-date documentation.

## ⚡ Quick Development Commands
- `pnpm instance:dev`: Orchestrate Community (Infra + Web + API + Core Watch).
- `pnpm portal:dev`: Orchestrate Platform (Infra + Web + API + Core Watch).
- `pnpm docs:dev`: Start the Docusaurus knowledge base (English).
- `pnpm docs:dev:pt`: Start the Docusaurus knowledge base (Brazilian Portuguese).
- `pnpm typecheck`: Validate TypeScript across all workspaces.
- `pnpm lint`: Run linting for the entire monorepo.
- `pnpm build`: Perform a full production build of all packages.

---
_Professional entry point for the Elo Orgânico development environment. High-fidelity docs live in `./knowledge-base`._
