# Elo Orgânico Knowledge Base

This is the central documentation hub for the **Elo Orgânico** project, built with Docusaurus.

## Structure

- `docs/`: Core project documentation (Architecture, Master Plan, Product Vision, etc.).
- `src/pages/`: Custom landing pages for workspace contexts (Studio, Tools).
- `releases/`: Project Changelog and release notes.

## Local Development

From the project root:

```bash
pnpm docs:dev     # Start in English (default)
pnpm docs:dev:pt  # Start in Brazilian Portuguese (pt-BR)
```

Or within this directory:

```bash
pnpm start     # Start in English
pnpm start:pt  # Start in Brazilian Portuguese (pt-BR)
```

## Build

```bash
pnpm build
```

The static site will be generated in the `build/` directory.

## Deployment

The documentation is automatically deployed to **GitHub Pages** via GitHub Actions whenever changes are pushed to the `main` branch.

- **Workflow:** `.github/workflows/deploy-docs.yml`
- **URL:** [https://tupynambalucas.github.io/elo-organico](https://tupynambalucas.github.io/elo-organico)

---
_Professional documentation for a sustainable organic economy._
