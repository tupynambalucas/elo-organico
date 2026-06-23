---
name: skill-creator
description: Skill Creator for the Elo Orgânico project. Use when requested to create, refine, analyze, or update custom Agent Skills (.agents/skills/*) within this workspace.
---

# Skill Creator Guidelines

This skill defines the standards, structure, design patterns, and validation workflow for custom Agent Skills in the **Elo Orgânico** monorepo.

## 1. Skill Directory Structure

Every custom skill MUST reside in the `.agents/skills/<skill-name>/` directory and adhere to the following structure:

```
.agents/skills/<skill-name>/
├── SKILL.md                 # Required: Frontmatter metadata + core instructions (under 500 lines)
├── scripts/                 # Optional: Executable automation scripts (non-interactive, PEP 723, etc.)
├── references/              # Optional: Deep reference files (Plain GFM Markdown ONLY, no .mdx)
└── assets/                  # Optional: Templates, static schemas, or configuration assets
```

---

## 2. SKILL.md Specification

The `SKILL.md` file is the entry point for the skill. It MUST contain YAML frontmatter and a structured body.

### A. Frontmatter Configuration
- **`name`**: The exact directory name in `kebab-case`.
- **`description`**: Imperative phrasing detailing when the skill triggers ("Use this skill when..."). Focus on user intent, not internal mechanics. Max 1024 characters.

Example:
```yaml
---
name: database-helper
description: Use this skill when the user wants to execute database migrations, seed data, or query schema structures for MongoDB.
---
```

### B. Instruction Body Constraints
- **Conciseness & progressive disclosure**: Keep `SKILL.md` under 500 lines (5,000 tokens). Move detailed APIs, schemas, or large tables to plain Markdown files in `references/`.
- **Strict English (en-US)**: The entire document (including code block comments and definitions) MUST be in English.
- **Zero Emojis**: Emojis are strictly forbidden to maintain a professional, corporate appearance.
- **GFM Callouts**: Use GitHub Flavored Markdown blockquote alerts for callouts:
  ```markdown
  > [!NOTE]
  > Useful information that the user should know.

  > [!TIP]
  > Helpful advice for doing things better.

  > [!IMPORTANT]
  > Crucial information to achieve the objective.

  > [!WARNING]
  > Urgent information requiring immediate attention.

  > [!CAUTION]
  > Alert about risks or negative consequences.
  ```

---

## 3. Reference Files Guidelines

- All files in the `references/` directory MUST use the `.md` extension.
- **No MDX or JSX**: Custom Docusaurus components (e.g. `<Note>`, `<Tip>`, `<Tabs>`) are forbidden.
- Use plain Markdown headings (`### Option 1: uvx`) instead of multi-tabs components.
- Relative links inside reference files must use the `.md` extension.

---

## 4. Elo Orgânico Engineering Guardrails

When creating code examples, templates, or scripts inside a skill, you MUST strictly adhere to the project's non-negotiable coding conventions:

### A. TypeScript Guardrails (Strict Mode)
- **Strict Booleans**: Expressions must be explicit. Use `if (value === true)` or `if (value !== undefined)`, never `if (value)`.
- **No Floating Promises**: Use the `void` operator for intentional unawaited async calls: `void asyncFn()`.
- **Type Imports**: Always use `import type` for types, separated from value imports.
- **Forbidden Types**: Never use `any`. Use specific interfaces or types.

### B. Architecture Guardrails
- **Bounded Context Isolation**: Never cross-import packages or modules between `instance/` and `portal/`. 
- **Layered Backend**: Respect the layered structure: `Controller -> Service -> Repository -> Model`.
- **React 19 Standards**: In JSX, always use explicit comparisons: `{isValid === true && <Component />}`. Use the `use()` hook for promises and context.
- **CSS Modules & Fluid Design**: Use `.module.css`. Fixed pixels (`px`) are forbidden (except for `1px` borders). Spacing, typography, and sizing must use relative units (`rem`, `clamp()`, `vw/vh`).

---

## 5. Script Design Patterns

If a skill includes scripts in the `scripts/` directory:
- **No Interactive Prompts**: Shell execution must be completely non-interactive. Accept all parameters via CLI flags, environment variables, or stdin.
- **Inline Dependencies**: For Python scripts, use [PEP 723](https://peps.python.org/pep-0723/) inline script metadata and execute using `uv run`. For TypeScript, use Deno or Bun with inline import specifiers.
- **Composability**: Output structured data (JSON, CSV) to `stdout` and diagnostic details to `stderr` so they can be parsed by subsequent tools.

---

## 6. Verification and Creation Workflow

Follow this workflow when generating or modifying custom skills:

1. **Research Project Context**: Read `knowledge-base/docs/engineering/styleguide.mdx` and `architecture.mdx` to align skill logic with project directories.
2. **Write SKILL.md**: Draft the metadata and instructions following the 500-line limit, English rule, and GFM syntax.
3. **Write Supporting References**: Document advanced steps inside `references/*.md` using plain Markdown.
4. **Draft Automation Scripts**: If the agent needs to run commands, bundle them into non-interactive scripts inside `scripts/`.
5. **Run Self-Checks**:
   - Verify that there are zero emojis in any skill file.
   - Run `git status` to ensure all files are correctly placed under `.agents/skills/<skill-name>/`.
   - Verify that there are no `.mdx` files under `references/`.
