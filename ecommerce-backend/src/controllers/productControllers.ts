import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, brand, size, color, stockQuantity, images } = req.body;

  const product = new Product({
    name,
    description,
    price,
    brand,
    size,
    color,
    stockQuantity,
    images,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, brand, size, color, stockQuantity, images } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.size = size || product.size;
    product.color = color || product.color;
    product.stockQuantity = stockQuantity || product.stockQuantity;
    product.images = images || product.images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id); // Use findByIdAndDelete method
  
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });