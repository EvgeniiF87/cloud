import { Controller, Get } from '@nestjs/common';
import { RabbitService } from './rabbit.sercive';



@Controller()
export class RabbitController {
  constructor(private readonly rabbitService: RabbitService) {}

  @Get('/test')
  pingServiceA() {
    return this.rabbitService.test();
  } 
}