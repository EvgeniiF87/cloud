import http from 'http';
import { logger } from "./utils/index.js";
import { uploadsAmqpService } from "./services/index.js";
import { strimService } from './services/strim-service.js';
const server = http.createServer(async (req, res) => {
    if (!req.url)
        return;
    if (req.url.includes('/uploads')) {
        try {
            return await strimService.getFoto(req, res);
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Failed server');
        }
    }
});
server.listen(process.env['PORT'] || 5000, () => {
    logger.connectSuccess(`Listening port ${process.env['PORT'] || 5000}`);
});
uploadsAmqpService.startConsumer();
