import amqp from 'amqplib';
import { logger } from '../utils/loger.js';

export class RabbitAmqpService {
  private urlAmqp = 'amqp://localhost';

  /** Создание задачи */
  async createTask(queueName: string, task: object) { 
    try {
      const connection = await amqp.connect(this.urlAmqp);
      const channel = await connection.createChannel();

      const resultQueue = await this.createRandomQueue(channel);
      
      const resultPromise = new Promise((resolve) => {
        channel.consume(
          resultQueue.queue,
          async (message) => {
            if (!message) throw new Error('Failed to receive message');
            const result = JSON.parse(message.content.toString());
            
            this.closeChanel(channel, connection) 
            
            resolve(result);
          },
          { noAck: true },
          );
          
        });

    await this.addTaskQueue(queueName, channel, task, resultQueue)
    
      return resultPromise;
    } catch (error) {
      logger.error('Failed to  create task message', error);
    }
  }

  /** Публикация задания в очереди */
  async addTaskQueue(queueName: string, channel: amqp.Channel, task: object, resultQueue: amqp.Replies.AssertQueue) {
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(task)), {
        persistent: true,
        replyTo: resultQueue.queue,
      }); 
  }

  /** Создание временной очереди для получения результата */
  async createRandomQueue(channel: amqp.Channel) {
    return await channel.assertQueue('', { exclusive: true });
  }

  /** Закрываем соединение */
  async closeChanel(channel: amqp.Channel, connection: amqp.Connection) {
    channel.close();
    connection.close();
  }


}

