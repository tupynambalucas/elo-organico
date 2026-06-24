# Local Context: AI Agents Workspace

This workspace ([tools/agents/](./)) deploys containerized AI development terminals (Google Antigravity CLI and GitHub Copilot CLI) to guarantee environment parity.

---

## Local Architecture & Directory Map

- **[compose.dev.yaml](./compose.dev.yaml)**: Docker Compose configuration for the development environment.
- **[compose.prod.yaml](./compose.prod.yaml)**: Docker Compose configuration for production/staging environments.
- **[infrastructure/antigravity/Dockerfile](./infrastructure/antigravity/Dockerfile)**: Dockerfile baking in the custom Google Antigravity CLI binary, git, and custom tmux helpers.
- **[infrastructure/copilot/Dockerfile](./infrastructure/copilot/Dockerfile)**: Dockerfile baking in Node 22, PNPM 11, and GitHub Copilot CLI.
- **[shared/mcp_config.json](./shared/mcp_config.json)**: Shared Model Context Protocol client configuration mapped to the agent workspaces.
- **[.env.dev.example](./.env.dev.example)**: Environment template file for development.
- **[.env.staging.example](./.env.staging.example)**: Environment template file for staging.
- **[.env.prod.example](./.env.prod.example)**: Environment template file for production.

---

## Agents Guardrails

1. **Docker-out-of-Docker (DooD)**: The docker socket (`/var/run/docker.sock`) is mounted inside the container. Verify that any docker execution from within the agent container targets host resources safely.
2. **Mount Parity**: Ensure that directory mappings between the host and the container are fully aligned (using identical paths) to prevent file-link resolving failures during task compilation.
3. **Session Cache Integrity**: OAuth authentication tokens and configurations for Copilot/Antigravity must write directly to `/home/node/.config` mapped volumes (under [infrastructure/antigravity/](./infrastructure/antigravity) and [infrastructure/copilot/gh-config/](./infrastructure/copilot/gh-config)) to avoid logging out when restarting containers.

---

## Scoped Commands

Run these scripts from the monorepo root:

- `pnpm agents:up`: Builds and starts the development containerized AI terminals.
- `pnpm agents:down`: Stops the development agent session containers.
- `pnpm agents:reset`: Wipes development authorization caches and recreates containers.
- `pnpm agents:prod:up` / `pnpm agents:prod:down`: Manages the production agent stack.
- `pnpm agents:staging:up` / `pnpm agents:staging:down`: Manages the staging agent stack.
- `pnpm antigravity:up` / `pnpm antigravity:down` / `pnpm antigravity:reset`: Manages the development Antigravity container specifically.
- `pnpm copilot:up` / `pnpm copilot:down` / `pnpm copilot:reset`: Manages the development Copilot container specifically.
- `pnpm antigravity:auth` / `pnpm copilot:auth`: Authenticates the respective agent inside its development container.
- `pnpm antigravity:prod:auth` / `pnpm copilot:prod:auth`: Authenticates the respective agent inside its production container.
- `pnpm antigravity:staging:auth` / `pnpm copilot:staging:auth`: Authenticates the respective agent inside its staging container.
