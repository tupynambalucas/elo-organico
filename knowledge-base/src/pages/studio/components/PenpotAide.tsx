import React from 'react';

export default function PenpotAide() {
  return (
    <div>
      <h3>Self-Hosted Design Engineering</h3>
      <p>Elo Orgânico utilizes a distributed Penpot stack integrated with Aide, an AI-native engineering assistant. This configuration ensures absolute data sovereignty and automated synchronization between design layers and the codebase.</p>

      <h4>Infrastructure Architecture</h4>
      <p>The environment is orchestrated via a multi-container Docker stack, utilizing cloud-based backends for durability.</p>
      <ul>
        <li><strong>Orchestration:</strong> Managed via <code>studio/penpot/compose.yaml</code> (Frontend, Backend, Exporter, Valkey).</li>
        <li><strong>Database Layer:</strong> PostgreSQL persistence hosted on Neon.tech for serverless transactional integrity.</li>
        <li><strong>Object Storage:</strong> Binary assets are persisted in S3-compatible buckets (Backblaze B2 or Filebase), ensuring a minimal Git footprint.</li>
      </ul>

      <h4>Aide: AI-Native Integration</h4>
      <p>Aide functions as a Model Context Protocol (MCP) bridge, enabling AI agents to interact directly with the Penpot Plugin API for advanced queries and layout transformations.</p>
      
      <h5>Aide Bridge Logic</h5>
      <ul>
        <li><strong>Protocol:</strong> Bidirectional WebSocket communication between the <code>@penpot/mcp</code> server and the Penpot environment.</li>
        <li><strong>Security:</strong> Aide operates within the <code>penpot-net</code> isolated network, providing a controlled gateway for design manipulation.</li>
        <li><strong>Connectivity:</strong> Uses Port 4402 for real-time design audits and synchronization.</li>
      </ul>

      <h5>Operational Scripts</h5>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Technical Responsibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>pnpm penpot:up</code></td>
            <td>Initializes core design services at <code>http://localhost:9005</code>.</td>
          </tr>
          <tr>
            <td><code>pnpm penpot:update</code></td>
            <td>Pulls latest service images and performs a rolling restart.</td>
          </tr>
          <tr>
            <td><code>pnpm aide:up</code></td>
            <td>Activates the Aide bridge (Penpot MCP) for AI design manipulation.</td>
          </tr>
          <tr>
            <td><code>pnpm aide:down</code></td>
            <td>Deactivates the automation bridge.</td>
          </tr>
        </tbody>
      </table>

      <h5>Mandatory AI Manipulation Rules</h5>
      <ul>
        <li><strong>Component Reuse:</strong> Always check the existing component library (Penpot) or the UI library (<code>instance/apps/web/src/components</code>) before creating new elements. Aide must prioritize existing design system tokens and components.</li>
        <li><strong>Token-First Logic:</strong> Design-to-code exports must strictly utilize CSS Custom Properties derived from <code>src/tokens/</code> for colors, fonts, and spacing.</li>
        <li><strong>SVG Optimization:</strong> Ensure exported SVG code is optimized, follows the project's icon standards, and is integrated via the <code>@elo-organico/studio/icons</code> registry.</li>
        <li><strong>Layer Hierarchy:</strong> Maintenance of semantic grouping is mandatory. Elements must be organized into clear pages and frames (e.g., <code>Layout/Grid</code>, <code>Components/Buttons</code>).</li>
      </ul>
    </div>
  );
}
