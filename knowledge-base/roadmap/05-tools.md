---
title: Tools (Infrastructure & MCP)
sidebar_label: Tools (MCP & Infra)
---

This section outlines the gateway proxy infrastructure, containerized MCP servers, and agent sandboxes.

## Completed Milestones

### Gateway Proxy & Networking
- **Fastify HTTP Proxy Gateway**: Deployed a containerized gateway (`elo-mcp-gateway`) running on Fastify v5 that proxies and routes incoming local client requests (e.g. from the Antigravity CLI on port `3005`) to downstream context containers.
- **CORS & SSE Stream Handling**: Configured network-level CORS headers and disabled proxy timeouts to guarantee stable, persistent Server-Sent Events (SSE) connections.

### Containerized MCP Ecosystem
- **Playwright Headless Browser Sandbox**: Deployed a Debian-based container running Playwright Google Chrome, with automatic rewrite rules routing loopback/localhost requests back to the host machine bridge (`host.docker.internal`).
- **Structured MCP Servers**: Created Alpine/Debian-based containerized setups for:
  - `GitHub MCP`: Version control execution, issue tracking, and repository queries.
  - `Context7 MCP`: Documentation search targeting dependencies (React 19, Fastify 5, Three.js).
  - `Docker Hub MCP`: Container registry tracking.

### Automation Scripts
- **TypeScript Root Compilation Scripts**: Programmed TypeScript scripts (`generate-changelog.ts` and `generate-roadmap.ts`) running natively via `tsx` to compile workspace metrics and changes directly to root Markdown files.

## Planned Focus
- **CI/CD Integrations**: Build context validators and check scripts.
- **Automated Sandbox Reporting**: Expose runtime test and coverage dashboards to local agent environments.
