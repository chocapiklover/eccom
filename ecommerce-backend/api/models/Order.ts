import mongoose, { Document, Schema } from 'mongoose';

// Interface for the order items
interface OrderItem {
  product: mongoose.Schema.Types.ObjectId;
  productName: string; // Add the product name field
  quantity: number;
  price: number;
  size: string;
}

// Interface for the order document
export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  orderItems: OrderItem[];
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  address: {
    line1: string;
    city: string;
    country: string;
    postal_code: string;
    state: string;
  };
}

// Create the order schema
const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        productName: {
          type: String,
          required: true, // Ensure the product name is required
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postal_code: { type: String, required: true },
      state: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
