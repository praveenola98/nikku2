import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    triggerCartFlyAnimation,
    setQuickViewProduct,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0]
  );

  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants?.find(
    (variant) =>
      variant.colorName.toLowerCase() ===
      selectedColor.name.toLowerCase()
  );

  const currentPrice = activeVariant
    ? activeVariant.price
    : product.price;

  const currentOriginalPrice = activeVariant
    ? activeVariant.originalPrice
    : product.originalPrice;

  const currentImages =
    activeVariant?.images && activeVariant.images.length > 0
      ? activeVariant.images
      : product.images;

  const displayImage =
    isHovered && currentImages[1]
      ? currentImages[1]
      : currentImages[0];

  const isFavorited = wishlist.includes(product.id);

  const discountPercent =
    currentOriginalPrice > currentPrice
      ? Math.round(
          ((currentOriginalPrice - currentPrice) /
            currentOriginalPrice) *
            100
        )
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const rect = (
      e.currentTarget as HTMLElement
    ).getBoundingClientRect();

    triggerCartFlyAnimation(displayImage, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });

    addToCart(
      product,
      selectedColor,
      product.sizes[0],
      1,
      currentPrice
    );
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();

    addToCart(
      product,
      selectedColor,
      product.sizes[0],
      1,
      currentPrice
    );

    setIsCartOpen(false);

    setTimeout(() => {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }, 550);
  };

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  return (
    <>
      <style>{`

        /* =========================================
           PRODUCT CARD
        ========================================= */

        .product-card {
          position: relative;
          overflow: hidden;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              #ebe7f1,
              #d0c9dd
            );

          border: 1px solid rgba(255,255,255,.62);

          box-shadow:
            12px 12px 28px rgba(106,97,126,.20),
            -12px -12px 28px rgba(255,255,255,.75),
            inset 1px 1px 0 rgba(255,255,255,.58);

          transition:
            transform .3s ease,
            box-shadow .3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);

          box-shadow:
            16px 16px 34px rgba(106,97,126,.23),
            -16px -16px 34px rgba(255,255,255,.80),
            inset 1px 1px 0 rgba(255,255,255,.60);
        }

        /* =========================================
           IMAGE
        ========================================= */

        .product-image-wrap {
          position: relative;
          overflow: hidden;

          margin: 9px;

          border-radius: 22px;

          background: #d4cedf;

          aspect-ratio: 3 / 4;

          box-shadow:
            inset 5px 5px 12px rgba(106,97,126,.14),
            inset -5px -5px 12px rgba(255,255,255,.70);
        }

        .product-image {
          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: top;

          border-radius: 22px;

          transition:
            transform .65s cubic-bezier(.22,.61,.36,1);
        }

        .product-card:hover .product-image {
          transform: scale(1.035);
        }

        /* =========================================
           DISCOUNT
        ========================================= */

        .discount-badge {
          position: absolute;
          left: 12px;
          top: 12px;
          z-index: 10;

          padding: 7px 10px;

          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              #e7e1ee,
              #c8bfd7
            );

          color: #554b60;

          border: 1px solid rgba(255,255,255,.65);

          box-shadow:
            4px 4px 9px rgba(106,97,126,.16),
            -4px -4px 9px rgba(255,255,255,.72);

          font-size: 9px;
          font-weight: 700;
          letter-spacing: .08em;
        }

        /* =========================================
           WISHLIST
        ========================================= */

        .wishlist-button {
          width: 38px;
          height: 38px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              145deg,
              rgba(231,226,238,.94),
              rgba(202,195,216,.90)
            );

          color: #62586c;

          border: 1px solid rgba(255,255,255,.62);

          box-shadow:
            5px 5px 11px rgba(106,97,126,.18),
            -5px -5px 11px rgba(255,255,255,.75),
            inset 1px 1px 0 rgba(255,255,255,.55);

          backdrop-filter: blur(8px);

          transition:
            transform .2s ease,
            box-shadow .2s ease,
            color .2s ease;
        }

        .wishlist-button:hover {
          transform: scale(1.06);

          color: #8a6374;

          box-shadow:
            7px 7px 14px rgba(106,97,126,.21),
            -7px -7px 14px rgba(255,255,255,.80);
        }

        /* =========================================
           QUICK VIEW
        ========================================= */

        .quick-view-button {
          position: absolute;

          left: 14px;
          bottom: 14px;

          height: 34px;

          padding: 0 13px;

          display: flex;
          align-items: center;
          gap: 6px;

          border-radius: 999px;

          background:
            linear-gradient(
              145deg,
              rgba(232,227,240,.95),
              rgba(202,195,216,.92)
            );

          border: 1px solid rgba(255,255,255,.65);

          color: #554b60;

          box-shadow:
            5px 5px 11px rgba(106,97,126,.18),
            -5px -5px 11px rgba(255,255,255,.75);

          backdrop-filter: blur(9px);

          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .12em;

          opacity: 0;
          transform: translateY(6px);

          transition:
            opacity .25s ease,
            transform .25s ease,
            box-shadow .25s ease;
        }

        .product-card:hover .quick-view-button {
          opacity: 1;
          transform: translateY(0);
        }

        .quick-view-button:hover {
          color: #403746;

          box-shadow:
            7px 7px 14px rgba(106,97,126,.21),
            -7px -7px 14px rgba(255,255,255,.80);
        }

        /* =========================================
           DETAILS
        ========================================= */

        .product-details {
          padding: 15px;
        }

        .product-meta {
          color: #81778c;
        }

        .product-color-name {
          color: #91879a;
        }

        .product-name {
          color: #403847;

          transition:
            color .2s ease;
        }

        .product-card:hover .product-name {
          color: #665a73;
        }

        .current-price {
          color: #443b4e;
        }

        .original-price {
          color: #968c9d;
        }

        /* =========================================
           COLOR DOTS
        ========================================= */

        .color-dot {
          width: 17px;
          height: 17px;

          border-radius: 50%;

          padding: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          transition:
            transform .18s ease,
            box-shadow .18s ease;
        }

        .color-dot:hover {
          transform: scale(1.15);
        }

        /* =========================================
           ACTION BUTTONS
        ========================================= */

        .product-actions {
          display: flex;
          gap: 8px;

          margin-top: 15px;
        }

        .product-action {
          height: 43px;

          border-radius: 999px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .12em;
          text-transform: uppercase;

          transition:
            transform .25s ease,
            box-shadow .25s ease,
            background .25s ease;
        }

        .add-cart-button {
          flex: 1;

          color: #443b4e;

          background:
            linear-gradient(
              145deg,
              #d6ccdf,
              #bfb3cf
            );

          border: 1px solid rgba(255,255,255,.62);

          box-shadow:
            5px 5px 12px rgba(106,97,126,.19),
            -5px -5px 12px rgba(255,255,255,.75),
            inset 1px 1px 0 rgba(255,255,255,.55);
        }

        .add-cart-button:hover {
          transform: translateY(-2px);

          background:
            linear-gradient(
              145deg,
              #c9bdd4,
              #b3a5c4
            );

          box-shadow:
            7px 7px 15px rgba(106,97,126,.22),
            -7px -7px 15px rgba(255,255,255,.80);
        }

        .buy-now-button {
          flex: 1;

          color: #665b70;

          background:
            linear-gradient(
              145deg,
              #e4dfea,
              #cbc3d8
            );

          border: 1px solid rgba(255,255,255,.62);

          box-shadow:
            5px 5px 12px rgba(106,97,126,.17),
            -5px -5px 12px rgba(255,255,255,.72),
            inset 1px 1px 0 rgba(255,255,255,.55);
        }

        .buy-now-button:hover {
          transform: translateY(-2px);

          color: #443b4e;

          box-shadow:
            7px 7px 15px rgba(106,97,126,.21),
            -7px -7px 15px rgba(255,255,255,.78);
        }

        .product-action:active {
          transform: scale(.97);

          box-shadow:
            inset 4px 4px 9px rgba(106,97,126,.17),
            inset -4px -4px 9px rgba(255,255,255,.72);
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .product-card {
            border-radius: 25px;
          }

          .product-image-wrap {
            margin: 8px;
            border-radius: 20px;
          }

          .product-image {
            border-radius: 20px;
          }

          .quick-view-button {
            opacity: 1;
            transform: none;
          }

          .product-details {
            padding: 14px;
          }

          .product-action {
            height: 42px;
            font-size: 8.5px;
          }
        }

        /* =========================================
           SMALL PHONES
        ========================================= */

        @media (max-width: 380px) {

          .product-card {
            border-radius: 22px;
          }

          .product-image-wrap {
            margin: 7px;
            border-radius: 18px;
          }

          .product-image {
            border-radius: 18px;
          }

          .product-details {
            padding: 12px;
          }

          .product-actions {
            gap: 6px;
          }

          .product-action {
            font-size: 8px;
            letter-spacing: .08em;
          }

          .wishlist-button {
            width: 35px;
            height: 35px;
          }
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .product-card,
          .product-image,
          .wishlist-button,
          .product-action,
          .quick-view-button,
          .color-dot,
          .product-name {
            transition: none !important;
          }

          .product-card:hover {
            transform: none;
          }

          .product-card:hover .product-image {
            transform: none;
          }

          .product-card:hover .quick-view-button {
            transform: none;
          }
        }

      `}</style>

      <article
        className="product-card"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* =========================
            IMAGE
        ========================= */}

        <div className="product-image-wrap">

          <img
            src={displayImage}
            alt={`${product.name} - ${selectedColor.name}`}
            className="product-image"
            loading="lazy"
          />

          {/* Discount */}
          {discountPercent > 0 && (
            <span className="discount-badge">
              {discountPercent}% OFF
            </span>
          )}

          {/* Wishlist */}
          <button
            className="wishlist-button absolute right-3 top-3 z-20"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={
              isFavorited
                ? 'Remove from wishlist'
                : 'Add to wishlist'
            }
          >
            <Heart
              className="w-[16px] h-[16px]"
              strokeWidth={1.6}
              fill={isFavorited ? 'currentColor' : 'none'}
            />
          </button>

          {/* Quick View */}
          <button
            className="quick-view-button"
            onClick={(e) => {
              e.stopPropagation();

              if (onQuickView) {
                onQuickView(product);
              } else {
                setQuickViewProduct(product);
              }
            }}
          >
            <Eye
              className="w-3.5 h-3.5"
              strokeWidth={1.5}
            />

            Quick View
          </button>

        </div>

        {/* =========================
            DETAILS
        ========================= */}

        <div className="product-details">

          {/* Category */}
          <div className="flex items-center justify-between gap-3 mb-2">

            <span className="product-meta text-[9px] uppercase tracking-[0.16em] truncate">
              {product.category}
              {product.fit ? ` · ${product.fit}` : ''}
            </span>

            <span className="product-color-name text-[9px] truncate">
              {selectedColor.name}
            </span>

          </div>

          {/* Product Name */}
          <h3 className="product-name text-[14px] font-semibold leading-[1.35] truncate">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">

            <span className="current-price text-[15px] font-bold">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>

            {currentOriginalPrice > currentPrice && (
              <span className="original-price text-[11px] line-through">
                ₹{currentOriginalPrice.toLocaleString('en-IN')}
              </span>
            )}

          </div>

          {/* Colors */}
          <div
            className="flex items-center gap-2 mt-3"
            onClick={(e) => e.stopPropagation()}
          >

            {product.colors.map((color, index) => {

              const isSelected =
                selectedColor.name === color.name;

              return (
                <button
                  key={index}
                  className="color-dot"
                  onClick={() => setSelectedColor(color)}
                  style={{
                    backgroundColor: color.hex,

                    border: isSelected
                      ? '2px solid rgba(255,255,255,.90)'
                      : '1px solid rgba(255,255,255,.50)',

                    boxShadow: isSelected
                      ? `
                        0 0 0 2px #aaa0b8,
                        3px 3px 7px rgba(106,97,126,.18),
                        -3px -3px 7px rgba(255,255,255,.65)
                      `
                      : '2px 2px 5px rgba(106,97,126,.12)',
                  }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                >
                  {isSelected && (
                    <Check
                      className="w-[7px] h-[7px] text-white"
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}

          </div>

          {/* Actions */}
          <div
            className="product-actions"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="product-action add-cart-button"
              onClick={handleAddToCart}
            >
              <ShoppingBag
                className="w-3.5 h-3.5"
                strokeWidth={1.7}
              />

              Add to Cart
            </button>

            <button
              className="product-action buy-now-button"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

          </div>

        </div>

      </article>
    </>
  );
};