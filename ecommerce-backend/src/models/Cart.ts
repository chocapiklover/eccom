import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  cartItems: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    size: string; // Add size property
  }[];
}

const cartSchema: Schema<ICart> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true, 
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;