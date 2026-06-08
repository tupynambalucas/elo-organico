# 🤖 @elo-organico/tools - Project Automation & Infrastructure

This workspace houses the infrastructure for project automation, specialized scripts, and **Model Context Protocol (MCP)** servers. It serves as the technical backbone for our AI-native engineering workflow.

## 🏗️ Structure

- `src/mcp/`: Source code and Docker configurations for MCP servers.
  - `github/`: Repository management automation.
  - `context7/`: Technical documentation and research bridge.
  - `dockerhub/`: Infrastructure orchestration.
- `tools/mcp/`: Orchestration for the isolated AI network (Docker Compose).
- `tools/scripts/`: Maintenance and utility scripts.

## 📖 Detailed Documentation

Technical documentation is centralized in our **[Knowledge Base](https://tupynambalucas.github.io/elo-organico)**:

- **[Tools Workspace Overview](https://tupynambalucas.github.io/elo-organico/tools)**: AI automation infrastructure and guidelines.
- **[MCP Ecosystem](https://tupynambalucas.github.io/elo-organico/tools)**: Model Context Protocol infrastructure and integrated servers.
- **[AI Security & Network](https://tupynambalucas.github.io/elo-organico/tools)**: Isolated network architecture and zero-trust model.
- **[Engineering Guidelines](https://tupynambalucas.github.io/elo-organico/docs/engineering/styleguide)**: Rules of engagement for AI agents and maintainers.

---

## 🛠️ Operations

- **`pnpm typecheck`**: Validates TypeScript integrity across scripts and MCP source code.
- **`pnpm project:clean`**: Aggressive workspace maintenance using `npkill`.

---
_Part of the Elo Orgânico Monorepo._
