import { Response, Request } from 'express';
import Cart from '../models/Cart';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Add item to cart
export const addItemToCart = async (req: AuthenticatedRequest, res: Response) => {
  const { productId, quantity, size } = req.body; // Include size in the request body
  const userId = req.user?._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // If cart exists, update it
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId && item.size === size);

      if (itemIndex > -1) {
        // Item exists in cart with the same size, update the quantity
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // Item does not exist in cart, add new item
        cart.cartItems.push({ product: productId, quantity, size });
      }
    } else {
      // No cart for user, create new cart
      cart = new Cart({
        user: userId,
        cartItems: [{ product: productId, quantity, size }]
      });
    }

    // Populate the cart items with product details
    await cart.save();
    await cart.populate('cartItems.product');

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
  const { productId, size } = req.params; // Include size in the params

  try {
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Remove item from cart based on productId and size
      cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId || item.size !== size);
      await cart.save();
      await cart.populate('cartItems.product');
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error });
  }
};