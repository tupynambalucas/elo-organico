# Padrões de Código Doc Expert

Estes padrões devem ser seguidos em todos os exemplos de código gerados na documentação do Elo Orgânico.

## Booleano Estrito
```typescript
// Correto
if (isValid === true) { ... }
if (data !== undefined) { ... }

// Incorreto
if (isValid) { ... }
if (data) { ... }
```

## Promises e Async
```typescript
// Para chamadas não aguardadas intencionalmente
void notifyUser();

// No React 19 (use hook)
const data = use(dataPromise);
```

## JSX (React 19)
```tsx
// Comparações explícitas
{items.length > 0 && <List items={items} />}
{isVisible === true && <Modal />}
```

## Fastify 5 (Arquitetura de Camadas)
Sempre organize os exemplos seguindo: `Controller -> Service -> Repository -> Model`.
