import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const SearchOverlay: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setQuickViewProduct
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 120);

      return () => window.clearTimeout(timer);
    }

    setQuery('');
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Baggy Fit Jeans',
    'Heavyweight Oversized Tee',
    'Denim Trucker Jacket',
    'Seamless Crop Top',
    'Loopback Hoodie',
    'Linen Cuban Shirt',
    'Relaxed Straight'
  ];

  const filtered = query.trim()
    ? PRODUCTS.filter(product =>
        product.name
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        (product.fit &&
          product.fit
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        product.description
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : [];

  const openProduct = (product: typeof PRODUCTS[number]) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  return (
    <>
      <style>{`
        .nikku-search-overlay {
          animation: claySearchOverlayIn 240ms ease-out both;
          backdrop-filter: blur(14px);
        }

        .nikku-search-shell {
          animation: claySearchShellIn 340ms cubic-bezier(.22,.61,.36,1) both;
        }

        .nikku-search-card {
          animation: claySearchCardIn 320ms ease-out both;
          transition:
            transform 200ms ease,
            box-shadow 200ms ease,
            background-color 200ms ease;
        }

        .nikku-search-card:nth-child(2) {
          animation-delay: 30ms;
        }

        .nikku-search-card:nth-child(3) {
          animation-delay: 60ms;
        }

        .nikku-search-card:nth-child(4) {
          animation-delay: 90ms;
        }

        .nikku-search-card:hover {
          transform: translateY(-4px);
        }

        .nikku-search-product-image {
          transition:
            transform 500ms cubic-bezier(.22,.61,.36,1);
        }

        .nikku-search-card:hover .nikku-search-product-image {
          transform: scale(1.045);
        }

        .nikku-search-tag {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .nikku-search-tag:hover {
          transform: translateY(-2px);
          color: #514958;
        }

        .nikku-search-close,
        .nikku-search-clear {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .nikku-search-close:hover {
          transform: translateY(-2px);
          color: #514958;
        }

        .nikku-search-clear:hover {
          transform: scale(1.05);
          color: #514958;
        }

        .nikku-search-input-wrap {
          transition:
            box-shadow 200ms ease,
            border-color 200ms ease;
        }

        .nikku-search-input-wrap:focus-within {
          border-color: rgba(145,126,157,.45);
          box-shadow:
            inset 5px 5px 11px rgba(116,105,130,.16),
            inset -5px -5px 11px rgba(255,255,255,.72);
        }

        .nikku-search-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .nikku-search-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .nikku-search-scroll::-webkit-scrollbar-thumb {
          background: rgba(125,110,145,.28);
          border-radius: 999px;
        }

        .nikku-search-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(125,110,145,.42);
        }

        @keyframes claySearchOverlayIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes claySearchShellIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes claySearchCardIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 767px) {
          .nikku-search-shell {
            min-height: 100%;
          }

          .nikku-search-input-wrap input {
            min-width: 0;
          }
        }

        @media (max-width: 380px) {
          .nikku-search-card {
            padding: 8px !important;
          }

          .nikku-search-product-image-wrap {
            border-radius: 15px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nikku-search-overlay,
          .nikku-search-shell,
          .nikku-search-card {
            animation: none !important;
          }

          .nikku-search-product-image,
          .nikku-search-card,
          .nikku-search-tag,
          .nikku-search-close,
          .nikku-search-input-wrap,
          .nikku-search-clear {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="
          nikku-search-overlay
          fixed inset-0 z-[150]
          overflow-y-auto
          select-none
          bg-[#d9d5e2]/90
        "
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          className="nikku-search-shell min-h-full"
          onClick={e => e.stopPropagation()}
        >

          {/* TOP BAR */}
          <header
            className="
              sticky top-0 z-30
              bg-[#d9d5e2]/90
              backdrop-blur-xl
              border-b border-white/50
              shadow-[0_6px_18px_rgba(116,105,130,.10)]
            "
          >
            <div
              className="
                max-w-[1180px]
                mx-auto
                px-4 sm:px-6 lg:px-8
                h-[72px]
                flex items-center
                justify-between
              "
            >

              <div className="flex items-center gap-3">

                {/* N LOGO */}
                <div
                  className="
                    w-9 h-9
                    rounded-[14px]
                    bg-[#d9d5e2]
                    border border-white/70
                    flex items-center justify-center
                    shadow-[5px_5px_11px_rgba(116,105,130,.2),-4px_-4px_10px_rgba(255,255,255,.75)]
                  "
                >
                  <span
                    className="
                      font-['Cinzel']
                      text-[#8d7998]
                      text-[12px]
                      font-bold
                    "
                  >
                    N
                  </span>
                </div>

                <div>
                  <p
                    className="
                      font-['Syne']
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#4d4655]
                    "
                  >
                    Search
                  </p>

                  <p
                    className="
                      hidden sm:block
                      text-[8px]
                      font-mono
                      uppercase
                      tracking-[0.08em]
                      text-[#918995]
                      mt-0.5
                    "
                  >
                    Nikku Fashion Nawalgarh
                  </p>
                </div>

              </div>

              {/* CLOSE */}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="
                  nikku-search-close
                  w-10 h-10
                  rounded-full
                  border border-white/65
                  text-[#756c80]
                  bg-[#d9d5e2]
                  flex items-center justify-center
                  cursor-pointer
                  shadow-[5px_5px_11px_rgba(116,105,130,.20),-4px_-4px_10px_rgba(255,255,255,.75)]
                "
                aria-label="Close search"
              >
                <X className="w-[17px] h-[17px]" />
              </button>

            </div>
          </header>

          <main
            className="
              nikku-search-scroll
              max-w-[1180px]
              mx-auto
              px-4 sm:px-6 lg:px-8
              pb-16
            "
          >

            {/* SEARCH INPUT */}
            <section className="pt-8 sm:pt-12">

              <div className="max-w-[900px]">

                <p
                  className="
                    text-[9px]
                    font-mono
                    uppercase
                    tracking-[0.16em]
                    text-[#8d7998]
                    mb-3
                  "
                >
                  Find your next piece
                </p>

                <div
                  className="
                    nikku-search-input-wrap
                    flex items-center
                    gap-3 sm:gap-4
                    border
                    border-white/50
                    rounded-[22px]
                    px-4 sm:px-5
                    py-3
                    bg-[#d9d5e2]
                    shadow-[inset_5px_5px_11px_rgba(116,105,130,.16),inset_-5px_-5px_11px_rgba(255,255,255,.72)]
                  "
                >

                  <Search
                    className="
                      w-6 h-6 sm:w-7 sm:h-7
                      text-[#817889]
                      shrink-0
                    "
                  />

                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search jeans, tees, jackets..."
                    className="
                      w-full
                      bg-transparent
                      font-['Syne']
                      text-[21px] sm:text-[32px] lg:text-[40px]
                      font-semibold
                      tracking-[-0.025em]
                      text-[#48404f]
                      placeholder-[#aaa3ae]
                      focus:outline-none
                    "
                  />

                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="
                        nikku-search-clear
                        shrink-0
                        w-9 h-9
                        rounded-full
                        text-[#817889]
                        bg-[#d9d5e2]
                        border border-white/60
                        flex items-center justify-center
                        cursor-pointer
                        shadow-[4px_4px_9px_rgba(116,105,130,.18),-3px_-3px_8px_rgba(255,255,255,.7)]
                      "
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                </div>

              </div>

            </section>

            {/* EMPTY SEARCH / DISCOVERY */}
            {!query.trim() && (
              <section className="mt-8 sm:mt-10">

                {/* POPULAR SEARCHES */}
                <div className="flex items-center gap-2 mb-4">

                  <TrendingUp
                    className="w-3.5 h-3.5 text-[#8d7998]"
                  />

                  <span
                    className="
                      text-[9px]
                      font-mono
                      uppercase
                      tracking-[0.14em]
                      text-[#817889]
                    "
                  >
                    Popular searches
                  </span>

                </div>

                <div className="flex flex-wrap gap-2">

                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="
                        nikku-search-tag
                        px-3.5 py-2.5
                        rounded-full
                        border border-white/60
                        bg-[#d9d5e2]
                        text-[9px] sm:text-[10px]
                        font-mono
                        text-[#756c80]
                        uppercase
                        tracking-[0.03em]
                        cursor-pointer
                        shadow-[5px_5px_10px_rgba(116,105,130,.17),-4px_-4px_9px_rgba(255,255,255,.72)]
                      "
                    >
                      {term}
                    </button>
                  ))}

                </div>

                {/* FEATURED */}
                <div className="mt-12 sm:mt-16">

                  <div className="flex items-end justify-between mb-5">

                    <div>

                      <p
                        className="
                          text-[9px]
                          font-mono
                          uppercase
                          tracking-[0.14em]
                          text-[#8d7998]
                        "
                      >
                        Start here
                      </p>

                      <h2
                        className="
                          mt-1
                          font-['Syne']
                          text-[17px] sm:text-[20px]
                          font-semibold
                          uppercase
                          text-[#4c4453]
                        "
                      >
                        Featured pieces
                      </h2>

                    </div>

                    <span
                      className="
                        hidden sm:block
                        text-[8px]
                        font-mono
                        text-[#9b929f]
                        uppercase
                      "
                    >
                      Selected from current collection
                    </span>

                  </div>

                  <div
                    className="
                      grid
                      grid-cols-2
                      sm:grid-cols-4
                      gap-3 sm:gap-4
                    "
                  >

                    {PRODUCTS.slice(0, 4).map(product => (
                      <button
                        key={product.id}
                        onClick={() => openProduct(product)}
                        className="
                          nikku-search-card
                          group
                          text-left
                          rounded-[24px]
                          border border-white/60
                          bg-[#d9d5e2]
                          p-2.5 sm:p-3
                          cursor-pointer
                          shadow-[8px_8px_18px_rgba(116,105,130,.20),-7px_-7px_16px_rgba(255,255,255,.74)]
                        "
                      >

                        <div
                          className="
                            nikku-search-product-image-wrap
                            relative
                            aspect-[3/4]
                            overflow-hidden
                            rounded-[18px]
                            bg-[#c9c5d1]
                            shadow-[inset_5px_5px_11px_rgba(116,105,130,.20),inset_-5px_-5px_11px_rgba(255,255,255,.7)]
                          "
                        >

                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="
                              nikku-search-product-image
                              w-full h-full
                              object-cover
                              object-top
                            "
                          />

                          <span
                            className="
                              absolute
                              bottom-2 right-2
                              w-8 h-8
                              rounded-full
                              bg-[#d9d5e2]/90
                              border border-white/60
                              flex items-center justify-center
                              text-[#62586f]
                              shadow-[4px_4px_9px_rgba(80,70,95,.2),-3px_-3px_8px_rgba(255,255,255,.7)]
                            "
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>

                        </div>

                        <div className="mt-3">

                          <span
                            className="
                              text-[8px]
                              font-mono
                              uppercase
                              tracking-[0.08em]
                              text-[#8d7998]
                            "
                          >
                            {product.category}
                          </span>

                          <h3
                            className="
                              mt-1
                              font-['Syne']
                              text-[10px] sm:text-[11px]
                              font-semibold
                              uppercase
                              text-[#4c4453]
                              line-clamp-1
                            "
                          >
                            {product.name}
                          </h3>

                          <span
                            className="
                              block mt-1.5
                              text-[10px]
                              font-mono
                              font-semibold
                              text-[#5c5364]
                            "
                          >
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>

                        </div>

                      </button>
                    ))}

                  </div>

                </div>

              </section>
            )}

            {/* SEARCH RESULTS */}
            {query.trim() && (
              <section className="mt-8 sm:mt-10">

                <div
                  className="
                    flex items-end
                    justify-between
                    mb-5 pb-3
                    border-b border-white/50
                  "
                >

                  <div>

                    <p
                      className="
                        text-[9px]
                        font-mono
                        uppercase
                        tracking-[0.14em]
                        text-[#918995]
                      "
                    >
                      Search results
                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-[#756c80]
                      "
                    >
                      <span className="text-[#4b4352] font-medium">
                        {filtered.length}
                      </span>{' '}
                      pieces found for{' '}
                      <span className="text-[#8d7998]">
                        “{query}”
                      </span>
                    </p>

                  </div>

                </div>

                {filtered.length > 0 ? (

                  <div
                    className="
                      grid
                      grid-cols-2
                      sm:grid-cols-3
                      lg:grid-cols-4
                      gap-3 sm:gap-4
                    "
                  >

                    {filtered.map(product => (
                      <button
                        key={product.id}
                        onClick={() => openProduct(product)}
                        className="
                          nikku-search-card
                          group
                          text-left
                          rounded-[24px]
                          border border-white/60
                          bg-[#d9d5e2]
                          p-2.5 sm:p-3
                          cursor-pointer
                          shadow-[8px_8px_18px_rgba(116,105,130,.20),-7px_-7px_16px_rgba(255,255,255,.74)]
                        "
                      >

                        <div
                          className="
                            nikku-search-product-image-wrap
                            relative
                            aspect-[3/4]
                            overflow-hidden
                            rounded-[18px]
                            bg-[#c9c5d1]
                            shadow-[inset_5px_5px_11px_rgba(116,105,130,.20),inset_-5px_-5px_11px_rgba(255,255,255,.7)]
                          "
                        >

                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="
                              nikku-search-product-image
                              w-full h-full
                              object-cover
                              object-top
                            "
                          />

                          {product.originalPrice >
                            product.price && (
                            <span
                              className="
                                absolute top-2 left-2
                                px-2.5 py-1.5
                                rounded-full
                                bg-[#a794b0]
                                text-white
                                text-[7px]
                                font-bold
                                uppercase
                                tracking-[0.08em]
                                shadow-[4px_4px_8px_rgba(80,70,95,.22)]
                              "
                            >
                              Sale
                            </span>
                          )}

                          <span
                            className="
                              absolute
                              bottom-2 right-2
                              w-8 h-8
                              rounded-full
                              bg-[#d9d5e2]/90
                              border border-white/60
                              flex items-center justify-center
                              text-[#62586f]
                              opacity-0
                              group-hover:opacity-100
                              shadow-[4px_4px_9px_rgba(80,70,95,.2),-3px_-3px_8px_rgba(255,255,255,.7)]
                              transition-opacity
                            "
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>

                        </div>

                        <div className="mt-3">

                          <span
                            className="
                              text-[8px]
                              font-mono
                              uppercase
                              tracking-[0.08em]
                              text-[#8d7998]
                            "
                          >
                            {product.category}
                          </span>

                          <h3
                            className="
                              mt-1
                              font-['Syne']
                              text-[10px] sm:text-[11px]
                              font-semibold
                              uppercase
                              text-[#4c4453]
                              line-clamp-1
                            "
                          >
                            {product.name}
                          </h3>

                          <div className="flex items-baseline gap-2 mt-1.5">

                            <span
                              className="
                                text-[10px]
                                font-mono
                                font-semibold
                                text-[#5c5364]
                              "
                            >
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>

                            {product.originalPrice >
                              product.price && (
                              <span
                                className="
                                  text-[8px]
                                  font-mono
                                  text-[#9b929f]
                                  line-through
                                "
                              >
                                ₹
                                {product.originalPrice.toLocaleString(
                                  'en-IN'
                                )}
                              </span>
                            )}

                          </div>

                        </div>

                      </button>
                    ))}

                  </div>

                ) : (

                  /* NOTHING FOUND */
                  <div
                    className="
                      min-h-[330px]
                      flex flex-col
                      items-center
                      justify-center
                      text-center
                    "
                  >

                    <div
                      className="
                        w-16 h-16
                        rounded-full
                        bg-[#d9d5e2]
                        border border-white/60
                        flex items-center justify-center
                        mb-5
                        shadow-[inset_5px_5px_11px_rgba(116,105,130,.18),inset_-5px_-5px_11px_rgba(255,255,255,.72)]
                      "
                    >
                      <Search className="w-5 h-5 text-[#918995]" />
                    </div>

                    <h3
                      className="
                        font-['Syne']
                        text-[15px]
                        font-semibold
                        uppercase
                        text-[#5b5263]
                      "
                    >
                      Nothing found
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[300px]
                        text-[10px]
                        leading-5
                        text-[#918995]
                      "
                    >
                      Try another style, category or fit.
                      For example: jeans, hoodie, oversized or
                      jacket.
                    </p>

                    <button
                      onClick={() => setQuery('')}
                      className="
                        nikku-search-tag
                        mt-5
                        px-5 py-3
                        rounded-full
                        bg-[#a794b0]
                        border border-white/30
                        text-white
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        cursor-pointer
                        shadow-[6px_6px_13px_rgba(116,105,130,.25),-5px_-5px_12px_rgba(255,255,255,.72)]
                      "
                    >
                      Browse Popular Searches
                    </button>

                  </div>

                )}

              </section>
            )}

          </main>

        </div>
      </div>
    </>
  );
};