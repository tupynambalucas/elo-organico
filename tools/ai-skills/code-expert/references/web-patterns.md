# Web Implementation Patterns

O frontend utiliza React 19, Zustand para estado global e CSS Modules para estilização.

## Organização de Features

Seguimos uma estrutura de `views`, `components` e `domains` (hooks/stores).

### 1. View & Components
Views orquestram múltiplos componentes e lógica de navegação.

```tsx
// Exemplo: ActiveCycleDashboard
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
Extraia lógica complexa para hooks para manter componentes limpos e testáveis.

```typescript
// Exemplo: useCycleCreate.ts
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
**PROIBIDO o uso de `px`**. Utilize `rem` (1rem = 16px) e funções CSS como `clamp`.

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

## Guardrails de Código
- **Explicit Booleans**: `{hasErrors === true && <ErrorMsg />}`.
- **Keys**: Sempre use IDs estáveis (`_id`).
- **Floating Promises**: Use `void actions.handleSubmit()` em eventos de clique se não forem aguardados.
- **React 19**: Use `use()` para promessas e contexto.
