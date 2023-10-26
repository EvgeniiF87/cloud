import amqp from 'amqplib';
import { UploadController } from '../controllers/api-upload-controllers.js';
import { logger } from '../utils/loger.js';


export class UploadsAmqpService {
  private controller: UploadController;
  private queueName = 'upload-api';
  private urlAmqp = 'amqp://78.24.180.193:5672';
  // private urlAmqp = 'amqp://localhost:5672';

  constructor() {
    this.controller = new UploadController()
  } 

  async startConsumer() {
    try {
      const connection = await amqp.connect(this.urlAmqp);
      const channel = await connection.createChannel();

      await channel.assertQueue(this.queueName, { durable: true });
      await channel.prefetch(1);
      logger.info('Microservice Uploads is waiting for tasks...');

      /** Получение задания из очереди */
      channel.consume(this.queueName, async (message) => {
        if (!message) {
          throw new Error('Failed to message in consumer');
        }

        const task = JSON.parse(message.content.toString());

        const result = await this.controller.processTask(task);
        logger.info('Microservice Uploads completed task!');
   
        /** Помещение результата обработки задания в очередь */
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(result)), {
          correlationId: message.properties.correlationId,
        });

        /** Подтверждение обработки задания */
        channel.ack(message);
      });
    } catch (error) {
      logger.error('Error:', error);
    }
  }
}

export const uploadsAmqpService = new UploadsAmqpService()