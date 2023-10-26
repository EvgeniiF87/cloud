import { logger } from '../utils/loger.js';
import { UploadService } from '../services/upload-service.js';
import { ChangeImageInput, CreateImageInput, CreateImageRespose, FileImage } from '../DTO/uploads-dto.js';
import { ErrorResponse } from '../types/index.js';

export class UploadController {
  private service: UploadService;

  constructor() {
    this.service = new UploadService();
  }

  /** Получаем сообщение c main server */
  async processTask(task: { action: string; payload?: any; pattern?: string; }) {
    let result = null;
 
    try {

      if (task.pattern === 'hello') { 
        const res = {
          data: { message: 'test return success' },
          result: 'success',
          message: 'test return success',
        }
        result =  res
      }


      switch (task.action) {
        case 'createImage':
          result = await this.createImage(task.payload);
          break;
        case 'removeImage':
          result = await this.removeImage(task.payload);
          break;
        case 'changeImage':
          result = await this.changeImage(task.payload);
          break;
        // default:
        //   throw new Error('Invalid task');
      }

      return result;
    } catch (error) {
      logger.error('Failed to task procces message:', error);
      throw error;
    }
  }

  /** Создание изображения */
  private createImage = async (body: CreateImageInput): Promise<CreateImageRespose | ErrorResponse> => {
    try {
      return await this.service.createImage(body);
    } catch (error) {
      logger.error('Failed to create image:', error);
      return { result: 'error', message: `${error}`, data: null };
    }
  };

  /** Удаление изображения */
  private removeImage = async (payload: { path: string }): Promise<any> => {
    try {
      return await this.service.removeImage(payload);
    } catch (error) {
      logger.error('Failed to remove image:', error);
      throw error;
    }
  };

  /** Удаление изображения */
  private changeImage = async (payload: ChangeImageInput): Promise<any> => {
    try {
      return await this.service.changeImage(payload); 
    } catch (error) {
      logger.error('Failed to remove image:', error);
      throw error;
    }
  };
}
