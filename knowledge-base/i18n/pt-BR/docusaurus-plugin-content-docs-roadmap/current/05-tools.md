---
title: Tools (Infraestrutura & MCP)
sidebar_label: Tools (MCP & Infra)
---

Esta seção detalha a infraestrutura de gateway proxy, servidores de contexto MCP conteinerizados e sandboxes de agentes de IA.

## Marcos Concluídos

### Gateway Proxy & Rede
- **Gateway Proxy HTTP em Fastify**: Implantação de um gateway conteinerizado (`elo-mcp-gateway`) rodando em Fastify v5 que intercepta e roteia requisições de clientes locais (como a CLI do Antigravity na porta `3005`) para os containers de contexto correspondentes.
- **Tratamento de CORS & SSE Streams**: Configuração de headers CORS em nível de rede e desabilitação de timeouts de proxy para assegurar conexões persistentes e estáveis de Server-Sent Events (SSE).

### Ecossistema MCP Conteinerizado
- **Sandbox de Navegador Headless (Playwright)**: Implantação de container baseado em Debian executando o Google Chrome em modo headless via Playwright, equipado com regras automáticas de reescrita de tráfego que direcionam requisições localhost de volta para a máquina hospedeira (`host.docker.internal`).
- **Servidores MCP Estruturados**: Configuração de ambientes conteinerizados Alpine/Debian para:
  - `GitHub MCP`: Controle de versão, gestão de issues e buscas de código.
  - `Context7 MCP`: Motor de busca de documentações atualizadas (React 19, Fastify 5, Three.js).
  - `Docker Hub MCP`: Varreduras no registro de imagens de container.

### Scripts de Automação
- **Scripts de Compilação TypeScript**: Desenvolvimento de utilitários em TypeScript (`generate-changelog.ts` e `generate-roadmap.ts`) rodando sob `tsx` para compilar e atualizar logs e roadmaps diretamente no diretório raiz do repositório.

## Foco Planejado
- **Integrações de CI/CD**: Desenvolvimento de validadores de contexto e scripts de check.
- **Relatórios Automatizados em Sandbox**: Exposição de painéis de cobertura e testes em tempo de execução para os agentes locais de IA.
