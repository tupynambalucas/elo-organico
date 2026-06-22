/* eslint-disable import/no-unresolved */
import Fastify from 'fastify';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type JSONRPCMessage,
} from '@modelcontextprotocol/sdk/types.js';
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
/* eslint-enable import/no-unresolved */
import * as net from 'net';
import * as fs from 'fs';
import * as path from 'path';

const PORT = Number(process.env.PORT) || 3000;
const CONTEXT_DIR = '/app/context';

// 1. Custom TCP Client Transport for MCP Stdio-to-TCP Bridged Containers
export class TCPClientTransport implements Transport {
  private socket: net.Socket | null = null;
  private buffer = '';
  public onclose?: () => void;
  public onerror?: (error: Error) => void;
  public onmessage?: (message: JSONRPCMessage) => void;

  constructor(
    private host: string,
    private port: number,
  ) {}

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = net.connect({ host: this.host, port: this.port }, () => {
        console.info(`[TCP] Connected to upstream socket at ${this.host}:${this.port}`);
        resolve();
      });

      this.socket.on('data', (data) => {
        this.buffer += data.toString();
        let newlineIndex: number;
        while ((newlineIndex = this.buffer.indexOf('\n')) !== -1) {
          const line = this.buffer.substring(0, newlineIndex).trim();
          this.buffer = this.buffer.substring(newlineIndex + 1);
          if (line !== '') {
            try {
              const message = JSON.parse(line) as JSONRPCMessage;
              this.onmessage?.(message);
            } catch (err) {
              console.error(
                `[TCP] Failed to parse JSON message from ${this.host}:${this.port}:`,
                err,
                'Raw line:',
                line,
              );
              this.onerror?.(err as Error);
            }
          }
        }
      });

      this.socket.on('close', () => {
        this.onclose?.();
      });

      this.socket.on('error', (err) => {
        console.error(`[TCP] Socket error on ${this.host}:${this.port}:`, err);
        this.onerror?.(err);
        reject(err);
      });
    });
  }

  send(message: JSONRPCMessage): Promise<void> {
    if (this.socket === null) {
      return Promise.reject(new Error('Socket is not connected'));
    }
    this.socket.write(JSON.stringify(message) + '\n');
    return Promise.resolve();
  }

  close(): Promise<void> {
    this.socket?.destroy();
    return Promise.resolve();
  }
}

// 2. Consolidate Context Guidelines at startup
let consolidatedInstructions = 'Elo Orgânico Federated MCP Gateway Guidelines:\n\n';
function loadContextFilesRecursively(dir: string): void {
  if (fs.existsSync(dir) === false) {
    return;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() === true) {
      loadContextFilesRecursively(fullPath);
    } else if (entry.isFile() === true && entry.name.endsWith('.md') === true) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8').trim();
        const relativeDir = path.relative(CONTEXT_DIR, dir);
        const sectionTitle =
          relativeDir !== ''
            ? relativeDir.toUpperCase()
            : path.basename(entry.name, '.md').toUpperCase();
        consolidatedInstructions += `## Guidelines for ${sectionTitle}:\n${content}\n\n`;
      } catch (err) {
        console.error(`[Gateway] Failed to read context file at ${fullPath}:`, err);
      }
    }
  }
}

try {
  loadContextFilesRecursively(CONTEXT_DIR);
  console.info(
    `[Gateway] Loaded and consolidated context rules (len=${consolidatedInstructions.length})`,
  );
} catch (err) {
  console.error('[Gateway] Failed to load context directory:', err);
}

// 3. Define upstream configurations
const upstreams = [
  { id: 'github', host: 'elo-mcp-github', port: 3001 },
  { id: 'context7', host: 'elo-mcp-context7', port: 3002 },
  { id: 'browser', host: 'elo-mcp-browser', port: 3003 },
  { id: 'dockerhub', host: 'elo-mcp-dockerhub', port: 3004 },
];

const connectedClients = new Map<string, Client>();

async function initUpstreams(): Promise<void> {
  for (const target of upstreams) {
    try {
      const transport = new TCPClientTransport(target.host, target.port);
      const client = new Client(
        { name: `gateway-to-${target.id}`, version: '1.0.0' },
        { capabilities: {} },
      );
      await client.connect(transport);
      connectedClients.set(target.id, client);
      console.info(`[Gateway] Registered upstream client: ${target.id}`);
    } catch (err) {
      console.error(`[Gateway] Failed to connect to upstream ${target.id}:`, err);
    }
  }
}

