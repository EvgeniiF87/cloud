import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, RmqContext, RmqRecordBuilder } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class RabbitService {
  constructor(
    @Inject('UPLOAD_SERVICE') private readonly uploadService: ClientProxy,

  ) {}


 async test() {
    try {
      let result = null;

      const message = ':cat:';
      const record = new RmqRecordBuilder(message)

      return new Promise((resolve, reject) => {
        this.uploadService.send('hello', record)
        .subscribe(data => {
          if (data.result === 'success') {
            resolve(data)
          } else {
            reject({ data: null, result: 'error', message: data.message })
          } 
          this.uploadService.close()
        })
      })


      

      // const task = {
      //   action: 'hello',
      //   payload: { massage: 'hello' } 
      // }
      // await this.uploadService.connect()
      //  const result = await this.uploadService.send<any>(task.action, task.payload).toPromise();
      // console.log(result)
      //  await this.uploadService.close()
      //  return result
    } catch (error) {
      console.log(error)
    }
  }

}