import express from 'express';
import { addItemToCart, getCartItems, removeItemFromCart } from '../controllers/cartController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addItemToCart);
router.route('/:userId').get(protect, getCartItems);
router.route('/:userId/:productId').delete(protect, removeItemFromCart);

export default router;
