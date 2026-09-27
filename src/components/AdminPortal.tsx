import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ProductColorVariant, Category, Gender, DenimFit, OrderStatus } from '../types';
import {
  X,
  Plus,
  Package,
  Users,
  CheckCircle,
  Clock,
  Truck,
  ExternalLink,
  Trash2,
  Edit,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Check
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    isAdminPortalOpen,
    setIsAdminPortalOpen,
    currentUser,
    loginWithGoogle,
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    allUsers,
    orders,
    verifyPayment,
    updateOrderTracking,
    deleteOrder
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'users'>('overview');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [selectedProofOrder, setSelectedProofOrder] = useState<any | null>(null);

  // Add Product Form State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<Category>('shirts');
  const [newProductGender, setNewProductGender] = useState<Gender>('men');
  const [newProductFit, setNewProductFit] = useState<DenimFit>('Straight');
  const [newProductPrice, setNewProductPrice] = useState<number>(1899);
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState<number>(2499);
  const [newProductDescription, setNewProductDescription] = useState(
    'Crafted from premium long-staple cotton with custom brass hardware and tailored modern fit.'
  );
  const [newProductSizes, setNewProductSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [newProductImage, setNewProductImage] = useState<string>(
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
  );

  // Color variants for new product (Flipkart style multiple colors with different prices & images)
  const [newColorVariants, setNewColorVariants] = useState<ProductColorVariant[]>([
    {
      name: 'Onyx Black',
      hex: '#111111',
      price: 1899,
      originalPrice: 2499,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      inStock: true
    },
    {
      name: 'Olive Sage',
      hex: '#4a5340',
      price: 1999,
      originalPrice: 2599,
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
      inStock: true
    },
    {
      name: 'Raw Ecru Cream',
      hex: '#d8c7ad',
      price: 2199,
      originalPrice: 2799,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
      inStock: true
    }
  ]);

  // Tracking editor state for selected order
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>('shipped');
  const [editCourier, setEditCourier] = useState('Delhivery Express');
  const [editTrackingNo, setEditTrackingNo] = useState('');
  const [editEstDelivery, setEditEstDelivery] = useState('29 Sep 2026');

  if (!isAdminPortalOpen) return null;

  // Security gate check: only olapraveen34@gmail.com
  const isAdmin = currentUser?.email.toLowerCase() === 'olapraveen34@gmail.com';

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const discount = Math.round(
      ((newProductOriginalPrice - newProductPrice) / newProductOriginalPrice) * 100
    );

    const createdProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      category: newProductCategory,
      gender: newProductGender,
      price: newProductPrice,
      originalPrice: newProductOriginalPrice,
      discountPercent: discount > 0 ? discount : 0,
      rating: 4.9,
      reviewsCount: 1,
      isNew: true,
      fit: newProductCategory === 'jeans' ? newProductFit : undefined,
      colors: newColorVariants.length > 0 ? newColorVariants : [
        {
          name: 'Standard Shade',
          hex: '#111111',
          price: newProductPrice,
          originalPrice: newProductOriginalPrice,
          image: newProductImage,
          inStock: true
        }
      ],
      sizes: newProductSizes,
      images: [
        newProductImage,
        ...newColorVariants.map(c => c.image).filter(Boolean)
      ],
      description: newProductDescription,
      fabricCare: ['100% Premium Fabric', 'Gentle machine wash cold', 'Dry in shade'],
      sizeFit: ['Tailored contemporary fit', 'True to size'],
      shippingReturns: 'Dispatched within 24 hours from Nawalgarh store. 7-day returns.',
      inStock: true
    };

    addProduct(createdProd);
    setIsAddProductModalOpen(false);
    // Reset form
    setNewProductName('');
    alert(`Cloth "${createdProd.name}" successfully added to ${createdProd.category.toUpperCase()} section!`);
  };

  const addColorVariantField = () => {
    setNewColorVariants([
      ...newColorVariants,
      {
        name: `New Shade ${newColorVariants.length + 1}`,
        hex: '#333333',
        price: newProductPrice,
        originalPrice: newProductOriginalPrice,
        image: newProductImage,
        inStock: true
      }
    ]);
  };

  const updateColorVariant = (index: number, field: keyof ProductColorVariant, value: any) => {
    const updated = [...newColorVariants];
    updated[index] = { ...updated[index], [field]: value };
    setNewColorVariants(updated);
  };

  const removeColorVariant = (index: number) => {
    setNewColorVariants(newColorVariants.filter((_, i) => i !== index));
  };

  const pendingVerificationOrders = orders.filter(o => o.paymentStatus === 'pending_verification');
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'verified' ? o.totalAmount : 0), 0);

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'pending') return o.paymentStatus === 'pending_verification';
    if (orderFilter === 'verified') return o.paymentStatus === 'verified';
    if (orderFilter === 'shipped') return o.orderStatus === 'shipped';
    if (orderFilter === 'delivered') return o.orderStatus === 'delivered';
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        backgroundColor: '#eeeaf5',
        color: '#3f3a46',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Top Navbar for Admin */}
      <header
        className="sticky top-0 z-40 border-b flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3"
        style={{
          backgroundColor: '#eeeaf5',
          borderColor: 'rgba(112, 99, 126, 0.16)'
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] flex items-center justify-center font-bold text-sm shadow-md"
            style={{ backgroundColor: '#9b86c7', color: '#ffffff' }}
          >
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold tracking-wider text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                NIKKU FASHION ADMIN
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                style={{ backgroundColor: '#9b86c7', color: '#ffffff' }}
              >
                Super Owner
              </span>
            </div>
            <div className="text-xs text-[#756d80] font-mono">olapraveen34@gmail.com • Nawalgarh Flagship</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminPortalOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs uppercase tracking-wider text-[#5f5868] hover:text-[#403a49] hover:border-[#a89db5] transition-colors"
            style={{ borderColor: 'rgba(112, 99, 126, 0.18)', backgroundColor: '#eeeaf5' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Store
          </button>
          <button
            onClick={() => setIsAdminPortalOpen(false)}
            className="p-1.5 rounded-lg text-[#756d80] hover:text-[#403a49] hover:bg-[#ddd7e8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {!isAdmin ? (
          /* Guard: prompt user to login as olapraveen34@gmail.com */
          <div
            className="p-8 rounded-2xl border text-center max-w-lg mx-auto my-12"
            style={{
              backgroundColor: '#eeeaf5',
              borderColor: 'rgba(155, 134, 199, 0.45)'
            }}
          >
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-[#403a49] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Admin Access Restricted
            </h2>
            <p className="text-sm text-[#756d80] mb-6">
              Only the store owner Google account <strong>olapraveen34@gmail.com</strong> is authorized to manage
              inventory, users, and orders.
            </p>
            <button
              onClick={() => {
                loginWithGoogle('olapraveen34@gmail.com', 'Praveen Sharma');
              }}
              className="py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg"
              style={{ backgroundColor: '#9b86c7', color: '#ffffff' }}
            >
              Sign In as olapraveen34@gmail.com
            </button>
          </div>
        ) : (
          <>
            {/* Admin Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-5 border-b scrollbar-thin" style={{ borderColor: 'rgba(112, 99, 126, 0.14)' }}>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 sm:px-4 py-2 rounded-[14px] text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'bg-[#9b86c7] text-black shadow-md'
                    : 'text-[#756d80] hover:text-[#403a49] bg-[#e5e0eb] border border-[#d1c9dc]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Dashboard Overview
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 sm:px-4 py-2 rounded-[14px] text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 relative ${
                  activeTab === 'orders'
                    ? 'bg-[#9b86c7] text-black shadow-md'
                    : 'text-[#756d80] hover:text-[#403a49] bg-[#e5e0eb] border border-[#d1c9dc]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                Orders & Tracking ({orders.length})
                {pendingVerificationOrders.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#b96b78] animate-ping absolute -top-0.5 -right-0.5" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 sm:px-4 py-2 rounded-[14px] text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'products'
                    ? 'bg-[#9b86c7] text-black shadow-md'
                    : 'text-[#756d80] hover:text-[#403a49] bg-[#e5e0eb] border border-[#d1c9dc]'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                Clothes Inventory ({products.length})
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`px-3 sm:px-4 py-2 rounded-[14px] text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'users'
                    ? 'bg-[#9b86c7] text-black shadow-md'
                    : 'text-[#756d80] hover:text-[#403a49] bg-[#e5e0eb] border border-[#d1c9dc]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Registered Users ({allUsers.length})
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Revenue */}
                  <div
                    className="p-5 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)]"
                    style={{
                      backgroundColor: '#eeeaf5',
                      borderColor: 'rgba(112, 99, 126, 0.14)'
                    }}
                  >
                    <div className="text-xs uppercase tracking-wider text-[#756d80] mb-1">Total Verified Revenue</div>
                    <div className="text-2xl md:text-3xl font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-[#6e9b82] mt-2 flex items-center gap-1 font-mono">
                      ✓ Instant UPI & QR settlements
                    </div>
                  </div>

                  {/* Orders */}
                  <div
                    className="p-5 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)]"
                    style={{
                      backgroundColor: '#eeeaf5',
                      borderColor: 'rgba(112, 99, 126, 0.14)'
                    }}
                  >
                    <div className="text-xs uppercase tracking-wider text-[#756d80] mb-1">Total Orders Received</div>
                    <div className="text-2xl md:text-3xl font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {orders.length}
                    </div>
                    <div className="text-[11px] text-[#9b86c7] mt-2 font-mono">
                      {pendingVerificationOrders.length} Pending UTR Verification
                    </div>
                  </div>

                  {/* Registered Users */}
                  <div
                    className="p-5 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)]"
                    style={{
                      backgroundColor: '#eeeaf5',
                      borderColor: 'rgba(112, 99, 126, 0.14)'
                    }}
                  >
                    <div className="text-xs uppercase tracking-wider text-[#756d80] mb-1">Active Registered Users</div>
                    <div className="text-2xl md:text-3xl font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {allUsers.length}
                    </div>
                    <div className="text-[11px] text-[#756d80] mt-2 font-mono">
                      Google OAuth authenticated
                    </div>
                  </div>

                  {/* Catalog Products */}
                  <div
                    className="p-5 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)]"
                    style={{
                      backgroundColor: '#eeeaf5',
                      borderColor: 'rgba(112, 99, 126, 0.14)'
                    }}
                  >
                    <div className="text-xs uppercase tracking-wider text-[#756d80] mb-1">Live Clothing Styles</div>
                    <div className="text-2xl md:text-3xl font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {products.length}
                    </div>
                    <div className="text-[11px] text-[#756d80] mt-2 font-mono">
                      Jeans, Tees, Shirts, Jackets
                    </div>
                  </div>
                </div>

                {/* Urgent Payment Verification Alert */}
                {pendingVerificationOrders.length > 0 && (
                  <div
                    className="p-4 md:p-5 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    style={{
                      backgroundColor: 'rgba(155, 134, 199, 0.16)',
                      borderColor: 'rgba(155, 134, 199, 0.55)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#9b86c7]/20 text-[#8f7bc2] flex items-center justify-center font-bold text-lg">
                        ⚠️
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#403a49]">
                          {pendingVerificationOrders.length} New UPI QR Scanner Payment(s) Awaiting UTR Verification
                        </div>
                        <div className="text-xs text-[#7563a5]/80">
                          Customers have scanned the QR code and submitted their 12-digit UTR numbers & payment screenshots.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('orders');
                        setOrderFilter('pending');
                      }}
                      className="px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider"
                      style={{ backgroundColor: '#9b86c7', color: '#ffffff' }}
                    >
                      Verify Payments Now →
                    </button>
                  </div>
                )}

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="p-6 rounded-[22px] border flex items-center shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)] justify-between"
                    style={{ backgroundColor: '#eeeaf5', borderColor: 'rgba(112, 99, 126, 0.14)' }}
                  >
                    <div>
                      <h4 className="text-base font-bold text-[#403a49] mb-1">Add New Clothing to Catalog</h4>
                      <p className="text-xs text-[#756d80] max-w-sm">
                        Publish new Shirts, Jeans, Tees with color variants and custom prices per color.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('products');
                        setIsAddProductModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-[#d8d2e1] transition-colors"
                    >
                      + Add Cloth
                    </button>
                  </div>

                  <div
                    className="p-6 rounded-[22px] border flex items-center shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)] justify-between"
                    style={{ backgroundColor: '#eeeaf5', borderColor: 'rgba(112, 99, 126, 0.14)' }}
                  >
                    <div>
                      <h4 className="text-base font-bold text-[#403a49] mb-1">Check Customer Orders & Tracking</h4>
                      <p className="text-xs text-[#756d80] max-w-sm">
                        Confirm orders, dispatch courier AWB tracking numbers, and view customer addresses.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-[#c4bccf] text-[#514b59] hover:text-[#403a49] hover:border-[#a89db5] transition-colors"
                    >
                      View Orders →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {/* Orders Filter */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#e5e0eb] p-3 rounded-xl border border-[#d1c9dc]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#756d80] uppercase tracking-wider font-mono">Filter:</span>
                    {['all', 'pending', 'verified', 'shipped', 'delivered'].map(f => (
                      <button
                        key={f}
                        onClick={() => setOrderFilter(f)}
                        className={`px-3 py-1 rounded-lg text-xs uppercase font-medium tracking-wider transition-colors ${
                          orderFilter === f
                            ? 'bg-white text-black font-semibold'
                            : 'bg-[#ddd7e8] text-[#756d80] hover:text-[#403a49]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-[#756d80] font-mono">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center border border-[#d1c9dc] rounded-2xl bg-[#e5e0eb]">
                    <Package className="w-12 h-12 mx-auto text-[#9d94a7] mb-3" />
                    <p className="text-[#756d80] text-sm">No orders found matching this filter.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map(order => (
                      <div
                        key={order.id}
                        className="p-5 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)] transition-all"
                        style={{
                          backgroundColor: '#eeeaf5',
                          borderColor:
                            order.paymentStatus === 'pending_verification'
                              ? 'rgba(212, 175, 55, 0.4)'
                              : 'rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#d1c9dc] pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#403a49] font-mono">{order.orderNumber}</span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                                  order.paymentStatus === 'verified'
                                    ? 'bg-[#dce9e1] text-[#6e9b82] border border-[#aec8b8]'
                                    : 'bg-[#e1d9ee] text-[#8f7bc2] border border-[#b8a8cf] animate-pulse'
                                }`}
                              >
                                {order.paymentStatus === 'verified' ? '✓ Payment Verified' : '⚠️ UTR Pending Verification'}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-[#ddd7e8] text-[#5f5868]">
                                {order.orderStatus.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="text-xs text-[#756d80] mt-1">
                              Customer: <strong>{order.customerName}</strong> ({order.userEmail}) • Ph: {order.phone}
                            </div>
                            <div className="text-xs text-[#756d80] mt-0.5">
                              Address: {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                              {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-xs text-[#756d80]">Total Amount</div>
                              <div className="text-lg font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                                ₹{order.totalAmount.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[10px] text-[#756d80] font-mono uppercase">
                                Method: {order.paymentMethod.toUpperCase()}
                              </div>
                            </div>

                            <button
                              onClick={() => deleteOrder(order.id)}
                              className="p-2 text-[#8d8497] hover:text-[#b96b78] hover:bg-[#ddd7e8] rounded-lg transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="py-3 flex flex-wrap gap-4 items-center border-b border-[#d1c9dc]">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-[#e5e0eb] px-3 py-2 rounded-xl border border-[#d1c9dc]">
                              <img src={item.image} alt={item.productName} className="w-12 h-14 object-cover rounded-lg" />
                              <div className="text-xs">
                                <div className="font-semibold text-[#514b59]">{item.productName}</div>
                                <div className="text-[#756d80]">
                                  Color: <span className="text-[#514b59]">{item.colorName}</span> | Size: {item.size} | Qty: {item.quantity}
                                </div>
                                <div className="text-[#9b86c7] font-mono">₹{item.price.toLocaleString('en-IN')}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Scanner / UTR Verification Block */}
                        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="bg-[#e5e0eb] px-3 py-2 rounded-xl border border-[#d1c9dc] text-xs">
                              <span className="text-[#756d80] block font-mono text-[10px]">CUSTOMER SUBMITTED UTR:</span>
                              <span className="font-mono font-bold text-[#8f7bc2] text-sm">
                                {order.utrNumber || 'No UTR provided'}
                              </span>
                            </div>

                            {order.paymentScreenshot && (
                              <button
                                onClick={() => setSelectedProofOrder(order)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ddd7e8] hover:bg-[#d2cbdc] text-xs text-[#514b59] transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                View Payment Screenshot
                              </button>
                            )}

                            {order.paymentStatus === 'pending_verification' && (
                              <button
                                onClick={() => {
                                  verifyPayment(order.id, true);
                                  alert(`Order ${order.orderNumber} payment verified & confirmed!`);
                                }}
                                className="px-3.5 py-2 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center gap-1.5"
                                style={{ backgroundColor: '#8f7bc2', color: '#ffffff' }}
                              >
                                <Check className="w-4 h-4" />
                                Verify Payment & Confirm Order
                              </button>
                            )}
                          </div>

                          {/* Tracking updater trigger */}
                          <div>
                            {editingOrderId === order.id ? (
                              <div className="bg-[#e5e0eb] p-4 rounded-xl border border-[#c4bccf] space-y-3">
                                <div className="text-xs font-bold text-[#403a49] uppercase tracking-wider">
                                  Update Courier Tracking
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <div>
                                    <label className="text-[10px] text-[#756d80] uppercase font-mono block">Status</label>
                                    <select
                                      value={editStatus}
                                      onChange={e => setEditStatus(e.target.value as OrderStatus)}
                                      className="w-full bg-[#ddd7e8] text-xs text-[#403a49] p-2 rounded border border-[#c4bccf]"
                                    >
                                      <option value="pending_verification">Pending Verification</option>
                                      <option value="confirmed">Confirmed</option>
                                      <option value="processing">Processing / Packing</option>
                                      <option value="shipped">Shipped / In Transit</option>
                                      <option value="out_for_delivery">Out for Delivery</option>
                                      <option value="delivered">Delivered</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-[10px] text-[#756d80] uppercase font-mono block">Courier</label>
                                    <input
                                      type="text"
                                      value={editCourier}
                                      onChange={e => setEditCourier(e.target.value)}
                                      className="w-full bg-[#ddd7e8] text-xs text-[#403a49] p-2 rounded border border-[#c4bccf]"
                                      placeholder="Delhivery / BlueDart"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[10px] text-[#756d80] uppercase font-mono block">Tracking AWB #</label>
                                    <input
                                      type="text"
                                      value={editTrackingNo}
                                      onChange={e => setEditTrackingNo(e.target.value)}
                                      className="w-full bg-[#ddd7e8] text-xs text-[#403a49] p-2 rounded border border-[#c4bccf]"
                                      placeholder="DLV-8492019IN"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => setEditingOrderId(null)}
                                    className="px-3 py-1.5 text-xs text-[#756d80] hover:text-[#403a49]"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      updateOrderTracking(order.id, editStatus, editCourier, editTrackingNo, editEstDelivery);
                                      setEditingOrderId(null);
                                      alert(`Tracking updated for ${order.orderNumber}! Customer can track live.`);
                                    }}
                                    className="px-4 py-1.5 text-xs font-bold uppercase rounded bg-[#9b86c7] text-black"
                                  >
                                    Save Tracking
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingOrderId(order.id);
                                  setEditStatus(order.orderStatus);
                                  setEditCourier(order.trackingCourier || 'Delhivery Express');
                                  setEditTrackingNo(order.trackingNumber || '');
                                  setEditEstDelivery(order.estimatedDelivery || '29 Sep 2026');
                                }}
                                className="px-3 py-1.5 rounded-lg border border-[#c4bccf] hover:border-[#a89db5] text-xs text-[#5f5868] hover:text-[#403a49] flex items-center gap-1.5 transition-colors"
                              >
                                <Truck className="w-3.5 h-3.5 text-[#9b86c7]" />
                                {order.trackingNumber
                                  ? `${order.trackingCourier}: ${order.trackingNumber}`
                                  : 'Update Courier Tracking'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PRODUCTS INVENTORY */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Header Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-[#e5e0eb] p-4 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.14),-5px_-5px_14px_rgba(255,255,255,0.72)] border-[#d1c9dc]">
                  <div>
                    <h3 className="text-lg font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                      Clothing Collection Management
                    </h3>
                    <p className="text-xs text-[#756d80]">
                      Add new shirts, jeans, tees, hoodies with multiple color options and separate pricing per color.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                    style={{ backgroundColor: '#9b86c7', color: '#ffffff' }}
                  >
                    <Plus className="w-4 h-4" />
                    + Add New Cloth
                  </button>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(prod => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-[22px] border flex flex-col shadow-[8px_8px_18px_rgba(112,99,126,0.16),-6px_-6px_16px_rgba(255,255,255,0.75)] justify-between"
                      style={{ backgroundColor: '#eeeaf5', borderColor: 'rgba(112, 99, 126, 0.14)' }}
                    >
                      <div>
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-3 bg-[#ddd7e8]">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 flex gap-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#e2dce8]/90 text-[#403a49] border border-white/20">
                              {prod.category}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#e2dce8]/90 text-[#5f5868] border border-white/20">
                              {prod.gender}
                            </span>
                          </div>
                        </div>

                        <h4 className="text-sm font-semibold text-[#403a49] line-clamp-1">{prod.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-base font-bold text-[#403a49] font-mono">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          {prod.originalPrice > prod.price && (
                            <span className="text-xs text-[#8d8497] line-through font-mono">
                              ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Color Variants Display (Flipkart Style) */}
                        <div className="mt-3 pt-3 border-t border-[#d1c9dc]">
                          <div className="text-[10px] uppercase font-mono text-[#756d80] mb-1.5">
                            Colors ({prod.colors.length} Variants with Custom Prices):
                          </div>
                          <div className="space-y-1">
                            {prod.colors.map((c, i) => (
                              <div key={i} className="flex items-center justify-between text-xs text-[#5f5868]">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="w-3 h-3 rounded-full border border-white/30 inline-block"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                  <span>{c.name}</span>
                                </div>
                                <span className="font-mono text-[#9b86c7] font-semibold">
                                  ₹{c.price || prod.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#d1c9dc]">
                        <span className="text-[11px] text-[#6e9b82] flex items-center gap-1 font-mono">
                          ● {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${prod.name}?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 text-[#8d8497] hover:text-[#b96b78] hover:bg-[#ddd7e8] rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: REGISTERED USERS */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="bg-[#e5e0eb] p-4 rounded-[22px] border shadow-[8px_8px_18px_rgba(112,99,126,0.14),-5px_-5px_14px_rgba(255,255,255,0.72)] border-[#d1c9dc] flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                      Registered User Accounts
                    </h3>
                    <p className="text-xs text-[#756d80]">
                      Total customers who have signed in with Google to shop or track orders.
                    </p>
                  </div>
                  <div className="text-xs font-mono bg-[#ddd7e8] px-3 py-1.5 rounded-lg text-[#5f5868]">
                    Total: {allUsers.length} Users
                  </div>
                </div>

                <div className="rounded-[22px] border overflow-x-auto shadow-[8px_8px_18px_rgba(112,99,126,0.14),-5px_-5px_14px_rgba(255,255,255,0.72)]" style={{ borderColor: 'rgba(112, 99, 126, 0.14)' }}>
                  <table className="w-full min-w-[760px] text-left text-xs">
                    <thead className="bg-[#e5e0eb] text-[#756d80] uppercase font-mono text-[10px] border-b border-[#d1c9dc]">
                      <tr>
                        <th className="p-3.5">User</th>
                        <th className="p-3.5">Google Email</th>
                        <th className="p-3.5">Role</th>
                        <th className="p-3.5">Phone / Location</th>
                        <th className="p-3.5">Joined Date</th>
                        <th className="p-3.5">Orders Placed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 bg-[#e5e0eb]">
                      {allUsers.map(user => {
                        const userOrders = orders.filter(o => o.userEmail.toLowerCase() === user.email.toLowerCase());
                        return (
                          <tr key={user.id} className="hover:bg-[#e1dce9] transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100'}
                                  alt={user.name}
                                  className="w-8 h-8 rounded-full object-cover border border-[#c4bccf]"
                                />
                                <span className="font-semibold text-[#403a49]">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-3.5 font-mono text-[#5f5868]">{user.email}</td>
                            <td className="p-3.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                  user.role === 'admin'
                                    ? 'bg-[#9b86c7] text-black'
                                    : 'bg-[#ddd7e8] text-[#5f5868] border border-[#c4bccf]'
                                }`}
                              >
                                {user.role === 'admin' ? '👑 ADMIN' : 'CUSTOMER'}
                              </span>
                            </td>
                            <td className="p-3.5 text-[#756d80]">
                              {user.phone || 'N/A'} • {user.city || 'Nawalgarh'}
                            </td>
                            <td className="p-3.5 font-mono text-[#756d80]">{user.joinedAt}</td>
                            <td className="p-3.5 font-mono font-bold text-[#9b86c7]">
                              {userOrders.length} Orders
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL: ADD NEW PRODUCT */}
      {isAddProductModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{
              backgroundColor: 'rgba(238, 234, 245, 0.78)',
              backdropFilter: 'blur(14px)',
            }}
        >
          <div
            className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[26px] border p-4 sm:p-6 my-4 sm:my-8 shadow-[14px_14px_30px_rgba(112,99,126,0.22),-10px_-10px_24px_rgba(255,255,255,0.8)]"
            style={{ backgroundColor: '#eeeaf5', borderColor: 'rgba(112, 99, 126, 0.18)' }}
          >
            <div className="flex items-center justify-between border-b border-[#d1c9dc] pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#403a49]" style={{ fontFamily: "'Cinzel', serif" }}>
                  Add New Cloth to Nikku Fashion
                </h3>
                <p className="text-xs text-[#756d80]">
                  Fill details and configure multiple colors with different prices (like Flipkart).
                </p>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1.5 text-[#756d80] hover:text-[#403a49] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              {/* Name */}
              <div>
                <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cuban Camp Collar Printed Linen Shirt"
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49]"
                />
              </div>

              {/* Category, Gender, Fit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">Category *</label>
                  <select
                    value={newProductCategory}
                    onChange={e => setNewProductCategory(e.target.value as Category)}
                    className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49]"
                  >
                    <option value="jeans">Jeans</option>
                    <option value="shirts">Shirts</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="tops">Tops</option>
                    <option value="jackets">Jackets</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">Gender *</label>
                  <select
                    value={newProductGender}
                    onChange={e => setNewProductGender(e.target.value as Gender)}
                    className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49]"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                {newProductCategory === 'jeans' && (
                  <div>
                    <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">Denim Fit</label>
                    <select
                      value={newProductFit}
                      onChange={e => setNewProductFit(e.target.value as DenimFit)}
                      className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49]"
                    >
                      <option value="Straight">Straight Cut</option>
                      <option value="Baggy">Baggy Skater</option>
                      <option value="Slim">Slim Tailored</option>
                      <option value="Wide Leg">Wide Leg</option>
                      <option value="Relaxed">Relaxed</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Base Price & Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={e => setNewProductPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49] font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">Original Price / MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductOriginalPrice}
                    onChange={e => setNewProductOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49] font-mono"
                  />
                </div>
              </div>

              {/* Main Image URL */}
              <div>
                <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">Main Image URL</label>
                <input
                  type="text"
                  value={newProductImage}
                  onChange={e => setNewProductImage(e.target.value)}
                  className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49] text-xs font-mono"
                />
              </div>

              {/* Color Variants with Custom Price & Image (Flipkart feature) */}
              <div className="border border-[#9b86c7]/30 bg-[#e8e2f0] shadow-[inset_4px_4px_10px_rgba(112,99,126,0.10),inset_-4px_-4px_10px_rgba(255,255,255,0.65)] p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#403a49] uppercase tracking-wider">
                      Color Variants (Flipkart Style: Price Changes per Color)
                    </span>
                    <p className="text-[10px] text-[#756d80]">
                      Customers will see the price & image change live when selecting different colors.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addColorVariantField}
                    className="px-2.5 py-1 text-[11px] font-bold uppercase rounded bg-[#9b86c7] text-black"
                  >
                    + Add Color
                  </button>
                </div>

                <div className="space-y-2">
                  {newColorVariants.map((variant, idx) => (
                    <div key={idx} className="p-3 bg-[#e5e0eb] rounded-lg border border-[#d1c9dc] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#514b59]">Color Variant #{idx + 1}</span>
                        {newColorVariants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeColorVariant(idx)}
                            className="text-[#b96b78] hover:text-[#a95d6b] text-[11px]"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[9px] uppercase font-mono text-[#756d80] block">Color Name</label>
                          <input
                            type="text"
                            value={variant.name}
                            onChange={e => updateColorVariant(idx, 'name', e.target.value)}
                            className="w-full p-1.5 rounded bg-[#ddd7e8] border border-[#c4bccf] text-[#403a49] text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] uppercase font-mono text-[#756d80] block">Hex Swatch</label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="color"
                              value={variant.hex}
                              onChange={e => updateColorVariant(idx, 'hex', e.target.value)}
                              className="w-8 h-8 rounded border-none cursor-pointer"
                            />
                            <span className="text-[#756d80] font-mono text-[10px]">{variant.hex}</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-[9px] uppercase font-mono text-[#756d80] block">Variant Price (₹)</label>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={e => updateColorVariant(idx, 'price', Number(e.target.value))}
                            className="w-full p-1.5 rounded bg-[#ddd7e8] border border-[#c4bccf] text-[#403a49] text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] uppercase font-mono text-[#756d80] block">Variant Image URL</label>
                          <input
                            type="text"
                            value={variant.image}
                            onChange={e => updateColorVariant(idx, 'image', e.target.value)}
                            className="w-full p-1.5 rounded bg-[#ddd7e8] border border-[#c4bccf] text-[#403a49] text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] uppercase font-mono text-[#756d80] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProductDescription}
                  onChange={e => setNewProductDescription(e.target.value)}
                  className="w-full p-2.5 rounded-[14px] bg-[#e5e0eb] border shadow-[inset_3px_3px_7px_rgba(112,99,126,0.14),inset_-3px_-3px_7px_rgba(255,255,255,0.7)] border-[#c4bccf] text-[#403a49]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#d1c9dc]">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#756d80] hover:text-[#403a49]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold uppercase tracking-wider text-black bg-white hover:bg-[#d8d2e1]"
                >
                  Publish Cloth to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT PROOF SCREENSHOT PREVIEW MODAL */}
      {selectedProofOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#e5e0eb]/85 backdrop-blur-md"
          onClick={() => setSelectedProofOrder(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#eeeaf5] p-4 sm:p-6 rounded-[26px] shadow-[14px_14px_30px_rgba(112,99,126,0.22),-10px_-10px_24px_rgba(255,255,255,0.8)] border border-[#c4bccf]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProofOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#ddd7e8] text-[#756d80] hover:text-[#403a49]"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-base font-bold text-[#403a49] mb-1">Customer Payment Screenshot</h4>
            <div className="text-xs text-[#756d80] mb-3 font-mono">
              Order: {selectedProofOrder.orderNumber} • UTR: {selectedProofOrder.utrNumber}
            </div>
            <img
              src={selectedProofOrder.paymentScreenshot}
              alt="Payment Screenshot"
              className="w-full max-h-[60vh] object-contain rounded-xl border border-[#d1c9dc] bg-[#e5e0eb]"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  verifyPayment(selectedProofOrder.id, true);
                  setSelectedProofOrder(null);
                  alert(`Payment verified for ${selectedProofOrder.orderNumber}!`);
                }}
                className="px-4 py-2 rounded-xl bg-[#7fa98f] text-black font-bold text-xs uppercase"
              >
                ✓ Mark Payment Verified
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
