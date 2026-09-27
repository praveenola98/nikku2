import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const NewArrivals: React.FC = () => {
  const { openCatalog, products } = useShop();
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;

    if (activeCategory === 'men') {
      return p.gender === 'men' || p.gender === 'unisex';
    }

    if (activeCategory === 'women') {
      return p.gender === 'women' || p.gender === 'unisex';
    }

    return p.category === activeCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;

      scrollRef.current.scrollBy({
        left: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="new-arrivals-section relative w-full overflow-hidden py-20 sm:py-24 lg:py-28">

      {/* Soft Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#ddd8e8]" />

        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/35 blur-3xl" />

        <div className="absolute -bottom-48 -left-40 w-[500px] h-[500px] rounded-full bg-[#aaa0bd]/20 blur-3xl" />

        <div className="absolute -top-32 -right-40 w-[450px] h-[450px] rounded-full bg-[#f3eff8]/50 blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================= */}

        <div className="new-arrivals-header relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10 p-6 sm:p-8 rounded-[28px] sm:rounded-[34px]">

          <div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">

              <span className="w-8 h-[2px] rounded-full bg-[#8d819d]" />

              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#70667b]">
                CURRENT ROTATION
              </span>

            </div>

            {/* Heading */}
            <h2 className="font-['Syne'] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[0.92] text-[#3e3748]">
              NEW ARRIVALS
            </h2>

            <p className="text-xs sm:text-sm text-[#746b7c] font-light mt-3 max-w-xl leading-relaxed">
              Fresh seasonal pieces. Designed for silhouette and everyday movement.
            </p>

          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* View All */}
            <button
              onClick={() => openCatalog(activeCategory)}
              className="new-arrivals-view-all group flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#6f637d] font-semibold transition-all duration-300 cursor-pointer mr-1 sm:mr-3"
            >
              <span>View All</span>

              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            {/* Previous */}
            <button
              onClick={() => scroll('left')}
              className="carousel-control group"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            {/* Next */}
            <button
              onClick={() => scroll('right')}
              className="carousel-control group"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

          </div>
        </div>

        {/* =========================
            FILTER TABS
        ========================= */}

        <div className="relative flex items-center gap-3 overflow-x-auto no-scrollbar pb-6 mb-4">

          {CATEGORIES_LIST.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                category-tab
                relative
                px-5 sm:px-6
                py-3
                rounded-full
                text-[10px] sm:text-xs
                uppercase
                tracking-[0.16em]
                font-semibold
                shrink-0
                cursor-pointer
                transition-all duration-300
                ${activeCategory === cat.id ? 'active' : ''}
              `}
              style={{
                animation: `tabReveal 450ms ease-out ${idx * 35}ms both`,
              }}
            >
              {cat.label}

              {activeCategory === cat.id && (
                <span className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#897b99]" />
              )}
            </button>
          ))}

          {/* Mobile Scroll Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-5 w-12 bg-gradient-to-l from-[#ddd8e8] to-transparent sm:hidden" />

        </div>

        {/* =========================
            PRODUCTS CAROUSEL
        ========================= */}

        <div
          ref={scrollRef}
          className="new-arrivals-carousel flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 snap-x snap-mandatory"
        >

          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="new-arrival-product w-[280px] sm:w-[320px] shrink-0 snap-start"
              style={{
                animation: `productReveal 650ms cubic-bezier(.22,.61,.36,1) ${
                  Math.min(idx, 7) * 65
                }ms both`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="w-full min-h-[260px] flex items-center justify-center rounded-[28px] empty-state">
              <div className="text-center">

                <div className="empty-icon">
                  <span>×</span>
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-[#756b7c]">
                  No products available
                </p>

              </div>
            </div>
          )}

        </div>

        {/* =========================
            CAROUSEL HINT
        ========================= */}

        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between mt-3">

            <div className="flex items-center gap-3">

              <span className="w-8 h-[2px] rounded-full bg-[#9a90a7]" />

              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#766d7e]">
                SCROLL TO EXPLORE
              </span>

            </div>

            <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#8c8295]">
              {filteredProducts.length.toString().padStart(2, '0')} PIECES
            </span>

          </div>
        )}

      </div>

      <style>{`

        /* =========================
           SECTION
        ========================= */

        .new-arrivals-section {
          background: #ddd8e8;
        }

        /* =========================
           HEADER CLAY
        ========================= */

        .new-arrivals-header {
          background:
            linear-gradient(
              145deg,
              rgba(235,231,242,.92),
              rgba(210,204,225,.88)
            );

          border: 1px solid rgba(255,255,255,.58);

          box-shadow:
            12px 12px 28px rgba(110,101,130,.18),
            -12px -12px 28px rgba(255,255,255,.72),
            inset 1px 1px 0 rgba(255,255,255,.55);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        /* =========================
           VIEW ALL
        ========================= */

        .new-arrivals-view-all {
          padding: 11px 16px;
          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              rgba(230,224,238,.82),
              rgba(207,200,221,.82)
            );

          border: 1px solid rgba(255,255,255,.55);

          box-shadow:
            5px 5px 12px rgba(110,101,130,.14),
            -5px -5px 12px rgba(255,255,255,.68);
        }

        .new-arrivals-view-all:hover {
          color: #51475d;
          transform: translateY(-1px);
        }

        /* =========================
           CAROUSEL BUTTONS
        ========================= */

        .carousel-control {
          width: 42px;
          height: 42px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #62586d;

          background:
            linear-gradient(
              145deg,
              #e5e0ed,
              #cbc4da
            );

          border: 1px solid rgba(255,255,255,.60);

          box-shadow:
            6px 6px 14px rgba(110,101,130,.18),
            -6px -6px 14px rgba(255,255,255,.75),
            inset 1px 1px 0 rgba(255,255,255,.50);

          transition:
            transform .3s ease,
            box-shadow .3s ease;
        }

        .carousel-control:hover {
          transform: translateY(-2px);

          box-shadow:
            8px 8px 17px rgba(110,101,130,.21),
            -8px -8px 17px rgba(255,255,255,.80);
        }

        .carousel-control:active {
          transform: scale(.95);

          box-shadow:
            inset 4px 4px 9px rgba(110,101,130,.18),
            inset -4px -4px 9px rgba(255,255,255,.72);
        }

        /* =========================
           CATEGORY TABS
        ========================= */

        .category-tab {
          color: #756b7e;

          background:
            linear-gradient(
              145deg,
              rgba(232,227,240,.88),
              rgba(207,201,222,.86)
            );

          border: 1px solid rgba(255,255,255,.55);

          box-shadow:
            5px 5px 12px rgba(110,101,130,.15),
            -5px -5px 12px rgba(255,255,255,.70);
        }

        .category-tab:hover {
          transform: translateY(-2px);
          color: #51485c;
        }

        .category-tab.active {
          color: #403848;

          background:
            linear-gradient(
              145deg,
              #d9d2e4,
              #c2b8d1
            );

          box-shadow:
            inset 4px 4px 9px rgba(110,100,130,.19),
            inset -4px -4px 9px rgba(255,255,255,.72),
            3px 3px 8px rgba(110,101,130,.13);
        }

        /* =========================
           PRODUCT CAROUSEL
        ========================= */

        .new-arrivals-carousel {
          overscroll-behavior-x: contain;
          scroll-padding-left: 1px;
        }

        .new-arrival-product {
          will-change: transform, opacity;
        }

        /* =========================
           EMPTY STATE
        ========================= */

        .empty-state {
          background:
            linear-gradient(
              145deg,
              rgba(233,228,241,.90),
              rgba(207,200,222,.86)
            );

          border: 1px solid rgba(255,255,255,.55);

          box-shadow:
            inset 6px 6px 14px rgba(110,101,130,.12),
            inset -6px -6px 14px rgba(255,255,255,.70);
        }

        .empty-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 14px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d2c9df;

          box-shadow:
            inset 4px 4px 9px rgba(110,101,130,.18),
            inset -4px -4px 9px rgba(255,255,255,.72);
        }

        .empty-icon span {
          color: #81768d;
          font-size: 20px;
          line-height: 1;
        }

        /* =========================
           ANIMATIONS
        ========================= */

        @keyframes tabReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes productReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 640px) {

          .new-arrivals-section {
            padding-top: 64px;
            padding-bottom: 64px;
          }

          .new-arrivals-header {
            padding: 22px 20px;
            border-radius: 26px;
          }

          .new-arrivals-view-all {
            padding: 9px 13px;
          }

          .carousel-control {
            width: 38px;
            height: 38px;
          }

          .new-arrival-product {
            width: 78vw;
            max-width: 320px;
          }
        }

        /* =========================
           SMALL PHONES
        ========================= */

        @media (max-width: 380px) {

          .new-arrivals-header {
            padding: 20px 16px;
            border-radius: 23px;
          }

          .new-arrival-product {
            width: 82vw;
          }

          .category-tab {
            padding-left: 16px;
            padding-right: 16px;
          }
        }

        /* =========================
           TABLET
        ========================= */

        @media (min-width: 768px) and (max-width: 1023px) {

          .new-arrivals-header {
            padding: 28px;
          }

          .new-arrival-product {
            width: 300px;
          }
        }

        /* =========================
           LARGE DESKTOP
        ========================= */

        @media (min-width: 1536px) {

          .new-arrivals-header {
            padding: 34px 38px;
          }

          .new-arrival-product {
            width: 340px;
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {

          .new-arrival-product,
          .category-tab,
          .carousel-control,
          .new-arrivals-view-all {
            animation: none !important;
            transition: none !important;
          }

          .category-tab:hover,
          .carousel-control:hover,
          .new-arrivals-view-all:hover {
            transform: none;
          }
        }

      `}</style>
    </section>
  );
};