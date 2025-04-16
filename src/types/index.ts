
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  features?: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
