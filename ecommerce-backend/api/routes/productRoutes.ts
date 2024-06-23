import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productControllers';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get all products and create a new product
router.route('/').get(getProducts).post(protect, createProduct);

// Routes to get, update, and delete a product by ID
router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;