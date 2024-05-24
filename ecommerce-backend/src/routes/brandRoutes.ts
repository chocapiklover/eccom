import express from 'express';
import { getBrands, createBrand } from '../controllers/brandController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getBrands).post(protect, admin, createBrand);

export default router;