// 4. Factory function to create a new Federated MCP Server instance per connection
function createMcpServer(): McpServer {
  console.info('[Gateway] Creating new McpServer instance for connection');
  const mcpServer = new McpServer(
    {
      name: 'elo-mcp-gateway',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
      instructions: consolidatedInstructions,
    },
  );

  const federatedServer = mcpServer.server;

  federatedServer.setRequestHandler(ListToolsRequestSchema, async () => {
    console.info('[Gateway] Handling listTools request');
    const aggregatedTools = [];

    for (const [clientId, client] of connectedClients.entries()) {
      try {
        const response = await client.listTools();
        // Prefix tools to prevent collision (e.g. github__search_repositories)
        const prefixedTools = response.tools.map((tool) => ({
          ...tool,
          name: `${clientId}__${tool.name}`,
        }));
        aggregatedTools.push(...prefixedTools);
      } catch (err) {
        console.error(`[Gateway] Failed to fetch tools from ${clientId}:`, err);
      }
    }

    console.info(`[Gateway] Returning ${aggregatedTools.length} aggregated tools`);
    return { tools: aggregatedTools };
  });

  federatedServer.setRequestHandler(CallToolRequestSchema, async (request) => {
    const nameParts = request.params.name.split('__');
    if (nameParts.length < 2) {
      const errorMsg = `Invalid prefixed tool name: ${request.params.name}`;
      console.error(`[Gateway] ${errorMsg}`);
      throw new Error(errorMsg);
    }
    const clientId = nameParts[0];
    const originalToolName = nameParts.slice(1).join('__');

    console.info(`[Gateway] Call request for MCP: ${clientId}, tool: ${originalToolName}`);

    const client = connectedClients.get(clientId);
    if (client === undefined) {
      const errorMsg = `Upstream client '${clientId}' is not connected`;
      console.error(`[Gateway] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    try {
      const result = await client.callTool({
        name: originalToolName,
        arguments: request.params.arguments,
      });
      console.info(`[Gateway] Call success: ${clientId}__${originalToolName}`);
      return result;
    } catch (err) {
      console.error(`[Gateway] Call failed for ${clientId}__${originalToolName}:`, err);
      throw err;
    }
  });

  return mcpServer;
}

// 5. Fastify SSE Server transport bridge
const app = Fastify({
  logger: false,
});

app.options('/*', async (_request, reply) => {
  console.info('[Gateway] OPTIONS preflight request received');
  void reply.header('Access-Control-Allow-Origin', '*');
  void reply.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  void reply.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Mcp-Session-Id, X-Session-Id, Mcp-Protocol-Version',
  );
  return reply.status(200).send();
});

const transports = new Map<string, SSEServerTransport>();

app.get('/sse', async (request, reply) => {
  const ip = request.ip;
  console.info(`[Gateway] Request received on /sse (Method: GET, IP: ${ip})`);

  // Pre-set CORS headers on raw response
  reply.raw.setHeader('Access-Control-Allow-Origin', '*');
  reply.raw.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  reply.raw.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Mcp-Session-Id, X-Session-Id, Mcp-Protocol-Version',
  );

  const transportInstance = new SSEServerTransport('/messages', reply.raw);
  console.info(
    `[Gateway] Instantiated SSEServerTransport with sessionId: ${transportInstance.sessionId}`,
  );
  transports.set(transportInstance.sessionId, transportInstance);

  reply.raw.on('close', () => {
    console.info(`[Gateway] SSE connection closed for session: ${transportInstance.sessionId}`);
    transports.delete(transportInstance.sessionId);
  });

  try {
    const serverInstance = createMcpServer();
    await serverInstance.connect(transportInstance);
    console.info(
      `[Gateway] Connected server instance to transport for session: ${transportInstance.sessionId}`,
    );
    reply.sent = true;
  } catch (err) {
    console.error(
      `[Gateway] Failed to connect transport for session ${transportInstance.sessionId}:`,
      err,
    );
    // Remove from active transports map on failure
    transports.delete(transportInstance.sessionId);
    // Explicitly write error header and payload if not already flushed
    if (reply.raw.headersSent === false) {
      reply.raw.writeHead(500, { 'Content-Type': 'application/json' });
      reply.raw.end(
        JSON.stringify({
          error: 'Failed to establish connection to MCP server',
          details: String(err),
        }),
      );
    }
  }
});

app.post('/messages', async (request, reply) => {
  const ip = request.ip;
  const sessionId = (request.query as { sessionId?: string }).sessionId;
  console.info(
    `[Gateway] Request received on /messages (Method: POST, IP: ${ip}, Session: ${sessionId})`,
  );

  reply.raw.setHeader('Access-Control-Allow-Origin', '*');
  reply.raw.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  reply.raw.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Mcp-Session-Id, X-Session-Id, Mcp-Protocol-Version',
  );

  if (sessionId === undefined) {
    console.warn('[Gateway] POST /messages request missing sessionId query parameter');
    return reply.status(400).send('Missing sessionId query parameter');
  }

  const transportInstance = transports.get(sessionId);
  if (transportInstance === undefined) {
    console.warn(`[Gateway] POST /messages: Session '${sessionId}' not found in active transports`);
    return reply.status(404).send('Session not found');
  }

  try {
    console.info(
      `[Gateway] Forwarding POST message body to transport handlePostMessage for session: ${sessionId}`,
    );
    await transportInstance.handlePostMessage(request.raw, reply.raw, request.body);
    console.info(`[Gateway] POST message successfully handled for session: ${sessionId}`);
    reply.sent = true;
  } catch (err) {
    console.error(`[Gateway] Error handling post message for session ${sessionId}:`, err);
    if (reply.raw.headersSent === false) {
      reply.raw.writeHead(500, { 'Content-Type': 'application/json' });
      reply.raw.end(
        JSON.stringify({ error: 'Internal gateway error handling message', details: String(err) }),
      );
    }
  }
});

const start = async (): Promise<void> => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.info(`[Gateway] Federated Gateway running on 0.0.0.0:${PORT}`);
    void initUpstreams();
  } catch (err: unknown) {
    console.error('[Gateway] Failed to start server:', err);
    process.exit(1);
  }
};

void start();
