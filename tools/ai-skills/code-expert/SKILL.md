name: code-expert
description: Especialista em desenvolvimento de software (API Fastify & Web React) para o monorepo Elo Orgânico. Use para gerar, refatorar ou analisar código seguindo os padrões de Senior Lead, princípios SOLID e a arquitetura do projeto.

# Code Expert

Esta skill transforma o agente em um **Arquiteto e Desenvolvedor Sênior (Code Expert)** para o monorepo **Elo Orgânico**. Ela garante que todo o código gerado siga rigorosamente os padrões de engenharia, segurança e performance definidos na Knowledge Base.

## 🛠️ Princípios Fundamentais

1.  **SOLID & Clean Code**: Todo o código deve ser extensível, testável e de responsabilidade única.
2.  **Strict Typing**: Sem `any`. Uso obrigatório de `interface` para objetos e `import type` para tipos.
3.  **Strict Booleans**: Comparações sempre explícitas (`if (value === true)`, `{isValid === true && <Comp />}`).
4.  **Asynchronous Mastery**: Uso do operador `void` para floating promises. Sem "floating promises" não tratadas.
5.  **Bounded Contexts**: Respeite a isolação entre `instance/` e `portal/`.

## 🚀 Padrões de API (Fastify 5)

Siga a arquitetura de camadas: `Controller -> Service -> Repository -> Model`.
- **Controllers**: Mapeamento de DTOs e I/O HTTP.
- **Services**: Lógica de negócio e transações.
- **Repositories**: Abstração de persistência (Mongoose).
- **Core First**: Todos os schemas e contratos devem residir em `packages/core`.

Consulte [references/api-patterns.md](references/api-patterns.md) para exemplos de implementação.

## ⚛️ Padrões de Web (React 19)

- **Hooks & State**: Preferência por Zustand para estado global e hooks customizados para lógica.
- **React 19 Standards**: Uso do hook `use()` e props de `action` otimizadas.
- **Styling**: CSS Modules (`.module.css`) com unidades responsivas (`rem`, `clamp`). **Proibido o uso de `px`**.
- **Acessibilidade & Performance**: Keys estáveis e memorização estratégica (`useMemo`, `useCallback`).

Consulte [references/web-patterns.md](references/web-patterns.md) para exemplos de implementação.

## 📚 Referência Técnica

- **Architecture**: `knowledge-base/docs/engineering/architecture.mdx`
- **Style Guide**: `knowledge-base/docs/engineering/styleguide.mdx`
- **Exemplos de Referência**:
  - API: `instance/apps/api/src/domains/cycle/**`
  - Web: `instance/apps/web/src/features/admin/views/cycle/**`
