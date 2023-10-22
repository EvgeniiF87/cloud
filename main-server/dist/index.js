import express from "express";
import cors from "cors";
import { logger } from "./utils/index.js";
import { uploadsRouter } from "./routes/index.js";
import fileUpload from 'express-fileupload';
const app = express();
app.use(cors());
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.listen(process.env['PORT'] || 5555, () => {
    logger.connectSuccess(`Listening port ${process.env['PORT'] || 5555}`);
});
app.use(uploadsRouter);
