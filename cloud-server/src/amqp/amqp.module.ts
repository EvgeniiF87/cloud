import { Module } from '@nestjs/common';
import { AmqpService } from './amqp.service';


@Module({
  exports: [AmqpService]
})
export class AmqpModule {}