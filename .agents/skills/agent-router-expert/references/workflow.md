# AI Agents Context Validation Workflow

This reference defines the verification steps required when creating, updating, or correcting `AGENTS.md` files across the monorepo.

---

## 1. Context Verification

### A. Directory Depth Check
- Ensure that the local `AGENTS.md` is placed precisely at the workspace root or Bounded Context directory root.
- Validate that all relative links (`[label](./path)`) resolve correctly by checking the path depth (e.g. from `instance/apps/api/AGENTS.md`, the root is reached via `../../../`).

### B. Catalog Alignment
- Verify that `AGENTS.md` files in applications (`apps/api`, `apps/web`) correctly refer to the pnpm Catalogs mapping of dependencies.

---

## 2. Formatting and Rules Check

### A. Zero Emojis
- **Critical Audit**: Check all headings, bullet points, and descriptions for emojis. Emojis are strictly forbidden in `AGENTS.md` files. All headings must use plain text (e.g. `## Bounded Context Navigation` instead of `## 📚 Bounded Context Navigation`).

### B. Zero Placeholders
- Verify that no sections contain "TODO", "TBD", or empty bullet points. If a configuration or stack service is not yet defined, omit the section.

### C. Language Check
- Enforce strict US English (en-US) for all documentation prose, lists, and code examples in the context files.

### D. LLM-Optimized Checklist
- **Relative Links**: Verify that every referenced file, folder, schema, or configuration has a clickable relative markdown link.
- **Phrasing Check**: Verify that instructions use imperative, rule-based constraints ("MUST", "NEVER", "ALWAYS") instead of passive or descriptive phrasing.
- **Redundancy Audit**: Verify that global rules (English-First, Zero Emojis, Zero Placeholders) are NOT duplicated in local sub-workspace `AGENTS.md` files.
- **Snippet Audit**: Verify that the files include copy-pasteable blocks demonstrating patterns rather than just raw descriptions.
