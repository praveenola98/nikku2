// Local photoshoot assets for Nikku Fashion campaign
import heroCampaign from '../assets/images/hero_campaign_shoot_1790417292823.jpg';
import denimJeansDetail from '../assets/images/denim_jeans_detail_1790417314927.jpg';
import oversizedTeeShoot from '../assets/images/oversized_tee_shoot_1790417330307.jpg';
import denimJacketShoot from '../assets/images/denim_jacket_shoot_1790417346274.jpg';
import womenCropShoot from '../assets/images/women_crop_shoot_1790417364463.jpg';
import denimBannerSpread from '../assets/images/denim_banner_spread_1790417383287.jpg';
import fleeceHoodieShoot from '../assets/images/fleece_hoodie_shoot_1790417402311.jpg';
import linenShirtShoot from '../assets/images/linen_shirt_shoot_1790417419895.jpg';

import { Product } from '../types';

export const ASSETS = {
  heroCampaign,
  denimJeansDetail,
  oversizedTeeShoot,
  denimJacketShoot,
  womenCropShoot,
  denimBannerSpread,
  fleeceHoodieShoot,
  linenShirtShoot
};

export const PRODUCTS: Product[] = [
  // 1. JEANS - Straight Selvedge
  {
    id: 'jean-01',
    name: 'Relaxed Straight Selvedge Jeans',
    category: 'jeans',
    gender: 'unisex',
    price: 2499,
    originalPrice: 3299,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 120,
    isNew: true,
    isBestSeller: true,
    fit: 'Straight',
    colors: [
      { name: 'Vintage Indigo', hex: '#233246' },
      { name: 'Washed Black', hex: '#1c1c1c' },
      { name: 'Light Tint', hex: '#587391' }
    ],
    variants: [
      {
        colorName: 'Vintage Indigo',
        hex: '#233246',
        price: 2499,
        originalPrice: 3299,
        images: [
          denimJeansDetail,
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 35
      },
      {
        colorName: 'Washed Black',
        hex: '#1c1c1c',
        price: 2699, // Color change alters price like Flipkart!
        originalPrice: 3499,
        images: [
          'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1000&auto=format&fit=crop',
          denimJeansDetail,
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 22
      },
      {
        colorName: 'Light Tint',
        hex: '#587391',
        price: 2399,
        originalPrice: 3199,
        images: [
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
          denimJeansDetail,
          'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 18
      }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      denimJeansDetail,
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Constructed from heavy 14.5oz non-stretch Japanese selvedge denim. Sits comfortably at the natural waist with a roomy straight-cut thigh that falls gracefully over sneakers or boots with authentic stacking.',
    fabricCare: [
      '100% Organic Ring-Spun Cotton (14.5oz)',
      'Raw rope dyed with natural indigo',
      'Wash inside out in cold water',
      'Hang dry in shade to preserve raw patina'
    ],
    sizeFit: [
      'Relaxed straight silhouette through hip & leg',
      'Mid-rise waistline with custom antiqued copper rivets',
      'Model is 6\'1" wearing size 32'
    ],
    shippingReturns: 'Free express shipping across India. 7-day hassle-free doorstep returns.',
    inStock: true
  },

  // 2. JEANS - Skater Baggy
  {
    id: 'jean-02',
    name: 'Skater Baggy Fit Jeans',
    category: 'jeans',
    gender: 'unisex',
    price: 2299,
    originalPrice: 2999,
    discountPercent: 23,
    rating: 4.9,
    reviewsCount: 94,
    isNew: true,
    isBestSeller: true,
    fit: 'Baggy',
    colors: [
      { name: 'Dirty Tint Wash', hex: '#3d4f61' },
      { name: 'Faded Obsidian', hex: '#222222' }
    ],
    variants: [
      {
        colorName: 'Dirty Tint Wash',
        hex: '#3d4f61',
        price: 2299,
        originalPrice: 2999,
        images: [
          'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1000&auto=format&fit=crop',
          denimJeansDetail,
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 28
      },
      {
        colorName: 'Faded Obsidian',
        hex: '#222222',
        price: 2499,
        originalPrice: 3199,
        images: [
          'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 15
      }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1000&auto=format&fit=crop',
      denimJeansDetail,
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Iconic 90s skater silhouette engineered with modern tailoring. Features extra volume through the knee and hem for a clean stack effect over footwear.',
    fabricCare: [
      '100% Heavyweight Rigid Cotton (14oz)',
      'Machine wash gentle cold',
      'Tumble dry low or air dry'
    ],
    sizeFit: [
      'Exaggerated baggy leg with relaxed drop seat',
      'Deep reinforced pockets & heavy gauge stitching',
      'Model is 5\'11" wearing size 30'
    ],
    shippingReturns: 'Free delivery within 2-4 business days. Easy exchanges available.',
    inStock: true
  },

  // 3. T-SHIRT - Heavyweight Oversized Boxy Tee
  {
    id: 'tee-01',
    name: 'Heavyweight Boxy Drop-Shoulder Tee',
    category: 't-shirts',
    gender: 'unisex',
    price: 1299,
    originalPrice: 1799,
    discountPercent: 28,
    rating: 4.9,
    reviewsCount: 248,
    isNew: true,
    isBestSeller: true,
    colors: [
      { name: 'Bone White', hex: '#ebe7df' },
      { name: 'Washed Charcoal', hex: '#2b2a29' },
      { name: 'Vintage Olive', hex: '#484b3e' }
    ],
    variants: [
      {
        colorName: 'Bone White',
        hex: '#ebe7df',
        price: 1299,
        originalPrice: 1799,
        images: [
          oversizedTeeShoot,
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 50
      },
      {
        colorName: 'Washed Charcoal',
        hex: '#2b2a29',
        price: 1399, // Color change changes price!
        originalPrice: 1899,
        images: [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
          oversizedTeeShoot,
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 35
      },
      {
        colorName: 'Vintage Olive',
        hex: '#484b3e',
        price: 1449,
        originalPrice: 1949,
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
          oversizedTeeShoot
        ],
        stock: 20
      }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      oversizedTeeShoot,
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Crafted from ultra-dense 280 GSM combed cotton. Features a relaxed drop shoulder, tight ribbed crew collar that never sags, and structured drape.',
    fabricCare: [
      '280 GSM 100% Combed Heavy Cotton',
      'Pre-shrunk to prevent shrinking',
      'Cold wash inside out',
      'Do not bleach or dry clean'
    ],
    sizeFit: [
      'Boxy streetwear relaxed fit',
      'Dropped shoulder with elongated sleeves',
      'True to size for oversized look'
    ],
    shippingReturns: 'Instant same-day packaging from Nawalgarh store.',
    inStock: true
  },

  // 4. SHIRT - Relaxed Camp Collar Linen Shirt
  {
    id: 'shirt-01',
    name: 'Relaxed Camp Collar Linen Blend Shirt',
    category: 'shirts',
    gender: 'men',
    price: 1899,
    originalPrice: 2599,
    discountPercent: 27,
    rating: 4.7,
    reviewsCount: 68,
    isNew: true,
    colors: [
      { name: 'Warm Ecru', hex: '#dcd3c3' },
      { name: 'Midnight Navy', hex: '#1b263b' },
      { name: 'Terracotta Brown', hex: '#8c533c' }
    ],
    variants: [
      {
        colorName: 'Warm Ecru',
        hex: '#dcd3c3',
        price: 1899,
        originalPrice: 2599,
        images: [
          linenShirtShoot,
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 30
      },
      {
        colorName: 'Midnight Navy',
        hex: '#1b263b',
        price: 1999,
        originalPrice: 2699,
        images: [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
          linenShirtShoot
        ],
        stock: 25
      },
      {
        colorName: 'Terracotta Brown',
        hex: '#8c533c',
        price: 2099,
        originalPrice: 2799,
        images: [
          linenShirtShoot,
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 14
      }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      linenShirtShoot,
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Breezy tailored silhouette with an open Cuban camp collar and tonal shell buttons. Ideal for warm desert evenings and refined daily styling.',
    fabricCare: [
      '60% Belgian Linen, 40% Long-Staple Cotton',
      'Breathable slub texture',
      'Hand wash or gentle cycle'
    ],
    sizeFit: [
      'Straight cut hem with subtle side slits',
      'Designed to wear untucked or open over a tank'
    ],
    shippingReturns: 'Dispatched via Express Courier with live tracking.',
    inStock: true
  },

  // 5. JACKET - Raw Type-II Denim Trucker
  {
    id: 'jacket-01',
    name: 'Raw Type-II Denim Trucker Jacket',
    category: 'jackets',
    gender: 'unisex',
    price: 3999,
    originalPrice: 5499,
    discountPercent: 27,
    rating: 4.9,
    reviewsCount: 160,
    isBestSeller: true,
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1a2332' },
      { name: 'Faded Iron Grey', hex: '#2e2e2e' }
    ],
    variants: [
      {
        colorName: 'Raw Deep Indigo',
        hex: '#1a2332',
        price: 3999,
        originalPrice: 5499,
        images: [
          denimJacketShoot,
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 18
      },
      {
        colorName: 'Faded Iron Grey',
        hex: '#2e2e2e',
        price: 4299,
        originalPrice: 5799,
        images: [
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
          denimJacketShoot
        ],
        stock: 12
      }
    ],
    sizes: ['M', 'L', 'XL'],
    images: [
      denimJacketShoot,
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A tribute to classical 1950s workwear with pleated front knife stitching, dual box chest pockets, and custom antique brass donut buttons.',
    fabricCare: [
      '15.5oz Selvedge Denim',
      'Spot clean with damp cloth when needed',
      'Do not machine dry'
    ],
    sizeFit: [
      'Semi-cropped modern boxy silhouette',
      'Allows room for hoodie layering'
    ],
    shippingReturns: 'Insured premium parcel dispatch.',
    inStock: true
  },

  // 6. HOODIE - 450 GSM Heavy Fleece Hoodie
  {
    id: 'hoodie-01',
    name: '450 GSM Heavy Terry Fleece Hoodie',
    category: 'hoodies',
    gender: 'unisex',
    price: 2799,
    originalPrice: 3699,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 142,
    isBestSeller: true,
    colors: [
      { name: 'Onyx Black', hex: '#171717' },
      { name: 'Desert Sand', hex: '#b5a183' },
      { name: 'Dusty Slate', hex: '#4f555e' }
    ],
    variants: [
      {
        colorName: 'Onyx Black',
        hex: '#171717',
        price: 2799,
        originalPrice: 3699,
        images: [
          fleeceHoodieShoot,
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 40
      },
      {
        colorName: 'Desert Sand',
        hex: '#b5a183',
        price: 2999, // Color variation price change
        originalPrice: 3899,
        images: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
          fleeceHoodieShoot
        ],
        stock: 25
      },
      {
        colorName: 'Dusty Slate',
        hex: '#4f555e',
        price: 2899,
        originalPrice: 3799,
        images: [
          fleeceHoodieShoot,
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 19
      }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      fleeceHoodieShoot,
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Constructed from luxurious 450 GSM French loopback terry. Double-layered hood without drawstrings for an ultra-clean architectural aesthetic.',
    fabricCare: [
      '100% Organic Heavyweight French Terry (450 GSM)',
      'Pre-shrunk low pill finish',
      'Cold gentle wash'
    ],
    sizeFit: [
      'Oversized boxy torso with tight double-ribbed waist & cuffs'
    ],
    shippingReturns: 'Free 7-day returns.',
    inStock: true
  },

  // 7. WOMEN - Raw Edge Crop Tank & Knit
  {
    id: 'top-01',
    name: 'Sculpt Ribbed Raw Crop Top',
    category: 'tops',
    gender: 'women',
    price: 1199,
    originalPrice: 1599,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 76,
    isNew: true,
    colors: [
      { name: 'Warm Alabaster', hex: '#f0ece1' },
      { name: 'Pitch Black', hex: '#141414' },
      { name: 'Mocha Tan', hex: '#634b3f' }
    ],
    variants: [
      {
        colorName: 'Warm Alabaster',
        hex: '#f0ece1',
        price: 1199,
        originalPrice: 1599,
        images: [
          womenCropShoot,
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 32
      },
      {
        colorName: 'Pitch Black',
        hex: '#141414',
        price: 1299,
        originalPrice: 1699,
        images: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
          womenCropShoot
        ],
        stock: 28
      },
      {
        colorName: 'Mocha Tan',
        hex: '#634b3f',
        price: 1349,
        originalPrice: 1749,
        images: [
          womenCropShoot,
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
        ],
        stock: 16
      }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      womenCropShoot,
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Thick sculpting ribbed organic cotton knit that provides natural lift and form without being constricting. Finished with a clean raw laser cut hem.',
    fabricCare: [
      '95% Organic Cotton, 5% Elastane (320 GSM)',
      'Machine wash cold with like colors'
    ],
    sizeFit: [
      'Form fitting body with high neckline'
    ],
    shippingReturns: 'Shipped from Nawalgarh store within 24 hours.',
    inStock: true
  },

  // 8. JEANS - Wide Leg Architectural Denim
  {
    id: 'jean-04',
    name: 'Wide Leg Japanese Denim Trousers',
    category: 'jeans',
    gender: 'women',
    price: 2599,
    originalPrice: 3499,
    discountPercent: 26,
    rating: 4.9,
    reviewsCount: 62,
    fit: 'Wide Leg',
    colors: [
      { name: 'Bleach Fade', hex: '#6f8ba6' },
      { name: 'Raw Natural Ecru', hex: '#d9d3c5' }
    ],
    variants: [
      {
        colorName: 'Bleach Fade',
        hex: '#6f8ba6',
        price: 2599,
        originalPrice: 3499,
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
          denimJeansDetail
        ],
        stock: 24
      },
      {
        colorName: 'Raw Natural Ecru',
        hex: '#d9d3c5',
        price: 2799,
        originalPrice: 3699,
        images: [
          'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
          denimJeansDetail
        ],
        stock: 14
      }
    ],
    sizes: ['26', '28', '30', '32'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      denimJeansDetail
    ],
    description: 'High-waisted wide leg tailoring crafted with dramatic fluid volume. Features clean vertical press lines and minimal contrast stitching.',
    fabricCare: [
      '100% Rigid Denim (13.5oz)',
      'Hand wash or delicate machine wash'
    ],
    sizeFit: [
      'High-rise fitted waist with full dramatic pooling leg'
    ],
    shippingReturns: 'Doorstep pickup available for exchanges.',
    inStock: true
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', label: 'All Pieces' },
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'jeans', label: 'Jeans' },
  { id: 't-shirts', label: 'T-Shirts' },
  { id: 'shirts', label: 'Shirts' },
  { id: 'jackets', label: 'Outerwear' },
  { id: 'hoodies', label: 'Hoodies' }
];

export const DENIM_FITS = [
  { id: 'All', label: 'All Fits', desc: 'Browse complete denim silhouette catalog', description: 'Browse complete denim silhouette catalog' },
  { id: 'Straight', label: 'Straight Cut', desc: '14.5oz raw selvedge cut cleanly from hip to ankle', description: '14.5oz raw selvedge cut cleanly from hip to ankle' },
  { id: 'Baggy', label: 'Baggy Skater', desc: 'Roomy volume with authentic pooling over sneakers', description: 'Roomy volume with authentic pooling over sneakers' },
  { id: 'Slim', label: 'Slim Tailored', desc: 'Streamlined architecture with clean sharp stacking', description: 'Streamlined architecture with clean sharp stacking' },
  { id: 'Relaxed', label: 'Relaxed Tapered', desc: 'Comfortable thigh with subtle taper towards hem', description: 'Comfortable thigh with subtle taper towards hem' },
  { id: 'Wide Leg', label: 'Wide Leg', desc: 'High-waisted fluid drape with dramatic presence', description: 'High-waisted fluid drape with dramatic presence' }
];

