import { Response } from 'express';
import Cart from '../models/Cart';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Add item to cart
export const addItemToCart = async (req: AuthenticatedRequest, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user?._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // If cart exists, update it
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Item exists in cart, update the quantity
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // Item does not exist in cart, add new item
        cart.cartItems.push({ product: productId, quantity });
      }
    } else {
      // No cart for user, create new cart
      cart = new Cart({
        user: userId,
        cartItems: [{ product: productId, quantity }]
      });
    }

    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error });
  }
};

// Get cart items
export const getCartItems = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get cart items', error });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error });
  }
};
