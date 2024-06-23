import express from 'express';
import { handleStripeWebhook } from '../controllers/webhookControllers';

const router = express.Router();

router.post('/stripe-webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;