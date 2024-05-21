import app from './app';
import mongoose from 'mongoose';

//TODO: add mongodb URI and create env
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://aharmuth33:sblDuHledZc4fv9A@cluster0.jc7dqhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
