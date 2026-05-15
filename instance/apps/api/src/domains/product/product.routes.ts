import type { FastifyPluginAsync } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { listProductsSchema } from './product.schema.js';

const productRoutes: FastifyPluginAsync = (server) => {
  const app = server.withTypeProvider<ZodTypeProvider>();
  const controller = server.productController;

  app.get(
    '/admin/products',
    {
      schema: listProductsSchema,
      preHandler: [server.authenticate, server.verifyAdmin],
    },
    controller.listHandler,
  );

  return Promise.resolve();
};

export default productRoutes;
