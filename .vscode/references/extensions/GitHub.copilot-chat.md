# GitHub.copilot-chat

## Settings

### `github.copilot.chat.agent.modelDetails.enabled`

- **Default**: `true`

Show model details (model name and request multiplier) on agent chat responses when using Copilot CLI or Claude agent in VS Code. Requires VS Code reload to update already loaded sessions.

### `github.copilot.chat.agent.omitFileAttachmentContents`

- **Default**: `false`

Omit summarized file contents from file attachments in agent mode, to encourage the agent to properly read and explore.

### `github.copilot.chat.agent.temperature`

- **Default**: `0`

Temperature setting for agent mode requests.

### `github.copilot.chat.agentDebugLog.enabled`

- **Default**: `false`

Deprecated: use github.copilot.chat.agentDebugLog.fileLogging.enabled instead.

### `github.copilot.chat.agentDebugLog.fileLogging.enabled`

- **Default**: `false`

Enable agent debug logging: write chat debug events (tool calls, LLM requests, token usage, errors) to JSONL files for the debug panel and troubleshoot skill. Requires window reload to take effect.

### `github.copilot.chat.agentDebugLog.fileLogging.flushIntervalMs`

- **Default**: `4000`

How often (in milliseconds) buffered debug log entries are flushed to disk. Lower values provide more up-to-date logs at the cost of more frequent disk writes.

### `github.copilot.chat.agentDebugLog.fileLogging.maxRetainedSessionLogs`

- **Default**: `50`

Maximum number of chat debug session log directories to retain on disk. Each chat session produces one directory. Older session logs are automatically deleted when this limit is exceeded.

### `github.copilot.chat.agentDebugLog.fileLogging.maxSessionLogSizeMB`

- **Default**: `100`

Maximum size in megabytes for a single chat debug session log file. When the log exceeds this size, older entries are truncated to retain the most recent data. Defaults to 100 MB.

### `github.copilot.chat.agentHistorySummarizationMode`

- **Default**: `""`

Mode for agent history summarization.

### `github.copilot.chat.alternateGeminiModelFPrompt.enabled`

- **Default**: `false`

Enables an experimental alternate prompt for Gemini Model F instead of the default prompt.

### `github.copilot.chat.alternateGptPrompt.enabled`

- **Default**: `false`

Enables an experimental alternate prompt for GPT models instead of the default prompt.

### `github.copilot.chat.anthropic.contextEditing.mode`

- **Default**: `"off"`

Select the context editing mode for Anthropic models. Automatically manages conversation context as it grows, helping optimize costs and stay within context window limits.
off: Context editing is disabled.
clear-thinking: Clears thinking blocks while preserving tool uses.
clear-tooluse: Clears tool uses while preserving thinking blocks.
clear-both: Clears both thinking blocks and tool uses.
Note: This is an experimental feature. Context editing may cause additional cache rewrites. Enable with caution.

### `github.copilot.chat.anthropic.promptCaching.extendedTtl`

- **Default**: `false`

Use the extended (1 hour) prompt cache TTL on tools and system blocks for the Anthropic Messages API. Applied to Claude Opus 4.5/4.6/4.7 and Sonnet 4.5/4.6 variants; other models keep the default 5 minute TTL even when this setting is enabled. **Note**: This is an experimental feature. Only the main agent conversation is eligible — inline chat, terminal chat, notebook chat, and subagent requests are excluded.

### `github.copilot.chat.anthropic.promptCaching.extendedTtlMessages`

- **Default**: `false`

Also extend the 1 hour prompt cache TTL to message-level breakpoints. Requires `chat.anthropic.promptCaching.extendedTtl` to be enabled; has no effect on its own. **Note**: This is an experimental feature.

### `github.copilot.chat.anthropic.tools.websearch.allowedDomains`

- **Default**: `[]`

List of domains to restrict web search results to (e.g., ["example.com", "docs.example.com"]). Domains should not include the HTTP/HTTPS scheme. Subdomains are automatically included. Cannot be used together with #github.copilot.chat.anthropic.tools.websearch.blockedDomains#; configuring both will cause web search requests to fail.

### `github.copilot.chat.anthropic.tools.websearch.blockedDomains`

- **Default**: `[]`

