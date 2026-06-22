# 🤖 @elo-organico/tools - Project Automation & AI Infrastructure

This workspace provides the automation backbone for the Elo Orgânico project. It centralizes specialized Model Context Protocol (MCP) servers, sandboxed AI agent CLI environments, and maintenance utilities designed to enhance developer productivity and ensure environment parity.

## 🏗️ Workspace Layout

This package is structured into modular sub-systems:

*   **[agents/](file:///D:/projects/elo-organico/tools/agents)**: Containerized CLI agent sandboxes (GitHub Copilot and Google Antigravity) running inside isolated Docker environments.
    *   *See details in [agents/README.md](file:///D:/projects/elo-organico/tools/agents/README.md).*
*   **[mcp/](file:///D:/projects/elo-organico/tools/mcp)**: The containerized Model Context Protocol ecosystem, featuring a Fastify-based HTTP proxy gateway and customized upstream servers.
    *   *See details in [mcp/README.md](file:///D:/projects/elo-organico/tools/mcp/README.md).*
*   **[scripts/](file:///D:/projects/elo-organico/tools/scripts)**: Project compilation utilities running under TypeScript (`generate-changelog.ts` and `generate-roadmap.ts`) to maintain documentation and workspace roadmaps.

---

## 🛠️ Operations & Orchestration Commands

All operations can be orchestrated via `pnpm` at the root workspace or within this directory:

### 1. Stack Lifecycle

| Command | Action |
| :--- | :--- |
| `pnpm mcp:up` | Launches the entire Dockerized gateway and backend MCP stack. |
| `pnpm mcp:down` | Tears down the gateway and MCP container environment. |
| `pnpm mcp:reset` | Aggressively wipes all MCP volumes and rebuilds containers. |
| `pnpm agents:up` | Starts both agent containers (`agent-antigravity` and `agent-copilot`). |
| `pnpm agents:down` | Shuts down and removes agent containers. |
| `pnpm agents:reset` | Wipes agent volumes and rebuilds containers. |

### 2. Agent Authentication

| Command | Action |
| :--- | :--- |
| `pnpm antigravity:auth` | Executes the Google OAuth authentication flow inside the container. |
| `pnpm copilot:auth` | Executes the GitHub OAuth device login flow inside the container. |

### 3. Maintenance

| Command | Action |
| :--- | :--- |
| `pnpm typecheck` | Validates TypeScript integrity across scripts and MCP source code. |
| `pnpm build` | Compiles TypeScript source files into the output `dist/` directory. |
| `pnpm clean` | Cleans compilation artifacts (`dist/`, tsbuildinfo files). |

---

## 📖 Extended Documentation

Authoritative documentation is maintained within our Docusaurus Knowledge Base:
*   **[Tools Workspace Overview](https://tupynambalucas.github.io/elo-organico/workspaces/tools)**
*   **[Architecture Guide](https://tupynambalucas.github.io/elo-organico/docs/engineering/architecture)**
