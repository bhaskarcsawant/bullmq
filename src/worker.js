import { Queue, Worker } from "bullmq";

const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};
console.log('connection', connection);
// Initialize the queue
const myQueue = new Queue('myQueue', { connection });

// Add a job to the queue if it's empty (for demo purposes)
myQueue.getJobCounts().then((counts) => {
    if (counts.waiting === 0 && counts.active === 0) {
        console.log('Queue is empty, adding a demo job.');
        myQueue.add('myJob', { foo: 'bar' });
    }
});

// Worker logic to process jobs
const worker = new Worker('myQueue', async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Job ${job.id} processed successfully`);
}, { connection });

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
});

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
});
