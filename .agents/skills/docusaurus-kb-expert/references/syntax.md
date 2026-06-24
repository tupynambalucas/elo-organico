# MDX & Docusaurus Syntax Reference

This reference outlines MDX syntax standards and native Docusaurus v3 features used in the **Elo Orgânico** monorepo.

---

## 1. Docusaurus Admonitions (Alerts)

Instead of generic GitHub flavored markdown quote alerts (`> [!NOTE]`), Docusaurus uses a dedicated triple-colon syntax (`:::`) to render stylized banners.

Supported types: `note`, `tip`, `info`, `caution`, `danger` (or `warning`).

```markdown
:::note
Here is some standard note content.
:::

:::tip[Custom Title]
You can define a custom title for the admonition by adding it in brackets next to the type.
:::

:::danger[Critical Warning]
Use danger admonitions sparingly for production risks or potential data loss.
:::
```

---

## 2. Interactive Multi-Tabs

Use the native `@theme/Tabs` and `@theme/TabItem` components for comparing instructions, scripts, or configurations.

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="dev" label="Development" default>

Development configurations or commands.

</TabItem>
<TabItem value="staging" label="Staging">

Staging configurations or commands.

</TabItem>
<TabItem value="prod" label="Production">

Production configurations or commands.

</TabItem>
</Tabs>
```

> [!IMPORTANT]
> If a `<TabItem>` contains any Markdown formatting (such as lists, bold text, code blocks, or links), you **MUST** insert an empty line immediately after the opening `<TabItem ...>` tag and another empty line immediately before the closing `</TabItem>` tag. Without these empty lines, the MDX parser will fail to render the Markdown elements correctly, resulting in unformatted single-line text output.
> Additionally, **do not indent** the `<Tabs>` or `<TabItem>` tags, nor the Markdown list elements inside them. Keep them aligned to the left margin (0 spaces indentation) to avoid parser context loss and tag mismatch errors.

---

## 3. Code Block Highlights & Metadata

### A. Title/Filename Headers

To display a filename or title above a code block, use the `title="..."` key in the code block definition:

```typescript title="packages/core/src/types/index.ts"
export type BoundedContext = 'instance' | 'portal';
```

### B. Line Highlighting

To highlight specific lines within a code block, use curly braces `{...}` specifying 1-indexed lines or line ranges:

```typescript title="api/src/server.ts" {2,5-7}
import fastify from 'fastify';
const app = fastify(); // Highlighted

// Lines 5, 6, and 7 will be highlighted:
app.get('/health', async () => {
  return { status: 'ok' };
});
```

### C. Inline Comments Highlighting

You can also use inline comments within the code block to highlight lines automatically:

```typescript
// highlight-next-line
const secret = process.env.API_SECRET;

// highlight-start
const config = {
  port: 3000,
};
// highlight-end
```

---

## 4. JSX Elements and MDX Parsing Rules

MDX blends markdown with standard JSX. Keep the following parsing rules in mind to avoid compilation failures:

### A. Markdown inside JSX block tags

To write standard Markdown within block elements (such as `<div>` or `<section>`), separate the markdown content with blank lines:

```mdx
<div className="custom-box">

**This is bold markdown** inside a HTML div tag.

</div>
```

### B. Escaping Special Characters

Characters like `{` and `<` trigger the MDX parser for expressions or JSX. To display them as literal text, they must be escaped:

- Escape curly braces: `\{` and `\}`
- Escape less-than signs: `\<`

### C. Comments

Standard HTML comments (`<!-- -->`) are **not** valid in MDX. Use JavaScript comment syntax inside curly braces:

```mdx
{/* This is a single or multi-line comment in MDX */}
```
