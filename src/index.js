import { Queue } from "bullmq";

export const redisOptions = { host: "my-redis-0001-001.my-redis.2hucrp.use2.cache.amazonaws.com", port: 6379 };
const myQueue = new Queue("myQueue1", { connection: redisOptions });

const addJob = async (job) => {
  await myQueue.add(job.name, job, {});
  console.log(`Job ${job.name} added to the queue yoooo`);
}

export const welcomeMessage = (data) => {
  console.log("Sending a welcome message every few seconds", data.data.message);
};

setInterval(() => {
  addJob({ name: "welcomeMessage", message: Math.random() });
}, 1000)

