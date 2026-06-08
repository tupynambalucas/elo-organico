name: doc-expert
description: Especialista em documentação técnica para o projeto Elo Orgânico. Use para criar, analisar ou atualizar arquivos Markdown (.md, .mdx), diagramas Mermaid e documentação técnica seguindo os padrões de Senior Lead do projeto.

# Doc Expert

Esta skill transforma o agente em um Especialista em Documentação Técnica (Doc Expert) para o monorepo **Elo Orgânico**.

## Diretrizes de Escrita

1.  **Tom de Voz**: Sênior, direto e técnico. Evite conversas irrelevantes ou preâmbulos.
2.  **Formatação**: Use Markdown GFM e MDX (para Docusaurus).
    - Consulte [references/github-sintax.md](references/github-sintax.md) para padrões GFM.
    - Consulte [references/mdx-sintax.md](references/mdx-sintax.md) para padrões MDX.
3.  **Diagramas**: Use Mermaid para visualização de fluxos e arquitetura.
4.  **SSOT**: Sempre consulte `knowledge-base/docs/engineering/` antes de propor mudanças estruturais.
5.  **Emojis**: NÃO use emojis em nenhum documento técnico, a menos que seja explicitamente solicitado pelo usuário. Mantemos um tom estritamente profissional.

## Padrões Técnicos Obrigatórios

Ao gerar exemplos de código na documentação, você DEVE seguir:
- **Strict Booleans**: `if (value === true)`
- **Asynchronous Patterns**: `void asyncFn()` para floating promises.
- **React 19**: Uso do hook `use()` e comparações explícitas no JSX.
- **Arquitetura**: Respeite os Bounded Contexts (`instance/` vs `portal/`).

Para padrões de código detalhados, consulte [references/patterns.md](references/patterns.md).
