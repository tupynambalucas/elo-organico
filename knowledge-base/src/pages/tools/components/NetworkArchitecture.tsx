import React from 'react';

export default function NetworkArchitecture() {
  return (
    <div>
      <h3>Isolated Infrastructure Architecture</h3>
      <p>Security is maintained through a zero-trust network model for AI agents. Automation tools operate within an isolated Docker environment (<code>elo-mcp-net</code>), preventing lateral movement within the host infrastructure.</p>

      <h4>Network Topology & Connectivity</h4>
      <ul>
        <li><strong>Private Bridge:</strong> All MCP services communicate over a dedicated bridge network. This network is air-gapped from the host's primary interfaces, requiring explicit port mapping for any external access.</li>
        <li><strong>Cross-Boundary Communication:</strong>
          <ul>
            <li><strong>Host-to-Container:</strong> Local development servers (Vite, Docusaurus) are accessed via <code>http://host.docker.internal:[PORT]</code>.</li>
            <li><strong>Binding Requirements:</strong> To accept connections from the isolated network, host-side services <strong>must</strong> bind to <code>0.0.0.0</code> (e.g., <code>docusaurus start --host 0.0.0.0</code>).</li>
          </ul>
        </li>
        <li><strong>Resource Security:</strong> Multi-stage Dockerfiles ensure that only the required runtime binaries are included in the final images, significantly reducing the attack surface.</li>
      </ul>
    </div>
  );
}
