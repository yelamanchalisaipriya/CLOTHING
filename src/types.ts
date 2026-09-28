export type Department = 'Men' | 'Women' | 'Kids' | 'Unisex';

export type Category = 
  | 'All'
  | 'Men'
  | 'Women'
  | 'Kids'
  | 'T-Shirts'
  | 'Shirts'
  | 'Jeans'
  | 'Dresses'
  | 'Tops'
  | 'Jackets'
  | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDetailsSpec {
  fabric: string;
  fit: string;
  care: string;
  origin: string;
  modelHeight?: string;
  modelWearingSize?: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  department: Department;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  shortDescription: string;
  details: ProductDetailsSpec;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: ProductColor[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isSpecialOffer?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD' | 'UPI' | 'CARD';
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}

export interface FilterState {
  search: string;
  department: string;
  category: string;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest' | 'popularity';
}

export type PageView = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'about'
  | 'contact';
