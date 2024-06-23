export interface SizeStock {
  size: string;
  stockQuantity: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: { _id: string; name: string };
  sizeStock: { size: string; stockQuantity: number }[];
  color: string;
  images: string[];
}