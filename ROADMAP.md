# Roadmap

All planned and completed milestones for each key workspace context in the Elo Orgânico ecosystem, aligning our immediate features with long-term platform transformations.

## Core Architecture & Strategy

This section outlines the strategic monorepo architecture, catalog configurations, and logical multi-tenant isolation goals for the Elo Orgânico project.

## Completed Milestones

### Monorepo Architecture & Workspace Setup
- **Monorepo Workspace Segregation**: Structured workspace layers via PNPM Workspaces v11 and Turborepo, segregating `instance/`, `portal/`, `studio/`, `tools/`, and `knowledge-base/` domains.
- **High-Performance Task Orchestration**: Integrated **Turborepo** to orchestrate pipelines, enabling smart target caching and parallel execution of scripts.
- **Unified Configuration Inheritances**: Configured root-level `tsconfig.base.json` and `eslint.config.ts` extendable by workspace packages via TSConfig extends and ESLint config array definitions.
- **Node 22 & TypeScript ESM Configuration**: Converted all packages to use ECMAScript Modules (`"type": "module"`) and compiled with target `ESNext` for modern syntax support.

### Bounded Contexts & Domain Security
- **Strict Bounded Context Isolation**: Configured custom ESLint import restrictions (`no-restricted-imports`) in `eslint.config.ts` preventing cross-workspace dependencies (e.g., Instance context importing from Portal context, and vice-versa) to guarantee clean, decoupled business logic.
- **Domain-Core Pattern Integration**: Established `packages/core` in both `instance` and `portal` as the Single Source of Truth (SSOT) for data models and schema validators.
- **Unified Dependency Management via Catalogs**: Integrated PNPM v11 Catalogs feature in `pnpm-workspace.yaml` to govern third-party tool versions (e.g., Fastify 5, React 19, TSX, ESLint) across the entire monorepo.

## Planned Focus
- **Logical Multi-Tenant Isolation**: Ensure instances and portal run completely isolated execution domains.
- **SaaS Platform Evolution**: Transition from single-instance deployments to a centralized multi-tenant marketplace model.

---

## Instance (Local Community Shop)

This section details the development roadmap for local community shop modules, including Pix payments and Feirinha physical sales events.

## Completed Milestones

### Layered Backend Engine
- **Strict Layered Fastify API**: Built `@elo-instance/api` utilizing Fastify v5 and structured as a strict `Controller -> Service -> Repository -> Model` architecture.
- **Zod Domain Validation & Core Integration**: Integrated `@elo-instance/core` to validate incoming requests using Zod schemas, securing authentication and product catalog payloads.
- **Completed Core Modules**:
  - `auth`: Built routes, JWT generation, and user repositories.
  - `product`: Set up catalog categories, measures, availability flag toggles, and bulk upsert database handlers.
  - `cycle`: Modeled agricultural cycles, order capping limits, and allocation logics.

### Database & Seeding Infrastructure
- **MongoDB Replica Set Dev Configuration**: Configured a containerized MongoDB service in `compose.dev.yaml` executing a Replica Set (`rs0`) with Keyfile-based authentication and a single-responsibility initialization container (`db-init-dev`).
- **Dev Database Seeding Plugin**: Implemented a Fastify startup seeding plugin (`SeedPlugin`) in the API to automatically populate admin credentials and database structure.

### Client-Side Application
- **Vite React 19 Client Web App**: Developed `@elo-instance/web` leveraging React 19, CSS Modules for scoped layout styling, and integrated frontend domains (Auth, Landing pages, Shop views, and Admin control).

