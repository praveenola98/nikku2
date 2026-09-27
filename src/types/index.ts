export type Category = 'jeans' | 'tops' | 't-shirts' | 'shirts' | 'jackets' | 'hoodies' | 'accessories' | 'casual' | 'streetwear';

export type Gender = 'men' | 'women' | 'unisex';

export type DenimFit = 'Slim' | 'Straight' | 'Relaxed' | 'Baggy' | 'Wide Leg';

export interface ProductColor {
  name: string;
  hex: string;
}

// Flipkart-style color variant with distinct pricing, images & stock per color
export interface ProductVariant {
  colorName: string;
  hex: string;
  price: number;
  originalPrice: number;
  images: string[];
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  gender: Gender;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  fit?: DenimFit;
  colors: ProductColor[];
  variants?: ProductVariant[]; // Color-specific pricing and image variants
  sizes: string[];
  images: string[];
  description: string;
  fabricCare: string[];
  sizeFit: string[];
  shippingReturns: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  unitPrice: number; // Price calculated for specific color variant
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  taggedProductIds: string[];
  aspect: 'portrait' | 'square' | 'tall';
}

// User & Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'customer';
  phone?: string;
  city?: string;
  joinedAt: string;
  totalOrdersCount: number;
  totalSpent: number;
}

// Order & Payment Verification Types
export type OrderStatus =
  | 'pending_payment_verification'
  | 'payment_verified'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string; // e.g. "NF-2026-8942"
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'upi_qr' | 'card' | 'cod' | 'netbanking';
  paymentDetails: {
    utrNumber?: string;
    screenshotUrl?: string;
    upiId?: string;
    verifiedAt?: string;
    verifiedBy?: string;
  };
  status: OrderStatus;
  courierName?: string;
  trackingNumber?: string;
  dispatchHub?: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
  adminNotes?: string;
}
