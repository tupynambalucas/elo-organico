---
name: docusaurus-kb-expert
description: Use this skill to create, analyze, or update documentation, configurations, or components within the Docusaurus docs/ workspace.
---

# Docusaurus Knowledge Base Expert

This skill defines the standards, structure, design patterns, and validation workflow for technical documentation in the **Elo Orgânico** Docusaurus Docs Hub (`docs/`).

## 1. Global Documentation Standards

The following rules apply to all documentation tasks, regardless of file extension or location.

### A. Tone of Voice

- Maintain a senior, objective, and technical tone.
- Avoid preambles, introductory chatter, or conclusion summaries.
- Keep sentences concise, clear, and direct.

### B. Strict English-First

- All technical documentation, READMEs, architectural briefs, and code comments/examples MUST be written in English (en-US).

### C. Zero Emojis

- Emojis are strictly forbidden in all technical documents, READMEs, and skill files to maintain a professional, corporate appearance.

### D. Mermaid Diagram Standards

- Always define layout direction explicitly (e.g., `direction TD` or `direction LR`).
- Use clear node labels wrapped in double quotes (e.g., `node["label"]`) to prevent parser issues with special characters.
- Use subgraphs to explicitly illustrate Bounded Context boundaries (e.g., separating `instance/` logic from `portal/` logic).
- Do not use HTML formatting tags within Mermaid labels; rely on plain Markdown where supported.

### E. Zero Placeholders

- Never include empty sections, "TBD", or "TODO" notes in documentation. If a section is not yet ready, omit it completely.

### F. Prettier Formatting Standards

- All files must comply with the Prettier formatting rules defined in [.prettierrc.json](../../../.prettierrc.json) (2-space indentation, max 100-character line width, hyphen-based unordered lists, exactly one blank line after the opening and before the closing `<TabItem>` tags to prevent formatting drift, and proper JavaScript/TypeScript code block styling).

---

## 2. Document Guidelines

Use these guidelines when creating, updating, or analyzing documents within the `docs/` workspace.

- **Structure**: Align with the Diátaxis framework (Tutorials, How-to Guides, Reference, Explanation). Never mix quadrants in a single page.
- **Docusaurus Admonitions**: Use native colon admonitions with strict title bracket format (`:::note[Title]`, `:::tip[Title]`, `:::info[Title]`, `:::caution[Title]`, `:::danger[Title]`) instead of GFM blockquote alerts.
- **Interactive Elements**: Use `@theme/Tabs` and `@theme/TabItem` to group environment-specific or system-specific instructions.
- **i18n Translation Protocol**:
  - When creating or modifying an English document, you must also synchronize its Portuguese (pt-BR) translation under the correct plugin directory in `docs/i18n/pt-BR/` mirroring the exact path of the English source file:
    - Files under `docs/handbook/` -> `docs/i18n/pt-BR/docusaurus-plugin-content-docs/current/...`
    - Files under `docs/roadmap/` -> `docs/i18n/pt-BR/docusaurus-plugin-content-docs-roadmap/current/...`
    - Files under `docs/workspaces/` -> `docs/i18n/pt-BR/docusaurus-plugin-content-docs-workspaces/current/...`
  - Do not translate frontmatter keys, component names, or imports.
- **Reference Files**:
  - MDX and Docusaurus components syntax: [references/syntax.md](references/syntax.md)
  - Strict coding standards for KB code snippets: [references/patterns.md](references/patterns.md)
  - Build, translation, and verification workflow: [references/workflow.md](references/workflow.md)

---

## 3. Build and Content Validation Workflow

Before completing any documentation task, you must execute the verification steps defined in the workflow guide:

- Follow the compilation and translation validation steps in [references/workflow.md](references/workflow.md).
