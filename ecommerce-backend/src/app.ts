
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes';
import brandRoutes from './routes/brandRoutes';
import cartRoutes from './routes/cartRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/cart', cartRoutes);



app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;


