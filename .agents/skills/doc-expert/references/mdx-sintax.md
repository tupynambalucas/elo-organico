# MDX Syntax (Markdown + JSX)

Technical reference for using components, expressions, and logic within `.mdx` files in the **Elo Orgânico** monorepo.

## JSX (Components)

MDX allows the use of React components (HTML or custom) interleaved with Markdown.

```mdx
import MyComponent from '@site/src/components/MyComponent';

# Markdown Heading

<MyComponent title="Example">
  **Markdown** content inside a JSX component.
</MyComponent>

<div className="custom-wrapper">
  Standard HTML is also supported.
</div>
```

## Expressions (Curly Braces `{}`)

JavaScript can be executed inside curly braces, similar to JSX in React.

```mdx
export const year = new Date().getFullYear();

The current year is {year}.

{/* Calculations and Logic */}
Two plus two is {2 + 2}

{/* String Manipulation */}
Hello {"World".toUpperCase()}
```

## Imports (ESM)

Import components, data, or other MDX files. Must be at the top of the file or separated by blank lines.

```mdx
import { Chart } from './components/Chart';
import data from './data.json';
import SharedContent from './shared.mdx';

<Chart data={data} />
<SharedContent />
```

## Exports

Define variables, metadata, or layouts that can be used locally or by whoever imports the file.

```mdx
export const metadata = {
  author: 'Elo Orgânico',
  category: 'Engineering'
};

# Author: {metadata.author}

export const Layout = ({children}) => <div className="docs-layout">{children}</div>;
export default Layout;
```

## Comments

HTML comments (`<!-- -->`) **are not supported** in MDX. Use standard JavaScript comments inside curly braces instead.

```mdx
{/* This is a valid comment in MDX */}

{/* 
  Multi-line
  comment 
*/}
```

## Parsing Rules and Differences

1.  **Markdown inside JSX:** Works if there are blank lines separating the Markdown from the JSX tags in block elements (e.g., `<div>`).
2.  **Special Characters:** Curly braces `{` and less-than signs `<` are interpreted as the start of JSX/Expressions. To display them as text, use escaping: `\{` or `\<`.
3.  **Indentation:** Avoid indenting JSX blocks with 4 spaces or a Tab, as this can trigger Markdown code block formatting.

## Full Example (Elo Orgânico Standard)

```mdx
import { Callout } from '@site/src/components/Callout';

export const status = "Active";

# Technical Documentation

<Callout type="info">
  The current system status is: **{status === "Active" ? "Online" : "Offline"}**.
</Callout>

- [x] GFM supported
- [x] JSX integrated
```
