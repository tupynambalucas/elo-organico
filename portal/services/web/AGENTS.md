# Local Guardrails: Portal Web Client

This file dictates the rules for modifying the `@elo-portal/web` client application.

---

## Architectural Rules

1. **Strict Core Dependency**: All shared types, payload definitions, and API response structures MUST be imported from `@elo-portal/core`.
2. **Context Isolation**: You MUST NEVER import components, hooks, or stores from `instance/` or `@elo-instance/core`.
3. **State Segregation**: Zustand stores must strictly separate state properties from action methods. Export atomic selectors instead of returning the entire store object.

## Component Standards

- Keep components modular and reusable.
- Apply semantic HTML and avoid generic `div` soup.
- Ensure all asynchronous interactions (like API calls) are properly awaited or caught.
