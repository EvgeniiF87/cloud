import { Module } from '@nestjs/common';
import { RabbitController } from './rabbit.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitService } from './rabbit.sercive';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://78.24.180.193:5672'],
          queue: 'upload-api', 
          noAck: false,
          queueOptions: {
            durable: true 
          },
        },
      },
    ]),
  ],
  controllers: [RabbitController],
  providers: [RabbitService],
})
export class RabbitModule {}