import { Router } from 'express';
import {
    createShortenedUrl,
    getAllShortcutUrl,
} from '../controllers/shortenedUrlController.ts';

const router = Router();
router.post('/createShortenedUrl', createShortenedUrl);

router.get('/getShortenedUrl', getAllShortcutUrl);
export default router;
