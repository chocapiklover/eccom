import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes';
import productRoutes from '../routes/productRoutes';
import brandRoutes from '../routes/brandRoutes';
import cartRoutes from '../routes/cartRoutes';
import paymentRoutes from '../routes/paymentRoutes';
import orderRoutes from '../routes/orderRoutes';
import { handleStripeWebhook } from '../controllers/webhookControllers';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());

// Use JSON body parser for all routes except Stripe webhook
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhooks/stripe-webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Stripe webhook endpoint with raw body parser
app.post('/api/webhooks/stripe-webhook', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook);

// Root route for health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;

