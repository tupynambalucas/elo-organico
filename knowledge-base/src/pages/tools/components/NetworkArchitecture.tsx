import React from 'react';

export default function NetworkArchitecture() {
  return (
    <div>
      <h3>Isolated Infrastructure & Network Routing</h3>
      <p>
        Security and environment predictability are maintained through an isolated, explicitly named
        Docker bridge network (<code>elo-mcp-net</code>), preventing unauthorized cross-network access.
      </p>

      <h4>Gateway & Routing Configuration</h4>
      <ul>
        <li>
          <strong>Fastify HTTP Proxy Gateway:</strong> A lightweight Fastify v5 server (<code>elo-mcp-gateway</code>)
          running on Node.js serves as the entrypoint. It exposes port <code>3005</code> to the host machine
          and listens on port <code>3000</code> internally. Using <code>@fastify/http-proxy</code>, it proxies path prefixes
          (e.g., <code>/github</code>) to the respective backend containers.
        </li>
        <li>
          <strong>Network-Level CORS & SSE Handling:</strong> The gateway intercepts <code>OPTIONS</code> requests
          and injects appropriate CORS headers globally. It disables default HTTP timeouts on proxies to prevent
          active Server-Sent Events (SSE) connections from dropping during long-running tasks.
        </li>
        <li>
          <strong>Internal Domain Routing:</strong> On the <code>elo-mcp-net</code> bridge network, the gateway is
          aliased as <code>elo.internal.tools</code>. Internal LLM services or agents running in adjacent containers
          can route requests directly through <code>http://elo.internal.tools:3000/[service]/sse</code>.
        </li>
        <li>
          <strong>Host-to-Container Bridge:</strong> Local development clients (such as the Google Antigravity CLI)
          communicate with the gateway from the host machine loopback interface using:
          <pre style={{ padding: '0.5rem', marginTop: '0.2rem' }}>
            http://localhost:3005/github/sse
          </pre>
        </li>
        <li>
          <strong>Buffered stdio Stream Mapping:</strong> The wrapper executes child processes locally, preventing stdout
          fragmentation. By checking JSON-RPC transaction <code>id</code>s line-by-line, the adapter resolves HTTP
          requests with complete, un-truncated payloads.
        </li>
      </ul>
    </div>
  );
}

