# Containerized AI Agents Setup

This directory provisions GitHub Copilot and Google Antigravity CLIs as long-running Docker services. It ensures environment parity and eliminates manual CLI installations on local workstations.

## Directory Layout

```
tools/agents/
├── .env.agents.example     # Environment variable template (tracked)
├── .env.agents             # Local secrets (Git-ignored)
├── compose.yaml            # Orchestration for both agent containers
├── mcp_config.json         # Unified MCP configuration
├── skills/                 # Shared skills mounted into the containers
├── copilot/                # Dockerfile and mounts for Copilot CLI
└── antigravity/            # Dockerfile, mounts, and settings for Antigravity CLI
```

## Volumes & Mount Details

Configuration is injected via Docker bind mounts at container start. Persisted session directories (`data/`, `gh-config/`) survive container rebuilds and do not leak credentials into the host's global folders:

*   `/workspace`: Mounts the monorepo root.
*   `/workspace/.agents/skills`: Mounts shared skills.
*   `/workspace/.agents/mcp_config.json`: Mounts the unified MCP configuration.
*   `/root/.gemini/antigravity-cli`: Mounts `./antigravity/data/` for session persistence.
*   `/root/.copilot`: Mounts `./copilot/data/` for session persistence.
*   `/root/.config/gh`: Mounts `./copilot/gh-config/` for GitHub CLI credentials.

## Lifecycle Commands

Commands are orchestrated at the monorepo root:

| Command | Action |
| :--- | :--- |
| `pnpm agents:up` | Starts both agent containers. |
| `pnpm agents:down` | Stops agent containers. |
| `pnpm agents:reset` | Tears down volumes and rebuilds containers. |
| `pnpm antigravity:auth` | Runs Antigravity OAuth device authorization. |
| `pnpm copilot:auth` | Runs Copilot CLI OAuth login. |

## Future Authentication Flow & API Keys

To improve CLI authentication, we plan to implement a dual-mode authentication flow using `.env.agents`.

### Configured Environment Variables
*   `GEMINI_API_KEY`: API Key for Google Antigravity.
*   `GITHUB_TOKEN`: Personal Access Token (PAT) for GitHub Copilot.

### Proposed Authentication Logic
Upon starting or running authentication scripts:
1.  The startup script detects the presence of the respective API keys inside `.env.agents`.
2.  If keys are present:
    *   OAuth device authentication flow is bypassed.
    *   The container configures the CLI using the API key automatically, generating local configuration files on the first run.
3.  If keys are absent:
    *   The system falls back to standard OAuth device-flow authentication (`pnpm copilot:auth` or `pnpm antigravity:auth`).
