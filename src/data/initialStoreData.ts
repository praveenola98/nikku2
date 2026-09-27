import { User, Order } from '../types';
import { PRODUCTS } from './products';

export const ADMIN_EMAIL = 'olapraveen34@gmail.com';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Praveen Ola (Store Owner)',
    email: 'olapraveen34@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    role: 'admin',
    phone: '+91 98292 83746',
    city: 'Nawalgarh, Rajasthan',
    joinedAt: '2025-08-15',
    totalOrdersCount: 14,
    totalSpent: 42890
  },
  {
    id: 'user-c1',
    name: 'Vikram Shekhawat',
    email: 'vikram.shekhawat@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    phone: '+91 94140 12894',
    city: 'Jaipur, Rajasthan',
    joinedAt: '2026-01-10',
    totalOrdersCount: 3,
    totalSpent: 7297
  },
  {
    id: 'user-c2',
    name: 'Ananya Sharma',
    email: 'ananya.s@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    phone: '+91 98110 33421',
    city: 'South Extension, New Delhi',
    joinedAt: '2026-02-04',
    totalOrdersCount: 2,
    totalSpent: 4198
  },
  {
    id: 'user-c3',
    name: 'Rohit Choudhary',
    email: 'rohit.choudhary@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    phone: '+91 97845 61234',
    city: 'Sikar Road, Nawalgarh',
    joinedAt: '2026-02-18',
    totalOrdersCount: 4,
    totalSpent: 11496
  },
  {
    id: 'user-c4',
    name: 'Priya Meena',
    email: 'priya.meena@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    role: 'customer',
    phone: '+91 99283 55219',
    city: 'C-Scheme, Jaipur',
    joinedAt: '2026-03-01',
    totalOrdersCount: 1,
    totalSpent: 2599
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'NF-2026-8942',
    userId: 'user-c1',
    userEmail: 'vikram.shekhawat@gmail.com',
    userName: 'Vikram Shekhawat',
    userPhone: '+91 94140 12894',
    items: [
      {
        product: PRODUCTS[0],
        selectedColor: PRODUCTS[0].colors[1], // Washed Black
        selectedSize: '32',
        quantity: 1,
        unitPrice: 2699
      },
      {
        product: PRODUCTS[2],
        selectedColor: PRODUCTS[2].colors[0], // Bone White
        selectedSize: 'L',
        quantity: 1,
        unitPrice: 1299
      }
    ],
    subtotal: 3998,
    shipping: 0,
    discount: 0,
    totalAmount: 3998,
    shippingAddress: {
      fullName: 'Vikram Shekhawat',
      phone: '+91 94140 12894',
      streetAddress: 'Plot 42, Shekhawati Complex, Station Road',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001'
    },
    paymentMethod: 'upi_qr',
    paymentDetails: {
      utrNumber: '428910482910',
      screenshotUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop',
      upiId: 'nikku.fashion@okaxis',
      verifiedAt: '2026-09-25 14:30',
      verifiedBy: 'olapraveen34@gmail.com'
    },
    status: 'shipped',
    courierName: 'Delhivery Express Air',
    trackingNumber: 'DEL-99238128301',
    dispatchHub: 'Nawalgarh Central Hub',
    createdAt: '2026-09-25 11:20 AM',
    updatedAt: '2026-09-26 09:15 AM',
    timeline: [
      {
        status: 'pending_payment_verification',
        title: 'Order Placed & UTR Submitted',
        description: 'Customer scanned QR and submitted UTR #428910482910',
        timestamp: '2026-09-25 11:20 AM'
      },
      {
        status: 'payment_verified',
        title: 'Payment Verified by Admin',
        description: 'Admin Praveen Ola verified payment of ₹3,998',
        timestamp: '2026-09-25 02:30 PM'
      },
      {
        status: 'processing',
        title: 'Order Packed at Nawalgarh Hub',
        description: 'Custom packaging with sealed luxury polybag & authentication card',
        timestamp: '2026-09-25 06:10 PM'
      },
      {
        status: 'shipped',
        title: 'Handed to Delhivery Express',
        description: 'AWB #DEL-99238128301. In transit to Jaipur distribution center',
        timestamp: '2026-09-26 09:15 AM'
      }
    ],
    adminNotes: 'Regular Shekhawati customer. Include complimentary branded tote.'
  },
  {
    id: 'NF-2026-9214',
    userId: 'user-c2',
    userEmail: 'ananya.s@outlook.com',
    userName: 'Ananya Sharma',
    userPhone: '+91 98110 33421',
    items: [
      {
        product: PRODUCTS[5],
        selectedColor: PRODUCTS[5].colors[1], // Desert Sand
        selectedSize: 'M',
        quantity: 1,
        unitPrice: 2999
      },
      {
        product: PRODUCTS[6],
        selectedColor: PRODUCTS[6].colors[0], // Warm Alabaster
        selectedSize: 'S',
        quantity: 1,
        unitPrice: 1199
      }
    ],
    subtotal: 4198,
    shipping: 0,
    discount: 0,
    totalAmount: 4198,
    shippingAddress: {
      fullName: 'Ananya Sharma',
      phone: '+91 98110 33421',
      streetAddress: 'B-12, Ring Road, South Extension Part II',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110049'
    },
    paymentMethod: 'upi_qr',
    paymentDetails: {
      utrNumber: '509218392104',
      screenshotUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop',
      upiId: 'nikku.fashion@okaxis'
    },
    status: 'pending_payment_verification',
    dispatchHub: 'Nawalgarh Central Hub',
    createdAt: '2026-09-26 08:45 AM',
    updatedAt: '2026-09-26 08:45 AM',
    timeline: [
      {
        status: 'pending_payment_verification',
        title: 'Awaiting Payment Verification',
        description: 'Customer scanned QR and submitted UTR #509218392104. Waiting for Admin review.',
        timestamp: '2026-09-26 08:45 AM'
      }
    ],
    adminNotes: 'Please verify bank balance for ₹4,198'
  },
  {
    id: 'NF-2026-7819',
    userId: 'user-c3',
    userEmail: 'rohit.choudhary@gmail.com',
    userName: 'Rohit Choudhary',
    userPhone: '+91 97845 61234',
    items: [
      {
        product: PRODUCTS[4],
        selectedColor: PRODUCTS[4].colors[0], // Raw Deep Indigo
        selectedSize: 'L',
        quantity: 1,
        unitPrice: 3999
      }
    ],
    subtotal: 3999,
    shipping: 0,
    discount: 0,
    totalAmount: 3999,
    shippingAddress: {
      fullName: 'Rohit Choudhary',
      phone: '+91 97845 61234',
      streetAddress: 'Near Poddar Haveli, Ward No 4',
      city: 'Nawalgarh',
      state: 'Rajasthan',
      pincode: '333042'
    },
    paymentMethod: 'upi_qr',
    paymentDetails: {
      utrNumber: '390184918239',
      upiId: 'nikku.fashion@okaxis',
      verifiedAt: '2026-09-24 16:00',
      verifiedBy: 'olapraveen34@gmail.com'
    },
    status: 'delivered',
    courierName: 'Local Store Express Delivery',
    trackingNumber: 'NWL-LOCAL-0082',
    dispatchHub: 'Nawalgarh Flagship Store',
    createdAt: '2026-09-24 02:15 PM',
    updatedAt: '2026-09-25 11:30 AM',
    timeline: [
      {
        status: 'pending_payment_verification',
        title: 'Order Placed',
        description: 'UTR #390184918239 submitted',
        timestamp: '2026-09-24 02:15 PM'
      },
      {
        status: 'payment_verified',
        title: 'Payment Verified',
        description: 'Payment verified by Praveen Ola',
        timestamp: '2026-09-24 04:00 PM'
      },
      {
        status: 'shipped',
        title: 'Out for Local Delivery in Nawalgarh',
        description: 'Rider on route to Poddar Haveli area',
        timestamp: '2026-09-25 10:00 AM'
      },
      {
        status: 'delivered',
        title: 'Delivered Successfully',
        description: 'Handed over to Rohit Choudhary at residence',
        timestamp: '2026-09-25 11:30 AM'
      }
    ],
    adminNotes: 'Delivered in-person by Nawalgarh store associate.'
  }
];
