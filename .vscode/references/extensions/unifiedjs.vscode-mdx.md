Settings
ID Description Default
mdx.server.enable

Enable experimental IntelliSense support for MDX files.

true
mdx.trace.server.format

How to format traced MDX language server requests.

"text"
mdx.trace.server.verbosity

Trace MDX language server requests in the output console.

"off"
mdx.validate.ignoreLinks

Glob of links that should not be validated.

[]
mdx.validate.validateDuplicateLinkDefinitions

Diagnostic level for duplicate link definitions.

"ignore"
mdx.validate.validateFileLinks

Diagnostic level for links to local files that don’t exist, e.g. [text](./no-such-file.png).

"ignore"
mdx.validate.validateFragmentLinks

Diagnostic level for fragments links to headers in the current file that don’t exist, e.g. [text](#no-such-header).

"ignore"
mdx.validate.validateMarkdownFileLinkFragments

Diagnostic level for the fragment part of links to other local markdown files , e.g. [text](./file.md#no-such-header).

"ignore"
mdx.validate.validateReferences

Diagnostic level for invalid reference links, e.g. [text][no-such-ref].

"ignore"
mdx.validate.validateUnusedLinkDefinitions

Diagnostic level for link definitions that aren’t used anywhere. [never-used]: http://example.com.

"ignore"
