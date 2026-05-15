import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { Worker } from 'bullmq';
import { cycleQueue, CYCLE_QUEUE_NAME, connection } from '../config/queueConfig.js';

interface QueuePluginOptions {}

const queuePlugin: FastifyPluginAsync<QueuePluginOptions> = async (server, opts) => {
  const { cycleService } = opts;
  const worker = new Worker(CYCLE_QUEUE_NAME, async (job) => {}, {
    connection,
    concurrency: 1,
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 500 },
  });

  worker.on('completed', (job) => {
    server.log.info(`[Queue] Job ${job.id} completado.`);
  });

  worker.on('failed', (job, err) => {
    server.log.error(err, `[Queue] Job ${job?.id} falhou.`);
  });

  const scheduleJobs = async () => {
    await cycleQueue.add();
    server.log.info('[Queue] Job de arquivamento agendado.');
  };

  await scheduleJobs();

  server.addHook('onClose', async () => {
    await worker.close();
    await cycleQueue.close();
  });
};

export default fp(queuePlugin);
