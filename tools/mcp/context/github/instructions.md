# GitHub MCP Instructions - Elo Orgânico

This file provides the necessary context for version control and repository management within the Elo Orgânico monorepo.

## Project Structure

Refer to the Architecture Overview for the detailed monorepo organization and package responsibilities.

## Development Conventions

- Commits: Follow the Conventional Commits standard.
- Branching Strategy:
  - New features: feature/feature-name
  - Bug fixes: fix/bug-name
  - Documentation: docs/doc-name
- Pull Requests: Always include a summary of changes and reference the corresponding task or issue.

## Workflow Principles

### Domain Core First
Any change affecting data models or shared schemas must originate in the respective core package (@elo-instance/core or @elo-portal/core) before being propagated to the associated applications.

### Automated Verification
Before merging, ensure that eslint checks and typescript compilation pass successfully across the workspace.
