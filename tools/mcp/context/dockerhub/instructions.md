# Docker Hub MCP Instructions - Elo Orgânico

This file outlines the guidelines for image registry inspection and container repository verification in the Elo Orgânico monorepo.

## Registry Operations

- Image Validation: Prioritize verification of upstream base image tags (e.g. node:20-alpine, alpine:3.18) to ensure build compatibility.
- Container Scanning: Use repository queries to check active container versions and verify that monorepo configuration files align with registry builds.
