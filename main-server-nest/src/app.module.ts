import { Module } from '@nestjs/common';

import { CloudModule } from './cloud/cloud.module';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [CloudModule, RabbitModule],
})
export class AppModule {}
