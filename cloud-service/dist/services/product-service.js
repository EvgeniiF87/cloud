import { logger } from '../utils/index.js';
import { mockProducts } from '../utils/mockProduct.js';
class ProductService {
    constructor() {
        this.products = mockProducts;
    }
    async createProduct(body) {
        try {
            const { name, price } = body;
            const newProduct = {
                id: (this.products.length + 1).toString(),
                name,
                price,
            };
            this.products.push(newProduct);
            return newProduct;
        }
        catch (error) {
            logger.error('Failed to create product:', error);
            return 'Failed to create product';
        }
    }
    async getProducts() {
        try {
            return this.products;
        }
        catch (error) {
            logger.error('Failed to get products:', error);
            return 'Failed to get products';
        }
    }
}
export const productService = new ProductService();
