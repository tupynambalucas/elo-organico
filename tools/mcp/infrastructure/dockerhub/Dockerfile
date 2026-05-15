# PROFESSIONAL MULTI-STAGE DOCKERFILE FOR DOCKER HUB MCP SERVER
# Repository: https://github.com/docker/hub-mcp

# --- Build Stage ---
FROM node:22-slim AS builder

# Install git for cloning
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Clone the official repository
RUN git clone https://github.com/docker/hub-mcp.git .

# Install all dependencies (including devDependencies for build)
RUN npm install

# Build the project (generates dist/ folder)
RUN npm run build

# Prune development dependencies to keep the image slim
RUN npm prune --omit=dev


# --- Runtime Stage ---
FROM node:22-slim

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# The server requires HUB_PAT_TOKEN environment variable for authenticated access.
# Optional: HUB_USERNAME can be passed to enable repository management.

# We use a shell wrapper to optionally pass the --username flag if HUB_USERNAME is defined
ENTRYPOINT ["sh", "-c", "node dist/index.js --transport=stdio ${HUB_USERNAME:+--username=$HUB_USERNAME}"]
