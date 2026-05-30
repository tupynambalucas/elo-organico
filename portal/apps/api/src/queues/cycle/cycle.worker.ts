import { Worker } from 'bullmq';
import type { FastifyInstance } from 'fastify';
import { connection } from '../../config/redis.js';
import { CYCLE_QUEUE_NAME } from './cycle.queue.js';
import { cycleProcessor } from './cycle.processor.js';

export const createCycleWorker = (server: FastifyInstance) => {
  const worker = new Worker(CYCLE_QUEUE_NAME, cycleProcessor, {
    connection,
    concurrency: 1,
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 500 },
  });

  worker.on('completed', (job) => {
    server.log.info(`[Queue: ${CYCLE_QUEUE_NAME}] Job ${job.id} completado.`);
  });

  worker.on('failed', (job, err) => {
    server.log.error(err, `[Queue: ${CYCLE_QUEUE_NAME}] Job ${job?.id} falhou.`);
  });

  return worker;
};
