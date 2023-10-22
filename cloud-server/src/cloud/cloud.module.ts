import { Module } from '@nestjs/common';
import { AmqpService } from 'src/amqp/amqp.service';
import { CloudController } from './cloud.controller';

@Module({
  imports: [],
  controllers: [CloudController],
  providers: [AmqpService],
})
export class CloudModule {}
