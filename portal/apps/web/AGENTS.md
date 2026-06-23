# Local Context: Portal Web Client Application

This workspace (`@elo-portal/web`) contains the React 19 Single Page Application client for platform SaaS administration and tenant onboarding.

---

## Local Architecture & Directory Map

The client layout under `src/` is organized according to Domain-Driven Design (DDD) and Feature-Sliced Design (FSD) hybrid guidelines:

- **[src/domains/](./src/domains/)**: Global business domains (e.g. `auth/`, `tenant/`, `billing/`):
  - Stores: Zustand state store definitions (`tenant.store.ts`).
  - Hooks: State selectors and derived calculations (`hooks/useTenant.ts`).
- **[src/features/](./src/features/)**: Feature modules representing isolated user workflows:
  - `dashboard/`: Telemetry monitoring, tenant subscription overview.
  - `onboarding/`: Registration forms for new community instances.
- **[src/shared/ui/](./src/shared/ui/)**: Reusable, domain-agnostic UI elements (buttons, loaders, fields).

---

## Web Coding Guardrails

### A. Zustand Atomic Selectors Pattern
To prevent redundant rendering, stores MUST separate properties from actions. Components MUST consume state via atomic selector hooks:

```typescript
// Define Store
export const useTenantStore = create<TenantState>((set) => ({
  tenants: [],
  actions: { setTenants: (tenants) => set({ tenants }) }
}));

// Atomic Selector Hooks
export const useTenants = () => useTenantStore((state) => state.tenants);
export const useTenantActions = () => useTenantStore((state) => state.actions);
```

### B. Explicit JSX Render Checks
Always use explicit comparisons in JSX rendering conditions to prevent parsing bugs:
- **Correct**: `{isValid === true && <Modal />}` or `{tenants.length > 0 && <List />}`.
- **Incorrect**: `{isValid && <Modal />}` or `{tenants.length && <List />}`.

### C. Styling and Fluid Design (CSS Modules)
- **No Pixels (`px`)**: Spacing, sizing, and typography MUST use relative units (`rem`, `em`, `vw/vh`, or percentages). `1px` is allowed *only* for hairline borders.
- **Fluid Layouts**: Leverage CSS Modules (`.module.css`) and relative functions (`clamp()`, `calc()`, `min()`, `max()`) for responsive layout scalability.

---

## Local Lifecycle Commands

- `pnpm dev`: Runs local Vite development server at `http://localhost:5174`.
- `pnpm build`: Performs type-checking and builds static optimized assets into `dist/`.
- `pnpm typecheck`: Validates TypeScript type safety.
- `pnpm lint`: Runs ESLint validation.
