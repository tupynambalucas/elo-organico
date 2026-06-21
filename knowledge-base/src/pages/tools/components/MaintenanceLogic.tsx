import React from 'react';

export default function MaintenanceLogic() {
  return (
    <div>
      <h3>Operational Logic and Maintenance</h3>
      <p>
        Standardized commands are provided for maintaining the automation layer and verifying
        workspace health across the monorepo.
      </p>

      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Engineering Responsibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pnpm typecheck</code>
            </td>
            <td>Validates TypeScript integrity across scripts and MCP source code.</td>
          </tr>
          <tr>
            <td>
              <code>pnpm build</code>
            </td>
            <td>Full production build including MCP servers and automation tools.</td>
          </tr>
          <tr>
            <td>
              <code>pnpm clean</code>
            </td>
            <td>
              Aggressive workspace maintenance using <code>npkill</code> to prune legacy
              dependencies.
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Workspace Orchestration</h4>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Engineering Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pnpm mcp:up</code>
            </td>
            <td>Launches the entire Dockerized gateway and backend MCP stack.</td>
          </tr>
          <tr>
            <td>
              <code>pnpm mcp:down</code>
            </td>
            <td>Tears down the gateway and MCP container environment.</td>
          </tr>
          <tr>
            <td>
              <code>pnpm mcp:reset</code>
            </td>
            <td>Aggressive stack wipe (volumes removed) followed by full container rebuild.</td>
          </tr>
          <tr>
            <td>
              <code>pnpm mcp:[service]:up</code>
            </td>
            <td>Starts or rebuilds a single container (e.g. <code>github</code>).</td>
          </tr>
          <tr>
            <td>
              <code>pnpm mcp:[service]:down</code>
            </td>
            <td>Stops a single container (e.g. <code>github</code>).</td>
          </tr>
        </tbody>
      </table>

      <h4>Workspace Structure</h4>
      <ul>
        <li>
          <code>tools/mcp/compose.yaml</code>: Defines the container services, dependencies, volumes, and bridge networks.
        </li>
        <li>
          <code>tools/mcp/gateway/</code>: Contains the Fastify v5 HTTP proxy router server (<code>server.ts</code> and its Dockerfile).
        </li>
        <li>
          <code>tools/mcp/infrastructure/</code>: Holds individual multi-stage Dockerfiles and the zero-dependency <code>sse-adapter.ts</code> wrapper.
        </li>
        <li>
          <code>tools/mcp/config/</code>: Manages context-specific environments and secret configurations (e.g., <code>.env.*.example</code> files).
        </li>
      </ul>
    </div>
  );
}

