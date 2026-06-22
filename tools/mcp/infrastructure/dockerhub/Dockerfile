# --- Build Stage ---
FROM node:22-slim AS builder

# Install git for cloning
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Clone the official repository
RUN git clone https://github.com/docker/hub-mcp.git .

# Install dependencies and build
RUN npm install && npm run build && npm prune --omit=dev

# --- Runtime Stage ---
FROM node:22-slim

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Install socat
RUN apt-get update && apt-get install -y socat && rm -rf /var/lib/apt/lists/*

EXPOSE 3004
ENTRYPOINT ["sh", "-c", "if [ -n \"$HUB_USERNAME\" ]; then exec socat TCP-LISTEN:3004,reuseaddr,fork EXEC:\"node dist/index.js --transport=stdio --username $HUB_USERNAME\"; else exec socat TCP-LISTEN:3004,reuseaddr,fork EXEC:\"node dist/index.js --transport=stdio\"; fi"]
