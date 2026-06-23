# Knowledge Base Documentation Workflow

This reference defines the compilation, localization, and alignment validation protocols for the Docusaurus Knowledge Base.

## 1. i18n Translation Protocol
- **Parity Check**: For every modified or new English document under `knowledge-base/docs/`, ensure the corresponding Portuguese (pt-BR) file under `knowledge-base/i18n/pt-BR/docusaurus-plugin-content-docs/current/...` is updated or created to maintain 100% parity.
- **Unescaped Elements**: Ensure frontmatter keys, JSX tags, and variable expressions inside translations are left untranslated.

## 2. Compilation and Link Checking
- **Build Check**: Run `pnpm docs:build` in the workspace root to compile the Docusaurus site.
- **Broken Link Check**: Ensure Docusaurus does not throw any broken link or MDX parsing errors (since `onBrokenLinks: 'throw'` is configured).

## 3. Context Verification
- **Codebase Check**: If updating documentation that removes a deprecated feature, check the corresponding implementation directories (instance/, portal/, or tools/) to verify that the target feature was indeed refactored or removed before deleting it from the docs.
