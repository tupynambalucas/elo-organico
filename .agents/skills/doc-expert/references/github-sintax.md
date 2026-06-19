# GFM Syntax (GitHub Flavored Markdown)

Technical reference for writing and formatting for the **Elo Orgânico** monorepo.

## Headings

```markdown
# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
##### Heading Level 5
###### Heading Level 6
```

## Text Formatting

| Style | Syntax | Example |
| :--- | :--- | :--- |
| **Bold** | `**text**` or `__text__` | `**Bold**` |
| *Italic* | `*text*` or `_text_` | `_Italic_` |
| ~~Strikethrough~~ | `~~text~~` | `~~Strikethrough~~` |
| **_Bold and Italic_** | `**_text_**` | `**_Combined_**` |
| Subscript | `<sub>text</sub>` | `H<sub>2</sub>O` |
| Superscript | `<sup>text</sup>` | `X<sup>2</sup>` |
| Underline | `<ins>text</ins>` | `<ins>Underlined</ins>` |

## Blockquotes

```markdown
> This is a level 1 blockquote.
>> This is a nested level 2 blockquote.
```

## Code

### Inline Code
```markdown
Use `git status` to list modified files.
```

### Fenced Code Blocks
````markdown
```typescript
const elo = "orgânico";
console.log(elo);
```
````

## Colors (Supported in Issues/PRs)

```markdown
The background is `#ffffff` (Hex).
RGB Colors: `rgb(9, 105, 218)`
HSL Colors: `hsl(212, 92%, 45%)`
```

## Links and Anchors

### External and Internal Links
```markdown
[Link Text](https://pages.github.com/)
[Relative Link](docs/CONTRIBUTING.md)
[Link to Anchor](#headings)
```

### Custom Anchors
```markdown
<a name="my-anchor"></a>
[Go to anchor](#my-anchor)
```

## Images

```markdown
![Alt Text](https://link-to-image.png)
![Relative Image](/assets/images/logo.png)
```

## Lists

### Unordered Lists
```markdown
- Item A
- Item B
  - Sub-item B1
```

### Ordered Lists
```markdown
1. First item
2. Second item
```

### Task Lists (Checklists)
```markdown
- [x] Completed task
- [ ] Pending task
```

## Admonitions (Alerts)

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

## Mentions and References

```markdown
Mention user: @username
Mention team: @org/team-name
Reference Issue/PR: #123
```

## Emojis

```markdown
:+1: :shipit: :tada: :rocket:
```

## Footnotes

```markdown
Here is a footnote[^1].

[^1]: Footnote reference content.
```

## Comments and Escaping

### Hide content
```markdown
<!-- This content will not be rendered -->
```

### Escaping Markdown Characters
```markdown
\*This text will not be italic\*
```

## Line Breaks

To force a line break in `.md` files:
- Use two spaces at the end of the line.  
- Use a backslash `\` at the end of the line.
- Use the `<br/>` tag.
