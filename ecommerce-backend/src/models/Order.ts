import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  name: string;
  address: string;
  items: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    size: string;
  }[];
}

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;