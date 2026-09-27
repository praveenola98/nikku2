import React, { useState } from 'react';
import { Instagram, ShoppingBag, X, ArrowUpRight } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { PRODUCTS } from '../data/products';
import { LookbookItem, Product } from '../types';
import { useShop } from '../context/ShopContext';

export const LookbookSection: React.FC = () => {
  const {
    setQuickViewProduct,
    addToCart,
    triggerCartFlyAnimation
  } = useShop();

  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);

  const getTaggedProducts = (look: LookbookItem): Product[] => {
    return PRODUCTS.filter(p => look.taggedProductIds.includes(p.id));
  };

  return (
    <section
      id="lookbook-section"
      className="lookbook-section relative w-full overflow-hidden bg-[#0a0a0a] py-20 sm:py-28 border-t border-white/[0.08]"
    >

      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(197,168,128,0.045), transparent 38%)'
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 border-b border-white/[0.08] pb-7">

          <div>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-7 h-7 border border-[#c5a880]/25 bg-[#15130f]">
                <Instagram className="w-3.5 h-3.5 text-[#c5a880]" />
              </div>

              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#c5a880]">
                COMMUNITY GALLERY
              </span>
            </div>

            <h2
              className="
                font-['Syne']
                text-3xl sm:text-5xl
                font-extrabold
                uppercase
                text-white
                tracking-tight
                leading-[0.95]
              "
            >
              FOLLOW THE LOOK
            </h2>

            <p className="text-xs sm:text-sm text-stone-400 font-light mt-2">
              Real people. Real styles. Tag @NikkuFashion to be featured on our lookbook.
            </p>

          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="
              lookbook-instagram-link
              relative
              flex items-center gap-2
              text-[10px] sm:text-xs
              uppercase
              tracking-[0.2em]
              text-[#c5a880]
              hover:text-white
              transition-colors duration-300
              cursor-pointer
              self-start sm:self-end
              group
            "
          >
            <span>Instagram @NikkuFashion</span>

            <ArrowUpRight
              className="
                w-4 h-4
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />

            <span
              className="
                absolute
                -bottom-2 left-0
                w-full h-px
                bg-[#c5a880]
                scale-x-0
                origin-left
                group-hover:scale-x-100
                transition-transform duration-400
              "
            />
          </a>

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">

          {LOOKBOOK_ITEMS.map((look, idx) => (
            <div
              key={look.id}
              onClick={() => setSelectedLook(look)}
              className="
                lookbook-card
                group
                relative
                overflow-hidden
                bg-[#141414]
                aspect-[3/4]
                cursor-pointer
              "
              style={{
                animation: `lookbookReveal 650ms cubic-bezier(.22,.61,.36,1) ${
                  idx * 65
                }ms both`
              }}
            >

              {/* Image */}
              <img
                src={look.image}
                alt={look.title}
                className="
                  lookbook-image
                  w-full h-full
                  object-cover
                  filter brightness-[0.94] contrast-[1.02]
                  transition-transform duration-[900ms]
                  ease-[cubic-bezier(.22,.61,.36,1)]
                  group-hover:scale-[1.065]
                "
                loading="lazy"
              />

              {/* Hover gradient */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/[0.88]
                  via-black/5
                  to-transparent
                  opacity-20
                  group-hover:opacity-100
                  transition-opacity duration-500
                "
              />

              {/* Light sweep */}
              <div className="lookbook-sheen absolute inset-0 pointer-events-none" />

              {/* Number */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 opacity-70">
                <span className="text-[8px] tracking-[0.25em] text-white">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <span className="w-5 h-px bg-white/30" />
              </div>

              {/* Shopping Bag */}
              <div
                className="
                  absolute
                  top-3 right-3
                  sm:top-4 sm:right-4
                  w-8 h-8
                  rounded-full
                  bg-black/55
                  backdrop-blur-md
                  border border-white/10
                  flex items-center justify-center
                  text-white
                  transition-all duration-400
                  group-hover:bg-white
                  group-hover:text-black
                  group-hover:border-white
                  group-hover:scale-105
                "
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>

              {/* Bottom content */}
              <div
                className="
                  absolute
                  bottom-0 left-0 right-0
                  p-3 sm:p-4
                  translate-y-2
                  opacity-0
                  group-hover:translate-y-0
                  group-hover:opacity-100
                  transition-all duration-400
                "
              >

                <h4 className="font-['Syne'] text-xs font-bold uppercase text-white truncate">
                  {look.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[9px] tracking-[0.18em] text-[#c5a880] mt-1">
                  <span>SHOP LOOK</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Gallery footer */}
        <div className="flex items-center justify-between mt-6">

          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-white/20" />

            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-stone-500">
              COMMUNITY · STYLE · CULTURE
            </span>
          </div>

          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-stone-600">
            {LOOKBOOK_ITEMS.length.toString().padStart(2, '0')} LOOKS
          </span>

        </div>

      </div>

      {/* Shop The Look Modal */}
      {selectedLook && (
        <div
          className="
            lookbook-modal
            fixed inset-0
            z-50
            bg-black/[0.88]
            backdrop-blur-md
            flex items-center justify-center
            p-4 sm:p-6
            select-none
          "
          onClick={() => setSelectedLook(null)}
        >

          <div
            className="
              lookbook-modal-card
              relative
              max-w-2xl
              w-full
              bg-[#141414]
              border border-white/[0.14]
              overflow-hidden
              shadow-2xl
              flex flex-col sm:flex-row
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <button
              onClick={() => setSelectedLook(null)}
              className="
                absolute top-3 right-3
                z-20
                w-8 h-8
                rounded-full
                bg-black/75
                border border-white/10
                text-white
                hover:bg-white
                hover:text-black
                flex items-center justify-center
                transition-all duration-300
                cursor-pointer
              "
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Selected Look Image */}
            <div className="w-full sm:w-1/2 h-64 sm:h-auto min-h-[280px] relative bg-[#181818] overflow-hidden">

              <img
                src={selectedLook.image}
                alt={selectedLook.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/75">
                  COMMUNITY LOOK
                </span>
              </div>

            </div>

            {/* Tagged Products */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between max-h-[460px] overflow-y-auto no-scrollbar">

              <div>

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
                  TAGGED PIECES
                </span>

                <h3 className="font-['Syne'] text-lg font-bold uppercase text-white mb-5 leading-tight">
                  {selectedLook.title}
                </h3>

                <div className="space-y-3">

                  {getTaggedProducts(selectedLook).map(product => (
                    <div
                      key={product.id}
                      className="
                        tagged-product
                        flex items-center gap-3
                        p-2.5
                        bg-[#1a1a1a]
                        border border-white/[0.05]
                        hover:border-[#c5a880]/25
                        transition-colors duration-300
                      "
                    >

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-[72px] object-cover bg-black shrink-0"
                      />

                      <div className="flex-1 min-w-0">

                        <span className="text-[9px] uppercase tracking-wider text-stone-400">
                          {product.category}
                        </span>

                        <h4 className="font-['Syne'] text-xs font-semibold text-white truncate mt-0.5">
                          {product.name}
                        </h4>

                        <div className="text-xs font-bold text-white mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>

                      </div>

                      <button
                        onClick={(e) => {
                          const rect = (
                            e.currentTarget as HTMLElement
                          ).getBoundingClientRect();

                          triggerCartFlyAnimation(product.images[0], {
                            x: rect.left + rect.width / 2,
                            y: rect.top + rect.height / 2
                          });

                          addToCart(
                            product,
                            product.colors[0],
                            product.sizes[0],
                            1
                          );
                        }}
                        className="
                          tagged-add-button
                          px-3 py-1.5
                          bg-white
                          hover:bg-[#c5a880]
                          text-black
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          transition-all duration-300
                          cursor-pointer
                          shrink-0
                        "
                      >
                        + BAG
                      </button>

                    </div>
                  ))}

                </div>

              </div>

              {/* Shipping Note */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center">

                <p className="text-[10px] text-stone-400">
                  Free express shipping on all orders over ₹999.
                </p>

              </div>

            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes lookbookReveal {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalReveal {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .lookbook-card {
          isolation: isolate;
          transform: translateZ(0);
        }

        .lookbook-image {
          will-change: transform;
        }

        .lookbook-sheen {
          background:
            linear-gradient(
              115deg,
              transparent 0%,
              transparent 42%,
              rgba(255,255,255,0.06) 50%,
              transparent 58%,
              transparent 100%
            );
          transform: translateX(-120%);
          transition: transform 1000ms cubic-bezier(.22,.61,.36,1);
        }

        .lookbook-card:hover .lookbook-sheen {
          transform: translateX(120%);
        }

        .lookbook-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255,255,255,0);
          pointer-events: none;
          transition: border-color 500ms ease;
        }

        .lookbook-card:hover::after {
          border-color: rgba(197,168,128,0.3);
        }

        .lookbook-modal-card {
          animation: modalReveal 350ms cubic-bezier(.22,.61,.36,1) both;
        }

        .tagged-product {
          transform: translateZ(0);
        }

        .tagged-add-button:hover {
          box-shadow: 0 5px 20px rgba(197,168,128,0.15);
        }

        .lookbook-instagram-link:hover {
          color: #ffffff;
        }

        @media (max-width: 640px) {
          .lookbook-modal-card {
            max-height: calc(100vh - 32px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lookbook-card,
          .lookbook-modal-card {
            animation: none !important;
          }

          .lookbook-image,
          .lookbook-sheen,
          .tagged-add-button {
            transition: none !important;
          }

          .lookbook-card:hover .lookbook-image,
          .lookbook-card:hover .lookbook-sheen {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};