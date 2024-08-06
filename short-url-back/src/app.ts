import express, { Application } from 'express';
import mongoose from 'mongoose';
import shortenedUrlRoutes from './routes/shortenedUrlRoutes';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/urls', shortenedUrlRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/shortenedUrlDB');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('not success to connect to DB =>', error);
    }
};

connectDB();

export default app;
