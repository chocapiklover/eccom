//ecommerce-backend/api/utils/server.ts
import app from '../utils/app';
import mongoose from 'mongoose';

//TODO: add mongodb URI and create env
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI 


if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
