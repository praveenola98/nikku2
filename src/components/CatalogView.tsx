import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Filter,
  X,
  SlidersHorizontal,
  Check,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

import { PRODUCTS, DENIM_FITS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Product, DenimFit } from '../types';

export const CatalogView: React.FC = function () {
  const {
    products,
    isCatalogOpen,
    setIsCatalogOpen,
    catalogCategory,
    setCatalogCategory,
    catalogFit,
    setCatalogFit
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [selectedGender, setSelectedGender] = useState<
    'all' | 'men' | 'women'
  >('all');

  const [maxPrice, setMaxPrice] = useState<number>(4999);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [inStockOnly, setInStockOnly] = useState(false);

  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const [sortBy, setSortBy] = useState<
    'featured' | 'price-low' | 'price-high' | 'rating'
  >('featured');

  const allSizes = [
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
    '36'
  ];

  const toggleSize = function (size: string) {
    setSelectedSizes(function (prev) {
      if (prev.includes(size)) {
        return prev.filter(function (item) {
          return item !== size;
        });
      }

      return [...prev, size];
    });
  };

  const resetFilters = function () {
    setCatalogCategory('all');
    setCatalogFit('All');
    setSelectedGender('all');
    setMaxPrice(4999);
    setSelectedSizes([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const filteredProducts = useMemo(function () {
    let result = [...products];

    /*
     * CATEGORY
     */

    if (catalogCategory !== 'all') {
      if (catalogCategory === 'men') {
        result = result.filter(function (product) {
          return (
            product.gender === 'men' ||
            product.gender === 'unisex'
          );
        });
      } else if (catalogCategory === 'women') {
        result = result.filter(function (product) {
          return (
            product.gender === 'women' ||
            product.gender === 'unisex'
          );
        });
      } else {
        result = result.filter(function (product) {
          return product.category === catalogCategory;
        });
      }
    }

    /*
     * GENDER
     */

    if (selectedGender !== 'all') {
      result = result.filter(function (product) {
        return (
          product.gender === selectedGender ||
          product.gender === 'unisex'
        );
      });
    }

    /*
     * DENIM FIT
     */

    if (catalogFit !== 'All') {
      result = result.filter(function (product) {
        return product.fit === catalogFit;
      });
    }

    /*
     * PRICE
     */

    result = result.filter(function (product) {
      return product.price <= maxPrice;
    });

    /*
     * SIZE
     */

    if (selectedSizes.length > 0) {
      result = result.filter(function (product) {
        return product.sizes.some(function (size) {
          return selectedSizes.includes(size);
        });
      });
    }

    /*
     * STOCK
     */

    if (inStockOnly) {
      result = result.filter(function (product) {
        return product.inStock;
      });
    }

    /*
     * SALE
     */

    if (onSaleOnly) {
      result = result.filter(function (product) {
        return Boolean(
          product.discountPercent &&
          product.discountPercent > 0
        );
      });
    }

    /*
     * SORT
     */

    if (sortBy === 'price-low') {
      result.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sortBy === 'price-high') {
      result.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (sortBy === 'rating') {
      result.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }

    return result;
  }, [
    products,
    catalogCategory,
    selectedGender,
    catalogFit,
    maxPrice,
    selectedSizes,
    inStockOnly,
    onSaleOnly,
    sortBy
  ]);

  if (!isCatalogOpen) {
    return null;
  }

  /*
   * ============================================================
   * CATEGORY TITLE
   * ============================================================
   */

  const currentCategoryTitle =
    catalogCategory === 'all'
      ? 'NEW SEASON EDITIONS'
      : catalogCategory === 'jeans'
      ? 'SIGNATURE JEANS'
      : catalogCategory === 'men'
      ? "MEN'S EDITIONS"
      : catalogCategory === 'women'
      ? "WOMEN'S EDITIONS"
      : `${catalogCategory.toUpperCase()} ARCHIVE`;

  /*
   * ============================================================
   * HERO IMAGES
   * ============================================================
   */

  const categoryHeroImages: Record<string, string> = {
    all:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=90&w=2000&auto=format&fit=crop',

    men:
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=90&w=2000&auto=format&fit=crop',

    women:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=90&w=2000&auto=format&fit=crop',

    jeans:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=90&w=2000&auto=format&fit=crop',

    't-shirts':
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=90&w=2000&auto=format&fit=crop',

    tops:
      'https://images.unsplash.com/photo-1566206091558-7f218b696731?q=90&w=2000&auto=format&fit=crop',

    shirts:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=90&w=2000&auto=format&fit=crop',

    jackets:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=90&w=2000&auto=format&fit=crop',

    hoodies:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=90&w=2000&auto=format&fit=crop',

    accessories:
      'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?q=90&w=2000&auto=format&fit=crop'
  };

  /*
   * ============================================================
   * DESCRIPTIONS
   * ============================================================
   */

  const categoryDescriptions: Record<string, string> = {
    all:
      'The latest Nikku Fashion collection — contemporary silhouettes, premium fabrics and everyday statement pieces.',

    men:
      'Classic fits. Modern attitude. Engineered with selvedge denim and heavyweight textiles.',

    women:
      'Contemporary silhouettes, refined textures and effortless pieces designed for modern wardrobes.',

    jeans:
      'Signature denim engineered with distinctive fits, premium washes and everyday durability.',

    't-shirts':
      'Heavyweight essentials crafted for structure, comfort and everyday streetwear styling.',

    tops:
      'Modern tops and refined knits designed to bring texture and character to every look.',

    shirts:
      'Contemporary shirts balancing relaxed tailoring, premium fabrics and everyday versatility.',

    jackets:
      'Statement outerwear built around strong silhouettes, layered textures and modern utility.',

    hoodies:
      'Heavyweight fleece and relaxed silhouettes made for effortless everyday streetwear.',

    accessories:
      'Finishing pieces designed to complete the Nikku Fashion look.'
  };

  const heroImage =
    categoryHeroImages[catalogCategory] ||
    categoryHeroImages.all;

  const heroDescription =
    categoryDescriptions[catalogCategory] ||
    categoryDescriptions.all;

  /*
   * ============================================================
   * CATEGORY LIST
   * ============================================================
   */

  const categories = [
    {
      id: 'all',
      label: 'All Items'
    },
    {
      id: 'jeans',
      label: 'Jeans & Denim'
    },
    {
      id: 't-shirts',
      label: 'T-Shirts'
    },
    {
      id: 'tops',
      label: 'Tops & Knits'
    },
    {
      id: 'shirts',
      label: 'Shirts'
    },
    {
      id: 'jackets',
      label: 'Jackets & Outerwear'
    },
    {
      id: 'hoodies',
      label: 'Hoodies & Sweats'
    },
    {
      id: 'accessories',
      label: 'Accessories'
    }
  ];

  return (
    <>
      <style>{`

        /* ======================================================
           NIKKU CATALOG
           DEEP CLAYMORPHISM SYSTEM
           ====================================================== */

        .nikku-catalog {
          --catalog-bg: #e7e3f0;
          --catalog-surface: #eeeaf6;
          --catalog-surface-light: #f7f4fb;
          --catalog-surface-dark: #d9d3e5;

          --catalog-purple: #8f72ca;
          --catalog-purple-dark: #7255b2;
          --catalog-purple-light: #cfc3e8;

          --catalog-text: #383143;
          --catalog-muted: #7c7388;
          --catalog-faint: #9b92a6;

          --catalog-white: rgba(255,255,255,.88);

          min-height: 100vh;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(255,255,255,.72),
              transparent 28%
            ),
            radial-gradient(
              circle at 92% 12%,
              rgba(143,114,202,.12),
              transparent 25%
            ),
            linear-gradient(
              145deg,
              #e9e5f2,
              #ded8e9
            );

          color: var(--catalog-text);

          position: relative;

          overflow-x: hidden;
        }

        .nikku-catalog::before {
          content: '';

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at 50% 40%,
              rgba(255,255,255,.25),
              transparent 42%
            );
        }

        /* ======================================================
           TOP BAR
           ====================================================== */

        .catalog-topbar {
          position: relative;

          min-height: 55px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 14px;

          padding: 10px 0;

          border-bottom:
            1px solid rgba(255,255,255,.72);
        }

        .catalog-back {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          min-height: 40px;

          padding: 8px 14px;

          border-radius: 13px;

          color: #675e72;

          background:
            linear-gradient(
              145deg,
              #f4f1f8,
              #ded9e9
            );

          border:
            1px solid rgba(255,255,255,.84);

          box-shadow:
            7px 7px 14px rgba(92,78,119,.13),
            -6px -6px 13px rgba(255,255,255,.82);

          font-family: monospace;

          font-size: 10px;

          letter-spacing: .14em;

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .catalog-back:hover {
          color: var(--catalog-purple-dark);

          transform: translateY(-1px);

          box-shadow:
            9px 9px 17px rgba(92,78,119,.16),
            -7px -7px 14px rgba(255,255,255,.88);
        }

        .catalog-back:active {
          transform: translateY(1px);

          box-shadow:
            inset 4px 4px 8px rgba(92,78,119,.14),
            inset -4px -4px 8px rgba(255,255,255,.80);
        }

        .catalog-breadcrumb {
          min-width: 0;

          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 4px;

          color: var(--catalog-muted);

          font-family: monospace;

          font-size: 10px;

          text-transform: uppercase;

          letter-spacing: .05em;

          white-space: nowrap;

          overflow: hidden;
        }

        .catalog-breadcrumb span {
          overflow: hidden;

          text-overflow: ellipsis;
        }

        .catalog-breadcrumb-current {
          color: var(--catalog-purple-dark);
          font-weight: 700;
        }

        /* ======================================================
           HERO
           ====================================================== */

        .catalog-hero {
          position: relative;

          min-height: 390px;

          margin-bottom: 30px;

          overflow: hidden;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              #f2eef8,
              #d9d2e5
            );

          border:
            1px solid rgba(255,255,255,.90);

          box-shadow:
            18px 18px 38px rgba(92,78,119,.22),
            -12px -12px 30px rgba(255,255,255,.90),
            inset 1px 1px 0 rgba(255,255,255,.88);
        }

        .catalog-hero-image {
          position: absolute;

          inset: 10px;

          width: calc(100% - 20px);

          height: calc(100% - 20px);

          object-fit: cover;

          border-radius: 21px;

          filter:
            brightness(.76)
            contrast(1.04)
            saturate(.95);

          animation:
            catalogHeroImageReveal
            900ms
            cubic-bezier(.22,.61,.36,1)
            both;
        }

        .catalog-hero-inner {
          position: relative;

          min-height: 390px;

          display: flex;

          align-items: flex-end;

          z-index: 2;
        }

        .catalog-hero-overlay {
          position: absolute;

          inset: 10px;

          border-radius: 21px;

          background:
            linear-gradient(
              90deg,
              rgba(20,16,30,.82) 0%,
              rgba(25,19,35,.55) 37%,
              rgba(30,22,42,.18) 72%,
              rgba(30,22,42,.34) 100%
            );

          pointer-events: none;
        }

        .catalog-hero-top-shade {
          position: absolute;

          top: 10px;
          left: 10px;
          right: 10px;

          height: 150px;

          border-radius:
            21px 21px 0 0;

          background:
            linear-gradient(
              to bottom,
              rgba(18,14,25,.42),
              transparent
            );

          pointer-events: none;
        }

        .catalog-hero-content {
          position: relative;

          z-index: 4;

          max-width: 760px;

          padding:
            44px 48px;

          color: #fff;

          animation:
            catalogHeroContentReveal
            700ms
            cubic-bezier(.22,.61,.36,1)
            100ms
            both;
        }

        .catalog-eyebrow {
          display: inline-flex;

          align-items: center;

          gap: 9px;

          color: #d7c9ed;

          font-family: monospace;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: .30em;

          text-transform: uppercase;
        }

        .catalog-eyebrow::before {
          content: '';

          width: 24px;
          height: 2px;

          border-radius: 99px;

          background: #aa8ddd;

          box-shadow:
            2px 2px 5px rgba(0,0,0,.24);
        }

        .catalog-title {
          margin-top: 13px;

          font-family: 'Syne', sans-serif;

          font-size: clamp(2rem, 5vw, 4.7rem);

          line-height: .92;

          font-weight: 900;

          letter-spacing: -.045em;

          text-transform: uppercase;

          color: #fff;

          text-shadow:
            0 8px 28px rgba(0,0,0,.40);
        }

        .catalog-hero-line {
          width: 52px;

          height: 3px;

          margin:
            22px 0 14px;

          border-radius: 99px;

          background:
            linear-gradient(
              90deg,
              #c9b4eb,
              #8f72ca
            );

          box-shadow:
            3px 3px 8px rgba(0,0,0,.25);

          animation:
            catalogHeroLineReveal
            650ms
            cubic-bezier(.22,.61,.36,1)
            250ms
            both;
        }

        .catalog-description {
          max-width: 570px;

          color: rgba(255,255,255,.88);

          font-size: 13px;

          line-height: 1.7;

          font-weight: 400;

          text-shadow:
            0 3px 12px rgba(0,0,0,.30);
        }

        .catalog-hero-badge {
          position: absolute;

          right: 30px;
          top: 30px;

          z-index: 5;

          padding:
            10px 14px;

          border-radius: 14px;

          background:
            rgba(239,234,247,.16);

          border:
            1px solid rgba(255,255,255,.30);

          color: rgba(255,255,255,.86);

          backdrop-filter: blur(12px);

          box-shadow:
            5px 5px 13px rgba(0,0,0,.16),
            inset 1px 1px 0 rgba(255,255,255,.25);

          font-family: monospace;

          font-size: 8px;

          letter-spacing: .22em;

          writing-mode: vertical-rl;
        }

        /* ======================================================
           FIT CHIPS
           ====================================================== */

        .catalog-fit-scroll {
          display: flex;

          align-items: center;

          gap: 11px;

          overflow-x: auto;

          padding:
            5px 3px 16px;

          margin-bottom: 22px;

          scrollbar-width: none;
        }

        .catalog-fit-scroll::-webkit-scrollbar {
          display: none;
        }

        .catalog-fit-chip {
          flex-shrink: 0;

          min-height: 40px;

          padding:
            9px 17px;

          border-radius: 999px;

          color: #6d6379;

          background:
            linear-gradient(
              145deg,
              #f4f1f8,
              #ddd7e8
            );

          border:
            1px solid rgba(255,255,255,.85);

          box-shadow:
            6px 6px 12px rgba(92,78,119,.15),
            -5px -5px 11px rgba(255,255,255,.82);

          font-size: 10px;

          font-weight: 700;

          letter-spacing: .13em;

          text-transform: uppercase;

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .catalog-fit-chip:hover {
          color: var(--catalog-purple-dark);

          transform: translateY(-2px);

          box-shadow:
            8px 8px 15px rgba(92,78,119,.18),
            -6px -6px 12px rgba(255,255,255,.88);
        }

        .catalog-fit-chip.active {
          color: #fff;

          background:
            linear-gradient(
              145deg,
              #a98bdd,
              #8061c1
            );

          box-shadow:
            inset 4px 4px 8px rgba(82,61,124,.20),
            inset -4px -4px 8px rgba(255,255,255,.23),
            5px 5px 12px rgba(92,78,119,.17);
        }

        .catalog-fit-chip:active {
          transform: translateY(1px);

          box-shadow:
            inset 4px 4px 8px rgba(92,78,119,.16),
            inset -4px -4px 8px rgba(255,255,255,.80);
        }

        /* ======================================================
           ACTION BAR
           ====================================================== */

        .catalog-actionbar {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          margin-bottom: 25px;

          padding:
            12px 14px;

          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              rgba(245,242,249,.80),
              rgba(224,219,234,.72)
            );

          border:
            1px solid rgba(255,255,255,.82);

          box-shadow:
            8px 8px 18px rgba(92,78,119,.13),
            -7px -7px 16px rgba(255,255,255,.82);

          backdrop-filter: blur(12px);
        }

        .catalog-action-left {
          display: flex;

          align-items: center;

          gap: 12px;

          min-width: 0;
        }

        .catalog-filter-button {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          min-height: 38px;

          padding:
            8px 13px;

          border-radius: 12px;

          color: #fff;

          background:
            linear-gradient(
              145deg,
              #9a7bd2,
              #7d5cbb
            );

          border:
            1px solid rgba(255,255,255,.38);

          box-shadow:
            6px 6px 12px rgba(92,78,119,.19),
            -4px -4px 9px rgba(255,255,255,.72);

          font-family: monospace;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: .12em;

          text-transform: uppercase;

          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .catalog-filter-button:active {
          transform: translateY(1px);

          box-shadow:
            inset 4px 4px 8px rgba(72,51,111,.20),
            inset -4px -4px 8px rgba(255,255,255,.25);
        }

        .catalog-count {
          color: #857b91;

          font-family: monospace;

          font-size: 10px;

          white-space: nowrap;
        }

        .catalog-count strong {
          color: var(--catalog-purple-dark);

          font-size: 13px;
        }

        .catalog-sort-wrap {
          display: flex;

          align-items: center;

          gap: 8px;
        }

        .catalog-sort-label {
          color: #8b8295;

          font-family: monospace;

          font-size: 9px;

          letter-spacing: .1em;
        }

        .catalog-sort {
          min-height: 38px;

          padding:
            8px 32px 8px 12px;

          border-radius: 12px;

          color: #5d5468;

          background:
            linear-gradient(
              145deg,
              #f4f1f8,
              #ded8e9
            );

          border:
            1px solid rgba(255,255,255,.86);

          box-shadow:
            inset 3px 3px 7px rgba(92,78,119,.10),
            inset -3px -3px 7px rgba(255,255,255,.85),
            3px 3px 8px rgba(92,78,119,.08);

          outline: none;

          font-family: monospace;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: .05em;

          text-transform: uppercase;

          cursor: pointer;
        }

        .catalog-sort:focus {
          border-color:
            rgba(143,114,202,.65);
        }

        .catalog-sort option {
          background: #eeeaf6;

          color: #403849;
        }

        /* ======================================================
           MAIN LAYOUT
           ====================================================== */

        .catalog-main {
          display: flex;

          align-items: flex-start;

          gap: 27px;
        }

        /* ======================================================
           SIDEBAR
           ====================================================== */

        .catalog-sidebar {
          width: 255px;

          flex-shrink: 0;

          display: flex;

          flex-direction: column;

          gap: 14px;
        }

        .catalog-filter-card {
          padding: 18px;

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              #f1edf7,
              #ded8e9
            );

          border:
            1px solid rgba(255,255,255,.86);

          box-shadow:
            9px 9px 19px rgba(92,78,119,.15),
            -7px -7px 17px rgba(255,255,255,.84),
            inset 1px 1px 0 rgba(255,255,255,.78);
        }

        .catalog-filter-card-title {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 13px;

          color: #665c70;

          font-family: 'Syne', sans-serif;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: .17em;

          text-transform: uppercase;
        }

        .catalog-filter-card-title::after {
          content: '';

          width: 20px;
          height: 2px;

          border-radius: 999px;

          background: #9a7bd2;

          box-shadow:
            2px 2px 4px rgba(92,78,119,.16),
            -2px -2px 4px rgba(255,255,255,.75);
        }

        .catalog-category-list {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .catalog-category-button {
          width: 100%;

          min-height: 34px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 8px;

          padding:
            7px 9px;

          border-radius: 10px;

          color: #7c7388;

          font-size: 11px;

          text-align: left;

          transition:
            transform 180ms ease,
            background 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
        }

        .catalog-category-button:hover {
          color: var(--catalog-purple-dark);

          background: rgba(255,255,255,.42);

          transform: translateX(2px);
        }

        .catalog-category-button.active {
          color: #fff;

          background:
            linear-gradient(
              145deg,
              #a084d6,
              #805fbd
            );

          box-shadow:
            5px 5px 10px rgba(92,78,119,.17),
            -4px -4px 8px rgba(255,255,255,.60),
            inset 1px 1px 0 rgba(255,255,255,.18);

          font-weight: 700;
        }

        .catalog-category-count {
          flex-shrink: 0;

          color: #9a91a5;

          font-family: monospace;

          font-size: 8px;
        }

        .catalog-category-button.active
        .catalog-category-count {
          color: rgba(255,255,255,.70);
        }

        /* ======================================================
           PRICE
           ====================================================== */

        .catalog-price-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 13px;
        }

        .catalog-price-value {
          padding:
            5px 8px;

          border-radius: 8px;

          color: var(--catalog-purple-dark);

          background:
            linear-gradient(
              145deg,
              #f5f2f9,
              #ded8e8
            );

          box-shadow:
            inset 2px 2px 5px rgba(92,78,119,.10),
            inset -2px -2px 5px rgba(255,255,255,.82);

          font-family: monospace;

          font-size: 10px;

          font-weight: 700;
        }

        .catalog-range {
          width: 100%;

          height: 7px;

          appearance: none;

          border-radius: 99px;

          background:
            linear-gradient(
              90deg,
              #9b7cd3,
              #d7d0e4
            );

          box-shadow:
            inset 2px 2px 5px rgba(92,78,119,.15),
            inset -2px -2px 5px rgba(255,255,255,.75);

          outline: none;

          cursor: pointer;
        }

        .catalog-range::-webkit-slider-thumb {
          appearance: none;

          width: 20px;
          height: 20px;

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #a689d9,
              #8060bd
            );

          border:
            2px solid rgba(255,255,255,.80);

          box-shadow:
            4px 4px 8px rgba(92,78,119,.20),
            -3px -3px 7px rgba(255,255,255,.75);

          cursor: pointer;
        }

        .catalog-range::-moz-range-thumb {
          width: 18px;
          height: 18px;

          border-radius: 50%;

          border:
            2px solid rgba(255,255,255,.80);

          background: #8667c5;

          box-shadow:
            4px 4px 8px rgba(92,78,119,.20);
        }

        .catalog-price-minmax {
          display: flex;

          justify-content: space-between;

          margin-top: 9px;

          color: #9a91a5;

          font-family: monospace;

          font-size: 8px;
        }

        /* ======================================================
           SIZE BUTTONS
           ====================================================== */

        .catalog-size-grid {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 8px;
        }

        .catalog-size {
          height: 38px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 10px;

          color: #756c80;

          background:
            linear-gradient(
              145deg,
              #f2eef7,
              #ddd7e7
            );

          border:
            1px solid rgba(255,255,255,.82);

          box-shadow:
            5px 5px 10px rgba(92,78,119,.13),
            -4px -4px 8px rgba(255,255,255,.78);

          font-size: 10px;

          font-weight: 700;

          transition:
            transform 160ms ease,
            box-shadow 160ms ease,
            color 160ms ease;
        }

        .catalog-size:hover {
          color: var(--catalog-purple-dark);

          transform: translateY(-1px);
        }

        .catalog-size.active {
          color: #fff;

          background:
            linear-gradient(
              145deg,
              #9d7fd3,
              #7d5dbb
            );

          box-shadow:
            inset 3px 3px 7px rgba(74,54,112,.20),
            inset -3px -3px 7px rgba(255,255,255,.25);
        }

        .catalog-size:active {
          transform: scale(.96);
        }

        /* ======================================================
           CHECKBOXES
           ====================================================== */

        .catalog-check-row {
          min-height: 36px;

          display: flex;

          align-items: center;

          gap: 9px;

          padding:
            7px 8px;

          border-radius: 10px;

          color: #7d7489;

          font-size: 10px;

          cursor: pointer;

          transition:
            background 160ms ease,
            color 160ms ease;
        }

        .catalog-check-row:hover {
          color: var(--catalog-purple-dark);

          background: rgba(255,255,255,.38);
        }

        .catalog-check {
          appearance: none;

          width: 17px;
          height: 17px;

          flex-shrink: 0;

          border-radius: 6px;

          border:
            1px solid rgba(255,255,255,.95);

          background:
            linear-gradient(
              145deg,
              #eeeaf5,
              #dcd6e7
            );

          box-shadow:
            inset 2px 2px 5px rgba(92,78,119,.12),
            inset -2px -2px 5px rgba(255,255,255,.80);

          position: relative;

          cursor: pointer;
        }

        .catalog-check:checked {
          background:
            linear-gradient(
              145deg,
              #9d7ed4,
              #7d5cbb
            );

          box-shadow:
            inset 2px 2px 5px rgba(70,48,110,.20),
            2px 2px 5px rgba(92,78,119,.10);
        }

        .catalog-check:checked::after {
          content: '✓';

          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -52%);

          color: #fff;

          font-size: 10px;

          font-weight: 900;
        }

        /* ======================================================
           RESET
           ====================================================== */

        .catalog-reset {
          width: 100%;

          min-height: 42px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          border-radius: 13px;

          color: #756c80;

          background:
            linear-gradient(
              145deg,
              #f2eef7,
              #ddd7e7
            );

          border:
            1px solid rgba(255,255,255,.84);

          box-shadow:
            7px 7px 14px rgba(92,78,119,.13),
            -6px -6px 12px rgba(255,255,255,.82);

          font-family: monospace;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: .13em;

          text-transform: uppercase;

          transition:
            transform 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
        }

        .catalog-reset:hover {
          color: var(--catalog-purple-dark);

          transform: translateY(-1px);
        }

        .catalog-reset:active {
          transform: translateY(1px);

          box-shadow:
            inset 4px 4px 8px rgba(92,78,119,.13),
            inset -4px -4px 8px rgba(255,255,255,.82);
        }

        /* ======================================================
           PRODUCT AREA
           ====================================================== */

        .catalog-products {
          flex: 1;

          min-width: 0;
        }

        .catalog-product-grid {
          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 20px;
        }

        .catalog-product-item {
          min-width: 0;

          animation:
            catalogProductReveal
            500ms
            cubic-bezier(.22,.61,.36,1)
            both;
        }

        /* ======================================================
           EMPTY STATE
           ====================================================== */

        .catalog-empty {
          min-height: 300px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 30px;

          text-align: center;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              #f0ecf6,
              #ddd7e7
            );

          border:
            1px solid rgba(255,255,255,.85);

          box-shadow:
            12px 12px 25px rgba(92,78,119,.16),
            -9px -9px 21px rgba(255,255,255,.85);
        }

        .catalog-empty-icon {
          width: 55px;
          height: 55px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin-bottom: 16px;

          border-radius: 50%;

          color: var(--catalog-purple);

          background:
            linear-gradient(
              145deg,
              #f4f1f8,
              #ddd7e8
            );

          box-shadow:
            7px 7px 15px rgba(92,78,119,.15),
            -6px -6px 13px rgba(255,255,255,.84);
        }

        .catalog-empty-title {
          color: #51485d;

          font-family: 'Syne', sans-serif;

          font-size: 17px;

          font-weight: 800;

          text-transform: uppercase;
        }

        .catalog-empty-text {
          max-width: 380px;

          margin-top: 7px;

          color: #887f92;

          font-size: 11px;

          line-height: 1.6;
        }

        .catalog-clear {
          min-height: 40px;

          margin-top: 18px;

          padding:
            8px 17px;

          border-radius: 12px;

          color: #fff;

          background:
            linear-gradient(
              145deg,
              #9d7ed4,
              #7d5cbb
            );

          border:
            1px solid rgba(255,255,255,.45);

          box-shadow:
            6px 6px 13px rgba(92,78,119,.19),
            -4px -4px 9px rgba(255,255,255,.68);

          font-family: monospace;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: .12em;

          text-transform: uppercase;

          transition:
            transform 180ms ease;
        }

        .catalog-clear:hover {
          transform: translateY(-1px);
        }

        /* ======================================================
           MOBILE DRAWER
           ====================================================== */

        .catalog-mobile-backdrop {
          position: fixed;

          inset: 0;

          z-index: 90;

          display: flex;

          justify-content: flex-end;

          padding: 8px;

          background:
            rgba(65,55,82,.28);

          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);

          animation:
            catalogBackdropIn
            220ms ease both;
        }

        .catalog-mobile-drawer {
          width: min(430px, 100%);

          height: 100%;

          display: flex;

          flex-direction: column;

          overflow: hidden;

          border-radius: 27px;

          background:
            linear-gradient(
              145deg,
              #f5f2f9,
              #ded8e9
            );

          border:
            1px solid rgba(255,255,255,.92);

          box-shadow:
            18px 18px 42px rgba(68,55,90,.28),
            -12px -12px 30px rgba(255,255,255,.90),
            inset 1px 1px 0 rgba(255,255,255,.88);

          animation:
            catalogDrawerIn
            360ms
            cubic-bezier(.22,.61,.36,1)
            both;
        }

        .catalog-mobile-header {
          min-height: 70px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding:
            13px 17px;

          border-bottom:
            1px solid rgba(255,255,255,.70);

          background:
            linear-gradient(
              145deg,
              rgba(248,245,251,.70),
              rgba(228,222,239,.60)
            );

          box-shadow:
            0 5px 13px rgba(92,78,119,.06);
        }

        .catalog-mobile-title {
          color: #51485e;

          font-family: 'Syne', sans-serif;

          font-size: 14px;

          font-weight: 800;

          letter-spacing: .08em;

          text-transform: uppercase;
        }

        .catalog-mobile-subtitle {
          margin-top: 3px;

          color: #94899f;

          font-family: monospace;

          font-size: 8px;

          letter-spacing: .15em;
        }

        .catalog-mobile-close {
          width: 40px;
          height: 40px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          color: #746a7f;

          background:
            linear-gradient(
              145deg,
              #f4f1f8,
              #ded8e8
            );

          border:
            1px solid rgba(255,255,255,.88);

          box-shadow:
            6px 6px 13px rgba(92,78,119,.14),
            -5px -5px 11px rgba(255,255,255,.82);

          transition:
            transform 180ms ease;
        }

        .catalog-mobile-close:hover {
          transform: rotate(7deg);
        }

        .catalog-mobile-content {
          flex: 1;

          min-height: 0;

          overflow-y: auto;

          padding:
            16px;

          scrollbar-width: thin;

          scrollbar-color:
            rgba(143,114,202,.35)
            transparent;
        }

        .catalog-mobile-content::-webkit-scrollbar {
          width: 5px;
        }

        .catalog-mobile-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .catalog-mobile-content::-webkit-scrollbar-thumb {
          background:
            rgba(143,114,202,.35);

          border-radius: 999px;
        }

        .catalog-mobile-section {
          margin-bottom: 18px;

          padding: 16px;

          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              #f0ecf6,
              #ddd7e7
            );

          border:
            1px solid rgba(255,255,255,.82);

          box-shadow:
            7px 7px 15px rgba(92,78,119,.12),
            -6px -6px 13px rgba(255,255,255,.82);
        }

        .catalog-mobile-section-title {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 11px;

          color: #6c6277;

          font-family: monospace;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: .14em;

          text-transform: uppercase;
        }

        .catalog-mobile-category {
          width: 100%;

          min-height: 39px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding:
            8px 10px;

          margin-bottom: 6px;

          border-radius: 11px;

          color: #786f83;

          background: transparent;

          font-size: 10px;

          text-transform: uppercase;

          text-align: left;

          transition:
            transform 160ms ease,
            background 160ms ease,
            color 160ms ease;
        }

        .catalog-mobile-category:hover {
          transform: translateX(2px);

          background:
            rgba(255,255,255,.45);

          color: var(--catalog-purple-dark);
        }

        .catalog-mobile-category.active {
          color: #fff;

          background:
            linear-gradient(
              145deg,
              #a083d6,
              #7f5fbd
            );

          box-shadow:
            5px 5px 10px rgba(92,78,119,.15),
            -3px -3px 7px rgba(255,255,255,.62);
        }

        .catalog-mobile-size-grid {
          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          gap: 8px;
        }

        .catalog-mobile-checks {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .catalog-mobile-footer {
          flex-shrink: 0;

          padding:
            12px 16px 16px;

          border-top:
            1px solid rgba(255,255,255,.72);
        }

        .catalog-mobile-apply {
          width: 100%;

          min-height: 48px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          border-radius: 15px;

          color: #fff;

          background:
            linear-gradient(
              145deg,
              #a084d7,
              #7c5bb9
            );

          border:
            1px solid rgba(255,255,255,.44);

          box-shadow:
            8px 8px 16px rgba(92,78,119,.21),
            -5px -5px 11px rgba(255,255,255,.65);

          font-family: monospace;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: .11em;

          text-transform: uppercase;
        }

        .catalog-mobile-apply:active {
          box-shadow:
            inset 5px 5px 9px rgba(72,51,111,.20),
            inset -5px -5px 9px rgba(255,255,255,.24);
        }

        /* ======================================================
           ANIMATIONS
           ====================================================== */

        @keyframes catalogHeroImageReveal {
          from {
            opacity: 0;
            transform: scale(1.08);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes catalogHeroContentReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes catalogHeroLineReveal {
          from {
            width: 0;
            opacity: 0;
          }

          to {
            width: 52px;
            opacity: 1;
          }
        }

        @keyframes catalogProductReveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes catalogBackdropIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes catalogDrawerIn {
          from {
            opacity: 0;
            transform: translateX(35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ======================================================
           TABLET
           ====================================================== */

        @media (max-width: 1199px) {

          .catalog-product-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .catalog-sidebar {
            width: 230px;
          }

          .catalog-main {
            gap: 20px;
          }
        }

        /* ======================================================
           MOBILE / TABLET
           ====================================================== */

        @media (max-width: 1023px) {

          .catalog-sidebar {
            display: none;
          }

          .catalog-product-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .catalog-hero {
            min-height: 350px;
          }

          .catalog-hero-inner {
            min-height: 350px;
          }
        }

        /* ======================================================
           MOBILE
           ====================================================== */

        @media (max-width: 767px) {

          .nikku-catalog {
            padding-top: 86px;
          }

          .catalog-topbar {
            min-height: 48px;

            margin-bottom: 12px;
          }

          .catalog-back {
            min-height: 36px;

            padding:
              7px 10px;

            font-size: 8px;

            letter-spacing: .10em;
          }

          .catalog-back svg {
            width: 14px;
            height: 14px;
          }

          .catalog-breadcrumb {
            max-width: 52%;

            font-size: 8px;
          }

          .catalog-hero {
            min-height: 330px;

            margin-bottom: 19px;

            border-radius: 23px;
          }

          .catalog-hero-inner {
            min-height: 330px;
          }

          .catalog-hero-image {
            inset: 7px;

            width: calc(100% - 14px);

            height: calc(100% - 14px);

            border-radius: 18px;
          }

          .catalog-hero-overlay {
            inset: 7px;

            border-radius: 18px;

            background:
              linear-gradient(
                90deg,
                rgba(20,16,30,.80),
                rgba(25,19,35,.38) 70%,
                rgba(30,22,42,.32)
              );
          }

          .catalog-hero-top-shade {
            top: 7px;
            left: 7px;
            right: 7px;

            border-radius:
              18px 18px 0 0;
          }

          .catalog-hero-content {
            padding:
              30px 24px;
          }

          .catalog-eyebrow {
            font-size: 7px;

            letter-spacing: .22em;
          }

          .catalog-eyebrow::before {
            width: 16px;
          }

          .catalog-title {
            font-size:
              clamp(1.65rem, 9vw, 3rem);

            line-height: .94;
          }

          .catalog-hero-line {
            margin:
              16px 0 12px;
          }

          .catalog-description {
            max-width: 92%;

            font-size: 10px;

            line-height: 1.55;
          }

          .catalog-hero-badge {
            right: 19px;
            top: 19px;

            padding:
              7px 9px;

            font-size: 6px;
          }

          .catalog-fit-scroll {
            margin-bottom: 15px;

            padding-bottom: 12px;
          }

          .catalog-fit-chip {
            min-height: 37px;

            padding:
              8px 13px;

            font-size: 8px;
          }

          .catalog-actionbar {
            min-height: 60px;

            padding:
              9px 10px;

            border-radius: 15px;

            margin-bottom: 18px;
          }

          .catalog-action-left {
            gap: 7px;
          }

          .catalog-filter-button {
            min-height: 35px;

            padding:
              7px 10px;

            font-size: 8px;
          }

          .catalog-filter-button svg {
            width: 13px;
            height: 13px;
          }

          .catalog-count {
            font-size: 8px;
          }

          .catalog-count strong {
            font-size: 11px;
          }

          .catalog-sort-wrap {
            flex-shrink: 0;
          }

          .catalog-sort-label {
            display: none;
          }

          .catalog-sort {
            max-width: 122px;

            min-height: 35px;

            padding:
              7px 26px 7px 8px;

            font-size: 8px;
          }

          .catalog-product-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 12px;
          }
        }

        /* ======================================================
           VERY SMALL PHONES
           ====================================================== */

        @media (max-width: 380px) {

          .nikku-catalog {
            padding-top: 82px;
          }

          .catalog-topbar {
            padding:
              7px 0;
          }

          .catalog-back {
            padding:
              6px 8px;

            font-size: 7px;
          }

          .catalog-breadcrumb {
            font-size: 7px;

            max-width: 50%;
          }

          .catalog-hero {
            min-height: 295px;

            border-radius: 20px;
          }

          .catalog-hero-inner {
            min-height: 295px;
          }

          .catalog-hero-content {
            padding:
              23px 18px;
          }

          .catalog-eyebrow {
            font-size: 6px;

            letter-spacing: .16em;
          }

          .catalog-title {
            font-size:
              clamp(1.45rem, 9vw, 2.3rem);
          }

          .catalog-description {
            font-size: 9px;

            max-width: 96%;
          }

          .catalog-hero-badge {
            display: none;
          }

          .catalog-fit-chip {
            min-height: 34px;

            padding:
              7px 11px;

            font-size: 7px;
          }

          .catalog-actionbar {
            gap: 7px;

            padding:
              8px;

            border-radius: 13px;
          }

          .catalog-filter-button {
            min-height: 33px;

            padding:
              6px 8px;
          }

          .catalog-count {
            display: none;
          }

          .catalog-sort {
            max-width: 116px;

            min-height: 33px;

            font-size: 7px;
          }

          .catalog-product-grid {
            gap: 9px;
          }

          .catalog-mobile-backdrop {
            padding: 4px;
          }

          .catalog-mobile-drawer {
            border-radius: 22px;
          }

          .catalog-mobile-content {
            padding:
              11px;
          }

          .catalog-mobile-section {
            padding:
              12px;

            border-radius: 15px;
          }

          .catalog-mobile-size-grid {
            grid-template-columns:
              repeat(4, 1fr);
          }
        }

        /* ======================================================
           LARGE DESKTOP
           ====================================================== */

        @media (min-width: 1536px) {

          .catalog-product-grid {
            gap: 24px;
          }

          .catalog-sidebar {
            width: 275px;
          }

          .catalog-hero {
            min-height: 430px;
          }

          .catalog-hero-inner {
            min-height: 430px;
          }

          .catalog-hero-content {
            padding:
              55px;
          }
        }

        /* ======================================================
           REDUCED MOTION
           ====================================================== */

        @media (prefers-reduced-motion: reduce) {

          .catalog-hero-image,
          .catalog-hero-content,
          .catalog-hero-line,
          .catalog-product-item,
          .catalog-mobile-backdrop,
          .catalog-mobile-drawer {
            animation: none !important;
          }

          .catalog-fit-chip,
          .catalog-category-button,
          .catalog-back,
          .catalog-reset,
          .catalog-mobile-category {
            transition: none !important;
          }
        }

      `}</style>

      {/* ========================================================
          CATALOG PAGE
          ======================================================== */}

      <div
        className="
          nikku-catalog
          pt-24
          pb-16
          sm:pb-20
        "
      >

        <div
          className="
            relative
            z-10
            max-w-[1440px]
            mx-auto
            px-3
            sm:px-6
            lg:px-10
          "
        >

          {/* ====================================================
              BREADCRUMB
          ==================================================== */}

          <div className="catalog-topbar">

            <button
              onClick={function () {
                setIsCatalogOpen(false);
              }}
              className="catalog-back"
            >
              <ArrowLeft className="w-4 h-4" />

              <span>
                BACK TO HOME
              </span>
            </button>

            <div className="catalog-breadcrumb">

              <span>
                Home
              </span>

              <span>
                /
              </span>

              <span>
                {catalogCategory}
              </span>

              {catalogFit !== 'All' && (
                <>
                  <span>
                    /
                  </span>

                  <span className="catalog-breadcrumb-current">
                    {catalogFit}
                  </span>
                </>
              )}

            </div>

          </div>

          {/* ====================================================
              HERO
          ==================================================== */}

          <section className="catalog-hero">

            <div className="catalog-hero-inner">

              <img
                key={catalogCategory}
                src={heroImage}
                alt={`${currentCategoryTitle} - Nikku Fashion Nawalgarh`}
                className="catalog-hero-image"
              />

              <div className="catalog-hero-overlay" />

              <div className="catalog-hero-top-shade" />

              <div className="catalog-hero-badge">
                COLLECTION / 026
              </div>

              <div className="catalog-hero-content">

                <span className="catalog-eyebrow">
                  NIKKU FASHION NAWALGARH
                </span>

                <h1 className="catalog-title">
                  {currentCategoryTitle}
                </h1>

                <div className="catalog-hero-line" />

                <p className="catalog-description">
                  {heroDescription}
                </p>

              </div>

            </div>

          </section>

          {/* ====================================================
              FIT CHIPS
          ==================================================== */}

          <div className="catalog-fit-scroll">

            {DENIM_FITS.map(function (fit) {
              const isActive =
                catalogFit === fit.id;

              return (
                <button
                  key={fit.id}
                  onClick={function () {
                    setCatalogFit(fit.id);
                  }}
                  className={
                    `catalog-fit-chip ${
                      isActive ? 'active' : ''
                    }`
                  }
                >
                  {fit.label}
                </button>
              );
            })}

          </div>

          {/* ====================================================
              ACTION BAR
          ==================================================== */}

          <div className="catalog-actionbar">

            <div className="catalog-action-left">

              <button
                onClick={function () {
                  setMobileFilterOpen(true);
                }}
                className="
                  catalog-filter-button
                  lg:hidden
                "
              >
                <Filter className="w-3.5 h-3.5" />

                <span>
                  Filters
                </span>
              </button>

              <span className="catalog-count">

                SHOWING{' '}

                <strong>
                  {filteredProducts.length}
                </strong>

                {' '}STYLES

              </span>

            </div>

            <div className="catalog-sort-wrap">

              <span className="catalog-sort-label">
                SORT BY:
              </span>

              <select
                value={sortBy}
                onChange={function (event) {
                  setSortBy(
                    event.target.value as
                      | 'featured'
                      | 'price-low'
                      | 'price-high'
                      | 'rating'
                  );
                }}
                className="catalog-sort"
              >

                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Top Customer Rated
                </option>

              </select>

            </div>

          </div>

          {/* ====================================================
              MAIN
          ==================================================== */}

          <div className="catalog-main">

            {/* ==================================================
                DESKTOP SIDEBAR
            ================================================== */}

            <aside className="catalog-sidebar">

              {/* CATEGORY */}

              <div className="catalog-filter-card">

                <h3 className="catalog-filter-card-title">
                  Category
                </h3>

                <div className="catalog-category-list">

                  {categories.map(function (category) {

                    const count =
                      category.id === 'all'
                        ? PRODUCTS.length
                        : PRODUCTS.filter(function (product) {
                            return (
                              product.category ===
                              category.id
                            );
                          }).length;

                    const active =
                      catalogCategory === category.id;

                    return (
                      <button
                        key={category.id}
                        onClick={function () {
                          setCatalogCategory(category.id);
                        }}
                        className={
                          `catalog-category-button ${
                            active ? 'active' : ''
                          }`
                        }
                      >

                        <span>
                          {category.label}
                        </span>

                        <span className="catalog-category-count">
                          {count}
                        </span>

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* GENDER */}

              <div className="catalog-filter-card">

                <h3 className="catalog-filter-card-title">
                  Gender
                </h3>

                <div className="catalog-category-list">

                  {[
                    {
                      id: 'all',
                      label: 'All'
                    },
                    {
                      id: 'men',
                      label: 'Men'
                    },
                    {
                      id: 'women',
                      label: 'Women'
                    }
                  ].map(function (gender) {

                    const active =
                      selectedGender === gender.id;

                    return (
                      <button
                        key={gender.id}
                        onClick={function () {
                          setSelectedGender(
                            gender.id as
                              | 'all'
                              | 'men'
                              | 'women'
                          );
                        }}
                        className={
                          `catalog-category-button ${
                            active ? 'active' : ''
                          }`
                        }
                      >

                        <span>
                          {gender.label}
                        </span>

                        {active && (
                          <Check className="w-3.5 h-3.5" />
                        )}

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* PRICE */}

              <div className="catalog-filter-card">

                <div className="catalog-price-row">

                  <h3 className="catalog-filter-card-title !mb-0">
                    Max Price
                  </h3>

                  <span className="catalog-price-value">
                    ₹{maxPrice.toLocaleString('en-IN')}
                  </span>

                </div>

                <input
                  type="range"
                  min="999"
                  max="4999"
                  step="100"
                  value={maxPrice}
                  onChange={function (event) {
                    setMaxPrice(
                      Number(event.target.value)
                    );
                  }}
                  className="catalog-range"
                />

                <div className="catalog-price-minmax">
                  <span>
                    ₹999
                  </span>

                  <span>
                    ₹4,999
                  </span>
                </div>

              </div>

              {/* SIZES */}

              <div className="catalog-filter-card">

                <h3 className="catalog-filter-card-title">
                  Sizes
                </h3>

                <div className="catalog-size-grid">

                  {allSizes.map(function (size) {

                    const active =
                      selectedSizes.includes(size);

                    return (
                      <button
                        key={size}
                        onClick={function () {
                          toggleSize(size);
                        }}
                        className={
                          `catalog-size ${
                            active ? 'active' : ''
                          }`
                        }
                      >
                        {size}
                      </button>
                    );
                  })}

                </div>

              </div>

              {/* AVAILABILITY */}

              <div className="catalog-filter-card">

                <h3 className="catalog-filter-card-title">
                  Availability
                </h3>

                <div className="catalog-mobile-checks">

                  <label className="catalog-check-row">

                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={function (event) {
                        setInStockOnly(
                          event.target.checked
                        );
                      }}
                      className="catalog-check"
                    />

                    <span>
                      In Stock Only
                    </span>

                  </label>

                  <label className="catalog-check-row">

                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={function (event) {
                        setOnSaleOnly(
                          event.target.checked
                        );
                      }}
                      className="catalog-check"
                    />

                    <span>
                      On Sale / Discounted
                    </span>

                  </label>

                </div>

              </div>

              {/* RESET */}

              <button
                onClick={resetFilters}
                className="catalog-reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />

                Reset Filters
              </button>

            </aside>

            {/* ==================================================
                PRODUCTS
            ================================================== */}

            <div className="catalog-products">

              {filteredProducts.length > 0 ? (

                <div className="catalog-product-grid">

                  {filteredProducts.map(function (product, index) {

                    return (
                      <div
                        key={product.id}
                        className="catalog-product-item"
                        style={{
                          animationDelay:
                            `${Math.min(index * 35, 350)}ms`
                        }}
                      >
                        <ProductCard
                          product={product}
                        />
                      </div>
                    );
                  })}

                </div>

              ) : (

                <div className="catalog-empty">

                  <div className="catalog-empty-icon">
                    <SlidersHorizontal className="w-6 h-6" />
                  </div>

                  <p className="catalog-empty-title">
                    No matching pieces found
                  </p>

                  <p className="catalog-empty-text">
                    Try clearing some filters or
                    broadening your search range.
                  </p>

                  <button
                    onClick={resetFilters}
                    className="catalog-clear"
                  >
                    Clear All Filters
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          MOBILE FILTER DRAWER
          ======================================================== */}

      {mobileFilterOpen && (

        <div
          className="catalog-mobile-backdrop"
          onClick={function (event) {

            if (
              event.target ===
              event.currentTarget
            ) {
              setMobileFilterOpen(false);
            }

          }}
        >

          <div className="catalog-mobile-drawer">

            {/* HEADER */}

            <div className="catalog-mobile-header">

              <div>

                <div className="catalog-mobile-title">
                  Filters
                </div>

                <div className="catalog-mobile-subtitle">
                  REFINE YOUR COLLECTION
                </div>

              </div>

              <button
                onClick={function () {
                  setMobileFilterOpen(false);
                }}
                className="catalog-mobile-close"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* CONTENT */}

            <div className="catalog-mobile-content">

              {/* CATEGORY */}

              <div className="catalog-mobile-section">

                <div className="catalog-mobile-section-title">

                  <span>
                    Category
                  </span>

                  <Filter className="w-3.5 h-3.5 text-[#8f72ca]" />

                </div>

                {categories.map(function (category) {

                  const active =
                    catalogCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={function () {
                        setCatalogCategory(category.id);
                      }}
                      className={
                        `catalog-mobile-category ${
                          active ? 'active' : ''
                        }`
                      }
                    >

                      <span>
                        {category.label}
                      </span>

                      <ChevronRight className="w-3.5 h-3.5" />

                    </button>
                  );
                })}

              </div>

              {/* GENDER */}

              <div className="catalog-mobile-section">

                <div className="catalog-mobile-section-title">
                  Gender
                </div>

                {[
                  {
                    id: 'all',
                    label: 'All'
                  },
                  {
                    id: 'men',
                    label: 'Men'
                  },
                  {
                    id: 'women',
                    label: 'Women'
                  }
                ].map(function (gender) {

                  const active =
                    selectedGender === gender.id;

                  return (
                    <button
                      key={gender.id}
                      onClick={function () {
                        setSelectedGender(
                          gender.id as
                            | 'all'
                            | 'men'
                            | 'women'
                        );
                      }}
                      className={
                        `catalog-mobile-category ${
                          active ? 'active' : ''
                        }`
                      }
                    >

                      <span>
                        {gender.label}
                      </span>

                      {active && (
                        <Check className="w-3.5 h-3.5" />
                      )}

                    </button>
                  );
                })}

              </div>

              {/* PRICE */}

              <div className="catalog-mobile-section">

                <div className="catalog-mobile-section-title">

                  <span>
                    Max Price
                  </span>

                  <span className="text-[#8f72ca]">
                    ₹{maxPrice.toLocaleString('en-IN')}
                  </span>

                </div>

                <input
                  type="range"
                  min="999"
                  max="4999"
                  step="100"
                  value={maxPrice}
                  onChange={function (event) {
                    setMaxPrice(
                      Number(event.target.value)
                    );
                  }}
                  className="catalog-range"
                />

                <div className="catalog-price-minmax">

                  <span>
                    ₹999
                  </span>

                  <span>
                    ₹4,999
                  </span>

                </div>

              </div>

              {/* SIZES */}

              <div className="catalog-mobile-section">

                <div className="catalog-mobile-section-title">
                  Sizes
                </div>

                <div className="catalog-mobile-size-grid">

                  {allSizes.map(function (size) {

                    const active =
                      selectedSizes.includes(size);

                    return (
                      <button
                        key={size}
                        onClick={function () {
                          toggleSize(size);
                        }}
                        className={
                          `catalog-size ${
                            active ? 'active' : ''
                          }`
                        }
                      >
                        {size}
                      </button>
                    );
                  })}

                </div>

              </div>

              {/* AVAILABILITY */}

              <div className="catalog-mobile-section">

                <div className="catalog-mobile-section-title">
                  Availability
                </div>

                <div className="catalog-mobile-checks">

                  <label className="catalog-check-row">

                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={function (event) {
                        setInStockOnly(
                          event.target.checked
                        );
                      }}
                      className="catalog-check"
                    />

                    <span>
                      In Stock Only
                    </span>

                  </label>

                  <label className="catalog-check-row">

                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={function (event) {
                        setOnSaleOnly(
                          event.target.checked
                        );
                      }}
                      className="catalog-check"
                    />

                    <span>
                      On Sale / Discounted
                    </span>

                  </label>

                </div>

              </div>

              {/* RESET */}

              <button
                onClick={resetFilters}
                className="catalog-reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />

                Reset All Filters
              </button>

            </div>

            {/* FOOTER */}

            <div className="catalog-mobile-footer">

              <button
                onClick={function () {
                  setMobileFilterOpen(false);
                }}
                className="catalog-mobile-apply"
              >

                <Check className="w-4 h-4" />

                Apply Filters
                {' '}
                ({filteredProducts.length})

              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};