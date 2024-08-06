import { Request, Response } from 'express';

import ShortenedUrlModel from '../models/urlModels';
import shortid from 'shortid';

export const clickOnShortUrl = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.body;

        const url = await ShortenedUrlModel.findOne({ shortUrl });

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        url.clicks += 1;

        await url.save();

        res.status(200).json({ message: 'Click tracked', clicks: url.clicks });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createShortenedUrl = async (req: Request, res: Response) => {
    try {
        const { fullUrl } = req.body;

        if (!fullUrl) {
            return res.status(400).json({ message: 'Full URL is required' });
        }

        const shortUrl = shortid.generate();

        const newUrl = new ShortenedUrlModel({ fullUrl, shortUrl, clicks: 0 });
        await newUrl.save();

        res.status(201).json(newUrl);
    } catch (error) {
        console.error('Error creating shortened URL:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getAllShortcutUrl = async (req: Request, res: Response) => {
    try {
        const urls = await ShortenedUrlModel.find();

        res.status(200).json({
            message: 'Fetched all shortened URLs',
            data: urls,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
