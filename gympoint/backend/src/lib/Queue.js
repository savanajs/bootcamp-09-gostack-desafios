import Bee from 'bee-queue';

import SendMailAnswerStudent from '../app/jobs/SendMailAnswerStudent';
import SendMailEnrollmentCreated from '../app/jobs/SendMailEnrollmentCreated';

import redisConfig from '../config/redis';

const jobs = [SendMailEnrollmentCreated, SendMailAnswerStudent];

class Queue {
  constructor() {
    // Inserir todos os jobs na fila
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // Guarda a fila no redis
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        // Executa o job
        handle,
      };
    });
  }

  // Adicionar novos jobs na fila
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
