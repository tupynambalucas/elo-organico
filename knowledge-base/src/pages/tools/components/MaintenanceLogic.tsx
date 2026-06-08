import React from 'react';

export default function MaintenanceLogic() {
  return (
    <div>
      <h3>Operational Logic and Maintenance</h3>
      <p>Standardized commands are provided for maintaining the automation layer and verifying workspace health across the monorepo.</p>

      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Engineering Responsibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>pnpm typecheck</code></td>
            <td>Validates TypeScript integrity across scripts and MCP source code.</td>
          </tr>
          <tr>
            <td><code>pnpm build</code></td>
            <td>Full production build including MCP servers and automation tools.</td>
          </tr>
          <tr>
            <td><code>pnpm clean</code></td>
            <td>Aggressive workspace maintenance using <code>npkill</code> to prune legacy dependencies.</td>
          </tr>
        </tbody>
      </table>

      <h4>Workspace Structure</h4>
      <ul>
        <li><code>src/mcp/</code>: Source logic for custom context providers.</li>
        <li><code>mcp/infrastructure/</code>: Docker/Runtime configurations for the AI network.</li>
        <li><code>mcp/config/</code>: Environment-specific secrets and orchestration variables (<code>.env</code> files).</li>
      </ul>
    </div>
  );
}