List of domains to exclude from web search results (e.g., ["untrustedsource.com"]). Domains should not include the HTTP/HTTPS scheme. Subdomains are automatically excluded. Cannot be used together with #github.copilot.chat.anthropic.tools.websearch.allowedDomains#; configuring both will cause web search requests to fail.

### `github.copilot.chat.anthropic.tools.websearch.enabled`

- **Default**: `false`

Enable Anthropic's native web search tool for BYOK Claude models. When enabled, allows Claude to search the web for current information.
Note: This is an experimental feature only available for BYOK Anthropic Claude models.

### `github.copilot.chat.anthropic.tools.websearch.maxUses`

- **Default**: `5`

Maximum number of web searches allowed per request. Valid range is 1 to 20. Prevents excessive API calls within a single interaction. If Claude exceeds this limit, the response returns an error.

### `github.copilot.chat.anthropic.tools.websearch.userLocation`

- **Default**: `null`

User location for personalizing web search results based on geographic context. All fields (city, region, country, timezone) are optional. Example: {"city": "San Francisco", "region": "California", "country": "US", "timezone": "America/Los_Angeles"}

### `github.copilot.chat.anthropic.useMessagesApi`

- **Default**: `true`

Use the Messages API instead of the Chat Completions API when supported.

### `github.copilot.chat.askAgent.additionalTools`

- **Default**: `[]`

Additional tools to enable for the Ask agent, on top of built-in read-only tools. Use fully-qualified tool names (e.g., github/issue_read, mcp_server/tool_name).

### `github.copilot.chat.askAgent.model`

- **Default**: `""`

Override the language model used by the Ask agent. Leave empty to use the default model.

### `github.copilot.chat.backgroundAgent.enabled`

- **Default**: `true`

Enable the Copilot CLI. When disabled, the Copilot CLI will not be available in 'Continue In' context menus.

### `github.copilot.chat.claude47OpusPrompt.enabled`

- **Default**: `false`

Enables the updated system prompt tuned for the Claude Opus 4.7 model.

### `github.copilot.chat.claudeAgent.allowAutoPermissions`

- **Default**: `false`

Allow auto permission mode, which uses a model classifier to approve or deny tool operations automatically. Learn more.

### `github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions`

- **Default**: `false`

Allow bypass permissions mode. Recommended only for sandboxes with no internet access.

### `github.copilot.chat.claudeAgent.enabled`

- **Default**: `true`

Enable Claude Agent sessions in VS Code. Start and resume agentic coding sessions powered by Anthropic's Claude Agent SDK directly in the editor. Uses your existing Copilot subscription.

### `github.copilot.chat.claudeAgent.sdkExtensionInstallTimeout`

- **Default**: `120000`

Maximum time in milliseconds to wait for the ms-vscode.vscode-claude-sdk extension to be installed and detected when loading the Claude Agent SDK from the marketplace.

### `github.copilot.chat.claudeAgent.useSdkExtension`

- **Default**: `false`

Load the Claude Agent SDK from the ms-vscode.vscode-claude-sdk extension (installed on demand) instead of the version bundled with Copilot Chat.

### `github.copilot.chat.cli.aiGenerateBranchNames.enabled`

- **Default**: `true`

Enable AI-generated branch names in Copilot CLI.

### `github.copilot.chat.cli.autoCommit.enabled`

- **Default**: `true`

Enable automatic commit for Copilot CLI. When enabled, changes made by Copilot CLI will be automatically committed to the repository at the end of each turn.

### `github.copilot.chat.cli.autoModel.enabled`

- **Default**: `true`

Enable the Auto model option in Copilot CLI, which automatically selects the best model for each request. Requires VS Code reload.

### `github.copilot.chat.cli.branchSupport.enabled`

- **Default**: `false`

Enable branch support for Copilot CLI.

### `github.copilot.chat.cli.forkSessions.enabled`

- **Default**: `true`

Enable forking sessions in Copilot CLI.

### `github.copilot.chat.cli.isolationOption.enabled`

- **Default**: `true`

Enable the isolation mode option for Copilot CLI. When enabled, users can choose between Worktree and Workspace modes.

### `github.copilot.chat.cli.lazyLoadSessionItem.enabled`

- **Default**: `true`

Enable lazy loading of session items in Copilot CLI. Requires VS Code reload.

