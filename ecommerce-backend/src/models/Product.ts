import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the size and stock quantity
interface SizeStock {
  size: string;
  stockQuantity: number;
}

// Define an interface for the product document
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  brand: mongoose.Schema.Types.ObjectId;
  sizeStock: SizeStock[];
  color: string;
  images: string[];
}

// Create the product schema
const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    sizeStock: [
      {
        size: {
          type: String,
          required: true,
        },
        stockQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
    color: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the product model
const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
