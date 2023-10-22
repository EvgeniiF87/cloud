import * as express from 'express';
import { uploadsController } from '../controllers/index.js';
const router = express.Router();
router.post("/api/image-create", uploadsController.createImage);
router.delete("/api/image-remove", uploadsController.removeImage);
router.post("/api/image-change", uploadsController.changeImage);
export const uploadsRouter = router;
