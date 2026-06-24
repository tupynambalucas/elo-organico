# Local Context: MCP Ecosystem

This workspace ([tools/mcp/](./)) implements the Server-Sent Events (SSE) adapters and Model Context Protocol (MCP) gateways.

---

## Local Architecture & Directory Map

- **[gateway/](./gateway)**: Orchestration proxy ([server.ts](./gateway/server.ts)) mapping client connections to downstream tools.
- **[infrastructure/](./infrastructure)**: Containerized Model Context Protocol (MCP) servers (GitHub, Playwright Browser, Context7, Docker Hub) and their shared SSE adapter ([sse-adapter.ts](./infrastructure/common/sse-adapter.ts)).
- **[compose.dev.yaml](./compose.dev.yaml)**: Docker Compose configuration for the development environment.
- **[compose.prod.yaml](./compose.prod.yaml)**: Docker Compose configuration for production/staging environments.
- **[.env.dev.example](./.env.dev.example)**: Environment template file for development.
- **[.env.staging.example](./.env.staging.example)**: Environment template file for staging.
- **[.env.prod.example](./.env.prod.example)**: Environment template file for production.

---

## MCP Guardrails

1. **Fastify 5 SSE Routing**: Custom adapters must leverage native Fastify v5 hooks for connection handling, keeping request times low.
2. **Schema Contracts**: All exposed tools and prompts MUST declare explicit input schemas (using JSON Schema formats) to prevent LLM tool execution errors.
3. **Connection Lifecycle**: Implement clean reconnection logic and timeout hooks on SSE events to prevent orphaned terminal subprocesses on client drop.
4. **Secrets Handling**: API keys, credentials, and OAuth tokens for external tools (GitHub token, Turnstile secrets) must be injected strictly from local environment variables, never hardcoded or logged.

---

## Scoped Commands

Run these scripts from the monorepo root:

- `pnpm mcp:up`: Boots the development MCP Docker containers in the background.
- `pnpm mcp:down`: Stops the development MCP containers.
- `pnpm mcp:prod:up`: Boots the production MCP Docker containers in the background.
- `pnpm mcp:prod:down`: Stops the production MCP containers.
- `pnpm mcp:staging:up`: Boots the staging MCP Docker containers in the background.
- `pnpm mcp:staging:down`: Stops the staging MCP containers.
