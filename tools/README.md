# @elo-organico/tools - Project Automation, MCP & AI Agents

This workspace manages the infrastructure for development automation, specialized workflows, and containerized AI-native environments within the Elo Orgânico monorepo.

---

## Structure Overview

The tools workspace is divided into two primary sub-stacks:

### 1. [MCP Ecosystem (Model Context Protocol)](file:///D:/projects/elo-organico/tools/mcp/README.md)

Contains the containerized gateway proxy and downstream adapters translating CLI tools (GitHub, Playwright Browser, Context7, Docker Hub) into Server-Sent Events (SSE).

- **Purpose:** Exposes rich codebase contexts and environment utilities to AI clients.
- **Detailed Guide:** Refer to the [MCP README](file:///D:/projects/elo-organico/tools/mcp/README.md) for network specifications, config parameters, and routing.

### 2. [AI Agents Workspace](file:///D:/projects/elo-organico/tools/agents/README.md)

Deploys long-running Docker services containing terminal-based AI client sessions (Google Antigravity CLI and GitHub Copilot CLI).

- **Purpose:** Eliminates manual per-developer CLI installations and guarantees environment parity.
- **Detailed Guide:** Refer to the [Agents README](file:///D:/projects/elo-organico/tools/agents/README.md) for Docker-out-of-Docker (DooD) settings, mounting specifications, and OAuth authentication flows.

### 3. [Maintenance Scripts](file:///D:/projects/elo-organico/tools/scripts)

TypeScript-based tooling running on top of Node.js (`tsx`) to automate changelog compilations and project roadmaps.

---

## Mapped Lifecycle Commands

Execute these commands from the monorepo root:

| Command             | Action                                                | Scope        |
| :------------------ | :---------------------------------------------------- | :----------- |
| `pnpm mcp:up`       | Starts gateway and downstream MCP containers          | MCP Stack    |
| `pnpm mcp:down`     | Stops the MCP containers                              | MCP Stack    |
| `pnpm mcp:reset`    | Prunes volumes, builds Fastify adapters, and restarts | MCP Stack    |
| `pnpm agents:up`    | Boots Copilot and Antigravity containers              | Agents Stack |
| `pnpm agents:down`  | Stops the agent containers                            | Agents Stack |
| `pnpm agents:reset` | Resets agent volumes and mounts                       | Agents Stack |

---

## Diagnostics & Code Quality

- **`pnpm typecheck`**: Validates TypeScript type safety across the scripts and gateway tools.
- **`pnpm lint`**: Enforces strict formatting and linting guidelines on the tools source code.
