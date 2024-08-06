import { Schema, model } from 'mongoose';

interface ShortenedUrl {
    fullUrl: string;
    shortUrl: string;
    clicks: number;
}

const shortenedUrlSchema = new Schema<ShortenedUrl>({
    fullUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
});

const ShortenedUrlType = model<ShortenedUrl>(
    'ShortenedUrlModel',
    shortenedUrlSchema
);

export default ShortenedUrlType;
