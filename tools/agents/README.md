# Containerized AI Agents Stack

This directory manages the orchestration and configuration for containerized AI development agents (Google Antigravity and GitHub Copilot CLI) running inside Docker.

## Architecture Overview

The agent containers run as long-running Docker services in the private bridge network `elo-mcp-net` alongside the MCP gateway. They mount the host's Docker socket to orchestrate monorepo workflows directly from inside the containers.

```
+-------------------------------------------------------------+
|                        Host Machine                         |
|  +--------------------+             +--------------------+  |
|  |     Developer      |             |   SSH Keys / Git   |  |
|  |     (VS Code)      |             |     Identity       |  |
|  +---------+----------+             +----------+---------+  |
+------------|-----------------------------------|------------+
             | docker exec                       | mount (read-only)
             v                                   v
+------------|-----------------------------------|------------+
|            |           elo-agents Stack        |            |
|  +---------v----------+             +----------v---------+  |
|  | agent-antigravity  |             |   agent-copilot    |  |
|  | (Google Gemini)    |             |  (GitHub Copilot)  |  |
|  +---------+----------+             +----------+---------+  |
+------------|-----------------------------------|------------+
             |                                   |
             +-----------------+-----------------+
                               | host loopback
                               v
             +-----------------+-----------------+
             |     Fastify Unified MCP Gateway   |
             |     (elo.internal.tools.mcp:3005) |
             +-----------------------------------+
```

---

## Directory Layout

- [compose.yaml](file:///D:/projects/elo-organico/tools/agents/compose.yaml): Service definitions, environment mapping, and volume configurations.
- [AGENTS.md](file:///D:/projects/elo-organico/tools/agents/AGENTS.md): Authoritative context rules loaded by the agent's brain.
- [mcp_config.json](file:///D:/projects/elo-organico/tools/agents/mcp_config.json): Endpoint registry pointing to the internal MCP gateway.
- `antigravity/`: Antigravity-specific configurations, theme scripts, and custom status-bars.
- `copilot/`: Data volumes for GitHub authentication and credentials.
- `skills/`: Shared specialized markdown skills ([code-expert](file:///D:/projects/elo-organico/.agents/skills/code-expert/SKILL.md) and [doc-expert](file:///D:/projects/elo-organico/.agents/skills/doc-expert/SKILL.md)) mounted into the containers.

---

## Configuration & Persistence

All agent configuration is injected at container boot using read-only or read-write **bind mounts**. No settings are hard-coded into the image layers, ensuring instant sync with host configurations.

| Mount Source           | Container Destination                | Access     | Purpose                                       |
| :--------------------- | :----------------------------------- | :--------- | :-------------------------------------------- |
| `../../`               | `/workspace`                         | Read-Write | Access to the monorepo root                   |
| `./skills/`            | `/workspace/.agents/skills`          | Read-Only  | Inject shared code/doc expert skills          |
| `./mcp_config.json`    | `/workspace/.agents/mcp_config.json` | Read-Only  | Configuration endpoint mapping                |
| `./antigravity/data/`  | `/root/.gemini/antigravity-cli/`     | Read-Write | Persist agent conversation logs & cache       |
| `./copilot/data/`      | `/root/.copilot/`                    | Read-Write | Persist Copilot session credentials           |
| `/var/run/docker.sock` | `/var/run/docker.sock`               | Read-Write | Docker-out-of-Docker (DooD) command execution |

---

## Authentication Workflow

Both CLI clients utilize standard OAuth device-auth flows. Authenticate them directly in your active terminal by running the mapped scripts:

- **Google Antigravity:**
  ```bash
  pnpm antigravity:auth
  ```
- **GitHub Copilot CLI:**
  `bash
pnpm copilot:auth
`
  These scripts run `docker exec` in interactive mode. Open the returned URL, input the verification code, and authorize. The tokens are saved directly to the bind-mounted volumes on your host and persist across container restarts.

---

## Operations

Manage the agent services using the mapped scripts in the root `package.json`:

- `pnpm agents:up`: Starts both agent containers in detached mode.
- `pnpm agents:down`: Tears down the agent containers.
- `pnpm agents:reset`: Forces a full volume teardown and container rebuild.
