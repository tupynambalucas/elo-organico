---
title: Tools (Infraestrutura & MCP)
sidebar_label: Tools (MCP & Infra)
---

Esta seção detalha a infraestrutura de gateway proxy, servidores de contexto MCP conteinerizados e sandboxes de agentes de IA.

## Marcos Concluídos

### Gateway Proxy & Rede
- **Gateway Federado Unificado**: Migração do gateway (`elo-mcp-gateway`) para um servidor MCP federado oficial baseado no SDK. Ele atua como o ponto de entrada único de SSE (porta `3005` no host), gerencia dinamicamente a agregação de namespaces de ferramentas e injeta diretrizes de contexto compiladas em Markdown durante o handshake do cliente.
- **Tratamento de CORS & SSE Streams**: Configuração de headers CORS em nível de rede e loops de eventos SSE para assegurar conexões persistentes e estáveis de Server-Sent Events (SSE).

### Ecossistema MCP Conteinerizado (Ponte TCP Pura via socat)
- **Ponte TCP Pura**: Substituição dos wrappers personalizados baseados em Node/Fastify em todos os containers de backend por túneis de socket TCP para stdio via `socat` com baixa latência (portas `3001`-`3004` internamente), reduzindo drasticamente o consumo de memória das imagens.
- **Sandbox de Navegador Headless (Playwright)**: Implantação de container baseado em Debian executando o Google Chrome em modo headless via Playwright, equipado com regras automáticas de reescrita de tráfego que direcionam requisições localhost de volta para a máquina hospedeira (`host.docker.internal`).
- **Isolamento de Segurança Zero-Trust**: Configuração de namespaces do Docker Compose para manter as portas TCP dos servidores internos isoladas dentro da rede bridge interna, impedindo qualquer exposição de portas para a máquina host ou internet pública.
- **Servidores MCP Estruturados**: Configuração de ambientes conteinerizados para:
  - `GitHub MCP`: Controle de versão, gestão de issues e buscas de código.
  - `Context7 MCP`: Motor de busca de documentações atualizadas (React 19, Fastify 5, Three.js).
  - `Docker Hub MCP`: Varreduras no registro de imagens de container.

### Scripts de Automação
- **Scripts de Compilação TypeScript**: Desenvolvimento de utilitários em TypeScript (`generate-changelog.ts` e `generate-roadmap.ts`) rodando sob `tsx` para compilar e atualizar logs e roadmaps diretamente no diretório raiz do repositório.

### Agentes de IA Conteinerizados (`tools/agents`)
- **Provisionamento de CLI via Docker**: Arquitetura e implementação de um novo workspace `tools/agents` que provisiona as CLIs do GitHub Copilot e Google Antigravity como serviços Docker de longa duração, eliminando instalações manuais de CLI no host.
- **Injeção de Configuração Unificada**: Ambas as CLIs compartilham um único arquivo `mcp_config.json` e um diretório unificado `skills/`, injetados via montagens de volume (bind mounts) na inicialização do container. Nenhuma configuração é embutida nas camadas de imagem.
- **Persistência de Sessão e Cérebro**: Tokens OAuth, históricos de conversa e dados em tempo de execução são persistidos na máquina hospedeira via volumes bind-mounted ignorados pelo Git, sobrevivendo a reconstruções de container.
- **Configurações TUI Versionadas**: Arquivos como `settings.json`, `statusline.sh` e `title.sh` do Antigravity são rastreados no repositório e montados sobre o diretório de execução do container, dando controle direto sobre o comportamento da CLI sem configurações locais manuais.
- **Roteamento de Rede Interna**: Containers de agentes se conectam à rede bridge `elo-mcp-net` declarada pela stack MCP, resolvendo todos os serviços MCP pelo alias interno `elo.internal.tools:3000` sem expor portas adicionais no host.
- **Docker-out-of-Docker (DooD)**: Ambos os containers montam o socket Docker do host, permitindo que agentes conteinerizados orquestrem outras stacks do monorepo (ex: `pnpm mcp:up`, `pnpm instance:up`) de dentro do container.
- **Integração com Tarefas do VS Code**: Tarefas registradas no `.vscode/tasks.json` usando os prefixos `[Docker]` e `[Host]` para diferenciar claramente a execução de CLI baseada em container da global durante o período de transição.

## Foco Planejado
- **Validação da Stack de Agentes**: Testes de ponta a ponta de conectividade MCP, persistência de OAuth e integridade de montagens de volume a partir de sessões de agentes conteinerizados.
- **Autenticação com Bypass de Token de Agente**: Implementar autenticação direta por chave de API para as CLIs de agentes usando variáveis (ex: `GEMINI_API_KEY`, `GITHUB_TOKEN`) declaradas em `.env.agents`, contornando o OAuth interativo e provisionando credenciais automaticamente na primeira inicialização.
- **Desativação de CLI do Host**: Após a validação completa da stack de agentes, remover as instalações globais das CLIs no host e apagar os diretórios legados `.agents/` e `.github/copilot/`.
- **Integrações de CI/CD**: Desenvolvimento de validadores de contexto e scripts de check.
- **Relatórios Automatizados em Sandbox**: Exposição de painéis de cobertura e testes em tempo de execução para os agentes locais de IA.