## Planned Focus
- **Feirinha (Farmer's Market) Module**: Expand features to support physical, real-time local sales events.
- **Data Isolation**: Configure dedicated local database collections and models.
- **Pay-as-you-go Pix Integration**: Integrate immediate Pix instant payment checkout flows in the backend API.
- **Instance Administrative Panels**: Develop event creation and dashboard reconciliation modules on the frontend.

---

## Portal (Global Hub)

This section focuses on the platform hub core integration, central billing, supplier dashboards, and geolocation-based discovery.

## Completed Milestones

### Workspace Skeleton Initialization
- **Workspace Architecture Setup**: Structured `@elo-portal/api` (Fastify v5), `@elo-portal/web` (React 19), and `@elo-portal/core` package skeletons.
- **Dedicated Infrastructure**: Outfitted the portal with its own isolated Docker infrastructure (`compose.dev.yaml`), mapping MongoDB replica set on port `27018` and Redis memory cache on port `6380` inside an isolated bridge network (`elo_portal_network`).

### Security & Context Management
- **Auth Domain Skeleton**: Configured base user schemas, route definitions, and session controllers to manage global platform onboarding accounts.
- **Decoupled Environment Variables**: Created separate `.env.dev`, `.env.prod`, and `.env.staging` configurations, isolating platform variables from instance setups.

## Planned Focus
- **Multi-Instance Orchestration**: Automate the provisioning of instance web/API application pairs.
- **Centralized Billing**: Implement tenant subscription management and central account coordination.
- **Producers & Logistics Portals**: Construct specialized management hubs for suppliers and logistics.
- **Smart Geolocalized Routing**: Establish geolocation-based discovery channels for communities.

---

## Studio (Design Hub)

This section covers the Penpot environment, design-token sync automation, and custom UI asset design.

## Completed Milestones

### Collaborative Design Environment
- **Self-Hosted Design Hub**: Deployed a containerized Penpot v2 instance (Aide-supported design workspace) inside the `@elo-organico/studio` environment, enabling secure local collaborative styling mockups.
- **Centralized Design System Packages**: Structured `@elo-organico/studio` to serve as the unified package for brand guidelines, typography styles, spacing configurations, and palette design tokens.

### Asset Pipelines
- **Branding Assets Export**: Standardized export assets (including SVG vectors, logo marks, and color sheets) in the project repositories, providing raw templates for web applications.

## Planned Focus
- **Sync Integration**: Automate the pipeline to sync tokens from Penpot directly into codebase design systems.
- **Extended Suite Assets**: Design custom marketing and UI asset libraries.
- **Cloud-Based Asset Hosting**: Migrate the studio architecture to host all static assets (images, logos, 3D models) from [studio/src](file:///D:/projects/elo-organico/studio/src) in the cloud (using CDN or buckets) instead of tracking them in the Git repository, keeping the codebase lightweight.

---

## Tools (Infrastructure & MCP)

This section outlines the gateway proxy infrastructure, containerized MCP servers, and agent sandboxes.

## Completed Milestones

### Gateway Proxy & Networking

- **Fastify HTTP Proxy Gateway**: Deployed a containerized gateway (`elo-mcp-gateway`) running on Fastify v5 that proxies and routes incoming local client requests (e.g. from the Antigravity CLI on port `3005`) to downstream context containers.
- **CORS & SSE Stream Handling**: Configured network-level CORS headers and disabled proxy timeouts to guarantee stable, persistent Server-Sent Events (SSE) connections.

### Containerized MCP Ecosystem

- **Playwright Headless Browser Sandbox**: Deployed a Debian-based container running Playwright Google Chrome, with automatic rewrite rules routing loopback/localhost requests back to the host machine bridge (`host.docker.internal`).
- **Structured MCP Servers**: Created Alpine/Debian-based containerized setups for:
  - `GitHub MCP`: Version control execution, issue tracking, and repository queries.
  - `Context7 MCP`: Documentation search targeting dependencies (React 19, Fastify 5, Three.js).
  - `Docker Hub MCP`: Container registry tracking.

### Automation Scripts

- **TypeScript Root Compilation Scripts**: Programmed TypeScript scripts (`generate-changelog.ts` and `generate-roadmap.ts`) running natively via `tsx` to compile workspace metrics and changes directly to root Markdown files.

### Containerized AI Agents (`tools/agents`)

- **Docker-based CLI Provisioning**: Architected and implemented a new `tools/agents` workspace that provisions GitHub Copilot and Google Antigravity CLIs as long-running Docker services, eliminating manual host-level CLI installations.
- **Unified Configuration Injection**: Both CLIs share a single `mcp_config.json` and a unified `skills/` directory, injected via bind mounts at container startup. No configuration is baked into image layers.
- **Persistent Session & Brain Storage**: OAuth tokens, conversation histories, and runtime data are persisted on the host machine via Git-ignored bind-mounted volumes, surviving container rebuilds.
- **Version-Controlled TUI Settings**: Antigravity CLI `settings.json`, `statusline.sh`, and `title.sh` are tracked in the repository and mounted over the container's runtime directory, giving the team direct control over CLI behavior without manual per-machine configuration.
- **Internal Network Routing**: Agent containers resolve all MCP services via the `elo.internal.tools.mcp:3005` custom host alias, allowing the stacks to start and stop completely independently without network configuration errors.
- **Docker-out-of-Docker (DooD)**: Both containers mount the host Docker socket, enabling containerized agents to orchestrate other monorepo stacks (e.g., `pnpm mcp:up`, `pnpm instance:up`) from within the container.
- **VS Code Task Integration**: Tasks registered in `.vscode/tasks.json` using `[Docker]` and `[Host]` prefixes to clearly distinguish container-based from host-global CLI execution during the migration transition period.

## Planned Focus

- **Agent Stack Validation**: End-to-end testing of MCP connectivity, OAuth persistence, and workspace bind mount integrity from within containerized agent sessions.
- **Host CLI Decommission**: After full agent stack validation, remove host-global CLI installations and delete legacy `.agents/` and `.github/copilot/` configuration directories.
- **CI/CD Integrations**: Build context validators and check scripts.
- **Automated Sandbox Reporting**: Expose runtime test and coverage dashboards to local agent environments.

---

## Knowledge Base (EloDocs)

This section details the central developer portal onboarding references, guidelines, and translation parity tools.

## Completed Milestones

### Documentation Engine & Layout
- **Docusaurus Engine Integration**: Configured Docusaurus v3 as our central developer portal (EloDocs), providing a responsive documentation engine.
- **Custom MDX Component Pages**: Programmed custom MDX pages (e.g. Tools Workspace ecosystem, Studio Branding) to visual-explain monorepo architecture workflows.
- **Left Navigation Sidebars**: Implemented autogenerated context-based sidebars and structured paths for all sections, simplifying navigation structure.

### Localization & Translation Parity
- **Native Translation Pipelines**: Integrated i18n support, creating a dual locale structure (English source and Portuguese `pt-BR` translation copies) with translation parity protocols.

### CI/CD Deployment
- **Automated Root Compilation**: Integrated build tasks in the GitHub Actions workflow (`deploy-docs.yaml`) to compile and push both `CHANGELOG.md` and `ROADMAP.md` to the repository root.

## Planned Focus
- **Translation Verification Pipeline**: Automate the verification check to ensure 100% documentation sync.
- **API Auto-Generation**: Extract documentation blocks directly from Fastify routing controllers.
