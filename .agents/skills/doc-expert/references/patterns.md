# Doc Expert Code Patterns

These patterns must be followed in all code examples generated in the Elo Orgânico documentation. For formatting syntax, refer to the [GFM](github-sintax.md) and [MDX](mdx-sintax.md) guides.

## Strict Boolean
```typescript
// Correct
if (isValid === true) { ... }
if (data !== undefined) { ... }

// Incorrect
if (isValid) { ... }
if (data) { ... }
```

## Promises and Async
```typescript
// For intentionally unawaited calls
void notifyUser();

// In React 19 (use hook)
const data = use(dataPromise);
```

## JSX (React 19)
```tsx
// Explicit comparisons
{items.length > 0 && <List items={items} />}
{isVisible === true && <Modal />}
```

## Fastify 5 (Layered Architecture)
Always organize examples following: `Controller -> Service -> Repository -> Model`.
