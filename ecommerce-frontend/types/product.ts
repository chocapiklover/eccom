export interface SizeStock {
  size: string;
  stockQuantity: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  sizeStock: SizeStock[];
  color: string;
  images: string[];
}
