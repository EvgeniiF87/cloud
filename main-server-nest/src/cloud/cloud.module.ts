import { Module } from '@nestjs/common';
import { AmqpService } from 'src/amqp/amqp.service';
import { CloudController } from './cloud.controller';
import { AmqpModule } from 'src/amqp/amqp.module';

@Module({
  imports: [AmqpModule],
  controllers: [CloudController],
})
export class CloudModule {}