### `github.copilot.chat.cli.mcp.enabled`

- **Default**: `true`

Enable Model Context Protocol (MCP) server for Copilot CLI.

### `github.copilot.chat.cli.planCommand.enabled`

- **Default**: `true`

Enable the /plan command in Copilot CLI to create implementation plans before coding.

### `github.copilot.chat.cli.planExitMode.enabled`

- **Default**: `true`

Enable Plan Mode exit handling in Copilot CLI.

### `github.copilot.chat.cli.remote.enabled`

- **Default**: `true`

Enable the /remote command for Copilot CLI sessions, allowing you to view and steer from GitHub.com and the GitHub mobile app.

### `github.copilot.chat.cli.sandbox.enabled`

- **Default**: `"off"`

Run Copilot CLI tools (such as the terminal) inside a sandbox to limit what they can access on your system.

### `github.copilot.chat.cli.sessionController.enabled`

- **Default**: `false`

Enable the new session controller API for Copilot CLI. Requires VS Code reload.

### `github.copilot.chat.cli.sessionControllerForSessionsApp.enabled`

- **Default**: `false`

Enable the new session controller API for Sessions App. Requires VS Code reload.

### `github.copilot.chat.cli.showExternalSessions`

- **Default**: `true`

Show sessions created by other applications.

### `github.copilot.chat.cli.terminalLinks.enabled`

- **Default**: `true`

Enable advanced clickable file links in Copilot CLI terminals. Resolves relative paths against session state directories. Requires VS Code reload.

### `github.copilot.chat.cli.thinkingEffort.enabled`

- **Default**: `true`

Enable thinking effort for Language Models in Copilot CLI.

### `github.copilot.chat.cloudAgent.enabled`

- **Default**: `true`

Enable the Cloud Agent. When disabled, the Cloud Agent will not be available in 'Continue In' context menus.

### `github.copilot.chat.cloudAgentBackend.version`

- **Default**: `"v1"`

Selects which backend the Cloud Agent uses to create and manage cloud sessions. This setting is experimental and may change. Changes take effect after reloading the window.

### `github.copilot.chat.codeGeneration.instructions`

- **Default**: `[]`

A set of instructions that will be added to Copilot requests that generate code. Instructions can come from:
a file in the workspace: { "file": "fileName" }
text in natural language: { "text": "Use underscore for field names." }
Note: Keep your instructions short and precise. Poor instructions can degrade Copilot's quality and performance.

### `github.copilot.chat.codeGeneration.useInstructionFiles`

- **Default**: `true`

Controls whether code instructions from .github/copilot-instructions.md are added to Copilot requests.
Note: Keep your instructions short and precise. Poor instructions can degrade Copilot's quality and performance. Learn more about customizing Copilot.

### `github.copilot.chat.codesearch.agent.enabled`

- **Default**: `true`

Enable code search capabilities in agent mode.

### `github.copilot.chat.codesearch.enabled`

- **Default**: `false`

Whether to enable agentic codesearch when using #codebase.

### `github.copilot.chat.commitMessageGeneration.instructions`

- **Default**: `[]`

A set of instructions that will be added to Copilot requests that generate commit messages. Instructions can come from:
a file in the workspace: { "file": "fileName" }
text in natural language: { "text": "Use conventional commit message format." }
Note: Keep your instructions short and precise. Poor instructions can degrade Copilot's quality and performance.

### `github.copilot.chat.completionsFetcher`

- **Default**: `""`

Sets the fetcher used for the inline completions.

### `github.copilot.chat.conversationCompaction.model`

- **Default**: `""`

Override the model used for conversation-history compaction. When usePrismCompaction is enabled, defaults to trajectory-compaction. When usePrismCompaction is disabled, an empty value preserves the main agent model.

### `github.copilot.chat.conversationCompaction.prismModelFilter`

- **Default**: `"claude-haiku-4.5,claude-sonnet-4.5,claude-sonnet-4.6,gemini-2.5-pro,gemini-3-flash,gemini-3.5-flash"`

