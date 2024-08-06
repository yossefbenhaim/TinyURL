import express, { Application } from 'express';

import shortenedUrlRoutes from './routes/shortenedUrlRoutes';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use('/api/urls', shortenedUrlRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_CONNECTION_STRING}`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('not success to connect to DB =>', error);
    }
};

connectDB();

export default app;
