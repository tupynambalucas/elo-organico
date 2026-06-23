---
name: doc-expert
description: Use this skill when the user wants to create, analyze, or update Markdown files (.md) such as READMEs or skill files, or MDX documents (.mdx) in the knowledge base, following the project's Senior Lead standards.
---

# Doc Expert

This skill defines the standards, structure, design patterns, and validation workflow for technical documentation in the **Elo Orgânico** monorepo.

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

---

## 2. Document Types and Use Cases

Follow the specific guidelines and refer to the designated references folder based on the document type being managed.

### Use Case A: Project Markdown Files (.md, README.md, Skill Files)

Use these guidelines when creating, updating, or analyzing general repository documentation, package READMEs, or files under the `.agents/` folder.

- **Syntax Standard**: Must adhere to standard GitHub Flavored Markdown (GFM).
- **GFM Callouts**: Use GFM blockquote alerts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`) for admonitions.
- **Reference Folders**:
  - GFM syntax and formatting: [references/github/syntax.md](references/github/syntax.md)
  - Code examples and GitHub patterns: [references/github/patterns.md](references/github/patterns.md)
  - Validation and verification workflow: [references/github/workflow.md](references/github/workflow.md)

### Use Case B: Knowledge Base Documents (.mdx under knowledge-base/)

Use these guidelines when creating, updating, or analyzing documents within the `knowledge-base/` workspace.

- **Structure**: Align with the Diátaxis framework (Tutorials, How-to Guides, Reference, Explanation). Never mix quadrants in a single page.
- **Docusaurus Admonitions**: Use native colon admonitions (`:::note`, `:::tip`, `:::info`, `:::caution`, `:::danger`) instead of GFM blockquote alerts.
- **Interactive Elements**: Use `@theme/Tabs` and `@theme/TabItem` to group environment-specific or system-specific instructions.
- **i18n Translation Protocol**:
  - When creating or modifying an English document, you must also synchronize its Portuguese (pt-BR) translation under `knowledge-base/i18n/pt-BR/docusaurus-plugin-content-docs/current/...` mirroring the exact path of the English source file.
  - Do not translate frontmatter keys, component names, or imports.
- **Reference Folders**:
  - MDX and Docusaurus components syntax: [references/knowledge-base/syntax.md](references/knowledge-base/syntax.md)
  - Strict coding standards for KB code snippets: [references/knowledge-base/patterns.md](references/knowledge-base/patterns.md)
  - Build, translation, and verification workflow: [references/knowledge-base/workflow.md](references/knowledge-base/workflow.md)

### Use Case C: AI Agent Context Files (AGENTS.md)

Use these guidelines when creating, updating, or analyzing `AGENTS.md` context files across monorepo workspaces and packages.

- **Purpose**: Act as local and root routers/guardrail lists to provide high-fidelity context for AI agents without cluttering developer-facing READMEs.
- **Reference Folders**:
  - AI Agent syntax and path reference: [references/agents/syntax.md](references/agents/syntax.md)
  - Root, core, api, and web layouts: [references/agents/patterns.md](references/agents/patterns.md)
  - Verification, emoji auditing, and rule alignment: [references/agents/workflow.md](references/agents/workflow.md)

---

## 3. Build and Content Validation Workflow

Before completing any documentation task, you must execute the verification steps defined in the respective workflow guide:

- **For general Markdown (.md)**: Follow the validation steps in [references/github/workflow.md](references/github/workflow.md).
- **For Docusaurus MDX (.mdx)**: Follow the compilation and translation validation steps in [references/knowledge-base/workflow.md](references/knowledge-base/workflow.md).
- **For AI Agent Contexts (AGENTS.md)**: Follow the verification and audit steps in [references/agents/workflow.md](references/agents/workflow.md).
