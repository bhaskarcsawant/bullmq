import { Worker } from "bullmq";
import { welcomeMessage, redisOptions } from "./index.js";

const jobHandlers = {
  welcomeMessage: welcomeMessage,
};

const processJob = async (job) => {
  const handler = jobHandlers[job.name];

  if (handler) {
    console.log(`Processing job: ${job.name}`);
    await handler(job);
  }
};

const worker = new Worker("myQueue1", processJob , { connection: redisOptions });


worker.on("completed", (job) => {
  console.log(`${job.name} has completed! by - 0`);
});

worker.on("failed", (job, err) => {
  console.log(`${job.name} has failed with ${err.message}`);
});

console.log("Worker started!");