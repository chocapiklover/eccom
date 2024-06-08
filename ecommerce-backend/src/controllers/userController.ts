import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import User, { IUserWithId } from '../models/User';
import generateToken from '../utils/generateToken';

interface AuthenticatedRequest extends Request {
  user?: IUserWithId;
}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }) as IUserWithId;

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    const user = await User.create({ name, email, password }) as IUserWithId;

    if (user) {
      res.status(201).json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  }
});

// @desc    Get user profile with order history
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user?._id)
    .populate({
      path: 'orderHistory',
      populate: {
        path: 'orderItems.product',
        model: 'Product', 
      },
    }) as IUserWithId;

  if (user) {
    res.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
      orderHistory: user.orderHistory, // Include the populated order history
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user?._id) as IUserWithId;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.shippingAddress = {
      line1: req.body.line1 || user.shippingAddress?.line1,
      line2: req.body.line2 || user.shippingAddress?.line2,
      city: req.body.city || user.shippingAddress?.city,
      state: req.body.state || user.shippingAddress?.state,
      postal_code: req.body.postal_code || user.shippingAddress?.postal_code,
      country: req.body.country || user.shippingAddress?.country,
    };

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save() as IUserWithId;

    res.json({
      _id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      shippingAddress: updatedUser.shippingAddress,
      token: generateToken(updatedUser._id.toString()),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});