import mongoose, { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
  name: string;
}

const brandSchema: Schema<IBrand> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model<IBrand>('Brand', brandSchema);

export default Brand;