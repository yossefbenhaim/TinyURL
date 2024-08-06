import { Request, Response } from 'express';
import ShortenedUrlModel from '../models/urlModels';
import shortid from 'shortid';

export const createShortenedUrl = async (req: Request, res: Response) => {
    try {
        const { fullUrl } = req.body;

        if (!fullUrl) {
            return res.status(400).json({ message: 'Full URL is required' });
        }

        // Generate a unique short URL using shortid
        const shortUrl = shortid.generate();

        const newUrl = new ShortenedUrlModel({ fullUrl, shortUrl, clicks: 0 });
        await newUrl.save();

        res.status(201).json(newUrl);
    } catch (error) {
        console.error('Error creating shortened URL:', error); // Improved logging
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// Function to get all shortened URLs
export const getAllShortcutUrl = async (req: Request, res: Response) => {
    try {
        // Fetch all shortened URLs from the database
        const urls = await ShortenedUrlModel.find();

        // Respond with the list of URLs
        res.status(200).json({
            message: 'Fetched all shortened URLs',
            data: urls,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
