import express from 'express';
import { createOrder } from '../controllers/oderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createOrder);

export default router;