import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your_mongo_db_connection_string';

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
