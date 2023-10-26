import { logger } from '../utils/index.js';
export class ProductService {
    constructor() { }
    async connect() {
        try {
            console.log('Test');
            return { success: true };
        }
        catch (error) {
            logger.error('Failed to connect service:', error);
            return 'Failed to connect service';
        }
    }
}