Comma-separated list of CAPI model IDs (case-insensitive, substring matched against the agent endpoint's model and family) that opt into prism compaction. Only takes effect when usePrismCompaction is enabled. An empty value applies prism to all models.

### `github.copilot.chat.conversationCompaction.usePrismCompaction`

- **Default**: `false`

Route conversation-history compaction (both foreground /compact and background auto-compaction) to the dedicated trajectory-compaction model instead of the main agent model.

### `github.copilot.chat.copilotDebugCommand.enabled`

- **Default**: `true`

Whether the `copilot-debug` command is enabled in the terminal.

### `github.copilot.chat.customInstructionsInSystemMessage`

- **Default**: `true`

When enabled, custom instructions and mode instructions will be appended to the system message instead of a user message.

### `github.copilot.chat.debug.promptOverrideFile`

- **Default**: `null`

Path to a YAML file that overrides the system prompt and/or tool descriptions sent to the model.
Note: This is an advanced debugging setting.

### `github.copilot.chat.debug.promptOverrideString`

- **Default**: `null`

YAML string that overrides the system prompt and/or tool descriptions sent to the model. When both this setting and github.copilot.chat.debug.promptOverrideFile are configured, this setting takes precedence.
Note: This is an advanced debugging setting.

### `github.copilot.chat.debug.requestLogger.maxEntries`

- **Default**: `100`

Maximum number of entries to keep in the request logger for debugging purposes.

### `github.copilot.chat.debugTerminalCommandPatterns`

- **Default**: `[]`

A list of commands for which the "Debug Command" quick fix action should be shown in the debug terminal.

### `github.copilot.chat.editRecording.enabled`

- **Default**: `false`

Enable edit recording for analysis.

### `github.copilot.chat.edits.batchReplaceStringDescriptions`

- **Default**: `false`

Update tool descriptions to promote multi_replace_string_in_file as the primary multi-edit tool.

### `github.copilot.chat.edits.gemini3MultiReplaceString`

- **Default**: `false`

Enable the modern multi_replace_string_in_file edit tool when generating edits with Gemini 3 models.

### `github.copilot.chat.enableUserPreferences`

- **Default**: `false`

Enable remembering user preferences in agent mode.

### `github.copilot.chat.executionSubagent.enabled`

- **Default**: `false`

Enable the Execution Subagent tool in Copilot Chat. The Execution Subagent is designed to run terminal commands to accomplish an execution-based task. It is powered by Google's Gemini-3-Flash model.

### `github.copilot.chat.executionSubagent.model`

- **Default**: `"gemini-3-flash"`

The model to use for the Execution Subagent tool in Copilot Chat. When useAgenticProxy is enabled, defaults to 'exec-subagent-router-a'. Otherwise defaults to gemini-3-flash.

### `github.copilot.chat.executionSubagent.toolCallLimit`

- **Default**: `10`

Maximum number of tool calls the Execution Subagent can make during execution.

### `github.copilot.chat.executionSubagent.useAgenticProxy`

- **Default**: `false`

Use the agentic proxy endpoint for the execution subagent.

### `github.copilot.chat.exploreAgent.enabled`

- **Default**: `true`

Enable the Explore (Code Research) subagent.

### `github.copilot.chat.exploreAgent.model`

- **Default**: `""`

Override the language model used by the Explore subagent. Defaults to a fast, small model. Leave empty to use the built-in fallback list.

### `github.copilot.chat.feedback.onChange`

- **Default**: `false`

Enable feedback collection on configuration changes.

### `github.copilot.chat.gemini35FlashReducedToolUsePrompt.enabled`

- **Default**: `false`

Enables an experimental prompt for Gemini 3.5 Flash that instructs the model to minimize tool calls to reduce token usage.

### `github.copilot.chat.gemini3GetChangedFilesTool.enabled`

- **Default**: `true`

Enables the Get Changed Files tool for gemini-3 models.

### `github.copilot.chat.gemini3LowReasoningEffort.enabled`

- **Default**: `false`

Sets the reasoning effort to low for gemini-3 models.

### `github.copilot.chat.getChangedFilesTool.enabled`

- **Default**: `false`

Enable the Get Changed Files tool in Copilot Chat. When enabled, the agent can retrieve git diffs of current changes via a dedicated tool.

### `github.copilot.chat.githubMcpServer.channel`

- **Default**: `"stable"`

Select the channel for the GitHub MCP Server. When set to Insiders, enables access to experimental features that may change or be removed based on community feedback. Learn more.

### `github.copilot.chat.githubMcpServer.enabled`

- **Default**: `false`

Enable built-in support for the GitHub MCP Server.

### `github.copilot.chat.githubMcpServer.lockdown`

- **Default**: `false`

Enable lockdown mode for the GitHub MCP Server. When enabled, hides public issue details created by users without push access. Learn more.

### `github.copilot.chat.githubMcpServer.readonly`

- **Default**: `false`

Enable read-only mode for the GitHub MCP Server. When enabled, only read tools are available. Learn more.

### `github.copilot.chat.githubMcpServer.toolsets`

- **Default**: `[`

Specify toolsets to use from the GitHub MCP Server. Learn more.

### `github.copilot.chat.gpt55EconomicalSearchAndEdit.enabled`

- **Default**: `false`

Enables economical search and edit instructions for gpt-5.5 models.

### `github.copilot.chat.gpt55GetChangedFilesTool.enabled`

- **Default**: `true`

Enables the Get Changed Files tool for gpt-5.5 models.

### `github.copilot.chat.gpt55LargePromptSections.enabled`

- **Default**: `false`

Enables additional gpt-5.4 large prompt sections for gpt-5.5 models.

### `github.copilot.chat.gpt55ReadFileTool.enabled`

- **Default**: `true`

Enables the Read File tool for gpt-5.5 models.

### `github.copilot.chat.gpt5AlternativePatch`

- **Default**: `false`

Enable GPT-5 alternative patch format.

### `github.copilot.chat.imageUpload.enabled`

- **Default**: `true`

Enables the use of image upload URLs in chat requests instead of raw base64 strings.

### `github.copilot.chat.implementAgent.model`

- **Default**: `""`

Override the language model used when starting implementation from the Plan agent's handoff. Use the format Model Name (vendor) (e.g., GPT-5 (copilot)). Leave empty to use the default model.

### `github.copilot.chat.inlineChat.enableThinking`

- **Default**: `false`

Controls whether thinking/reasoning is enabled for inline chat requests. When disabled, reasoning summaries are suppressed for faster responses.

### `github.copilot.chat.inlineChat.reasoningEffort`

- **Default**: `"low"`

Controls the reasoning effort level for inline chat requests. Lower values result in faster responses with fewer reasoning tokens. Supported values depend on the model.

### `github.copilot.chat.inlineEdits.chatSessionContextProvider.enabled`

- **Default**: `false`

Enable chat session context provider for next edit suggestions.

### `github.copilot.chat.inlineEdits.diagnosticsContextProvider.enabled`

- **Default**: `false`

Enable diagnostics context provider for next edit suggestions.

### `github.copilot.chat.inlineEdits.nextCursorPrediction.currentFileMaxTokens`

- **Default**: `3000`

Maximum tokens for current file in next cursor prediction.

### `github.copilot.chat.inlineEdits.nextCursorPrediction.displayLine`

- **Default**: `true`

Display predicted cursor line for next edit suggestions.

### `github.copilot.chat.inlineEdits.renameSymbolSuggestions`

- **Default**: `true`

Enable rename symbol suggestions in inline edits.

### `github.copilot.chat.inlineEdits.triggerOnEditorChangeAfterSeconds`

- **Default**: `10`

Trigger inline edits after editor has been idle for this many seconds.

### `github.copilot.chat.inlineEdits.xtabProvider.modelConfiguration`

- **Default**: `null`

Advanced model configuration for the next edit suggestions xtab provider.
Note: This is an advanced setting.

### `github.copilot.chat.installExtensionSkill.enabled`

- **Default**: `false`

Whether to enable the install extension skill for Copilot.

### `github.copilot.chat.instantApply.shortContextLimit`

- **Default**: `8000`

Token limit for short context instant apply.

### `github.copilot.chat.instantApply.shortContextModelName`

- **Default**: `"gpt-4o-instant-apply-full-ft-v66-short"`

Model name for short context instant apply.

### `github.copilot.chat.languageContext.fix.typescript.enabled`

- **Default**: `false`

Enables the TypeScript language context provider for /fix commands

### `github.copilot.chat.languageContext.inline.typescript.enabled`

- **Default**: `false`

Enables the TypeScript language context provider for inline chats (both generate and edit)

### `github.copilot.chat.languageContext.typescript.cacheTimeout`

- **Default**: `500`

The cache population timeout for the TypeScript language context provider in milliseconds. The default is 500 milliseconds.

### `github.copilot.chat.languageContext.typescript.enabled`

- **Default**: `true`

Enables the TypeScript language context provider for inline suggestions

### `github.copilot.chat.languageContext.typescript.includeDocumentation`

- **Default**: `false`

Controls whether to include documentation comments in the generated code snippets.

### `github.copilot.chat.languageContext.typescript.items`

- **Default**: `"double"`

Controls which kind of items are included in the TypeScript language context provider.

### `github.copilot.chat.localeOverride`

- **Default**: `"auto"`

Specify a locale that Copilot should respond in, e.g. en or fr. By default, Copilot will respond using VS Code's configured display language locale.

### `github.copilot.chat.localIndex.enabled`

- **Default**: `false`

Enable local session tracking. When enabled, session data is tracked locally for /chronicle commands.

### `github.copilot.chat.localWorkspaceRecording.enabled`

- **Default**: `false`

Enable local workspace recording for analysis.

### `github.copilot.chat.modelCapabilityOverrides`

- **Default**: `{}`

Per-model capability overrides keyed by model id, intended for evaluating preview and tenanted models against an existing model's capability profile. For each model id, declare an aliased family. Setting family to a known production family (e.g. "claude-opus-4.7") makes the model receive that family's full capability profile — Anthropic family detection, latest Opus prompt, multi-replace tools, tool search, context editing, extended cache TTL — without a code change.
Note: This is an advanced setting for evaluation use; it is not intended for regular end-user configuration.

### `github.copilot.chat.nesFetcher`

- **Default**: `""`

Sets the fetcher used for the next edit suggestions.

### `github.copilot.chat.newWorkspace.useContext7`

- **Default**: `false`

Whether to use the Context7 tools to scaffold project for new workspace creation.

### `github.copilot.chat.newWorkspaceCreation.enabled`

- **Default**: `true`

Whether to enable new agentic workspace creation.

### `github.copilot.chat.notebook.alternativeFormat`

- **Default**: `"xml"`

Alternative document format for notebooks.

### `github.copilot.chat.notebook.alternativeNESFormat.enabled`

- **Default**: `false`

Enable alternative format for Next Edit Suggestions in notebooks.

### `github.copilot.chat.notebook.enhancedNextEditSuggestions.enabled`

- **Default**: `false`

Controls whether to use an enhanced approach for generating next edit suggestions in notebook cells.

### `github.copilot.chat.notebook.followCellExecution.enabled`

- **Default**: `false`

Controls whether the currently executing cell is revealed into the viewport upon execution from Copilot.

### `github.copilot.chat.notebook.summaryExperimentEnabled`

- **Default**: `false`

Enable the notebook summary experiment.

### `github.copilot.chat.notebook.variableFilteringEnabled`

- **Default**: `false`

Enable filtering variables by cell document symbols.

### `github.copilot.chat.omitBaseAgentInstructions`

- **Default**: `false`

Omit base agent instructions from prompts.

### `github.copilot.chat.organizationCustomAgents.enabled`

- **Default**: `true`

When enabled, Copilot will load custom agents defined by your GitHub Organization.

### `github.copilot.chat.organizationInstructions.enabled`

- **Default**: `true`

When enabled, Copilot will load custom instructions defined by your GitHub Organization.

### `github.copilot.chat.otel.captureContent`

- **Default**: `false`

Capture input/output messages, system instructions, and tool definitions in OTel telemetry. Contains potentially sensitive data. Env var COPILOT_OTEL_CAPTURE_CONTENT takes precedence. Requires window reload.

### `github.copilot.chat.otel.dbSpanExporter.enabled`

- **Default**: `false`

Enable SQLite DB span exporter. Persists OTel spans to a local SQLite database. Automatically enables OTel when set to true. Requires window reload.

### `github.copilot.chat.otel.enabled`

- **Default**: `false`

Enable OpenTelemetry trace/metric/log emission for Copilot Chat operations. Env var COPILOT_OTEL_ENABLED takes precedence. Requires window reload.

### `github.copilot.chat.otel.exporterType`

- **Default**: `"otlp-http"`

OTel exporter type for Copilot Chat telemetry. Requires window reload.

### `github.copilot.chat.otel.maxAttributeSizeChars`

- **Default**: `0`

Maximum size in characters for free-form OTel content attributes (prompts, responses, tool arguments/results, hook input/output). 0 (the default) disables truncation so backends without per-attribute size limits receive full JSON payloads. Set to a positive value when your OTel backend caps attribute size — consult your backend's documentation for its per-attribute limit. Truncated values are suffixed with ...[truncated, original N chars]. Env var COPILOT_OTEL_MAX_ATTRIBUTE_SIZE_CHARS takes precedence. Requires window reload.

### `github.copilot.chat.otel.otlpEndpoint`

- **Default**: `"http://localhost:4318"`

OTLP collector endpoint URL for Copilot Chat OTel data. Env var OTEL_EXPORTER_OTLP_ENDPOINT takes precedence. Requires window reload.

### `github.copilot.chat.otel.outfile`

- **Default**: `""`

File path for file-based OTel exporter output (JSON-lines). When set, overrides exporter type to file. Requires window reload.

### `github.copilot.chat.planAgent.additionalTools`

- **Default**: `[]`

Additional tools to enable for the Plan agent, on top of built-in tools. Use fully-qualified tool names (e.g., github/issue_read, mcp_server/tool_name).

### `github.copilot.chat.projectLabels.chat`

- **Default**: `false`

Add project labels in chat requests.

### `github.copilot.chat.projectLabels.expanded`

- **Default**: `false`

Use the expanded format for project labels in prompts.

### `github.copilot.chat.projectLabels.inline`

- **Default**: `false`

Add project labels in inline edit requests.

### `github.copilot.chat.promptFileContextProvider.enabled`

- **Default**: `true`

Enable prompt file context provider.

### `github.copilot.chat.pullRequestDescriptionGeneration.instructions`

- **Default**: `[]`

A set of instructions that will be added to Copilot requests that generate pull request titles and descriptions. Instructions can come from:
a file in the workspace: { "file": "fileName" }
text in natural language: { "text": "Always include a list of key changes." }
Note: Keep your instructions short and precise. Poor instructions can degrade Copilot's quality and performance.

### `github.copilot.chat.rateLimitAutoSwitchToAuto`

- **Default**: `false`

Automatically switch to the Auto model and retry when you hit a per-model rate limit.

### `github.copilot.chat.reasoningEffortOverride`

- **Default**: `null`

Overrides the reasoning/thinking effort sent to model APIs. The configured value must match a reasoning-effort value supported by the selected model or endpoint (for example, low, medium, high, or other model-specific values). Used by evals.
Note: This is an advanced debugging setting.

### `github.copilot.chat.responsesApi.persistentCoT.enabled`

- **Default**: `false`

Enables persistent chain of thought for supported Responses API models.

### `github.copilot.chat.responsesApi.promptCacheKey.enabled`

- **Default**: `false`

Enables prompt cache key being set for the Responses API.

### `github.copilot.chat.responsesApiContextManagement.enabled`

- **Default**: `false`

Enables context management for the Responses API. Requires #github.copilot.chat.useResponsesApi#.

### `github.copilot.chat.responsesApiReasoningSummary`

- **Default**: `"detailed"`

Sets the reasoning summary style used for the Responses API. Requires #github.copilot.chat.useResponsesApi#.

### `github.copilot.chat.review.intent`

- **Default**: `false`

Enable intent detection for code review.

### `github.copilot.chat.reviewAgent.enabled`

- **Default**: `true`

Enables the code review agent.

### `github.copilot.chat.reviewSelection.enabled`

- **Default**: `true`

Enables code review on current selection.

### `github.copilot.chat.reviewSelection.instructions`

- **Default**: `[]`

A set of instructions that will be added to Copilot requests that provide code review for the current selection. Instructions can come from:
a file in the workspace: { "file": "fileName" }
text in natural language: { "text": "Use underscore for field names." }
Note: Keep your instructions short and precise. Poor instructions can degrade Copilot's effectiveness.

### `github.copilot.chat.scopeSelection`

- **Default**: `false`

Whether to prompt the user to select a specific symbol scope if the user uses /explain and the active editor has no selection.

### `github.copilot.chat.searchSubagent.enabled`

- **Default**: `false`

Enable the search subagent tool for iterative code exploration in the workspace.

### `github.copilot.chat.searchSubagent.model`

- **Default**: `""`

Model to use for the search subagent. When useAgenticProxy is enabled, defaults to 'vscode-agentic-search-router-a'. Otherwise defaults to the main agent model.

### `github.copilot.chat.searchSubagent.thoroughnessEnabled`

- **Default**: `false`

Enable the thoroughness parameter on the search subagent tool. When enabled, the caller can pass 'normal' or 'deep' to adjust the number of allowed tool-call turns (1× or 2× the base toolCallLimit respectively).

### `github.copilot.chat.searchSubagent.toolCallLimit`

- **Default**: `4`

Maximum number of tool calls the search subagent can make during exploration.

### `github.copilot.chat.searchSubagent.useAgenticProxy`

- **Default**: `false`

Use the agentic proxy for the search subagent tool.

### `github.copilot.chat.setupTests.enabled`

- **Default**: `true`

Enables the /setupTests intent and prompting in /tests generation.

### `github.copilot.chat.skillTool.enabled`

- **Default**: `false`

Enable the skill tool in Copilot Chat. When enabled, skills are invoked via a dedicated skill tool instead of readFile.

### `github.copilot.chat.summarizeAgentConversationHistory.enabled`

- **Default**: `true`

Whether to auto-compact agent conversation history once the context window is filled.

### `github.copilot.chat.summarizeAgentConversationHistoryThreshold`

- **Default**: `0`

Threshold at which agent conversation history is compacted. Specify either a ratio of the model's context window (a value greater than 0 and at most 1, e.g. 0.8 to compact at 80%) or an absolute token count (a value of 100 or greater, e.g. 60000). Leave unset to use the model's full context window.

### `github.copilot.chat.switchAgent.enabled`

- **Default**: `false`

Allow agent to switch to the Plan agent for research, exploration, and planning tasks.

### `github.copilot.chat.terminalChatLocation`

- **Default**: `"chatView"`

Controls where chat queries from the terminal should be opened.

### `github.copilot.chat.testGeneration.instructions`

- **Default**: `[]`

A set of instructions that will be added to Copilot requests that generate tests. Instructions can come from:
a file in the workspace: { "file": "fileName" }
text in natural language: { "text": "Use underscore for field names." }
Note: Keep your instructions short and precise. Poor instructions can degrade Copilot's quality and performance.

### `github.copilot.chat.tools.defaultToolsGrouped`

- **Default**: `false`

Group default tools in prompts.

### `github.copilot.chat.tools.viewImage.enabled`

- **Default**: `true`

Enable the view image tool, which allows the agent to view image files such as png, jpg, jpeg, gif, and webp.

### `github.copilot.chat.updated53CodexPrompt.enabled`

- **Default**: `true`

Enables the updated prompt for gpt-5.3-codex model.

### `github.copilot.chat.useProjectTemplates`

- **Default**: `true`

Use relevant GitHub projects as starter projects when using /new

### `github.copilot.chat.useResponsesApiTruncation`

- **Default**: `false`

Use Responses API for truncation.

### `github.copilot.chat.virtualTools.threshold`

- **Default**: `128`

This setting defines the tool count over which virtual tools should be used. Virtual tools group similar sets of tools together and they allow the model to activate them on-demand. Certain tool groups will optimistically be pre-activated. We are actively developing this feature and you experience degraded tool calling once the threshold is hit.
May be set to 0 to disable virtual tools.

### `github.copilot.chat.workspace.codeSearchExternalIngest.enabled`

- **Default**: `true`

Enable external ingest for semantic codebase search in this workspace. This setting can be used to enable/disable external ingest, but your Copilot Enterprise or Copilot subscription policies ultimately control availability. Learn more about external ingest policies.

### `github.copilot.chat.workspace.enableCodeSearch`

- **Default**: `true`

Enable code search in workspace context.

### `github.copilot.chat.workspace.maxLocalIndexSize`

- **Default**: `100000`

Maximum size of the local workspace index.

### `github.copilot.chat.workspace.preferredEmbeddingsModel`

- **Default**: `""`

Preferred embeddings model for semantic search.

### `github.copilot.chat.workspace.prototypeAdoCodeSearchEndpointOverride`

- **Default**: `""`

Override endpoint for Azure DevOps code search prototype.
