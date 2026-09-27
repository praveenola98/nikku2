import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    triggerCartFlyAnimation,
    setQuickViewProduct
  } = useShop();

  const [movedItems, setMovedItems] = useState<number[]>([]);

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter(p =>
    wishlist.includes(p.id)
  );

  const openProduct = (product: typeof PRODUCTS[number]) => {
    setIsWishlistOpen(false);
    setQuickViewProduct(product);
  };

  const handleMoveToBag = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: typeof PRODUCTS[number]
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

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

    setMovedItems(prev =>
      prev.includes(product.id)
        ? prev
        : [...prev, product.id]
    );

    setTimeout(() => {
      toggleWishlist(product.id);

      setMovedItems(prev =>
        prev.filter(id => id !== product.id)
      );
    }, 1200);
  };

  return (
    <>
      <style>{`
        .nikku-wishlist-backdrop {
          animation: wishlistBackdrop 220ms ease-out both;
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
        }

        .nikku-wishlist-panel {
          animation: wishlistPanel 320ms cubic-bezier(.22,.61,.36,1) both;
        }

        .nikku-wishlist-item {
          animation: wishlistItem 300ms ease-out both;
          transition:
            opacity 260ms ease,
            transform 220ms ease,
            box-shadow 220ms ease,
            background 220ms ease;
        }

        .nikku-wishlist-item:nth-child(2) {
          animation-delay: 35ms;
        }

        .nikku-wishlist-item:nth-child(3) {
          animation-delay: 70ms;
        }

        .nikku-wishlist-item:nth-child(4) {
          animation-delay: 105ms;
        }

        .nikku-wishlist-item:hover {
          transform: translateY(-2px);
          background: #e1d9e7;
          box-shadow:
            9px 9px 19px rgba(116,100,132,.20),
            -8px -8px 17px rgba(255,255,255,.82);
        }

        .nikku-wishlist-image {
          transition: transform 450ms cubic-bezier(.22,.61,.36,1);
        }

        .nikku-wishlist-item:hover .nikku-wishlist-image {
          transform: scale(1.035);
        }

        .nikku-wishlist-remove {
          transition:
            color 180ms ease,
            transform 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .nikku-wishlist-remove:hover {
          color: #8c5f68;
          background: #e1d9e7;
          transform: translateY(-1px);
          box-shadow:
            4px 4px 8px rgba(116,100,132,.16),
            -3px -3px 7px rgba(255,255,255,.75);
        }

        .nikku-move-button {
          position: relative;
          overflow: hidden;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .nikku-move-button:hover {
          transform: translateY(-2px);
        }

        .nikku-move-button:active {
          transform: translateY(0);
        }

        .nikku-move-button.success {
          background: #d8d0dc;
          color: #5a4b62;
          box-shadow:
            inset 4px 4px 8px rgba(116,100,132,.16),
            inset -4px -4px 8px rgba(255,255,255,.78);
        }

        .nikku-success-icon {
          animation: successIcon 260ms cubic-bezier(.22,.61,.36,1) both;
        }

        .nikku-wishlist-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .nikku-wishlist-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .nikku-wishlist-scroll::-webkit-scrollbar-thumb {
          background: rgba(116,100,132,.25);
          border-radius: 999px;
        }

        @keyframes wishlistBackdrop {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes wishlistPanel {
          from {
            opacity: 0;
            transform: translateX(32px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes wishlistItem {
          from {
            opacity: 0;
            transform: translateY(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successIcon {
          from {
            opacity: 0;
            transform: scale(.6);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 640px) {
          .nikku-wishlist-panel {
            width: 100%;
            max-width: none;
          }
        }

        @media (max-width: 380px) {
          .nikku-wishlist-item {
            gap: 10px;
            padding: 10px;
          }

          .nikku-wishlist-image-button {
            width: 70px !important;
            height: 90px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nikku-wishlist-backdrop,
          .nikku-wishlist-panel,
          .nikku-wishlist-item,
          .nikku-success-icon {
            animation: none !important;
          }

          .nikku-wishlist-image,
          .nikku-move-button,
          .nikku-wishlist-item,
          .nikku-wishlist-remove {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="
          nikku-wishlist-backdrop
          fixed inset-0
          z-[120]
          select-none
          bg-[#b9acc7]/55
        "
        onClick={() => setIsWishlistOpen(false)}
      >
        <aside
          className="
            nikku-wishlist-panel
            ml-auto
            flex
            h-full
            w-full
            max-w-[460px]
            flex-col
            overflow-hidden
            border-l
            border-white/60
            bg-[#e9e3ee]
            shadow-[
              -18px_0_45px_rgba(116,100,132,.25),
              -8px_0_20px_rgba(255,255,255,.35)
            ]
          "
          onClick={(e) => e.stopPropagation()}
        >

          {/* =====================================================
              HEADER
          ====================================================== */}

          <header
            className="
              shrink-0
              border-b
              border-white/60
              bg-[#e9e3ee]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                px-4
                py-4
                sm:px-6
                sm:py-5
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-[14px]
                    border
                    border-white/70
                    bg-[#e9e3ee]
                    text-[#75657e]
                    shadow-[
                      7px_7px_14px_rgba(116,100,132,.20),
                      -6px_-6px_13px_rgba(255,255,255,.82)
                    ]
                    sm:h-11
                    sm:w-11
                  "
                >
                  <Heart
                    className="h-[17px] w-[17px]"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h2
                      className="
                        truncate
                        text-[13px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-[#514258]
                        sm:text-[14px]
                      "
                    >
                      Saved Looks
                    </h2>

                    <span
                      className="
                        rounded-full
                        bg-[#e1d9e7]
                        px-2
                        py-0.5
                        font-mono
                        text-[9px]
                        font-bold
                        text-[#83748b]
                        shadow-[
                          inset_2px_2px_5px_rgba(116,100,132,.12),
                          inset_-2px_-2px_5px_rgba(255,255,255,.75)
                        ]
                      "
                    >
                      {wishlist.length}
                    </span>
                  </div>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-[#91838f]
                    "
                  >
                    Pieces you've saved for later
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/70
                  bg-[#e9e3ee]
                  text-[#81728a]
                  shadow-[
                    6px_6px_12px_rgba(116,100,132,.18),
                    -5px_-5px_10px_rgba(255,255,255,.82)
                  ]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:text-[#514258]
                "
                aria-label="Close wishlist"
              >
                <X className="h-[17px] w-[17px]" />
              </button>
            </div>
          </header>

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div
            className="
              nikku-wishlist-scroll
              flex-1
              overflow-y-auto
              px-4
              py-4
              sm:px-6
              sm:py-5
            "
          >
            {wishlistProducts.length === 0 ? (
              <div
                className="
                  flex
                  min-h-[420px]
                  flex-col
                  items-center
                  justify-center
                  px-5
                  text-center
                "
              >
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/70
                    bg-[#e1d9e7]
                    text-[#9b8da3]
                    shadow-[
                      9px_9px_19px_rgba(116,100,132,.19),
                      -8px_-8px_17px_rgba(255,255,255,.82)
                    ]
                  "
                >
                  <Heart
                    className="h-7 w-7"
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  className="
                    mt-6
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#62536a]
                  "
                >
                  Nothing saved yet
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[270px]
                    text-[11px]
                    leading-5
                    text-[#91838f]
                  "
                >
                  Tap the heart on a product to keep it here
                  for later.
                </p>

                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="
                    mt-6
                    cursor-pointer
                    rounded-[14px]
                    border
                    border-white/70
                    bg-[#e1d9e7]
                    px-6
                    py-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#5b4c63]
                    shadow-[
                      7px_7px_14px_rgba(116,100,132,.19),
                      -6px_-6px_13px_rgba(255,255,255,.82)
                    ]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                  "
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistProducts.map(product => {
                  const isMoved =
                    movedItems.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="
                        nikku-wishlist-item
                        flex
                        gap-3
                        rounded-[20px]
                        border
                        border-white/65
                        bg-[#e9e3ee]
                        p-3
                        shadow-[
                          8px_8px_18px_rgba(116,100,132,.17),
                          -7px_-7px_16px_rgba(255,255,255,.80)
                        ]
                      "
                    >
                      {/* PRODUCT IMAGE */}

                      <button
                        onClick={() => openProduct(product)}
                        className="
                          nikku-wishlist-image-button
                          relative
                          h-[102px]
                          w-[82px]
                          shrink-0
                          cursor-pointer
                          overflow-hidden
                          rounded-[14px]
                          bg-[#ddd4e2]
                          shadow-[
                            inset_5px_5px_10px_rgba(116,100,132,.14),
                            inset_-5px_-5px_10px_rgba(255,255,255,.78)
                          ]
                        "
                        aria-label={`View ${product.name}`}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="
                            nikku-wishlist-image
                            h-full
                            w-full
                            object-cover
                            object-top
                          "
                        />
                      </button>

                      {/* DETAILS */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-1
                          flex-col
                          justify-between
                          py-0.5
                        "
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <button
                              onClick={() => openProduct(product)}
                              className="
                                cursor-pointer
                                text-left
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.08em]
                                text-[#806d89]
                                transition-colors
                                hover:text-[#5b4b63]
                              "
                            >
                              {product.category}
                            </button>

                            <button
                              onClick={() =>
                                toggleWishlist(product.id)
                              }
                              className="
                                nikku-wishlist-remove
                                flex
                                h-7
                                w-7
                                shrink-0
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-full
                                text-[#988a9f]
                              "
                              aria-label="Remove from wishlist"
                            >
                              <Trash2 className="h-[13px] w-[13px]" />
                            </button>
                          </div>

                          <button
                            onClick={() => openProduct(product)}
                            className="
                              mt-1
                              block
                              line-clamp-2
                              cursor-pointer
                              text-left
                              text-[11px]
                              font-bold
                              uppercase
                              leading-4
                              tracking-[0.035em]
                              text-[#514258]
                              transition-colors
                              hover:text-[#75617d]
                            "
                          >
                            {product.name}
                          </button>

                          <div
                            className="
                              mt-2
                              font-mono
                              text-[13px]
                              font-bold
                              text-[#594a61]
                            "
                          >
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                        </div>

                        {/* MOVE TO BAG */}

                        <button
                          onClick={(e) =>
                            handleMoveToBag(e, product)
                          }
                          disabled={isMoved}
                          className={`
                            nikku-move-button
                            mt-3
                            flex
                            h-9
                            w-full
                            cursor-pointer
                            items-center
                            justify-center
                            gap-1.5
                            rounded-[12px]
                            border
                            border-white/70
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            ${
                              isMoved
                                ? 'success'
                                : `
                                  bg-[#e1d9e7]
                                  text-[#5b4c63]
                                  shadow-[
                                    5px_5px_10px_rgba(116,100,132,.17),
                                    -4px_-4px_9px_rgba(255,255,255,.80)
                                  ]
                                  hover:bg-[#ddd5e2]
                                `
                            }
                          `}
                        >
                          {isMoved ? (
                            <>
                              <Check
                                className="
                                  nikku-success-icon
                                  h-[13px]
                                  w-[13px]
                                "
                              />
                              <span>Moved to Bag</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-[12px] w-[12px]" />
                              <span>Move to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <footer
            className="
              shrink-0
              border-t
              border-white/60
              bg-[#e1d9e7]
              px-4
              py-4
              sm:px-6
            "
          >
            <div
              className="
                flex
                flex-col
                gap-1.5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#94859d]
                "
              >
                Wishlist
              </span>

              <span
                className="
                  text-[9px]
                  text-[#9b8da3]
                "
              >
                Prices shown are current retail prices
              </span>
            </div>
          </footer>
        </aside>
      </div>
    </>
  );
};