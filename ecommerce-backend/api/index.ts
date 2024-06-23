//ecommerce-backend/api/index.ts
import mongoose from 'mongoose';
import app from './utils/app';
import { IncomingMessage, ServerResponse } from 'http';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  await mongoose.connect(MONGO_URI);
  isConnected = true;
};

export default async (req: IncomingMessage, res: ServerResponse) => {
  await connectToDatabase();
  // Use the Express app to handle the request and response
  app(req, res);
};