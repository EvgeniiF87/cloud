import { logger } from '../utils/loger.js';
import { UploadService } from '../services/upload-service.js';
export class UploadController {
    constructor() {
        this.createImage = async (body) => {
            try {
                return await this.service.createImage(body);
            }
            catch (error) {
                logger.error('Failed to create image:', error);
                return { result: 'error', message: `${error}`, data: null };
            }
        };
        this.removeImage = async (payload) => {
            try {
                return await this.service.removeImage(payload);
            }
            catch (error) {
                logger.error('Failed to remove image:', error);
                throw error;
            }
        };
        this.changeImage = async (payload) => {
            try {
                return await this.service.changeImage(payload);
            }
            catch (error) {
                logger.error('Failed to remove image:', error);
                throw error;
            }
        };
        this.service = new UploadService();
    }
    async processTask(task) {
        let result = null;
        try {
            if (task.pattern === 'hello') {
                const res = {
                    data: { message: 'test return success' },
                    result: 'success',
                    message: 'test return success',
                };
                result = res;
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
            }
            return result;
        }
        catch (error) {
            logger.error('Failed to task procces message:', error);
            throw error;
        }
    }
}
