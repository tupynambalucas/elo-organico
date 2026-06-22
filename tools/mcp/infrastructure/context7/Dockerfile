FROM node:20-alpine

# Install socat
RUN apk add --no-cache socat

# Install Context7 MCP globally
RUN npm install -g @upstash/context7-mcp

EXPOSE 3002
ENTRYPOINT ["socat", "TCP-LISTEN:3002,reuseaddr,fork", "EXEC:\"context7-mcp\""]