import React from 'react';

export default function McpEcosystem() {
  return (
    <div>
      <h3>Model Context Protocol (MCP) Ecosystem</h3>
      <p>
        The Elo Orgânico monorepo features a specialized, containerized MCP ecosystem. It exposes
        structured development capabilities and codebase contexts to LLM clients (such as the
        Antigravity CLI or external agents) via a secure, high-performance gateway network.
      </p>

      <h4>Zero-Dependency TypeScript Adapters</h4>
      <p>
        Standard CLI-based MCP servers communicate via standard input/output (stdio) streams. To expose
        them securely over the network, every service is packaged with a custom TypeScript wrapper (<code>sse-adapter.ts</code>)
        running on Fastify v5. This adapter implements two distinct network protocols:
      </p>
      <ul>
        <li>
          <strong>Traditional Server-Sent Events (SSE):</strong> Establishes a persistent uni-directional stream via
          <code>GET /sse</code> and accepts client messages via <code>POST /messages</code>, piping events directly
          to the underlying subprocess stdin.
        </li>
        <li>
          <strong>Streamable Stateless HTTP (POST /sse):</strong> A custom transactional adapter that simulates stateless request-response.
          It buffers stdout lines from the child process, extracts JSON-RPC payloads, and resolves the HTTP request
          only when it captures the specific JSON-RPC response <code>id</code> matching the request. Notifications (requests lacking an <code>id</code>)
          receive an immediate <code>204 No Content</code> response.
        </li>
      </ul>

      <h4>Integrated Context Servers</h4>
      <ul>
        <li>
          <strong>GitHub MCP:</strong> Wraps the official Go-based GitHub MCP server binary in a multi-stage Alpine image.
          It provides repository search, pull request reviews, branch lifecycle management, and issue tracking.
          <ul>
            <li><em>Upstream:</em> <code>http://elo-mcp-github:3001/github/sse</code></li>
          </ul>
        </li>
        <li>
          <strong>Context7 MCP:</strong> Exposes the Upstash Context7 documentation search engine. Used to query up-to-date APIs
          and patterns for core project dependencies like React 19, Fastify 5, and Three.js.
          <ul>
            <li><em>Upstream:</em> <code>http://elo-mcp-context7:3002/context7/sse</code></li>
          </ul>
        </li>
        <li>
          <strong>Browser MCP (Playwright):</strong> Integrates a Debian-based Playwright container running headless Google Chrome,
          enabling agents to navigate frontend layouts, capture screenshots, parse DOM content, and debug client-side scripts.
          <ul>
            <li><em>Upstream:</em> <code>http://elo-mcp-browser:3003/browser/sse</code></li>
          </ul>
        </li>
        <li>
          <strong>Docker Hub MCP:</strong> A custom multi-stage build that clones the official Docker Hub MCP server, compiles it,
          and exposes registry search, tag checks, and repository data using environment-based auth configuration.
          <ul>
            <li><em>Upstream:</em> <code>http://elo-mcp-dockerhub:3004/dockerhub/sse</code></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

