# Elo Orgânico - Monorepo AI Master Context & Router

This file establishes the authoritative monorepo context, global rules, and interaction standards for AI agents working within the **Elo Orgânico** codebase. It acts as the central entrypoint and routes agents to local workspace context files.

---

## Monorepo Navigation & Context Routing

To understand local requirements, directories, and stack-specific behaviors, you MUST read the respective local context file before working inside a workspace:

- **Instance Context (Community Shop)**: Refer to the local [instance/AGENTS.md](./instance/AGENTS.md) for community core, api, and web applications.
- **Portal Context (SaaS Platform Hub)**: Refer to the local [portal/AGENTS.md](./portal/AGENTS.md) for platform core, api, and web applications.
- **Tools Context (AI & Dev Automation)**: Refer to the local [tools/AGENTS.md](./tools/AGENTS.md) for SSE Model Context Protocol adapters and containerized agent environments.
- **Studio Context (Visual Identity & Design System)**: Refer to the local [studio/AGENTS.md](./studio/AGENTS.md) for color tokens, SVG icon library, and self-hosted Penpot setup.
- **Handbook Documentation**: Refer to general guides in [docs/handbook/](./docs/handbook/):
  - [Introduction](./docs/handbook/intro.mdx)
  - [Orchestration Reference](./docs/handbook/architecture/infra-orchestration-deploy/orchestration.mdx)
- **Core Platform Roadmap**: Refer to the core roadmap in [docs/roadmap/01-core.md](./docs/roadmap/01-core.md).

---

## AI Specialized Skills Routing

To guarantee documentation quality, strict syntax adherence, and local layout standards, you MUST activate and follow the corresponding specialized skill before modifying any technical documents or context router files:

- **General Markdown files (`.md`, `README.md`, except `AGENTS.md` files)**: Load and follow the [markdown-expert](./.agents/skills/markdown-expert/SKILL.md) skill.
- **Docusaurus Docs workspace (`docs/`)**: Load and follow the [docusaurus-kb-expert](./.agents/skills/docusaurus-kb-expert/SKILL.md) skill for all workspace documentation, configurations, and Docusaurus components.
- **AI Context Router files (`AGENTS.md`)**: Load and follow the [agent-router-expert](./.agents/skills/agent-router-expert/SKILL.md) skill.

---

## Global Guardrails (Non-Negotiable)

All development across all workspaces MUST strictly comply with these core engineering standards:

1. **Strict English-First**: All technical documentation, READMEs, architectural briefs, commit messages, code comments, and variable names/logic MUST be written in English (en-US). Exceptions are limited to local translations (i.e. `i18n` dictionary JSON files) or explicit mocks.
2. **Zero Emojis**: Emojis are strictly forbidden in all source files, READMEs, comments, and project documentation to maintain a professional, corporate appearance.
3. **Zero Placeholders**: Never include empty sections, "TODO" or "TBD" notes in code comments or documentation. If a section or parameter is not yet implemented, omit it or explain its current status explicitly.
4. **Strict Boolean Logic**: Expressions and conditions must be explicit. Use `if (value === true)` or `if (value !== undefined)`, never `if (value)`. In React JSX, always use explicit comparisons: `{isValid === true && <Component />}` to prevent rendering unwanted `0` or `NaN`.
5. **No Floating Promises**: Never leave asynchronous calls unawaited without handling them. Use the `void` operator for intentional unawaited background processes: `void asyncFn()`.
6. **Core First Design**: All models, validation contracts, DTO schemas, and types MUST be declared in the bounded context's `packages/core` library before being imported or used in downstream applications (`apps/api`, `apps/web`).

---

## Unified Orchestration Commands

Manage the monorepo using standard PNPM commands from the root:

- `pnpm instance:dev`: Starts the local community stack (databases in Docker, API + Web on host).
- `pnpm instance:up`: Starts community local databases (MongoDB replica set + Redis) only.
- `pnpm instance:down`: Stops the community local database containers.
- `pnpm portal:dev`: Starts the local platform stack (databases in Docker, API + Web on host).
- `pnpm portal:down`: Stops the platform local database containers.
- `pnpm docs:dev`: Starts the local Docusaurus Knowledge Base development server.
- `pnpm typecheck`: Validates TypeScript type-safety across the entire monorepo in parallel.
- `pnpm lint`: Runs ESLint validation for all workspaces.
- `pnpm build`: Performs a full production build of all applications and libraries.

---

## AI Interaction Persona

- **Role**: Senior Software Engineer / Lead Architect.
- **Tone**: Concise, direct, and technical. No conversational filler or introductory chatter.
- **Proactiveness**: Persist through obstacles, diagnose failures, write tests, and ensure implementation completeness.
- **Validation**: Always verify changes via `pnpm lint` and `pnpm typecheck` before concluding a task (only required when source code or configurations are modified; no need to execute these when only documentation, rules, or skill files are changed).
- **Double-Check**: Always use `git diff` after modifications to ensure precision, avoid regressions, and verify a clean working tree.
