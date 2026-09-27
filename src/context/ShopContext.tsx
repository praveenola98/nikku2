import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, User, Order, OrderStatus, ShippingAddress } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_USERS, INITIAL_ORDERS, ADMIN_EMAIL } from '../data/initialStoreData';
import { auth, onAuthStateChanged, signOutFirebase } from '../services/firebase';

interface CreateOrderParams {
  shippingAddress: ShippingAddress;
  paymentMethod: 'upi_qr' | 'card' | 'cod' | 'netbanking';
  utrNumber?: string;
  screenshotUrl?: string;
}

interface ShopContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: Product) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: ProductColor, size?: string, quantity?: number, customPrice?: number) => void;
  updateQuantity: (productId: string, colorName: string, size: string, delta: number) => void;
  removeFromCart: (productId: string, colorName: string, size: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Modals & Views
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  isCampaignStoryOpen: boolean;
  setIsCampaignStoryOpen: (open: boolean) => void;

  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
  catalogCategory: string;
  setCatalogCategory: (cat: string) => void;
  catalogFit: string;
  setCatalogFit: (fit: string) => void;
  openCatalog: (category?: string, fit?: string) => void;

  // Auth & Roles
  currentUser: User | null;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginWithGoogle: (email: string, name?: string, avatar?: string) => User;
  logout: () => void;
  usersList: User[];

  // Admin Portal
  isAdminPortalOpen: boolean;
  setIsAdminPortalOpen: (open: boolean) => void;

  // Orders & Live Tracking
  orders: Order[];
  createOrder: (params: CreateOrderParams) => Order;
  verifyOrderPayment: (orderId: string, notes?: string) => void;
  updateOrderTracking: (
    orderId: string,
    status: OrderStatus,
    courierName?: string,
    trackingNumber?: string,
    note?: string
  ) => void;
  isUserOrdersOpen: boolean;
  setIsUserOrdersOpen: (open: boolean) => void;
  activeTrackingId: string | null;
  setActiveTrackingId: (id: string | null) => void;

  // Animation
  triggerCartFlyAnimation: (imgSrc: string, startPos: { x: number; y: number }) => void;
  flyItem: { imgSrc: string; startPos: { x: number; y: number } } | null;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products State (Initial + LocalStorage Custom Admin Products)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nikku_custom_products');
      if (saved) {
        const custom: Product[] = JSON.parse(saved);
        // Combine base products and custom products, avoid duplicate ids
        const customIds = new Set(custom.map(p => p.id));
        const filteredBase = PRODUCTS.filter(p => !customIds.has(p.id));
        return [...custom, ...filteredBase];
      }
    } catch {
      // fallback
    }
    return PRODUCTS;
  });

  // 2. Auth & Current User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('nikku_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [usersList, setUsersList] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('nikku_users_list');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // 3. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nikku_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // 4. Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nikku_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial cart item with proper variant price
    const initialProd = PRODUCTS[0];
    const initialVariant = initialProd.variants?.[0];
    return [
      {
        product: initialProd,
        selectedColor: initialProd.colors[0],
        selectedSize: '32',
        quantity: 1,
        unitPrice: initialVariant?.price || initialProd.price
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nikku_wishlist');
      return saved ? JSON.parse(saved) : ['jean-01', 'jacket-01'];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCampaignStoryOpen, setIsCampaignStoryOpen] = useState(false);
  
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [catalogFit, setCatalogFit] = useState('All');

  // Modals for Auth, Admin, User Orders
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isUserOrdersOpen, setIsUserOrdersOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);

  const [flyItem, setFlyItem] = useState<{ imgSrc: string; startPos: { x: number; y: number } } | null>(null);

  // Synchronize localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nikku_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nikku_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('nikku_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('nikku_users_list', JSON.stringify(usersList));
    } catch {
      // ignore
    }
  }, [usersList]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('nikku_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('nikku_auth_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser && fbUser.email) {
        const cleanEmail = fbUser.email.trim().toLowerCase();
        const isAdminUser = cleanEmail === ADMIN_EMAIL.toLowerCase();
        const existing = usersList.find(u => u.email.toLowerCase() === cleanEmail);
        const displayName = fbUser.displayName || (isAdminUser ? 'Praveen Ola (Store Owner)' : cleanEmail.split('@')[0]);
        const avatarUrl = fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=c5a880,1a1a1a`;

        const authenticatedUser: User = {
          id: existing?.id || fbUser.uid,
          name: displayName,
          email: cleanEmail,
          avatar: avatarUrl,
          role: isAdminUser ? 'admin' : 'customer',
          city: existing?.city || (isAdminUser ? 'Nawalgarh, Rajasthan' : 'India'),
          joinedAt: existing?.joinedAt || new Date().toISOString().split('T')[0],
          totalOrdersCount: existing?.totalOrdersCount || 0,
          totalSpent: existing?.totalSpent || 0
        };

        setCurrentUser(authenticatedUser);
      }
    });

    return () => unsubscribe();
  }, [usersList]);

  // Auth Helpers
  const isAdmin = currentUser?.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const loginWithGoogle = (email: string, name?: string, avatar?: string): User => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminUser = cleanEmail === ADMIN_EMAIL.toLowerCase();

    // Check if already in user directory
    const existing = usersList.find(u => u.email.toLowerCase() === cleanEmail);
    let authenticatedUser: User;

    if (existing) {
      authenticatedUser = {
        ...existing,
        name: name || existing.name,
        avatar: avatar || existing.avatar,
        role: isAdminUser ? 'admin' : 'customer'
      };
    } else {
      const generatedName = name || (isAdminUser ? 'Praveen Ola (Store Owner)' : cleanEmail.split('@')[0].replace(/[._]/g, ' '));
      authenticatedUser = {
        id: `user-${Date.now()}`,
        name: generatedName,
        email: cleanEmail,
        avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(generatedName)}&backgroundColor=c5a880,1a1a1a`,
        role: isAdminUser ? 'admin' : 'customer',
        city: isAdminUser ? 'Nawalgarh, Rajasthan' : 'India',
        joinedAt: new Date().toISOString().split('T')[0],
        totalOrdersCount: 0,
        totalSpent: 0
      };
      setUsersList(prev => [authenticatedUser, ...prev]);
    }

    setCurrentUser(authenticatedUser);
    setIsAuthModalOpen(false);

    // If admin logged in, open admin portal directly; if customer, open user dashboard
    if (isAdminUser) {
      setIsAdminPortalOpen(true);
    } else {
      setIsUserOrdersOpen(true);
    }

    return authenticatedUser;
  };

  const logout = async () => {
    try {
      await signOutFirebase();
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setIsAdminPortalOpen(false);
  };

  // Product Admin Operations
  const addProduct = (newProduct: Product) => {
    setProducts(prev => {
      const updated = [newProduct, ...prev];
      try {
        const customExisting: Product[] = JSON.parse(localStorage.getItem('nikku_custom_products') || '[]');
        localStorage.setItem('nikku_custom_products', JSON.stringify([newProduct, ...customExisting]));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      try {
        const customExisting: Product[] = JSON.parse(localStorage.getItem('nikku_custom_products') || '[]');
        const filteredCustom = customExisting.filter(p => p.id !== id);
        localStorage.setItem('nikku_custom_products', JSON.stringify(filteredCustom));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      try {
        const customExisting: Product[] = JSON.parse(localStorage.getItem('nikku_custom_products') || '[]');
        const updatedCustom = customExisting.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        localStorage.setItem('nikku_custom_products', JSON.stringify(updatedCustom));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Cart Operations
  const addToCart = (
    product: Product,
    color?: ProductColor,
    size?: string,
    quantity = 1,
    customPrice?: number
  ) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[0];

    // Determine color variant price if not explicitly provided
    let itemPrice = customPrice;
    if (itemPrice === undefined) {
      const matchedVariant = product.variants?.find(v => v.colorName.toLowerCase() === chosenColor.name.toLowerCase());
      itemPrice = matchedVariant ? matchedVariant.price : product.price;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedColor.name === chosenColor.name &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: chosenColor,
            selectedSize: chosenSize,
            quantity,
            unitPrice: itemPrice!
          }
        ];
      }
    });

    // Confirmation drawer
    setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
  };

  const updateQuantity = (productId: string, colorName: string, size: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
          ) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string, colorName: string, size: string) => {
    setCart(prev =>
      prev.filter(
        item =>
          !(
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const triggerCartFlyAnimation = (imgSrc: string, startPos: { x: number; y: number }) => {
    setFlyItem({ imgSrc, startPos });
    setTimeout(() => {
      setFlyItem(null);
    }, 850);
  };

  const openCatalog = (category = 'all', fit = 'All') => {
    setCatalogCategory(category);
    setCatalogFit(fit);
    setIsCatalogOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice || item.product.price) * item.quantity, 0);

  // Orders Management & Live UTR Verification
  const createOrder = (params: CreateOrderParams): Order => {
    const shipping = cartSubtotal >= 999 ? 0 : 150;
    const totalAmount = cartSubtotal + shipping;
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NF-2026-${randomNum}`;
    const nowStr = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const isUPI = params.paymentMethod === 'upi_qr';

    const newOrder: Order = {
      id: orderId,
      userId: currentUser?.id || `guest-${Date.now()}`,
      userEmail: currentUser?.email || 'customer@nikkufashion.com',
      userName: params.shippingAddress.fullName,
      userPhone: params.shippingAddress.phone,
      items: [...cart],
      subtotal: cartSubtotal,
      shipping,
      discount: 0,
      totalAmount,
      shippingAddress: params.shippingAddress,
      paymentMethod: params.paymentMethod,
      paymentDetails: {
        utrNumber: params.utrNumber,
        screenshotUrl: params.screenshotUrl,
        upiId: 'nikku.fashion@okaxis',
        verifiedAt: undefined
      },
      status: isUPI ? 'pending_payment_verification' : 'processing',
      dispatchHub: 'Nawalgarh Central Hub',
      createdAt: nowStr,
      updatedAt: nowStr,
      timeline: [
        {
          status: 'pending_payment_verification',
          title: 'Order Placed & UTR Submitted',
          description: isUPI
            ? `Customer submitted 12-digit UTR #${params.utrNumber || 'Pending'} for verification.`
            : 'Order received. Preparing for dispatch.',
          timestamp: nowStr
        }
      ],
      adminNotes: isUPI ? 'Verify payment in store bank account' : 'COD / Standard order'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update user stats
    if (currentUser) {
      setUsersList(prev =>
        prev.map(u => {
          if (u.id === currentUser.id) {
            return {
              ...u,
              totalOrdersCount: (u.totalOrdersCount || 0) + 1,
              totalSpent: (u.totalSpent || 0) + totalAmount
            };
          }
          return u;
        })
      );
    }

    clearCart();
    return newOrder;
  };

  const verifyOrderPayment = (orderId: string, notes?: string) => {
    const nowStr = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const updatedTimeline = [
            ...order.timeline,
            {
              status: 'payment_verified' as OrderStatus,
              title: 'Payment Verified by Admin',
              description: `Admin Praveen Ola verified payment of ₹${order.totalAmount.toLocaleString('en-IN')}`,
              timestamp: nowStr
            }
          ];

          return {
            ...order,
            status: 'payment_verified',
            paymentDetails: {
              ...order.paymentDetails,
              verifiedAt: nowStr,
              verifiedBy: ADMIN_EMAIL
            },
            timeline: updatedTimeline,
            updatedAt: nowStr,
            adminNotes: notes || order.adminNotes
          };
        }
        return order;
      })
    );
  };

  const updateOrderTracking = (
    orderId: string,
    status: OrderStatus,
    courierName?: string,
    trackingNumber?: string,
    note?: string
  ) => {
    const nowStr = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const statusTitles: Record<OrderStatus, string> = {
      pending_payment_verification: 'Awaiting Payment Verification',
      payment_verified: 'Payment Confirmed by Store Owner',
      processing: 'Order Packed at Nawalgarh Flagship Hub',
      shipped: 'Dispatched via Express Courier',
      out_for_delivery: 'Out for Doorstep Delivery',
      delivered: 'Delivered to Customer',
      cancelled: 'Order Cancelled'
    };

    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const updatedTimeline = [
            ...order.timeline,
            {
              status,
              title: statusTitles[status],
              description: note || `Order status updated to ${status.replace(/_/g, ' ')}`,
              timestamp: nowStr
            }
          ];

          return {
            ...order,
            status,
            courierName: courierName || order.courierName,
            trackingNumber: trackingNumber || order.trackingNumber,
            timeline: updatedTimeline,
            updatedAt: nowStr,
            adminNotes: note || order.adminNotes
          };
        }
        return order;
      })
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCampaignStoryOpen,
        setIsCampaignStoryOpen,
        isCatalogOpen,
        setIsCatalogOpen,
        catalogCategory,
        setCatalogCategory,
        catalogFit,
        setCatalogFit,
        openCatalog,
        currentUser,
        isAdmin,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginWithGoogle,
        logout,
        usersList,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        orders,
        createOrder,
        verifyOrderPayment,
        updateOrderTracking,
        isUserOrdersOpen,
        setIsUserOrdersOpen,
        activeTrackingId,
        setActiveTrackingId,
        triggerCartFlyAnimation,
        flyItem
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
