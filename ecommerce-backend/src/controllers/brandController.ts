import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Brand from '../models/Brand';

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
export const getBrands = asyncHandler(async (req: Request, res: Response) => {
  const brands = await Brand.find({});
  res.json(brands);
});

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    res.status(400);
    throw new Error('Brand already exists');
  }

  const brand = new Brand({ name });

  const createdBrand = await brand.save();
  res.status(201).json(createdBrand);
});