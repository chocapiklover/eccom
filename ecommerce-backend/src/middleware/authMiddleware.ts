// src/middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User, { IUserWithId } from '../models/User';

// Define an interface for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: IUserWithId;
}

// Middleware to protect routes and ensure user is authenticated
export const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Get token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

      req.user = (await User.findById(decoded.id).select('-password')) as IUserWithId;

      next(); // Call the next middleware
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

// Middleware to check if user is admin
export const admin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next(); // Call the next middleware
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
