import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import hotlineRoutes from './hotline.routes';
import authRoutes from './auth.routes';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use('/api/hotlines', hotlineRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });