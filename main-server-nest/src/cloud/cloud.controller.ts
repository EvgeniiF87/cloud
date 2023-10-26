import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AmqpService } from 'src/amqp/amqp.service';
import { ChangeImageInput, CreateImageInput } from './DTO/image-dto.inputs';
import { ImageResponse } from './DTO/image-dto.response';

@Controller()
export class CloudController {
  private readonly queueName = 'upload-api';

  constructor(private readonly AmqpService: AmqpService) {}

  @Post('/api/image-create')
  @UseInterceptors(FileInterceptor('image'))
  async createImage(
    @UploadedFile() file: File,
    @Query() req: CreateImageInput,
  ): Promise<ImageResponse> {
    try {
      const { dir, w, h } = req;

      if (!file || !dir) {
        throw new HttpException(
          'Failed empty file or dir',
          HttpStatus.BAD_REQUEST,
        );
      }

      const task = {
        action: 'createImage',
        payload: { file, w, h, dir },
      };

      const newImageUrl = (await this.AmqpService.createTask(
        this.queueName,
        task,
      )) as ImageResponse;

      if (newImageUrl.result !== 'success') {
        throw new HttpException(newImageUrl.message, HttpStatus.BAD_REQUEST);
      }

      return newImageUrl;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/api/image-remove')
  async removeImage(@Query() req: { path: string }): Promise<ImageResponse> {
    const { path } = req;

    try {
      if (!path) {
        throw new HttpException(
          'Path in query params is empty',
          HttpStatus.BAD_REQUEST,
        );
      }

      const task = {
        action: 'removeImage',
        payload: { path },
      };

      const removeImage = (await this.AmqpService.createTask(
        this.queueName,
        task,
      )) as ImageResponse;

      if (removeImage.result !== 'success') {
        throw new HttpException(removeImage.message, HttpStatus.BAD_REQUEST);
      }

      return removeImage;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/api/image-change')
  @UseInterceptors(FileInterceptor('image'))
  async changeImage(
    @UploadedFile() file: File,
    @Query() req: ChangeImageInput,
  ): Promise<ImageResponse> {
    const { dir, path, h, w } = req;

    try {
      if (!file || !dir || !path) {
        throw new HttpException(
          'Failed to empty file or dir or path',
          HttpStatus.BAD_REQUEST,
        );
      }

      const task = {
        action: 'changeImage',
        payload: { path, file, dir, w, h },
      };

      const changeImage = (await this.AmqpService.createTask(
        this.queueName,
        task,
      )) as ImageResponse;

      if (changeImage.result !== 'success') {
        throw new HttpException(changeImage.message, HttpStatus.BAD_REQUEST);
      }

      return changeImage;
    } catch (error) {
      console.log(error);
    }
  }
}
