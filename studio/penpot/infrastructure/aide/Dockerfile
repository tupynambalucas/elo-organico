FROM node:22-slim

# Instala dependências do sistema para o Sharp (usado pelo Penpot MCP)
RUN apt-get update && apt-get install -y libvips-dev && \
    rm -rf /var/lib/apt/lists/*

# Ativa a pnpm e FIXA na mesma versão do seu projeto (10.33.4)
RUN corepack enable pnpm && corepack prepare pnpm@10.33.4 --activate

# Configura as permissões de build para a pnpm v10
# Usamos variáveis de ambiente que funcionam globalmente na v10
ENV NPM_CONFIG_ONLY_BUILT_DEPENDENCIES=esbuild,sharp
ENV PNPM_CONFIG_ONLY_BUILT_DEPENDENCIES=esbuild,sharp

WORKDIR /app

# No pnpm v10, o dlx exige o sinal de igual (=) para a flag --allow-build.
# O formato correto é --allow-build=esbuild,sharp
CMD ["pnpm", "dlx", "--allow-build=esbuild,sharp", "@penpot/mcp@2.14.1"]
