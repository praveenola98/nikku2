import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  ShieldCheck,
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  Copy,
  Eye,
  Layers,
  Check,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  Product,
  ProductVariant,
  Category,
  Gender,
  DenimFit,
  OrderStatus,
} from '../types';
import { ADMIN_EMAIL } from '../data/initialStoreData';

export const AdminPortalModal: React.FC = function () {
  const {
    isAdminPortalOpen,
    setIsAdminPortalOpen,
    products,
    addProduct,
    deleteProduct,
    orders,
    verifyOrderPayment,
    updateOrderTracking,
    usersList,
  } = useShop();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'add-product' | 'inventory' | 'users'
  >('orders');

  const [orderStatusFilter, setOrderStatusFilter] =
    useState<string>('all');

  const [selectedScreenshotModal, setSelectedScreenshotModal] =
    useState<string | null>(null);

  const [copiedUtr, setCopiedUtr] =
    useState<string | null>(null);

  const [trackingForm, setTrackingForm] = useState<{
    orderId: string;
    status: OrderStatus;
    courierName: string;
    trackingNumber: string;
    note: string;
  } | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] =
    useState<Category>('t-shirts');
  const [newGender, setNewGender] =
    useState<Gender>('men');
  const [newFit, setNewFit] =
    useState<DenimFit>('Straight');

  const [newBasePrice, setNewBasePrice] =
    useState(1499);

  const [newBaseOriginalPrice, setNewBaseOriginalPrice] =
    useState(2199);

  const [newDescription, setNewDescription] = useState(
    'Premium heavyweight cotton fabric designed for everyday modern style. Handcrafted in Rajasthan.'
  );

  const [selectedSizes, setSelectedSizes] =
    useState<string[]>(['M', 'L', 'XL']);

  const [variants, setVariants] =
    useState<ProductVariant[]>([
      {
        colorName: 'Midnight Black',
        hex: '#161616',
        price: 1499,
        originalPrice: 2199,
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        ],
        stock: 40,
      },
      {
        colorName: 'Vintage Ecru',
        hex: '#e3dcce',
        price: 1599,
        originalPrice: 2299,
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
        ],
        stock: 30,
      },
    ]);

  const [formSuccessMessage, setFormSuccessMessage] =
    useState('');

  if (!isAdminPortalOpen) {
    return null;
  }

  const totalRevenue = orders
    .filter(function (order) {
      return (
        order.status !== 'cancelled' &&
        order.status !== 'pending_payment_verification'
      );
    })
    .reduce(function (total, order) {
      return total + order.totalAmount;
    }, 0);

  const pendingVerificationOrders = orders.filter(
    function (order) {
      return order.status === 'pending_payment_verification';
    }
  );

  const totalUsersCount = usersList.length;

  const filteredOrders = orders.filter(function (order) {
    if (orderStatusFilter === 'all') {
      return true;
    }

    return order.status === orderStatusFilter;
  });

  function closeAdmin(): void {
    setIsAdminPortalOpen(false);
  }

  function handleCopyUtr(utr: string): void {
    navigator.clipboard.writeText(utr);
    setCopiedUtr(utr);

    setTimeout(function () {
      setCopiedUtr(null);
    }, 2000);
  }

  function handleAddVariant(): void {
    setVariants(function (previous) {
      return [
        ...previous,
        {
          colorName: `Color ${previous.length + 1}`,
          hex: '#3a4a5b',
          price: newBasePrice,
          originalPrice: newBaseOriginalPrice,
          images: [
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
          ],
          stock: 25,
        },
      ];
    });
  }

  function handleRemoveVariant(index: number): void {
    if (variants.length <= 1) {
      return;
    }

    setVariants(function (previous) {
      return previous.filter(function (_, itemIndex) {
        return itemIndex !== index;
      });
    });
  }

  function handleVariantChange(
    index: number,
    field: keyof ProductVariant,
    value: any
  ): void {
    setVariants(function (previous) {
      return previous.map(function (variant, itemIndex) {
        if (itemIndex !== index) {
          return variant;
        }

        return {
          ...variant,
          [field]: value,
        };
      });
    });
  }

  function handleCreateProduct(
    event: React.FormEvent
  ): void {
    event.preventDefault();

    if (!newTitle.trim() || variants.length === 0) {
      return;
    }

    const discountPercent = Math.round(
      ((newBaseOriginalPrice - newBasePrice) /
        newBaseOriginalPrice) *
        100
    );

    const newId = `custom-cloth-${Date.now()}`;

    const allImages: string[] = [];

    variants.forEach(function (variant) {
      variant.images.forEach(function (image) {
        if (!allImages.includes(image)) {
          allImages.push(image);
        }
      });
    });

    const newProduct: Product = {
      id: newId,
      name: newTitle.trim(),
      category: newCategory,
      gender: newGender,
      price: variants[0].price,
      originalPrice: variants[0].originalPrice,
      discountPercent,
      rating: 5.0,
      reviewsCount: 1,
      isNew: true,
      fit:
        newCategory === 'jeans'
          ? newFit
          : undefined,
      colors: variants.map(function (variant) {
        return {
          name: variant.colorName,
          hex: variant.hex,
        };
      }),
      variants,
      sizes:
        selectedSizes.length > 0
          ? selectedSizes
          : ['M', 'L'],
      images:
        allImages.length > 0
          ? allImages
          : [
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
            ],
      description: newDescription,
      fabricCare: [
        '100% Premium Cotton / High-end weave',
        'Machine wash cold gentle cycle',
        'Designed in Nawalgarh',
      ],
      sizeFit: [
        'True to modern streetwear relaxed fit',
        'Pre-shrunk fabric',
      ],
      shippingReturns:
        'Dispatched directly from Nawalgarh store with 7-day doorstep return.',
      inStock: true,
    };

    addProduct(newProduct);

    setFormSuccessMessage(
      `"${newTitle}" added successfully with ${variants.length} color variants!`
    );

    setTimeout(function () {
      setFormSuccessMessage('');
    }, 4000);

    setNewTitle('');
    setActiveTab('inventory');
  }

  const filters = [
    {
      label: 'All Orders',
      value: 'all',
      count: orders.length,
    },
    {
      label: 'Pending',
      value: 'pending_payment_verification',
      count: pendingVerificationOrders.length,
    },
    {
      label: 'Payment Confirmed',
      value: 'payment_verified',
      count: orders.filter(function (order) {
        return order.status === 'payment_verified';
      }).length,
    },
    {
      label: 'Processing',
      value: 'processing',
      count: orders.filter(function (order) {
        return order.status === 'processing';
      }).length,
    },
    {
      label: 'Shipped',
      value: 'shipped',
      count: orders.filter(function (order) {
        return order.status === 'shipped';
      }).length,
    },
    {
      label: 'Delivered',
      value: 'delivered',
      count: orders.filter(function (order) {
        return order.status === 'delivered';
      }).length,
    },
  ];

  return (
    <>
      <style>{`
/* ============================================================
   NIKKU FASHION — DEEP CLAYMORPHISM UI
   Soft Lavender / Frosted Clay / Neumorphic
   ============================================================ */

.admin-light {
  --clay-bg: #e7e3f1;
  --clay-surface: #ebe7f5;
  --clay-surface-light: #f1eef8;
  --clay-surface-dark: #ddd8ea;

  --clay-text: #29253a;
  --clay-muted: #7b748e;
  --clay-accent: #8669d3;
  --clay-accent-dark: #7054bb;
  --clay-accent-light: #cfc3ed;

  --clay-white: rgba(255,255,255,.88);
  --clay-dark: rgba(190,184,210,.78);

  background:
    radial-gradient(
      circle at 8% 8%,
      rgba(255,255,255,.9) 0,
      rgba(255,255,255,.45) 16%,
      transparent 38%
    ),
    radial-gradient(
      circle at 92% 92%,
      rgba(133,105,211,.12),
      transparent 38%
    ),
    #e7e3f1;

  color: var(--clay-text);
}

.admin-light,
.admin-light * {
  box-sizing: border-box;
}

/* ============================================================
   MAIN CLAY CONTAINER
   ============================================================ */

.admin-light > div {
  background: transparent;
}

/* ============================================================
   HEADER — FLOATING CLAY
   ============================================================ */

.admin-light > div > header {
  background: rgba(235,231,245,.82) !important;

  border: 0 !important;
  border-bottom: 1px solid rgba(255,255,255,.65) !important;

  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);

  box-shadow:
    0 12px 28px rgba(181,175,202,.48),
    0 -4px 15px rgba(255,255,255,.48);
}

/* ============================================================
   LOGO CLAY
   ============================================================ */

.admin-light header div[class*="bg-[#c5a880]"] {
  background:
    linear-gradient(
      145deg,
      #a88de7,
      #7659c2
    ) !important;

  color: white !important;

  border-radius: 15px !important;

  box-shadow:
    7px 7px 15px rgba(183,176,207,.85),
    -7px -7px 15px rgba(255,255,255,.9),
    inset 1px 1px 2px rgba(255,255,255,.28);
}

/* ============================================================
   ALL CARDS — STRONG CLAY
   ============================================================ */

.admin-card {
  position: relative;

  background:
    linear-gradient(
      145deg,
      #f0edf8 0%,
      #e8e4f2 100%
    ) !important;

  border: 1px solid rgba(255,255,255,.72) !important;

  border-radius: 24px !important;

  box-shadow:
    13px 13px 28px rgba(191,185,211,.82),
    -13px -13px 28px rgba(255,255,255,.88),
    inset 1px 1px 1px rgba(255,255,255,.48);

  transition:
    transform .25s cubic-bezier(.22,.61,.36,1),
    box-shadow .25s ease;
}

.admin-card:hover {
  transform: translateY(-2px);

  box-shadow:
    16px 16px 34px rgba(187,181,207,.86),
    -16px -16px 34px rgba(255,255,255,.94),
    inset 1px 1px 1px rgba(255,255,255,.55);
}

/* ============================================================
   INNER CLAY SURFACES
   ============================================================ */

.admin-soft {
  background:
    linear-gradient(
      145deg,
      #eeeaf7,
      #e3deee
    ) !important;

  border: 1px solid rgba(255,255,255,.65) !important;

  border-radius: 20px !important;

  box-shadow:
    inset 7px 7px 14px rgba(198,191,215,.55),
    inset -7px -7px 14px rgba(255,255,255,.78);
}

/* ============================================================
   STAT CARDS — FLOATING MINI CLAY
   ============================================================ */

.admin-stat-light {
  position: relative;

  background:
    linear-gradient(
      145deg,
      #f1eef8,
      #e5e1ef
    ) !important;

  border: 1px solid rgba(255,255,255,.72) !important;

  border-radius: 21px !important;

  padding: 19px !important;

  box-shadow:
    10px 10px 22px rgba(193,187,213,.82),
    -10px -10px 22px rgba(255,255,255,.92),
    inset 1px 1px 2px rgba(255,255,255,.5);

  transition:
    transform .25s ease,
    box-shadow .25s ease;
}

.admin-stat-light:hover {
  transform: translateY(-4px);

  box-shadow:
    14px 14px 28px rgba(190,184,209,.9),
    -14px -14px 28px rgba(255,255,255,.96);
}

/* ============================================================
   PRESSED INPUTS
   ============================================================ */

.admin-input-light {
  width: 100%;
  min-height: 45px;

  padding: 10px 14px;

  color: #302b40 !important;

  background:
    linear-gradient(
      145deg,
      #e2deed,
      #eeeaf7
    ) !important;

  border: 1px solid rgba(255,255,255,.72) !important;

  border-radius: 15px !important;

  outline: none;

  box-shadow:
    inset 6px 6px 12px rgba(194,188,211,.58),
    inset -6px -6px 12px rgba(255,255,255,.86);

  transition:
    box-shadow .22s ease,
    border-color .22s ease,
    background .22s ease;
}

.admin-input-light:hover {
  border-color: rgba(134,105,211,.28) !important;
}

.admin-input-light:focus {
  border-color: rgba(134,105,211,.55) !important;

  background:
    linear-gradient(
      145deg,
      #e8e3f2,
      #f0edf8
    ) !important;

  box-shadow:
    inset 4px 4px 9px rgba(194,188,211,.55),
    inset -4px -4px 9px rgba(255,255,255,.88),
    0 0 0 4px rgba(134,105,211,.12);
}

.admin-input-light::placeholder {
  color: #9690a7 !important;
}

/* ============================================================
   LABELS
   ============================================================ */

.admin-label-light {
  display: block;

  margin-bottom: 7px;

  color: #756e88 !important;

  font-family: monospace;
  font-size: 9px;
  font-weight: 800;

  letter-spacing: .1em;
  text-transform: uppercase;
}

/* ============================================================
   CLAY BUTTONS
   ============================================================ */

.admin-btn-light {
  border-radius: 15px !important;

  border: 1px solid rgba(255,255,255,.72) !important;

  transition:
    transform .18s ease,
    box-shadow .18s ease,
    background .18s ease;
}

.admin-btn-light:hover {
  transform: translateY(-2px);

  box-shadow:
    7px 7px 15px rgba(191,185,210,.78),
    -7px -7px 15px rgba(255,255,255,.88);
}

.admin-btn-light:active {
  transform: translateY(1px);

  box-shadow:
    inset 5px 5px 10px rgba(193,187,211,.6),
    inset -5px -5px 10px rgba(255,255,255,.85);
}

/* ============================================================
   PRIMARY PURPLE CLAY
   ============================================================ */

.admin-light [class*="bg-[#a98b62]"] {
  background:
    linear-gradient(
      145deg,
      #987ce1,
      #7559bf
    ) !important;

  color: white !important;

  border-color: rgba(255,255,255,.42) !important;

  box-shadow:
    7px 7px 15px rgba(184,177,207,.78),
    -7px -7px 15px rgba(255,255,255,.86),
    inset 1px 1px 2px rgba(255,255,255,.22);
}

.admin-light [class*="bg-[#a98b62]"]:hover {
  background:
    linear-gradient(
      145deg,
      #a187e8,
      #7b5fc5
    ) !important;
}

/* ============================================================
   NAVIGATION
   ============================================================ */

.admin-nav-light {
  color: #7b748e !important;

  border-bottom: 2px solid transparent;

  border-radius: 15px 15px 0 0;

  transition:
    background .2s ease,
    color .2s ease,
    transform .2s ease;
}

.admin-nav-light:hover {
  color: #40394f !important;

  background:
    rgba(255,255,255,.34);
}

.admin-nav-active {
  color: #7659c3 !important;

  border-bottom-color: #876bd3 !important;

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.62),
      rgba(216,207,239,.65)
    ) !important;

  box-shadow:
    inset 4px 4px 9px rgba(194,188,211,.4),
    inset -4px -4px 9px rgba(255,255,255,.78);
}

/* ============================================================
   QUICK ACTIONS
   ============================================================ */

.admin-light button[class*="text-left"] {
  background:
    linear-gradient(
      145deg,
      #f0edf8,
      #e3dfed
    ) !important;

  border-color: rgba(255,255,255,.7) !important;

  border-radius: 17px !important;

  box-shadow:
    7px 7px 15px rgba(194,188,211,.68),
    -7px -7px 15px rgba(255,255,255,.86);

  transition:
    transform .2s ease,
    box-shadow .2s ease;
}

.admin-light button[class*="text-left"]:hover {
  transform: translateY(-2px);

  box-shadow:
    10px 10px 20px rgba(190,184,209,.76),
    -10px -10px 20px rgba(255,255,255,.92);
}

/* ============================================================
   ORDER CARDS
   ============================================================ */

.admin-light article {
  background:
    linear-gradient(
      145deg,
      #f0edf8,
      #e5e1ef
    ) !important;

  border: 1px solid rgba(255,255,255,.72) !important;

  border-radius: 23px !important;

  box-shadow:
    11px 11px 25px rgba(192,186,212,.8),
    -11px -11px 25px rgba(255,255,255,.88);
}

/* ============================================================
   PAYMENT PANELS
   ============================================================ */

.admin-light [class*="bg-[#fafaf8]"] {
  background:
    linear-gradient(
      145deg,
      #e5e1ef,
      #eeeaf7
    ) !important;

  border-color: rgba(255,255,255,.7) !important;

  box-shadow:
    inset 5px 5px 11px rgba(196,190,213,.48),
    inset -5px -5px 11px rgba(255,255,255,.82);
}

/* ============================================================
   UTR CODE
   ============================================================ */

.admin-light code {
  background:
    linear-gradient(
      145deg,
      #ded9e9,
      #eeeaf7
    ) !important;

  border: 1px solid rgba(255,255,255,.7) !important;

  border-radius: 12px !important;

  box-shadow:
    inset 4px 4px 8px rgba(194,188,211,.5),
    inset -4px -4px 8px rgba(255,255,255,.8);
}

/* ============================================================
   FILTER PILLS
   ============================================================ */

.admin-light button[class*="rounded-full"] {
  border-radius: 999px !important;

  transition:
    transform .18s ease,
    box-shadow .18s ease;
}

.admin-light button[class*="rounded-full"]:hover {
  transform: translateY(-2px);
}

.admin-light button[class*="rounded-full"][class*="bg-[#a98b62]"] {
  background:
    linear-gradient(
      145deg,
      #987ce1,
      #7559bf
    ) !important;

  color: white !important;

  box-shadow:
    6px 6px 13px rgba(187,180,209,.8),
    -6px -6px 13px rgba(255,255,255,.88);
}

/* ============================================================
   SIZE BUTTONS
   ============================================================ */

.admin-light button[class*="min-w-[44px]"] {
  background:
    linear-gradient(
      145deg,
      #eeeaf7,
      #e1ddec
    ) !important;

  color: #6e687e !important;

  border-color: rgba(255,255,255,.72) !important;

  border-radius: 13px !important;

  box-shadow:
    5px 5px 10px rgba(194,188,211,.58),
    -5px -5px 10px rgba(255,255,255,.8);
}

.admin-light button[class*="min-w-[44px]"][class*="bg-[#a98b62]"] {
  background:
    linear-gradient(
      145deg,
      #987ce1,
      #7559bf
    ) !important;

  color: white !important;
}

/* ============================================================
   VARIANT CARDS
   ============================================================ */

.admin-light [class*="rounded-lg"][class*="bg-[#fafaf8]"] {
  background:
    linear-gradient(
      145deg,
      #eeeaf7,
      #e2ddec
    ) !important;

  border-radius: 19px !important;

  box-shadow:
    inset 5px 5px 11px rgba(196,190,213,.48),
    inset -5px -5px 11px rgba(255,255,255,.82);
}

/* ============================================================
   IMAGE CLAY
   ============================================================ */

.admin-light img {
  border-color: rgba(255,255,255,.72) !important;
}

.admin-light img[class*="rounded-md"],
.admin-light img[class*="rounded-lg"] {
  box-shadow:
    5px 5px 11px rgba(193,187,211,.5),
    -5px -5px 11px rgba(255,255,255,.72);
}

/* ============================================================
   SUCCESS PANEL
   ============================================================ */

.admin-light [class*="bg-[#f1f9f3]"],
.admin-light [class*="bg-[#f2faf4]"] {
  background:
    linear-gradient(
      145deg,
      #e8f4ed,
      #dcece3
    ) !important;

  border-color: rgba(255,255,255,.75) !important;

  border-radius: 16px !important;

  box-shadow:
    inset 5px 5px 10px rgba(182,203,190,.42),
    inset -5px -5px 10px rgba(255,255,255,.82);
}

/* ============================================================
   WARNING PANEL
   ============================================================ */

.admin-light [class*="bg-[#fff3df]"],
.admin-light [class*="bg-[#fff8e9]"],
.admin-light [class*="bg-[#fef0e9]"] {
  background:
    linear-gradient(
      145deg,
      #f4eadb,
      #eadfce
    ) !important;

  border-color: rgba(255,255,255,.7) !important;

  box-shadow:
    inset 5px 5px 10px rgba(202,190,168,.42),
    inset -5px -5px 10px rgba(255,255,255,.8);
}

/* ============================================================
   CLOSE BUTTON
   ============================================================ */

.admin-light button[class*="h-8"][class*="w-8"],
.admin-light button[class*="p-2"][class*="rounded-full"] {
  background:
    linear-gradient(
      145deg,
      #eeeaf7,
      #dfd9eb
    ) !important;

  border: 1px solid rgba(255,255,255,.72) !important;

  box-shadow:
    5px 5px 10px rgba(193,187,211,.62),
    -5px -5px 10px rgba(255,255,255,.82);
}

/* ============================================================
   MODAL BACKDROP
   ============================================================ */

.admin-light [class*="backdrop-blur"] {
  background: rgba(48,43,64,.34) !important;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ============================================================
   MODAL PANEL
   ============================================================ */

.admin-light [class*="max-w-md"],
.admin-light [class*="max-w-2xl"] {
  background:
    linear-gradient(
      145deg,
      #f0edf8,
      #e3dfed
    ) !important;

  border: 1px solid rgba(255,255,255,.78) !important;

  border-radius: 26px !important;

  box-shadow:
    22px 22px 48px rgba(112,104,135,.42),
    -12px -12px 34px rgba(255,255,255,.82);
}

/* ============================================================
   TABLE
   ============================================================ */

.admin-light table {
  border-collapse: separate;
  border-spacing: 0;

  overflow: hidden;

  border-radius: 18px;
}

.admin-light thead {
  background:
    linear-gradient(
      145deg,
      #ded9eb,
      #ebe7f4
    ) !important;
}

.admin-light tbody tr {
  transition:
    background .18s ease,
    transform .18s ease;
}

.admin-light tbody tr:hover {
  background: rgba(255,255,255,.34) !important;
}

/* ============================================================
   SCROLLBAR
   ============================================================ */

.admin-light ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.admin-light ::-webkit-scrollbar-track {
  background: transparent;
}

.admin-light ::-webkit-scrollbar-thumb {
  background:
    linear-gradient(
      180deg,
      #c8c0d8,
      #aaa0c0
    );

  border-radius: 999px;

  border: 2px solid #e7e3f1;
}

.admin-light ::-webkit-scrollbar-thumb:hover {
  background: #988dac;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* ============================================================
   PAGE ANIMATION
   ============================================================ */

.admin-modal-animation {
  animation:
    adminClayAppear .3s cubic-bezier(.22,.61,.36,1) both;
}

@keyframes adminClayAppear {
  from {
    opacity: 0;
    transform:
      translateY(12px)
      scale(.985);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }
}

/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 640px) {

  .admin-card {
    border-radius: 19px !important;

    box-shadow:
      8px 8px 18px rgba(193,187,213,.78),
      -8px -8px 18px rgba(255,255,255,.86);
  }

  .admin-stat-light {
    border-radius: 18px !important;
    padding: 15px !important;
  }

  .admin-input-light {
    min-height: 46px;
    border-radius: 14px !important;
  }

  .admin-btn-light {
    border-radius: 14px !important;
  }

  .admin-nav-light {
    min-height: 44px !important;

    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  .admin-light article {
    border-radius: 19px !important;
  }
}

/* ============================================================
   SMALL PHONES — 320px / 360px
   ============================================================ */

@media (max-width: 380px) {

  .admin-light {
    font-size: 13px;
  }

  .admin-stat-light {
    padding: 13px !important;
    border-radius: 17px !important;
  }

  .admin-nav-light {
    padding-left: 10px !important;
    padding-right: 10px !important;

    font-size: 8px !important;
  }

  .admin-input-light {
    padding-left: 11px;
    padding-right: 11px;
  }
}

/* ============================================================
   TABLET
   ============================================================ */

@media (min-width: 641px) and (max-width: 1024px) {

  .admin-card {
    border-radius: 21px !important;
  }

  .admin-stat-light {
    min-height: 125px;
  }
}

/* ============================================================
   LARGE DESKTOP
   ============================================================ */

@media (min-width: 1536px) {

  .admin-card {
    border-radius: 26px !important;
  }

  .admin-stat-light {
    padding: 22px !important;
  }
}

/* ============================================================
   REDUCED MOTION
   ============================================================ */

@media (prefers-reduced-motion: reduce) {

  .admin-modal-animation,
  .admin-stat-light,
  .admin-btn-light,
  .admin-card,
  .admin-nav-light {
    animation: none !important;
    transition: none !important;
  }
}
`}</style>

      <div className="admin-light pt-25 fixed inset-0 z-[180] flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="shrink-0 border-b border-[#e4e2dd] bg-white">
          

          {/* NAVIGATION */}
          <div className="overflow-x-auto border-t border-[#eeeeeb] no-scrollbar">
            <div className="mx-auto flex min-w-max px-2 sm:px-4 lg:px-8">

              <button
                onClick={function () {
                  setActiveTab('overview');
                }}
                className={`admin-nav-light flex min-h-[48px] items-center gap-2 border-b-2 px-4 font-mono text-[9px] font-bold uppercase tracking-wider ${
                  activeTab === 'overview'
                    ? 'admin-nav-active'
                    : ''
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Overview
              </button>

              <button
                onClick={function () {
                  setActiveTab('orders');
                }}
                className={`admin-nav-light flex min-h-[48px] items-center gap-2 border-b-2 px-4 font-mono text-[9px] font-bold uppercase tracking-wider ${
                  activeTab === 'orders'
                    ? 'admin-nav-active'
                    : ''
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Orders

                {pendingVerificationOrders.length > 0 && (
                  <span className="rounded-full bg-[#fef0e9] px-1.5 py-0.5 text-[8px] font-bold text-[#c35b35]">
                    {pendingVerificationOrders.length}
                  </span>
                )}
              </button>

              <button
                onClick={function () {
                  setActiveTab('add-product');
                }}
                className={`admin-nav-light flex min-h-[48px] items-center gap-2 border-b-2 px-4 font-mono text-[9px] font-bold uppercase tracking-wider ${
                  activeTab === 'add-product'
                    ? 'admin-nav-active'
                    : ''
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Product
              </button>

              <button
                onClick={function () {
                  setActiveTab('inventory');
                }}
                className={`admin-nav-light flex min-h-[48px] items-center gap-2 border-b-2 px-4 font-mono text-[9px] font-bold uppercase tracking-wider ${
                  activeTab === 'inventory'
                    ? 'admin-nav-active'
                    : ''
                }`}
              >
                <Package className="h-3.5 w-3.5" />
                Inventory
                <span className="text-[8px] text-[#aaa7a0]">
                  {products.length}
                </span>
              </button>

              <button
                onClick={function () {
                  setActiveTab('users');
                }}
                className={`admin-nav-light flex min-h-[48px] items-center gap-2 border-b-2 px-4 font-mono text-[9px] font-bold uppercase tracking-wider ${
                  activeTab === 'users'
                    ? 'admin-nav-active'
                    : ''
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                Customers
                <span className="text-[8px] text-[#aaa7a0]">
                  {totalUsersCount}
                </span>
              </button>

            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto bg-[#f5f5f2]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            {/* ================= OVERVIEW ================= */}
            {activeTab === 'overview' && (
              <div className="admin-modal-animation space-y-6">

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#a98b62]">
                    Store Control Center
                  </p>

                  <h1 className="mt-1 font-['Syne'] text-2xl font-bold uppercase tracking-tight text-[#20201e] sm:text-3xl">
                    Dashboard Overview
                  </h1>

                  <p className="mt-1 text-xs text-[#85827b]">
                    Monitor orders, payments, customers and inventory.
                  </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                  <div className="admin-stat-light">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#85827b]">
                        Confirmed Revenue
                      </span>
                      <DollarSign className="h-4 w-4 text-[#a98b62]" />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#20201e]">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </p>

                    <p className="mt-1 text-[9px] text-[#568568]">
                      Verified sales
                    </p>
                  </div>

                  <div className="admin-stat-light">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#85827b]">
                        Total Orders
                      </span>
                      <ShoppingBag className="h-4 w-4 text-[#a98b62]" />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#20201e]">
                      {orders.length}
                    </p>

                    <p className="mt-1 text-[9px] text-[#85827b]">
                      All customer orders
                    </p>
                  </div>

                  <div className="admin-stat-light">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#85827b]">
                        Payment Review
                      </span>
                      <Clock className="h-4 w-4 text-[#c98a32]" />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#b87519]">
                      {pendingVerificationOrders.length}
                    </p>

                    <p className="mt-1 text-[9px] text-[#85827b]">
                      UTRs waiting for review
                    </p>
                  </div>

                  <div className="admin-stat-light">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#85827b]">
                        Customers
                      </span>
                      <Users className="h-4 w-4 text-[#a98b62]" />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#20201e]">
                      {totalUsersCount}
                    </p>

                    <p className="mt-1 text-[9px] text-[#85827b]">
                      Registered accounts
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_.8fr]">

                  {/* PAYMENT */}
                  <section className="admin-card p-5 sm:p-6">

                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-[#a98b62]" />

                          <h2 className="font-['Syne'] text-base font-bold uppercase text-[#20201e]">
                            Payment Review
                          </h2>
                        </div>

                        <p className="mt-1 text-[10px] text-[#8b8881]">
                          UPI payments waiting for manual confirmation.
                        </p>
                      </div>

                      {pendingVerificationOrders.length > 0 && (
                        <span className="rounded-full bg-[#fff3df] px-2 py-1 font-mono text-[8px] font-bold text-[#a86c17]">
                          {pendingVerificationOrders.length} pending
                        </span>
                      )}
                    </div>

                    {pendingVerificationOrders.length === 0 ? (
                      <div className="rounded-md border border-[#cfe4d5] bg-[#f2faf4] p-4">
                        <div className="flex items-center gap-2 text-[#4e855d]">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs font-semibold">
                            All payments are verified.
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {pendingVerificationOrders.map(
                          function (order) {
                            return (
                              <div
                                key={order.id}
                                className="flex flex-col gap-3 rounded-md border border-[#e6e3dd] bg-[#fafaf8] p-3 sm:flex-row sm:items-center sm:justify-between"
                              >
                                <div>
                                  <p className="font-mono text-xs font-bold text-[#20201e]">
                                    {order.id}
                                  </p>

                                  <p className="mt-1 text-[10px] text-[#8b8881]">
                                    {order.userName} · UTR:{' '}
                                    <span className="font-semibold text-[#96774f]">
                                      {order.paymentDetails.utrNumber ||
                                        'N/A'}
                                    </span>
                                  </p>

                                  <p className="mt-1 text-xs font-bold text-[#20201e]">
                                    ₹
                                    {order.totalAmount.toLocaleString(
                                      'en-IN'
                                    )}
                                  </p>
                                </div>

                                <button
                                  onClick={function () {
                                    verifyOrderPayment(order.id);
                                  }}
                                  className="admin-btn-light flex items-center justify-center gap-1.5 rounded-md bg-[#4f8a5d] px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-white hover:bg-[#447851]"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Verify
                                </button>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}

                  </section>

                  {/* QUICK ACTIONS */}
                  <section className="admin-card p-5 sm:p-6">

                    <div className="mb-5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#a98b62]" />

                        <h2 className="font-['Syne'] text-base font-bold uppercase text-[#20201e]">
                          Quick Actions
                        </h2>
                      </div>

                      <p className="mt-1 text-[10px] text-[#8b8881]">
                        Frequently used store controls.
                      </p>
                    </div>

                    <div className="space-y-2">

                      <button
                        onClick={function () {
                          setActiveTab('add-product');
                        }}
                        className="admin-btn-light flex w-full items-center justify-between rounded-md border border-[#e5e2dc] bg-[#fafaf8] p-3 text-left hover:border-[#cfc6b8] hover:bg-white"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#292824]">
                            Add New Product
                          </p>

                          <p className="mt-1 text-[9px] text-[#8c8982]">
                            Create variants and pricing
                          </p>
                        </div>

                        <Plus className="h-4 w-4 text-[#a98b62]" />
                      </button>

                      <button
                        onClick={function () {
                          setActiveTab('orders');
                        }}
                        className="admin-btn-light flex w-full items-center justify-between rounded-md border border-[#e5e2dc] bg-[#fafaf8] p-3 text-left hover:border-[#cfc6b8] hover:bg-white"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#292824]">
                            Update Tracking
                          </p>

                          <p className="mt-1 text-[9px] text-[#8c8982]">
                            Courier and AWB details
                          </p>
                        </div>

                        <Truck className="h-4 w-4 text-[#a98b62]" />
                      </button>

                      <button
                        onClick={function () {
                          setActiveTab('inventory');
                        }}
                        className="admin-btn-light flex w-full items-center justify-between rounded-md border border-[#e5e2dc] bg-[#fafaf8] p-3 text-left hover:border-[#cfc6b8] hover:bg-white"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#292824]">
                            Manage Inventory
                          </p>

                          <p className="mt-1 text-[9px] text-[#8c8982]">
                            View and remove products
                          </p>
                        </div>

                        <Package className="h-4 w-4 text-[#a98b62]" />
                      </button>

                      <button
                        onClick={function () {
                          setActiveTab('users');
                        }}
                        className="admin-btn-light flex w-full items-center justify-between rounded-md border border-[#e5e2dc] bg-[#fafaf8] p-3 text-left hover:border-[#cfc6b8] hover:bg-white"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#292824]">
                            Customer Directory
                          </p>

                          <p className="mt-1 text-[9px] text-[#8c8982]">
                            {totalUsersCount} registered users
                          </p>
                        </div>

                        <Users className="h-4 w-4 text-[#a98b62]" />
                      </button>

                    </div>
                  </section>

                </div>
              </div>
            )}

            {/* ================= ORDERS ================= */}
            {activeTab === 'orders' && (
              <div className="admin-modal-animation space-y-5">

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#a98b62]">
                    Operations
                  </p>

                  <h1 className="mt-1 font-['Syne'] text-2xl font-bold uppercase text-[#20201e] sm:text-3xl">
                    Orders & Payments
                  </h1>

                  <p className="mt-1 text-xs text-[#85827b]">
                    Verify payments and manage customer deliveries.
                  </p>
                </div>

                {/* FILTERS */}
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {filters.map(function (filter) {
                    const isActive =
                      orderStatusFilter === filter.value;

                    return (
                      <button
                        key={filter.value}
                        onClick={function () {
                          setOrderStatusFilter(filter.value);
                        }}
                        className={`admin-btn-light shrink-0 rounded-full border px-3 py-2 font-mono text-[9px] font-bold uppercase ${
                          isActive
                            ? 'border-[#a98b62] bg-[#a98b62] text-white'
                            : 'border-[#dedbd5] bg-white text-[#77736c] hover:border-[#c9c4bb] hover:text-[#20201e]'
                        }`}
                      >
                        {filter.label} ({filter.count})
                      </button>
                    );
                  })}
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="admin-card flex min-h-[260px] items-center justify-center">
                    <div className="text-center">
                      <ShoppingBag className="mx-auto h-8 w-8 text-[#c8c5be]" />

                      <p className="mt-3 text-sm text-[#85827b]">
                        No orders found.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map(function (order) {
                      const isPending =
                        order.status ===
                        'pending_payment_verification';

                      return (
                        <article
                          key={order.id}
                          className={`overflow-hidden rounded-xl border bg-white ${
                            isPending
                              ? 'border-[#e4c98d]'
                              : 'border-[#e5e2dc]'
                          }`}
                        >

                          {/* HEADER */}
                          <div className="flex flex-col gap-3 border-b border-[#eeeae4] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-sm font-bold text-[#20201e]">
                                  {order.id}
                                </span>

                                <span
                                  className={`rounded-full border px-2 py-1 font-mono text-[8px] font-bold uppercase ${
                                    isPending
                                      ? 'border-[#e6c985] bg-[#fff8e9] text-[#a66d16]'
                                      : order.status === 'delivered'
                                      ? 'border-[#c9dfce] bg-[#f1f9f3] text-[#4e855d]'
                                      : 'border-[#dedbd5] bg-[#f7f6f3] text-[#77736c]'
                                  }`}
                                >
                                  {order.status.replace(
                                    /_/g,
                                    ' '
                                  )}
                                </span>
                              </div>

                              <p className="mt-1 font-mono text-[9px] text-[#98958e]">
                                Placed on {order.createdAt}
                              </p>
                            </div>

                            <div className="sm:text-right">
                              <p className="font-mono text-[8px] uppercase tracking-wider text-[#99968f]">
                                Order Total
                              </p>

                              <p className="mt-1 text-xl font-bold text-[#20201e]">
                                ₹
                                {order.totalAmount.toLocaleString(
                                  'en-IN'
                                )}
                              </p>
                            </div>

                          </div>

                          {/* BODY */}
                          <div className="grid grid-cols-1 gap-5 p-4 sm:p-5 lg:grid-cols-3">

                            {/* CUSTOMER */}
                            <div>
                              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#a98b62]">
                                Customer & Delivery
                              </p>

                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-[#292824]">
                                  {order.shippingAddress.fullName}
                                </p>

                                <p className="text-[#6f6c65]">
                                  {order.shippingAddress.phone}
                                </p>

                                <p className="break-all text-[#8a8780]">
                                  {order.userEmail}
                                </p>

                                <p className="pt-1 leading-relaxed text-[#6f6c65]">
                                  {order.shippingAddress.streetAddress},{' '}
                                  {order.shippingAddress.city},{' '}
                                  {order.shippingAddress.state} -{' '}
                                  {order.shippingAddress.pincode}
                                </p>
                              </div>
                            </div>

                            {/* ITEMS */}
                            <div>
                              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#a98b62]">
                                Ordered Items ({order.items.length})
                              </p>

                              <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                                {order.items.map(function (
                                  item,
                                  index
                                ) {
                                  return (
                                    <div
                                      key={index}
                                      className="flex gap-2.5 border-b border-[#eeeae4] pb-2"
                                    >
                                      <img
                                        src={
                                          item.product.images[0]
                                        }
                                        alt={item.product.name}
                                        className="h-12 w-10 shrink-0 rounded-md border border-[#e7e4de] object-cover"
                                      />

                                      <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-semibold text-[#292824]">
                                          {item.product.name}
                                        </p>

                                        <div className="mt-1 flex flex-wrap items-center gap-1.5 font-mono text-[8px] text-[#8b8881]">
                                          <span
                                            className="h-2.5 w-2.5 rounded-full border border-[#d5d2cb]"
                                            style={{
                                              backgroundColor:
                                                item.selectedColor
                                                  .hex,
                                            }}
                                          />

                                          <span>
                                            {item.selectedColor.name}
                                          </span>

                                          <span>·</span>

                                          <span>
                                            Size {item.selectedSize}
                                          </span>

                                          <span>·</span>

                                          <span>
                                            Qty {item.quantity}
                                          </span>
                                        </div>
                                      </div>

                                      <span className="shrink-0 font-mono text-xs font-bold text-[#292824]">
                                        ₹
                                        {(
                                          (item.unitPrice ||
                                            item.product.price) *
                                          item.quantity
                                        ).toLocaleString('en-IN')}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* PAYMENT */}
                            <div className="rounded-lg border border-[#e4e1da] bg-[#fafaf8] p-3.5">

                              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#a98b62]">
                                UPI Payment
                              </p>

                              <p className="text-[10px] text-[#85827b]">
                                Submitted UTR
                              </p>

                              <div className="mt-1.5 flex items-center gap-2">
                                <code className="min-w-0 flex-1 truncate rounded-md border border-[#dcd8d0] bg-white px-2.5 py-2 font-mono text-xs font-bold text-[#6f5738]">
                                  {order.paymentDetails
                                    .utrNumber ||
                                    'No UTR provided'}
                                </code>

                                {order.paymentDetails
                                  .utrNumber && (
                                  <button
                                    onClick={function () {
                                      handleCopyUtr(
                                        order.paymentDetails
                                          .utrNumber!
                                      );
                                    }}
                                    className="admin-btn-light flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#ddd9d1] bg-white text-[#6c6962] hover:text-[#292824]"
                                    title="Copy UTR"
                                  >
                                    {copiedUtr ===
                                    order.paymentDetails
                                      .utrNumber ? (
                                      <Check className="h-3.5 w-3.5 text-[#4f8a5d]" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                )}
                              </div>

                              {order.paymentDetails
                                .screenshotUrl && (
                                <button
                                  onClick={function () {
                                    setSelectedScreenshotModal(
                                      order.paymentDetails
                                        .screenshotUrl!
                                    );
                                  }}
                                  className="admin-btn-light mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-[#dedbd5] bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-[#69665f] hover:border-[#c9c2b7] hover:text-[#292824]"
                                >
                                  <Eye className="h-3.5 w-3.5 text-[#a98b62]" />
                                  Inspect Payment Slip
                                </button>
                              )}

                              {order.paymentDetails
                                .verifiedAt && (
                                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-mono text-[#4f8a5d]">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                  Verified on{' '}
                                  {
                                    order.paymentDetails
                                      .verifiedAt
                                  }
                                </div>
                              )}

                            </div>
                          </div>

                          {/* ACTION BAR */}
                          <div className="flex flex-col gap-3 border-t border-[#eeeae4] bg-[#fcfcfa] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

                            <div className="flex flex-wrap gap-2">

                              {isPending && (
                                <button
                                  onClick={function () {
                                    verifyOrderPayment(order.id);
                                  }}
                                  className="admin-btn-light flex items-center gap-2 rounded-md bg-[#4f8a5d] px-3.5 py-2.5 text-[9px] font-bold uppercase tracking-wider text-white hover:bg-[#447851]"
                                >
                                  <ShieldCheck className="h-4 w-4" />
                                  Approve Payment
                                </button>
                              )}

                              <button
                                onClick={function () {
                                  setTrackingForm({
                                    orderId: order.id,
                                    status: order.status,
                                    courierName:
                                      order.courierName ||
                                      'Delhivery Express Air',
                                    trackingNumber:
                                      order.trackingNumber ||
                                      `AWB-${Math.floor(
                                        100000000 +
                                          Math.random() *
                                            900000000
                                      )}`,
                                    note:
                                      order.adminNotes ||
                                      'Dispatched from Nawalgarh flagship store',
                                  });
                                }}
                                className="admin-btn-light flex items-center gap-2 rounded-md border border-[#d3c8b8] bg-white px-3.5 py-2.5 text-[9px] font-bold uppercase tracking-wider text-[#806743] hover:border-[#bba98f]"
                              >
                                <Truck className="h-4 w-4" />
                                Update Tracking
                              </button>

                            </div>

                            <div className="font-mono text-[9px] text-[#96928a]">
                              {order.courierName || 'Courier pending'}
                              {' · '}
                              {order.trackingNumber || 'AWB pending'}
                            </div>

                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ================= ADD PRODUCT ================= */}
            {activeTab === 'add-product' && (
              <div className="admin-modal-animation mx-auto max-w-4xl space-y-5">

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#a98b62]">
                    Catalog
                  </p>

                  <h1 className="mt-1 font-['Syne'] text-2xl font-bold uppercase text-[#20201e] sm:text-3xl">
                    Add New Product
                  </h1>

                  <p className="mt-1 text-xs text-[#85827b]">
                    Create products with independent color pricing,
                    images and variants.
                  </p>
                </div>

                {formSuccessMessage && (
                  <div className="flex items-start gap-2 rounded-md border border-[#cde1d2] bg-[#f1f9f3] p-3 text-xs text-[#4e855d]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{formSuccessMessage}</span>
                  </div>
                )}

                <form
                  onSubmit={handleCreateProduct}
                  className="admin-card space-y-7 p-4 sm:p-6"
                >

                  {/* BASIC */}
                  <section>
                    <div className="mb-4 border-b border-[#eeeae4] pb-4">
                      <h2 className="font-['Syne'] text-base font-bold uppercase text-[#20201e]">
                        Basic Information
                      </h2>

                      <p className="mt-1 text-[10px] text-[#8b8881]">
                        Product name, category and audience.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <div className="sm:col-span-2">
                        <label className="admin-label-light">
                          Product Name *
                        </label>

                        <input
                          required
                          type="text"
                          value={newTitle}
                          onChange={function (event) {
                            setNewTitle(event.target.value);
                          }}
                          placeholder="e.g. Acid Wash Cuban Linen Shirt"
                          className="admin-input-light text-sm"
                        />
                      </div>

                      <div>
                        <label className="admin-label-light">
                          Category *
                        </label>

                        <select
                          value={newCategory}
                          onChange={function (event) {
                            setNewCategory(
                              event.target.value as Category
                            );
                          }}
                          className="admin-input-light font-mono text-xs"
                        >
                          <option value="jeans">
                            Jeans & Denim
                          </option>
                          <option value="t-shirts">
                            T-Shirts
                          </option>
                          <option value="shirts">
                            Shirts
                          </option>
                          <option value="jackets">
                            Jackets & Outerwear
                          </option>
                          <option value="hoodies">
                            Hoodies & Fleece
                          </option>
                          <option value="tops">
                            Tops & Knits
                          </option>
                          <option value="casual">
                            Casual Wear
                          </option>
                          <option value="streetwear">
                            Streetwear
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="admin-label-light">
                          Gender
                        </label>

                        <div className="grid grid-cols-3 gap-2">
                          {(
                            ['men', 'women', 'unisex'] as Gender[]
                          ).map(function (gender) {
                            const selected =
                              newGender === gender;

                            return (
                              <button
                                key={gender}
                                type="button"
                                onClick={function () {
                                  setNewGender(gender);
                                }}
                                className={`admin-btn-light rounded-md border py-2.5 text-[10px] font-bold uppercase ${
                                  selected
                                    ? 'border-[#a98b62] bg-[#a98b62] text-white'
                                    : 'border-[#dedbd5] bg-white text-[#77736c] hover:border-[#c9c3b9]'
                                }`}
                              >
                                {gender}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {newCategory === 'jeans' && (
                        <div>
                          <label className="admin-label-light">
                            Denim Fit
                          </label>

                          <select
                            value={newFit}
                            onChange={function (event) {
                              setNewFit(
                                event.target.value as DenimFit
                              );
                            }}
                            className="admin-input-light font-mono text-xs"
                          >
                            <option value="Straight">
                              Straight Leg
                            </option>
                            <option value="Baggy">
                              Baggy Skater
                            </option>
                            <option value="Slim">
                              Slim Tailored
                            </option>
                            <option value="Relaxed">
                              Relaxed Tapered
                            </option>
                            <option value="Wide Leg">
                              Wide Leg Japanese
                            </option>
                          </select>
                        </div>
                      )}

                    </div>
                  </section>

                  {/* SIZES */}
                  <section className="border-t border-[#eeeae4] pt-6">
                    <h2 className="font-['Syne'] text-base font-bold uppercase text-[#20201e]">
                      Available Sizes
                    </h2>

                    <p className="mb-3 mt-1 text-[10px] text-[#8b8881]">
                      Select all sizes available for this product.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {[
                        'XS',
                        'S',
                        'M',
                        'L',
                        'XL',
                        'XXL',
                        '28',
                        '30',
                        '32',
                        '34',
                        '36',
                      ].map(function (size) {
                        const selected =
                          selectedSizes.includes(size);

                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={function () {
                              setSelectedSizes(function (
                                previous
                              ) {
                                if (selected) {
                                  return previous.filter(
                                    function (item) {
                                      return item !== size;
                                    }
                                  );
                                }

                                return [...previous, size];
                              });
                            }}
                            className={`admin-btn-light min-w-[44px] rounded-md border px-3 py-2 text-[10px] font-bold ${
                              selected
                                ? 'border-[#a98b62] bg-[#a98b62] text-white'
                                : 'border-[#dedbd5] bg-white text-[#77736c] hover:border-[#c9c3b9]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* VARIANTS */}
                  <section className="border-t border-[#eeeae4] pt-6">

                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="font-['Syne'] text-base font-bold uppercase text-[#20201e]">
                          Color Variants
                        </h2>

                        <p className="mt-1 text-[10px] text-[#8b8881]">
                          Each color can have its own selling price,
                          MRP and image.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddVariant}
                        className="admin-btn-light flex items-center justify-center gap-1.5 rounded-md bg-[#a98b62] px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-white hover:bg-[#92764f]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Variant
                      </button>
                    </div>

                    <div className="space-y-3">
                      {variants.map(function (
                        variant,
                        index
                      ) {
                        return (
                          <div
                            key={index}
                            className="rounded-lg border border-[#e5e2dc] bg-[#fafaf8] p-4"
                          >

                            <div className="mb-4 flex items-center justify-between border-b border-[#e7e4de] pb-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-4 w-4 rounded-full border border-[#d2cfc8]"
                                  style={{
                                    backgroundColor:
                                      variant.hex,
                                  }}
                                />

                                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#4e4c47]">
                                  Variant {index + 1}
                                </span>
                              </div>

                              {variants.length > 1 && (
                                <button
                                  type="button"
                                  onClick={function () {
                                    handleRemoveVariant(index);
                                  }}
                                  className="flex items-center gap-1 text-[9px] font-bold uppercase text-[#b04f4f] hover:text-[#913d3d]"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Remove
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                              <div>
                                <label className="admin-label-light">
                                  Color Name
                                </label>

                                <input
                                  type="text"
                                  value={variant.colorName}
                                  onChange={function (event) {
                                    handleVariantChange(
                                      index,
                                      'colorName',
                                      event.target.value
                                    );
                                  }}
                                  className="admin-input-light font-mono text-xs"
                                />
                              </div>

                              <div>
                                <label className="admin-label-light">
                                  Color Hex
                                </label>

                                <div className="flex gap-2">
                                  <input
                                    type="color"
                                    value={variant.hex}
                                    onChange={function (event) {
                                      handleVariantChange(
                                        index,
                                        'hex',
                                        event.target.value
                                      );
                                    }}
                                    className="h-10 w-10 cursor-pointer rounded border border-[#d9d5ce] bg-white p-1"
                                  />

                                  <input
                                    type="text"
                                    value={variant.hex}
                                    onChange={function (event) {
                                      handleVariantChange(
                                        index,
                                        'hex',
                                        event.target.value
                                      );
                                    }}
                                    className="admin-input-light font-mono text-xs"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="admin-label-light">
                                  Selling Price
                                </label>

                                <input
                                  type="number"
                                  value={variant.price}
                                  onChange={function (event) {
                                    handleVariantChange(
                                      index,
                                      'price',
                                      Number(
                                        event.target.value
                                      )
                                    );
                                  }}
                                  className="admin-input-light font-mono text-xs font-bold"
                                />
                              </div>

                              <div>
                                <label className="admin-label-light">
                                  Original MRP
                                </label>

                                <input
                                  type="number"
                                  value={
                                    variant.originalPrice
                                  }
                                  onChange={function (event) {
                                    handleVariantChange(
                                      index,
                                      'originalPrice',
                                      Number(
                                        event.target.value
                                      )
                                    );
                                  }}
                                  className="admin-input-light font-mono text-xs"
                                />
                              </div>

                            </div>

                            <div className="mt-3">
                              <label className="admin-label-light">
                                Product Image URL
                              </label>

                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={
                                    variant.images[0] || ''
                                  }
                                  onChange={function (event) {
                                    handleVariantChange(
                                      index,
                                      'images',
                                      [event.target.value]
                                    );
                                  }}
                                  placeholder="https://images.unsplash.com/..."
                                  className="admin-input-light font-mono text-xs"
                                />

                                {variant.images[0] && (
                                  <img
                                    src={variant.images[0]}
                                    alt="Preview"
                                    className="h-10 w-10 shrink-0 rounded-md border border-[#ddd9d1] object-cover"
                                  />
                                )}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* DESCRIPTION */}
                  <section className="border-t border-[#eeeae4] pt-6">
                    <label className="admin-label-light">
                      Product Description
                    </label>

                    <textarea
                      rows={4}
                      value={newDescription}
                      onChange={function (event) {
                        setNewDescription(event.target.value);
                      }}
                      className="admin-input-light resize-y text-xs leading-relaxed"
                    />
                  </section>

                  <button
                    type="submit"
                    className="admin-btn-light flex w-full items-center justify-center gap-2 rounded-md bg-[#a98b62] py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:bg-[#92764f]"
                  >
                    <Plus className="h-4 w-4" />
                    Publish Product
                  </button>

                </form>
              </div>
            )}

            {/* ================= INVENTORY ================= */}
            {activeTab === 'inventory' && (
              <div className="admin-modal-animation space-y-5">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#a98b62]">
                      Catalog
                    </p>

                    <h1 className="mt-1 font-['Syne'] text-2xl font-bold uppercase text-[#20201e] sm:text-3xl">
                      Store Inventory
                    </h1>

                    <p className="mt-1 text-xs text-[#85827b]">
                      {products.length} products currently in store.
                    </p>
                  </div>

                  <button
                    onClick={function () {
                      setActiveTab('add-product');
                    }}
                    className="admin-btn-light flex items-center justify-center gap-1.5 rounded-md bg-[#a98b62] px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider text-white hover:bg-[#92764f]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Product
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="admin-card flex min-h-[250px] items-center justify-center">
                    <div className="text-center">
                      <Package className="mx-auto h-8 w-8 text-[#c7c3bb]" />

                      <p className="mt-3 text-sm text-[#85827b]">
                        No products found.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {products.map(function (product) {
                      return (
                        <div
                          key={product.id}
                          className="admin-card overflow-hidden"
                        >
                          <div className="flex gap-3 p-3.5">

                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-28 w-20 shrink-0 rounded-md border border-[#e3e0da] object-cover"
                            />

                            <div className="flex min-w-0 flex-1 flex-col justify-between">

                              <div>
                                <p className="font-mono text-[8px] uppercase tracking-wider text-[#a98b62]">
                                  {product.category}
                                  {product.fit
                                    ? ` · ${product.fit}`
                                    : ''}
                                </p>

                                <h3 className="mt-1 line-clamp-2 text-sm font-bold text-[#292824]">
                                  {product.name}
                                </h3>

                                <p className="mt-1 font-mono text-sm font-bold text-[#20201e]">
                                  ₹
                                  {product.price.toLocaleString(
                                    'en-IN'
                                  )}
                                </p>

                                <div className="mt-2 flex items-center gap-1.5">
                                  {product.colors.map(
                                    function (color, index) {
                                      return (
                                        <span
                                          key={index}
                                          title={color.name}
                                          className="h-3.5 w-3.5 rounded-full border border-[#ccc8c0]"
                                          style={{
                                            backgroundColor:
                                              color.hex,
                                          }}
                                        />
                                      );
                                    }
                                  )}

                                  <span className="ml-1 font-mono text-[8px] text-[#96928b]">
                                    {product.colors.length}{' '}
                                    colors
                                  </span>
                                </div>
                              </div>

                              <div className="mt-3 flex items-center justify-between border-t border-[#eeeae4] pt-2">

                                <span
                                  className={`font-mono text-[8px] font-bold uppercase ${
                                    product.inStock
                                      ? 'text-[#4f8a5d]'
                                      : 'text-[#b04f4f]'
                                  }`}
                                >
                                  {product.inStock
                                    ? 'In Stock'
                                    : 'Out of Stock'}
                                </span>

                                <button
                                  onClick={function () {
                                    deleteProduct(product.id);
                                  }}
                                  className="flex items-center gap-1 text-[9px] font-bold uppercase text-[#85827b] hover:text-[#b04f4f]"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Delete
                                </button>

                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ================= USERS ================= */}
            {activeTab === 'users' && (
              <div className="admin-modal-animation space-y-5">

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#a98b62]">
                    Customers
                  </p>

                  <h1 className="mt-1 font-['Syne'] text-2xl font-bold uppercase text-[#20201e] sm:text-3xl">
                    Customer Directory
                  </h1>

                  <p className="mt-1 text-xs text-[#85827b]">
                    {totalUsersCount} registered users on Nikku Fashion.
                  </p>
                </div>

                <div className="admin-card overflow-hidden">

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left">

                      <thead>
                        <tr className="border-b border-[#e8e5df] bg-[#fafaf8]">
                          <th className="px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-[#85827b]">
                            Customer
                          </th>

                          <th className="px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-[#85827b]">
                            Email
                          </th>

                          <th className="px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-[#85827b]">
                            Role
                          </th>

                          <th className="px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-[#85827b]">
                            Location
                          </th>

                          <th className="px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-[#85827b]">
                            Joined
                          </th>

                          <th className="px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-[#85827b]">
                            Orders
                          </th>

                          <th className="px-4 py-3 font-mono text-[8px] uppercase tracking-wider text-[#85827b]">
                            Spent
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#efede8]">
                        {usersList.map(function (
                          user,
                          index
                        ) {
                          return (
                            <tr
                              key={index}
                              className="transition-colors hover:bg-[#fafaf8]"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={
                                      user.avatar ||
                                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'
                                    }
                                    alt={user.name}
                                    className="h-8 w-8 rounded-full border border-[#dedbd5] object-cover"
                                  />

                                  <span className="text-xs font-bold text-[#292824]">
                                    {user.name}
                                  </span>
                                </div>
                              </td>

                              <td className="px-4 py-3 font-mono text-[10px] text-[#6f6c65]">
                                {user.email}
                              </td>

                              <td className="px-4 py-3">
                                <span
                                  className={`rounded-full px-2 py-1 font-mono text-[8px] font-bold uppercase ${
                                    user.role === 'admin'
                                      ? 'bg-[#eee5d8] text-[#765d3d]'
                                      : 'bg-[#f1f0ed] text-[#6f6c65]'
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </td>

                              <td className="px-4 py-3 text-[10px] text-[#77736c]">
                                {user.city || 'India'}
                              </td>

                              <td className="px-4 py-3 font-mono text-[10px] text-[#8d8981]">
                                {user.joinedAt}
                              </td>

                              <td className="px-4 py-3 text-xs font-bold text-[#292824]">
                                {user.totalOrdersCount || 0}
                              </td>

                              <td className="px-4 py-3 font-mono text-xs font-bold text-[#8f7049]">
                                ₹
                                {(user.totalSpent || 0).toLocaleString(
                                  'en-IN'
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

        {/* ================= TRACKING MODAL ================= */}
        {trackingForm && (
          <div className="fixed inset-0 z-[220] flex items-center justify-center bg-[#20201e]/35 p-4 backdrop-blur-sm">

            <div className="admin-modal-animation w-full max-w-md rounded-xl border border-[#ddd9d1] bg-white p-5 shadow-[0_25px_80px_rgba(0,0,0,.18)] sm:p-6">

              <div className="mb-5 flex items-center justify-between border-b border-[#eeeae4] pb-4">

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#a98b62]">
                    Logistics
                  </p>

                  <h2 className="mt-1 text-sm font-bold uppercase text-[#20201e]">
                    Update Tracking
                  </h2>

                  <p className="mt-1 font-mono text-[9px] text-[#8c8982]">
                    {trackingForm.orderId}
                  </p>
                </div>

                <button
                  onClick={function () {
                    setTrackingForm(null);
                  }}
                  className="rounded-full p-2 text-[#85827b] hover:bg-[#f4f3ef] hover:text-[#20201e]"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>

              <div className="space-y-4">

                <div>
                  <label className="admin-label-light">
                    Order Status
                  </label>

                  <select
                    value={trackingForm.status}
                    onChange={function (event) {
                      setTrackingForm({
                        ...trackingForm,
                        status:
                          event.target.value as OrderStatus,
                      });
                    }}
                    className="admin-input-light font-mono text-xs"
                  >
                    <option value="pending_payment_verification">
                      Pending Payment Verification
                    </option>

                    <option value="payment_verified">
                      Payment Verified
                    </option>

                    <option value="processing">
                      Processing & Packaging
                    </option>

                    <option value="shipped">
                      Dispatched / Shipped
                    </option>

                    <option value="out_for_delivery">
                      Out for Delivery
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                <div>
                  <label className="admin-label-light">
                    Courier Partner
                  </label>

                  <input
                    type="text"
                    value={trackingForm.courierName}
                    onChange={function (event) {
                      setTrackingForm({
                        ...trackingForm,
                        courierName: event.target.value,
                      });
                    }}
                    placeholder="Delhivery, BlueDart, DTDC..."
                    className="admin-input-light font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="admin-label-light">
                    AWB / Tracking Number
                  </label>

                  <input
                    type="text"
                    value={trackingForm.trackingNumber}
                    onChange={function (event) {
                      setTrackingForm({
                        ...trackingForm,
                        trackingNumber: event.target.value,
                      });
                    }}
                    placeholder="e.g. DEL-992381283"
                    className="admin-input-light font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="admin-label-light">
                    Tracking Note
                  </label>

                  <input
                    type="text"
                    value={trackingForm.note}
                    onChange={function (event) {
                      setTrackingForm({
                        ...trackingForm,
                        note: event.target.value,
                      });
                    }}
                    placeholder="Package dispatched from Nawalgarh..."
                    className="admin-input-light text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={function () {
                    updateOrderTracking(
                      trackingForm.orderId,
                      trackingForm.status,
                      trackingForm.courierName,
                      trackingForm.trackingNumber,
                      trackingForm.note
                    );

                    setTrackingForm(null);
                  }}
                  className="admin-btn-light mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-[#a98b62] py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#92764f]"
                >
                  <Check className="h-4 w-4" />
                  Save & Notify Customer
                </button>

              </div>
            </div>
          </div>
        )}

        {/* ================= SCREENSHOT ================= */}
        {selectedScreenshotModal && (
          <div
            className="fixed inset-0 z-[230] flex items-center justify-center bg-[#20201e]/50 p-4 backdrop-blur-sm"
            onClick={function () {
              setSelectedScreenshotModal(null);
            }}
          >
            <div
              className="admin-modal-animation relative w-full max-w-2xl overflow-hidden rounded-xl border border-[#ddd9d1] bg-white shadow-[0_25px_80px_rgba(0,0,0,.2)]"
              onClick={function (event) {
                event.stopPropagation();
              }}
            >

              <div className="flex items-center justify-between border-b border-[#eeeae4] px-4 py-3">

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#a98b62]">
                    Payment Verification
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#20201e]">
                    Customer Payment Receipt
                  </p>
                </div>

                <button
                  onClick={function () {
                    setSelectedScreenshotModal(null);
                  }}
                  className="rounded-full p-2 text-[#85827b] hover:bg-[#f4f3ef] hover:text-[#20201e]"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>

              <div className="bg-[#f5f5f2] p-3 sm:p-5">
                <img
                  src={selectedScreenshotModal}
                  alt="Payment Slip Full"
                  className="mx-auto max-h-[72vh] w-full rounded-md border border-[#dedbd5] bg-white object-contain"
                />
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};