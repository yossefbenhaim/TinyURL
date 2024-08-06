import { Router } from 'express';
import {
    clickOnShortUrl,
    createShortenedUrl,
    getAllShortcutUrl,
} from '../controllers/shortenedUrlController.ts';

const router = Router();

router.post('/createShortenedUrl', createShortenedUrl);

router.get('/getShortenedUrl', getAllShortcutUrl);

router.post('/clickOnShortUrl', clickOnShortUrl);

export default router;
