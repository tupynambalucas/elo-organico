FROM node:20-bookworm

# Install Playwright system dependencies and Google Chrome
RUN npx -y playwright@1.58.2 install --with-deps chrome

# Install socat
RUN apt-get update && apt-get install -y socat && rm -rf /var/lib/apt/lists/*

# Pre-install @playwright/mcp globally at build time to prevent dynamic runtime download corruptions
RUN npm install -g @playwright/mcp

EXPOSE 3003
ENTRYPOINT ["socat", "TCP-LISTEN:3003,reuseaddr,fork", "EXEC:\"npx --no-install @playwright/mcp\""]
