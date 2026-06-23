# Model Context Protocol (MCP) Ecosystem

This workspace houses the containerized gateway and backend services for Model Context Protocol (MCP) tooling inside the Elo Orgânico infrastructure.

## Architecture Overview

The ecosystem operates on a decoupled gateway proxy model:

1.  **Fastify Proxy Gateway:** A Node.js Fastify service ([server.ts](file:///D:/projects/elo-organico/tools/mcp/gateway/server.ts)) that exposes port `3005` to the host machine. It intercepts CORS preflight options and routes path prefixes (e.g., `/github`) directly to downstream servers using `@fastify/http-proxy`.
2.  **Downstream Fastify SSE Adapters:** Each MCP container runs a custom Fastify utility ([sse-adapter.ts](file:///D:/projects/elo-organico/tools/mcp/infrastructure/common/sse-adapter.ts)) wrapping stdio-based CLI binaries (Node/Python) and exposing them via Server-Sent Events (SSE).
3.  **Context Handshake Injection:** The downstream adapters read localized instructions files from the [context/](file:///D:/projects/elo-organico/tools/mcp/context) directory mounted at runtime and inject them into the `InitializeResult` handshake response, updating the LLM client's system prompt dynamically.
4.  **Isolated Bridge Network:** Services communicate internally over the bridge network `elo-mcp-net`. No ports other than `3005` on the gateway are exposed to the host machine.

```
                  +-----------------------------------------+
                  |              Host Machine               |
                  |     +-----------------------------+     |
                  |     |    Antigravity / Client     |     |
                  |     +--------------+--------------+     |
                  +--------------------|--------------------+
                                       | HTTP / SSE
                                       v Port 3005
                  +--------------------|--------------------+
                  |              elo-mcp Stack              |
                  |     +--------------v--------------+     |
                  |     |     Fastify Proxy Gateway   |     |
                  |     |       (elo-mcp-gateway)     |     |
                  |     +--------------+--------------+     |
                  |                    |                    |
                  |                    | elo-mcp-net        |
                  |      +-------------+-------------+      |
                  |      |                           |      |
                  |      v Port 3001                 v Port 3002
                  | +----+----+                  +----+----+
                  | | github  |                  |context7 |
                  | +---------+                  +---------+
                  +-----------------------------------------+
```

---

## Directory Layout

*   [compose.yaml](file:///D:/projects/elo-organico/tools/mcp/compose.yaml): Docker Compose orchestration defining internal networks, volumes, and service constraints.
*   `gateway/`: Gateway Fastify proxy server configuration.
*   `infrastructure/`: Containerized setups and Dockerfiles for the downstream servers.
*   `context/`: Specific markdown files containing context parameters injected into each MCP (e.g., [github/instructions.md](file:///D:/projects/elo-organico/tools/mcp/context/github/instructions.md)).
*   `config/`: Template environment configurations and git-ignored secrets.

---

## Configuration & Environment Files

Settings are managed via environment files under `config/`.

### Setup
Copy the examples and configure your tokens:
```bash
cp config/.env.github.example config/.env.github
cp config/.env.context7.example config/.env.context7
cp config/.env.browser.example config/.env.browser
cp config/.env.dockerhub.example config/.env.dockerhub
```

### Reference Variables
*   `GITHUB_PERSONAL_ACCESS_TOKEN` (permissions: `repo`, `read:org`, `gist`, `workflow`)
*   `CONTEXT7_API_KEY` (Technical dependency documentation lookup key)
*   `HUB_PAT_TOKEN` & `HUB_USERNAME` (Docker Hub queries)

---

## Operations & Orchestration Commands

Run these scripts from the monorepo root:

*   `pnpm mcp:up`: Launches the gateway and all downstream MCP containers.
*   `pnpm mcp:down`: Stops and removes the MCP stack.
*   `pnpm mcp:reset`: Prunes volumes, rebuilds the Fastify adapters, and restarts the environment.

---

## Client Connection Mapping

For standard IDE extensions or local command-line runners (e.g., Google Antigravity CLI on the host), map the gateway paths inside your [.agents/mcp_config.json](file:///D:/projects/elo-organico/.agents/mcp_config.json):

```json
{
  "mcpServers": {
    "github": {
      "url": "http://localhost:3005/github/sse",
      "lifecycle": "eager"
    },
    "context7": {
      "url": "http://localhost:3005/context7/sse",
      "lifecycle": "eager"
    },
    "browser": {
      "url": "http://localhost:3005/browser/sse",
      "lifecycle": "eager"
    },
    "dockerhub": {
      "url": "http://localhost:3005/dockerhub/sse",
      "lifecycle": "eager"
    }
  }
}
```
