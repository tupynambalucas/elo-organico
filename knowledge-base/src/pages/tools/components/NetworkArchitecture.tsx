import React from 'react';

export default function NetworkArchitecture() {
  return (
    <div>
      <h3>Isolated Infrastructure Architecture</h3>
      <p>
        Security and scaling are maintained through a zero-trust network topology. Automation tools
        and MCP servers operate within an isolated, explicitly named Docker bridge network (<code>elo-mcp-net</code>),
        preventing lateral movement within the host or cloud infrastructure.
      </p>

      <h4>Network Topology & Connectivity</h4>
      <ul>
        <li>
          <strong>Unified Gateway (Nginx):</strong> A reverse proxy container (<code>elo-mcp-gateway</code>)
          exposes port <code>3000</code> to the host and port <code>80</code> internally to the Docker bridge network.
          It acts as the <code>default_server</code> catch-all, routing prefix paths (e.g. <code>/github/sse</code>)
          to backend containers while disabling caching and buffering for Server-Sent Events (SSE).
        </li>
        <li>
          <strong>Internal Domain Routing:</strong> The gateway is aliased as <code>elo.internal.tools</code> on the
          network. Internal clients, such as containerized Large Language Models (LLMs) or agents, connect
          using clean URLs (e.g. <code>http://elo.internal.tools/github/sse</code>) without port designations,
          leveraging standard HTTP port 80.
        </li>
        <li>
          <strong>Host-to-Container Bridge:</strong> Local CLI tools (e.g. Google Antigravity CLI) connect
          to the gateway from the host loopback interface via <code>http://localhost:3000/[service]/sse</code>.
        </li>
        <li>
          <strong>Buffered stdio Stream Mapping:</strong> The Node.js wrapper handles request buffering and strict JSON-RPC
          <code>id</code> matching on child process streams. This prevents payload truncation and <code>unexpected EOF</code>
          errors caused by Docker pseudo-TTY line-wrapping or multi-chunk stdout delivery (e.g. during large <code>tools/list</code> payloads).
        </li>
      </ul>
    </div>
  );
}
