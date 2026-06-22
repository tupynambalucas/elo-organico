---
title: Tools (Infrastructure & MCP)
sidebar_label: Tools (MCP & Infra)
---

This section outlines the gateway proxy infrastructure, containerized MCP servers, and agent sandboxes.

## Completed Milestones

### Gateway Proxy & Networking
- **Unified Federated Gateway**: Migrated the gateway (`elo-mcp-gateway`) to an official SDK-based federated MCP server. It acts as the single SSE entrypoint (port `3005` on host), dynamically handles tool namespace aggregation, and injects compiled markdown instructions into client handshakes.
- **CORS & SSE Stream Handling**: Configured network-level CORS headers and SSE event loops to guarantee stable, persistent Server-Sent Events (SSE) connections.

### Containerized MCP Ecosystem (socat raw TCP Bridge)
- **Raw TCP Bridging**: Replaced custom Node/Fastify wrappers in all backend containers with low-latency `socat` TCP-to-stdio socket tunnels (ports `3001`-`3004` internally), significantly reducing image memory footprints.
- **Playwright Headless Browser Sandbox**: Deployed a Debian-based container running Playwright Google Chrome, with automatic rewrite rules routing loopback/localhost requests back to the host machine bridge (`host.docker.internal`).
- **Zero-Trust Network Isolation**: Configured Docker Compose namespaces to keep upstream TCP ports isolated inside the internal network bridge, preventing any port exposure to the host loopback or public internet.
- **Structured MCP Servers**: Created containerized setups for:
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
- **Internal Network Routing**: Agent containers attach to the `elo-mcp-net` bridge network declared by the MCP stack, resolving all MCP services via the `elo.internal.tools:3000` internal alias without exposing additional host ports.
- **Docker-out-of-Docker (DooD)**: Both containers mount the host Docker socket, enabling containerized agents to orchestrate other monorepo stacks (e.g., `pnpm mcp:up`, `pnpm instance:up`) from within the container.
- **VS Code Task Integration**: Tasks registered in `.vscode/tasks.json` using `[Docker]` and `[Host]` prefixes to clearly distinguish container-based from host-global CLI execution during the migration transition period.

## Planned Focus
- **Agent Stack Validation**: End-to-end testing of MCP connectivity, OAuth persistence, and workspace bind mount integrity from within containerized agent sessions.
- **Agent Token-Bypass Authentication**: Implement direct API key authentication for agent CLIs using variables (e.g. `GEMINI_API_KEY`, `GITHUB_TOKEN`) defined in `.env.agents`, bypassing interactive OAuth and provisioning credentials automatically on initial startup.
- **Host CLI Decommission**: After full agent stack validation, remove host-global CLI installations and delete legacy `.agents/` and `.github/copilot/` configuration directories.
- **CI/CD Integrations**: Build context validators and check scripts.
- **Automated Sandbox Reporting**: Expose runtime test and coverage dashboards to local agent environments.

