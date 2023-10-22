import { Response } from 'express-serve-static-core';
import { RabbitAmqpService } from '../services/index.js';
import { IRequestParams, IRequestBody, ResponseType } from '../types/index.js';
import { logger } from '../utils/index.js';

export class UploadsController {
  private amqpService: RabbitAmqpService
  private queueName = 'upload-api';

  constructor() {
    this.amqpService = new RabbitAmqpService()
  }

  errorMessage(res: Response<unknown, Record<string, any>, number>, message: string) {
    return res.status(400).json({ data: null, message: message, status: 'error' });
  }

  /** Создание изображения */
 createImage = async(req: IRequestBody<{ files: {preview: File} }>, res: Response<unknown | {error: string, errorMessage: unknown}>) => {
    try {
      if (!req.is('multipart/form-data')) {
      return  this.errorMessage(res, 'Invalid content type')
      }

      if (!req.files) {
        return  this.errorMessage(res, 'Failed files formData')
      }

      const file = req.files.preview 
  
      if (!file) {
        return  this.errorMessage(res, 'No file uploaded')
      }

      const { w, h, dir } = req.query
 
      const task = {
        action: 'createImage',
        payload: { file, w, h, dir }
      }

      const newImageUrl = await this.amqpService.createTask(this.queueName, task) as ResponseType

      if (newImageUrl.result !== 'success') {
        return  this.errorMessage(res, newImageUrl.message)
      }
 
      res.status(201).json(newImageUrl);
    } catch (error) {
      logger.error('Failed to create image11:', error);
      res.status(500).json({ data: null, message: error, status: 'error' });
    }
  };

  /** Удаление изображения */
 removeImage = async(req: IRequestParams<{ path: string }>, res: Response<unknown>) => {
    try {
      const { path } = req.query

      if (!path) {
        return  this.errorMessage(res, 'Failed to path in image')
      }

      const task = {
        action: 'removeImage',
        payload: { path }
      }

    const removeImage = await this.amqpService.createTask(this.queueName, task) as ResponseType

    if (removeImage.result !== 'success') {
      return this.errorMessage(res, 'Failed remove image in upload service')
    }

    res.status(201).json(removeImage);
    } catch (error) {
      logger.error('Failed to remove image:', error);
      res.status(500).json({ data: null, message: error, status: 'error' });
    }
  };

  /** Замена изображения */
 changeImage = async(req: IRequestParams<{ path: string }>, res: Response<unknown>) => {
    try {
      if (!req.is('multipart/form-data')) {
        return  this.errorMessage(res, 'Invalid content type')
        }
  
        if (!req.files) {
          return  this.errorMessage(res, 'Failed files formData')
        }
  
        const file = req.files.preview 

        if (!file) {
          return  this.errorMessage(res, 'No file uploaded')
        }

      const { path, dir } = req.query

      if (!path || ! dir) {
        return  this.errorMessage(res, 'Failed to path or dir query')
      }

      const task = {
        action: 'changeImage',
        payload: { path, file, dir }
      }

    const changeImage = await this.amqpService.createTask(this.queueName, task) as ResponseType

    if (changeImage.result !== 'success') {
      return this.errorMessage(res, changeImage.message)
    }

    res.status(201).json(changeImage);
    } catch (error) {
      logger.error('Failed to remove image:', error);
      res.status(500).json({ data: null, message: error, status: 'error' });
    }
  };


}


export const uploadsController = new UploadsController()