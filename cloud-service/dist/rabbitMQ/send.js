import amqp from 'amqplib';
import { logger } from '../utils/loger.js';
const queueName = 'green-api';
export const sendConnection = async () => {
    try {
        const task = {
            name: 'Ruslan',
            age: 37
        };
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(task)), { persistent: true });
        await channel.close();
        await connection.close();
    }
    catch (error) {
        logger.error('Failed to send add task message', error);
    }
};
