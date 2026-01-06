
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  description: string;
  details: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
