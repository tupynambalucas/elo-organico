import fp from 'fastify-plugin';
import type { FastifyPluginAsync, FastifyInstance } from 'fastify';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';

/**
 * Resolves the canonical connection URI, enforcing the `elodb` database name
 * regardless of what database name is specified in the raw MONGO_URI env var.
 *
 * This guarantees consistent database naming across dev, staging, and
 * production (MongoDB Atlas) environments.
 */
function resolveMongoUri(rawUri: string): string {
  const TARGET_DB = 'elodb';

  try {
    const url = new URL(rawUri);
    url.pathname = `/${TARGET_DB}`;
    return url.toString();
  } catch {
    return rawUri;
  }
}

const MongoosePlugin: FastifyPluginAsync = async (server: FastifyInstance) => {
  try {
    const mongoUri = resolveMongoUri(server.config.MONGO_URI);

    server.log.info(`🔌 [MongoosePlugin] Connecting to database "elodb"...`);

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    server.log.info('✅ [MongoosePlugin] Mongoose connected successfully.');

    server.decorate('mongoose', connection);

    const models = {
      User,
    };

    server.decorate('models', models);
    server.log.info('📚 [MongoosePlugin] Mongoose models decorated.');

    server.addHook('onClose', async (instance) => {
      await instance.mongoose.connection.close();
      instance.log.info('[MongoosePlugin] Mongoose connection closed.');
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

export default fp(MongoosePlugin, { name: 'mongoose-plugin' });
