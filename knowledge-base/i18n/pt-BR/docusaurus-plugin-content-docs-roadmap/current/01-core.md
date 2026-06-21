---
slug: /
title: Arquitetura Core & Estratégia
sidebar_label: Arquitetura Core
---

Esta seção descreve a arquitetura estratégica do monorepo, configurações de catálogo e metas de isolamento lógico multi-tenant para o projeto Elo Orgânico.

## Marcos Concluídos

### Arquitetura de Monorepo & Configuração de Workspaces
- **Segregação de Workspaces no Monorepo**: Estruturação das camadas de workspaces via PNPM Workspaces v11 e Turborepo, segregando os domínios `instance/`, `portal/`, `studio/`, `tools/` e `knowledge-base/`.
- **Orquestração de Tarefas de Alta Performance**: Integração do **Turborepo** para orquestrar as pipelines do monorepo, permitindo caching inteligente de alvos e execução paralela de scripts.
- **Herança de Configurações Unificada**: Configuração de arquivos base `tsconfig.base.json` e `eslint.config.ts` no nível da raiz, que são estendidos pelos pacotes individuais via extends do TSConfig e declarações de array de regras do ESLint.
- **Node 22 & Configuração TypeScript ESM**: Conversão de todos os pacotes para usar ECMAScript Modules (`"type": "module"`) e compilação com target `ESNext` para suporte a sintaxes modernas.

### Bounded Contexts & Segurança de Domínio
- **Isolamento Estrito de Bounded Contexts**: Configuração de regras personalizadas de restrição de importação (`no-restricted-imports`) no `eslint.config.ts`, proibindo dependências cruzadas entre workspaces (como o contexto Instance importar do contexto Portal, e vice-versa) para garantir regras de negócio limpas e desacopladas.
- **Integração do Padrão Domain-Core**: Estabeleceu o `packages/core` tanto em `instance` quanto em `portal` como a Fonte Única de Verdade (SSOT) para modelos de dados e validadores de schema.
- **Gestão Unificada de Dependências via Catalogs**: Integração da funcionalidade Catalogs do PNPM v11 em `pnpm-workspace.yaml` para unificar versões de pacotes externos (como Fastify 5, React 19, TSX, ESLint) em todo o monorepo.

## Foco Planejado
- **Isolamento Lógico Multi-Tenant**: Garantir que as instâncias e o portal executem domínios completamente isolados.
- **Evolução da Plataforma SaaS**: Transição de deploys de instância única para um modelo de marketplace multi-tenant centralizado.
