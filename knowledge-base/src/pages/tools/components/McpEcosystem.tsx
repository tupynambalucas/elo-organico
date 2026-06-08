import React from 'react';

export default function McpEcosystem() {
  return (
    <div>
      <h3>Model Context Protocol Infrastructure</h3>
      <p>The project leverages a network of specialized MCP servers. These servers act as structured context providers, allowing AI agents (such as Gemini CLI or Aide) to interact safely and accurately with the project's data layers, external documentation, and infrastructure APIs.</p>

      <h4>Integrated Context Servers</h4>
      <ul>
        <li><strong>GitHub MCP:</strong> Handles advanced repository orchestration. It automates branch lifecycle management, commit cycles (adhering to Conventional Commits), and deep Pull Request analysis.
          <ul>
            <li><em>Capabilities:</em> File creation/update, PR reviews, issue management, and code search.</li>
          </ul>
        </li>
        <li><strong>Context7 MCP:</strong> A high-performance research bridge. It ensures that AI-generated code aligns with the latest specifications of Fastify v5, React 19, and Three.js by querying up-to-date library documentation.
          <ul>
            <li><em>Capabilities:</em> Real-time documentation fetching, package resolution, and implementation pattern discovery.</li>
          </ul>
        </li>
        <li><strong>Browser MCP (Playwright):</strong> Provides visual and runtime context. It enables automated visual regression testing, UI analysis, and web scraping within the containerized network.
          <ul>
            <li><em>Capabilities:</em> Viewport screenshots, accessibility snapshots, and network request monitoring.</li>
          </ul>
        </li>
        <li><strong>Docker Hub MCP:</strong> Manages container image discovery and synchronization, ensuring infrastructure consistency across all environments.
          <ul>
            <li><em>Capabilities:</em> Image search, repository management, and tag verification.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
