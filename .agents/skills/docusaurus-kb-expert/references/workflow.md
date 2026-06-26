# Docs Hub Documentation Workflow

This reference defines the compilation, localization, and alignment validation protocols for the Docusaurus Docs Hub.

## 1. i18n Translation Protocol

- **Parity Check**: For every modified or new English document under the docs hub, ensure the corresponding Portuguese (pt-BR) file under the correct plugin directory in `docs/i18n/pt-BR/` is updated or created to maintain 100% parity:
  - Files under `docs/handbook/` -> `docs/i18n/pt-BR/docusaurus-plugin-content-docs/current/...`
  - Files under `docs/roadmap/` -> `docs/i18n/pt-BR/docusaurus-plugin-content-docs-roadmap/current/...`
  - Files under `docs/workspaces/` -> `docs/i18n/pt-BR/docusaurus-plugin-content-docs-workspaces/current/...`
- **Unescaped Elements**: Ensure frontmatter keys, JSX tags, and variable expressions inside translations are left untranslated.

## 2. Compilation and Link Checking

- **Build Check**: Run `pnpm docs:build` in the workspace root to compile the Docusaurus site.
- **Dev Server Shutdown**: If the dev server is active, [build.ts](file:///D:/projects/elo-organico/docs/scripts/build.ts) will log a warning and skip the production build. In this case, you MUST shut down the dev server. Since Docusaurus lacks a native command to stop the dev server, run `pnpm docs:down` to terminate the process on port 3002. Once stopped, retry `pnpm docs:build`.
- **Broken Link Check**: Ensure Docusaurus does not throw any broken link or MDX parsing errors (since `onBrokenLinks: 'throw'` is configured).
- **Dev Server Auto-Start**: Regardless of whether the dev server was active before, you MUST run `pnpm docs:dev` after performing documentation changes to start/restart the dev server.

## 3. Context Verification

- **Codebase Check**: If updating documentation that removes a deprecated feature, check the corresponding implementation directories (instance/, portal/, or tools/) to verify that the target feature was indeed refactored or removed before deleting it from the docs.

## 4. Formatting and Prettier Check

- **Prettier Validation**: Ensure all edited or created MDX/Markdown files comply with the project Prettier config by running `pnpm exec prettier --check <file>`. If there are issues, format them with `pnpm exec prettier --write <file>`.
