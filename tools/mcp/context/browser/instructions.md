# Browser MCP Instructions - Elo Orgânico

This file defines browser automation guidelines and local network routing policies for the Elo Orgânico project.

## Local Routing Guidelines

The browser MCP server runs containerized in a Debian environment. It cannot access localhost of the host machine directly.
- Redirects: Automatically rewrite destination URLs pointing to localhost or 127.0.0.1 (e.g. localhost:5173, localhost:3002) to host.docker.internal to route requests correctly from the container bridge to the host machine.
- Testing local servers: Use host.docker.internal:5173 for local React instances and host.docker.internal:3002 for local Docusaurus docs.

## Automation & Selection

- Wait for state: Always use browser_wait_for to wait for specific page selectors or network idle states before executing clicks or filling forms.
- Captures: Leverage screenshot capabilities when debugging layout rendering or verifying visual test completions.
