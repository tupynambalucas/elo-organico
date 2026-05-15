FROM node:20-bookworm

# Instala as dependências do Playwright e o Google Chrome
RUN npx -y playwright@1.58.2 install --with-deps chrome

# Instala o servidor MCP do Playwright globalmente ou usa npx
WORKDIR /app

# Executa o servidor MCP
CMD ["npx", "-y", "@playwright/mcp"]
