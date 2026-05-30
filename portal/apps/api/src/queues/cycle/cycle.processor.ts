import type { Job } from 'bullmq';

export const cycleProcessor = async (job: Job) => {
  // Logic for cycle management
  // Example: Archive expired cycles
  console.info(`[Queue] Processing job ${job.id} of type ${job.name}`);
  
  // Here we would call cycleService methods
  // For now, it's a placeholder following SOLID
};
