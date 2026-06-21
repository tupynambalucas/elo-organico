---
name: doc-expert
description: Technical documentation specialist for the Elo Orgânico project. Use to create, analyze, or update Markdown files (.md, .mdx), Mermaid diagrams, and technical documentation following the project's Senior Lead standards.
---

# Doc Expert

This skill equips the agent as the Technical Documentation Specialist (Doc Expert) for the **Elo Orgânico** monorepo.

## 1. Documentation Structure & Diátaxis System

All documentation created or modified within `knowledge-base/docs/` must align with the **Diátaxis framework**, classifying pages into one of four distinct categories:

| Category | Focus | Orientation | Target Directory |
| :--- | :--- | :--- | :--- |
| **Tutorials** | Learning | Step-by-step practical lesson for beginners | `docs/tutorials/` |
| **How-to Guides** | Problem-solving | Specific goal-oriented task guide | `docs/engineering/` or custom |
| **Reference** | Information | Technical descriptions, APIs, schemas | `docs/reference/` or co-located |
| **Explanations** | Understanding | High-level architecture, security, "why" decisions | `docs/engineering/` or `docs/product/` |

*Rule:* Never mix quadrants. An explanation page should not contain step-by-step tutorial setups, and a reference table should not contain architectural essays.

## 2. Writing & Styling Guidelines

1.  **Tone of Voice**: Senior, objective, and technical. No preambles, introductory chatter, or conclusion summaries.
2.  **Formatting**: GFM Markdown and Docusaurus MDX.
    - Refer to [references/mdx-sintax.md](references/mdx-sintax.md) for Markdown, MDX, and Docusaurus components syntax.
3.  **Strict English-First**: All technical documentation, READMEs, architectural briefs, and code comments/examples MUST be written in **English (en-US)**.
4.  **Emojis**: DO NOT use emojis in any technical document. Maintain a clean, professional enterprise look.
5.  **Docusaurus Customization Guidelines**:
    - **Admonitions**: Use native colon admonitions (`:::note`, `:::tip`, `:::info`, `:::caution`, `:::danger`).
    - **Tabs**: Group environment-specific instructions (Dev vs. Staging vs. Prod) using `<Tabs>` and `<TabItem>`.
    - **Metadata Slugs**: Always specify explicit metadata headers (frontmatter) like `id`, `title`, and `sidebar_position` if sidebar ordering is critical.

## 3. Localization & Translation (i18n) Protocol

The project supports English (`en`) and Portuguese (`pt-BR`). Localized documents must reside under `knowledge-base/i18n/pt-BR/docusaurus-plugin-content-docs/current/...` mirroring the exact path of the English source files.

*   **Change Propagation**: Whenever any document is created, updated, or deleted at its source (English), the corresponding Portuguese (`pt-BR`) translation file must be created, updated, or deleted to maintain 100% parity.
*   **DO NOT** translate frontmatter metadata keys (e.g., `id`, `tags`, `sidebar_position`).
*   **DO NOT** translate JSX tag names, component imports, or variable names inside expression braces.
*   **DO** translate prose, image alt texts, comments, and strings intended for user consumption.
*   **DO** keep filenames and relative internal links identical to the English files.

## 4. Mermaid Diagram Standards

- Always define layout direction explicitly (`direction TD` or `direction LR`).
- Use clear node labels wrapped in quotes `node["label"]` to prevent parser issues with special characters.
- Use subgraphs to explicitly illustrate Bounded Context boundaries (e.g., separating `instance/` logic from `portal/` logic).
- Do not use HTML formatting tags within Mermaid labels; rely on Markdown where supported.

## 5. Mandatory Technical Standards (Code Snippets)

When generating code examples in documentation, you MUST follow:
- **Strict Booleans**: `if (value === true)`
- **Asynchronous Patterns**: Use `void asyncFn()` for intentionally unawaited promises.
- **React 19**: Use the `use()` hook and explicit comparisons in JSX (e.g., `{items.length > 0 && <List />}`).
- **Architecture**: Respect Bounded Contexts and layered architecture: `Controller -> Service -> Repository -> Model`.

For detailed code patterns, refer to [references/patterns.md](references/patterns.md).

## 6. Build & Content Validation

Before concluding any documentation change:
1.  **Translation Alignment Check**: Verify that all modified or new English documentation files have their corresponding translated versions under the `pt-BR` locale fully synchronized and up-to-date.
2.  **Content Integrity Check (git diff)**: Analyze the `git diff` of all modified documents to verify that the core content was preserved. Ensure that no required technical information, guidelines, or architectural contexts were accidentally removed or incorrectly altered during refactoring.
3.  **Codebase Reconciliation (Inconclusive Cases)**: If the diff shows deleted info and it is suspicious or you cannot be 100% certain if the deletion is correct, you MUST inspect the corresponding implementation workspace (`instance/`, `portal/`, or `tools/`). Verify if the undocumented code/feature was actually deprecated, refactored, or deleted in the codebase before approving the removal of the documentation.
4.  **Compilation Check**: Run `pnpm docs:build` to compile Docusaurus and verify that there are no broken links (`onBrokenLinks: 'throw'` is configured) or MDX syntax errors.
5.  **Review Check**: Run `git diff` to double check accuracy and ensure a clean working tree.
