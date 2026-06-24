# unifiedjs.vscode-mdx

## Settings

### `mdx.server.enable`

- **Default**: `true`

Enable experimental IntelliSense support for MDX files.

### `mdx.trace.server.format`

- **Default**: `"text"`

How to format traced MDX language server requests.

### `mdx.trace.server.verbosity`

- **Default**: `"off"`

Trace MDX language server requests in the output console.

### `mdx.validate.ignoreLinks`

- **Default**: `[]`

Glob of links that should not be validated.

### `mdx.validate.validateDuplicateLinkDefinitions`

- **Default**: `"ignore"`

Diagnostic level for duplicate link definitions.

### `mdx.validate.validateFileLinks`

- **Default**: `"ignore"`

Diagnostic level for links to local files that don’t exist, e.g. [text](./no-such-file.png).

### `mdx.validate.validateFragmentLinks`

- **Default**: `"ignore"`

Diagnostic level for fragments links to headers in the current file that don’t exist, e.g. [text](#no-such-header).

### `mdx.validate.validateMarkdownFileLinkFragments`

- **Default**: `"ignore"`

Diagnostic level for the fragment part of links to other local markdown files , e.g. [text](./file.md#no-such-header).

### `mdx.validate.validateReferences`

- **Default**: `"ignore"`

Diagnostic level for invalid reference links, e.g. [text][no-such-ref].

### `mdx.validate.validateUnusedLinkDefinitions`

- **Default**: `"ignore"`

Diagnostic level for link definitions that aren’t used anywhere. [never-used]: http://example.com.
