import type { FastifyPluginAsync, FastifyInstance } from 'fastify';
import authRoutes from '../domains/auth/auth.routes.js';
import cycleRoutes from '../domains/cycle/cycle.routes.js';
import productRoutes from '../domains/product/product.routes.js';

const apiPlugin: FastifyPluginAsync = async function (server: FastifyInstance) {
  await server.register(authRoutes, { prefix: 'auth' });
};

export default apiPlugin;
