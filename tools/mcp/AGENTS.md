# Local Context: MCP Ecosystem

This workspace (`tools/mcp/`) implements the Server-Sent Events (SSE) adapters and Model Context Protocol (MCP) gateways.

---

## Local Architecture & Directory Map

- **`gateway/`**: Orchestration proxy mapping client connections to downstream tools.
- **`adapters/`**: Custom SSE adapters translating tool actions (GitHub, Playwright Browser, Context7, Docker Hub) to MCP protocol actions.
- **`config.json`**: Port allocations and network routing rules.

---

## MCP Guardrails

1. **Fastify 5 SSE Routing**: Custom adapters must leverage native Fastify v5 hooks for connection handling, keeping request times low.
2. **Schema Contracts**: All exposed tools and prompts MUST declare explicit input schemas (using JSON Schema formats) to prevent LLM tool execution errors.
3. **Connection Lifecycle**: Implement clean reconnection logic and timeout hooks on SSE events to prevent orphaned terminal subprocesses on client drop.
4. **Secrets Handling**: API keys, credentials, and OAuth tokens for external tools (GitHub token, Turnstile secrets) must be injected strictly from local environment variables, never hardcoded or logged.

---

## Scoped Commands

- `pnpm mcp:build`: Compiles the typescript adapters and gateway.
- `pnpm mcp:up`: Boots the development MCP Docker containers in the background.
- `pnpm mcp:down`: Stops the development MCP containers.
- `pnpm mcp:prod:up`: Boots the production MCP Docker containers in the background.
- `pnpm mcp:prod:down`: Stops the production MCP containers.
- `pnpm mcp:staging:up`: Boots the staging MCP Docker containers in the background.
- `pnpm mcp:staging:down`: Stops the staging MCP containers.
