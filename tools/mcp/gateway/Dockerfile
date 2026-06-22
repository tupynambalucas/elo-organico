FROM node:20-alpine

WORKDIR /app

# Install Fastify gateway dependencies, the official MCP SDK, and tsx for TypeScript execution
RUN npm install fastify@^5.7.4 @modelcontextprotocol/sdk@^1.0.1 tsx@^4.19.3

# Copy the TypeScript gateway server
COPY gateway/server.ts ./gateway/server.ts

ENV PORT=3000

CMD ["npx", "tsx", "gateway/server.ts"]
