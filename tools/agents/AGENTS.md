# Local Context: AI Agents Workspace

This workspace (`tools/agents/`) deploys containerized AI development terminals (Google Antigravity CLI and GitHub Copilot CLI) to guarantee environment parity.

---

## Local Architecture & Directory Map

- **`docker-compose.yaml`**: Mounts and volume configurations for AI sessions.
- **`config/`**: Directory containing session authorization caches and persistence storage.
- **`Dockerfile.agents`**: Multi-stage Dockerfile baking in Node 22, PNPM 11, git, and custom CLI binaries.

---

## Agents Guardrails

1. **Docker-out-of-Docker (DooD)**: The docker socket (`/var/run/docker.sock`) is mounted inside the container. Verify that any docker execution from within the agent container targets host resources safely.
2. **Mount Parity**: Ensure that directory mappings between the host and the container are fully aligned (using identical paths) to prevent file-link resolving failures during task compilation.
3. **Session Cache Integrity**: OAuth authentication tokens and configurations for Copilot/Antigravity must write directly to `/home/node/.config` mapped volumes to avoid logging out when restarting containers.

---

## Scoped Commands

- `pnpm agents:up`: Builds and starts the containerized AI terminal sessions.
- `pnpm agents:down`: Stops the agent session containers.
- `pnpm agents:reset`: Wipes authorization caches and recreates containers.
