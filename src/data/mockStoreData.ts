import { Order, UserProfile } from '../types';
import denimJeansDetail from '../assets/images/denim_jeans_detail_1790417314927.jpg';
import linenShirtShoot from '../assets/images/linen_shirt_shoot_1790417419895.jpg';
import oversizedTeeShoot from '../assets/images/oversized_tee_shoot_1790417330307.jpg';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin',
    email: 'olapraveen34@gmail.com',
    name: 'Praveen Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    role: 'admin',
    phone: '+91 98290 12345',
    address: 'Nikku Fashion Studio, Main Market, Poddar Haveli Road',
    city: 'Nawalgarh',
    state: 'Rajasthan',
    pincode: '333042',
    joinedAt: '2025-11-10'
  },
  {
    id: 'user-01',
    email: 'rohit.s@gmail.com',
    name: 'Rohit Shekhawat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    phone: '+91 98291 55432',
    address: 'Near Clock Tower, Ward No 4',
    city: 'Nawalgarh',
    state: 'Rajasthan',
    pincode: '333042',
    joinedAt: '2026-01-15'
  },
  {
    id: 'user-02',
    email: 'ananya.v@gmail.com',
    name: 'Ananya Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    phone: '+91 94140 88219',
    address: 'C-Scheme, Ashok Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    joinedAt: '2026-02-02'
  },
  {
    id: 'user-03',
    email: 'vikram.ch@gmail.com',
    name: 'Vikram Choudhary',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    phone: '+91 98292 44901',
    address: 'Defence Colony, Vaishali Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302021',
    joinedAt: '2026-03-10'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'NF-2026-8941',
    userEmail: 'rohit.s@gmail.com',
    customerName: 'Rohit Shekhawat',
    phone: '+91 98291 55432',
    shippingAddress: {
      address: 'Near Clock Tower, Ward No 4',
      city: 'Nawalgarh',
      state: 'Rajasthan',
      pincode: '333042'
    },
    items: [
      {
        productId: 'shirt-01',
        productName: 'Relaxed Camp Collar Linen Shirt',
        image: linenShirtShoot,
        colorName: 'Champagne Sand',
        size: 'L',
        price: 1799,
        quantity: 1
      },
      {
        productId: 'jean-01',
        productName: 'Relaxed Straight Selvedge Jeans',
        image: denimJeansDetail,
        colorName: 'Vintage Indigo',
        size: '32',
        price: 2499,
        quantity: 1
      }
    ],
    subtotal: 4298,
    discount: 429,
    shippingFee: 0,
    totalAmount: 3869,
    paymentMethod: 'upi_qr',
    paymentStatus: 'pending_verification',
    utrNumber: '429182749102',
    paymentScreenshot: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop',
    orderStatus: 'pending_verification',
    trackingCourier: 'Delhivery Express',
    trackingNumber: 'DLV-849201938IN',
    estimatedDelivery: '28 Sep 2026',
    createdAt: '2026-09-26T08:15:00.000Z',
    updatedAt: '2026-09-26T08:15:00.000Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'NF-2026-8874',
    userEmail: 'ananya.v@gmail.com',
    customerName: 'Ananya Verma',
    phone: '+91 94140 88219',
    shippingAddress: {
      address: 'C-Scheme, Ashok Nagar',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001'
    },
    items: [
      {
        productId: 'tee-01',
        productName: '280 GSM Heavyweight Oversized Tee',
        image: oversizedTeeShoot,
        colorName: 'Washed Onyx Black',
        size: 'M',
        price: 1299,
        quantity: 1
      }
    ],
    subtotal: 1299,
    discount: 0,
    shippingFee: 0,
    totalAmount: 1299,
    paymentMethod: 'upi_qr',
    paymentStatus: 'verified',
    utrNumber: '419082910394',
    paymentScreenshot: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop',
    orderStatus: 'shipped',
    trackingCourier: 'BlueDart Air',
    trackingNumber: 'BLU-902819284',
    estimatedDelivery: '27 Sep 2026',
    createdAt: '2026-09-25T14:30:00.000Z',
    updatedAt: '2026-09-26T02:10:00.000Z'
  }
];
