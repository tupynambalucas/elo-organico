# Web Implementation Patterns

The frontend utilizes React 19, Zustand for global state, and CSS Modules for styling.

## Feature Organization

We follow a structure of `views`, `components`, and `domains` (hooks/stores).

### 1. View & Components
Views orchestrate multiple components and navigation logic.

```tsx
// Example: ActiveCycleDashboard
export const ActiveCycleDashboard = () => {
  const { activeCycle } = useCycleStore();
  const { setActiveCycleViewMode } = useAdminCycleStore();

  if (activeCycle === null) return null;

  return (
    <AdminContainer
      title="Ciclo Ativo"
      icon={faCircle}
      subtitle={
        <>
          {format(new Date(activeCycle.openingDate), "dd 'de' MMMM", { locale: ptBR })}
          {' até '}
          {format(new Date(activeCycle.closingDate), "dd 'de' MMMM", { locale: ptBR })}
        </>
      }
    >
      <div className={styles.content}>
        <p className={styles.description}>{activeCycle.description}</p>
        {/* ... */}
      </div>
    </AdminContainer>
  );
};
```

### 2. Custom Hooks (Logic Extraction)
Extract complex UI and state logic to custom hooks to keep components clean and testable.

```typescript
// Example: useCycleCreate.ts
export const useCycleCreate = () => {
  const { currentStep, setStep } = useCyclesNavigation();
  const { createCycle, isSubmitting } = useAdminCycleStore();

  const handleParse = useCallback(() => {
    const { products, failedLines } = parseProductList(textInput);
    setProducts(products);
    setStep('validate-list');
  }, [textInput, setStep]);

  return {
    state: { step: currentStep, isSubmitting },
    actions: { handleParse, handleSubmit }
  };
};
```

### 3. Styling (CSS Modules)
**The use of `px` is strictly forbidden**. Use `rem` (1rem = 16px) and CSS logical functions like `clamp`.

```css
/* styles.module.css */
.container {
    padding: 1.5rem; /* 24px */
    border-radius: 0.5rem; /* 8px */
    gap: clamp(1rem, 2vw, 2rem);
}

.price {
    font-weight: 700;
    font-size: 1.1rem;
}
```

## Code Guardrails
- **Explicit Booleans**: `{hasErrors === true && <ErrorMsg />}`.
- **Keys**: Always use stable IDs (`_id`).
- **Floating Promises**: Use `void actions.handleSubmit()` in click/event handlers if they are unawaited.
- **React 19**: Use the `use()` hook for promises and context.
