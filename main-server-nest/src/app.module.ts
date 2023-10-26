import { Module } from '@nestjs/common';

import { CloudModule } from './cloud/cloud.module';
import { RabbitModule } from './rabbit/rabbit.module';
import { AmqpModule } from './amqp/amqp.module';

@Module({
  imports: [CloudModule, RabbitModule, AmqpModule],
})
export class AppModule {}
