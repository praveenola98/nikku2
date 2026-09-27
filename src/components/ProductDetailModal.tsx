import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Heart,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Ruler,
  Check,
  Truck,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { ProductColor } from '../types';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    triggerCartFlyAnimation,
    wishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    setIsCartOpen
  } = useShop();

  const product = quickViewProduct;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] =
    useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [openSection, setOpenSection] = useState<
    'desc' | 'fabric' | 'shipping'
  >('desc');

  const [addedToBag, setAddedToBag] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedImageIdx(0);
      setQuantity(1);
      setAddedToBag(false);
      setBuyingNow(false);
      setOpenSection('desc');
    }
  }, [product?.id]);

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0];
  const activeSize = selectedSize || product.sizes[0];

  const isFavorited = wishlist.includes(product.id);

  const activeVariant = product.variants?.find(
    v =>
      v.colorName.toLowerCase() ===
      activeColor.name.toLowerCase()
  );

  const currentPrice = activeVariant
    ? activeVariant.price
    : product.price;

  const currentOriginalPrice = activeVariant
    ? activeVariant.originalPrice
    : product.originalPrice;

  const currentImages =
    activeVariant?.images &&
    activeVariant.images.length > 0
      ? activeVariant.images
      : product.images;

  const currentStock =
    activeVariant?.stock ??
    (product.inStock ? 25 : 0);

  const discountPercent =
    currentOriginalPrice > currentPrice
      ? Math.round(
          ((currentOriginalPrice - currentPrice) /
            currentOriginalPrice) *
            100
        )
      : 0;

  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    setSelectedImageIdx(0);
  };

  const handleAdd = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    triggerCartFlyAnimation(
      currentImages[selectedImageIdx] ||
        currentImages[0],
      {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    );

    addToCart(
      product,
      activeColor,
      activeSize,
      quantity,
      currentPrice
    );

    setAddedToBag(true);

    setTimeout(() => {
      setAddedToBag(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    if (buyingNow) return;

    setBuyingNow(true);

    addToCart(
      product,
      activeColor,
      activeSize,
      quantity,
      currentPrice
    );

    setQuickViewProduct(null);

    setTimeout(() => {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
      setBuyingNow(false);
    }, 550);
  };

  const toggleSection = (
    section: 'desc' | 'fabric' | 'shipping'
  ) => {
    setOpenSection(current =>
      current === section ? 'desc' : section
    );
  };

  return (
    <>
      <style>{`
        .nikku-product-backdrop {
          animation: clayProductBackdrop 240ms ease-out both;
          backdrop-filter: blur(10px);
        }

        .nikku-product-modal {
          animation: clayProductModal 360ms cubic-bezier(.22,.61,.36,1) both;
        }

        .nikku-product-info {
          animation: clayProductInfo 420ms ease-out 60ms both;
        }

        .nikku-product-main-image {
          animation: clayProductImage 420ms ease-out both;
        }

        .nikku-product-thumb {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        }

        .nikku-product-thumb:hover {
          transform: translateY(-2px);
        }

        .nikku-product-image-wrap {
          position: relative;
          isolation: isolate;
        }

        .nikku-product-image-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              120deg,
              transparent 25%,
              rgba(255,255,255,.22) 50%,
              transparent 75%
            );
          transform: translateX(-120%);
          transition: transform 800ms cubic-bezier(.22,.61,.36,1);
          z-index: 3;
        }

        .nikku-product-image-wrap:hover::after {
          transform: translateX(120%);
        }

        .nikku-clay-button {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .nikku-clay-button:hover {
          transform: translateY(-2px);
        }

        .nikku-clay-button:active {
          transform: translateY(1px);
        }

        .nikku-product-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .nikku-product-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .nikku-product-scroll::-webkit-scrollbar-thumb {
          background: rgba(125, 110, 145, .28);
          border-radius: 999px;
        }

        .nikku-product-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(125, 110, 145, .42);
        }

        .nikku-clay-section {
          transition:
            background-color 180ms ease,
            box-shadow 180ms ease;
        }

        .nikku-clay-section:hover {
          background: rgba(255,255,255,.22);
        }

        @keyframes clayProductBackdrop {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes clayProductModal {
          from {
            opacity: 0;
            transform: translateY(24px) scale(.975);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes clayProductInfo {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes clayProductImage {
          from {
            opacity: 0;
            transform: scale(1.025);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 767px) {
          .nikku-product-modal {
            min-height: 100%;
            max-height: none;
          }

          .nikku-product-image-wrap {
            min-height: 390px !important;
            max-height: 58vh;
          }

          .nikku-product-info {
            max-height: none !important;
            overflow: visible;
          }
        }

        @media (max-width: 480px) {
          .nikku-product-image-wrap {
            min-height: 350px !important;
          }
        }

        @media (max-width: 380px) {
          .nikku-product-image-wrap {
            min-height: 310px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nikku-product-backdrop,
          .nikku-product-modal,
          .nikku-product-info,
          .nikku-product-main-image {
            animation: none !important;
          }

          .nikku-product-thumb,
          .nikku-product-image-wrap::after,
          .nikku-clay-button {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="
          nikku-product-backdrop
          fixed inset-0 z-[100]
          flex items-center justify-center
          p-0 sm:p-4 md:p-6
          overflow-y-auto
          bg-[#d9d5e2]/80
        "
        onClick={() => setQuickViewProduct(null)}
      >
        <div
          className="
            nikku-product-modal
            relative
            w-full max-w-[1180px]
            overflow-hidden
            flex flex-col md:flex-row
            my-auto
            rounded-none sm:rounded-[32px]
            border border-white/60
            bg-[#d9d5e2]
            shadow-[20px_20px_55px_rgba(116,105,130,.28),-16px_-16px_45px_rgba(255,255,255,.82)]
          "
          onClick={e => e.stopPropagation()}
        >

          {/* CLOSE */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="
              absolute top-3 right-3 sm:top-5 sm:right-5
              z-50
              w-10 h-10
              rounded-full
              flex items-center justify-center
              text-[#70687c]
              bg-[#d9d5e2]
              border border-white/70
              shadow-[6px_6px_14px_rgba(116,105,130,.22),-5px_-5px_12px_rgba(255,255,255,.75)]
              hover:text-[#494253]
              hover:-translate-y-0.5
              transition-all
              cursor-pointer
            "
            aria-label="Close product modal"
          >
            <X className="w-[18px] h-[18px]" />
          </button>

          {/* LEFT — PRODUCT IMAGES */}
          <section
            className="
              w-full md:w-[53%]
              p-3 sm:p-5 lg:p-6
              bg-[#d9d5e2]
            "
          >
            <div className="flex flex-col-reverse sm:flex-row gap-3 h-full">

              {/* THUMBNAILS */}
              <div
                className="
                  flex sm:flex-col
                  gap-2
                  overflow-x-auto sm:overflow-y-auto
                  no-scrollbar
                  shrink-0
                  pb-1 sm:pb-0
                "
              >
                {currentImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() =>
                      setSelectedImageIdx(index)
                    }
                    className={`
                      nikku-product-thumb
                      w-[58px] h-[70px]
                      sm:w-[68px] sm:h-[84px]
                      shrink-0
                      overflow-hidden
                      rounded-[18px]
                      border
                      cursor-pointer
                      bg-[#d9d5e2]
                      ${
                        selectedImageIdx === index
                          ? `
                            border-[#9b8cab]
                            opacity-100
                            shadow-[inset_3px_3px_7px_rgba(116,105,130,.18),inset_-3px_-3px_7px_rgba(255,255,255,.75)]
                          `
                          : `
                            border-white/60
                            opacity-60
                            shadow-[5px_5px_11px_rgba(116,105,130,.18),-4px_-4px_10px_rgba(255,255,255,.72)]
                            hover:opacity-100
                          `
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div
                className="
                  nikku-product-image-wrap
                  relative flex-1
                  min-h-[430px] sm:min-h-[500px]
                  overflow-hidden
                  rounded-[26px]
                  bg-[#c9c5d1]
                  shadow-[inset_8px_8px_18px_rgba(116,105,130,.22),inset_-8px_-8px_18px_rgba(255,255,255,.78)]
                "
              >
                <img
                  key={`${activeColor.name}-${selectedImageIdx}`}
                  src={
                    currentImages[selectedImageIdx] ||
                    currentImages[0]
                  }
                  alt={`${product.name} - ${activeColor.name}`}
                  className="
                    nikku-product-main-image
                    relative z-[1]
                    w-full h-full
                    object-cover object-top
                  "
                />

                {/* DISCOUNT */}
                {discountPercent > 0 && (
                  <span
                    className="
                      absolute top-4 left-4 z-10
                      px-3 py-2
                      rounded-full
                      bg-[#d9d5e2]
                      text-[#62586f]
                      text-[9px]
                      font-bold
                      tracking-[0.12em]
                      shadow-[5px_5px_12px_rgba(80,70,95,.25),-4px_-4px_10px_rgba(255,255,255,.75)]
                    "
                  >
                    {discountPercent}% OFF
                  </span>
                )}

                {/* PRODUCT COLOR */}
                <div
                  className="
                    absolute bottom-4 left-4 z-10
                    flex items-center gap-2
                    px-3 py-2
                    rounded-full
                    bg-[#d9d5e2]/90
                    border border-white/60
                    shadow-[5px_5px_12px_rgba(80,70,95,.22),-4px_-4px_10px_rgba(255,255,255,.72)]
                  "
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/80"
                    style={{
                      backgroundColor: activeColor.hex
                    }}
                  />

                  <span className="text-[9px] text-[#625a6d] font-mono uppercase tracking-[0.05em]">
                    {activeColor.name}
                  </span>
                </div>

                {/* IMAGE COUNT */}
                <span
                  className="
                    absolute bottom-4 right-4 z-10
                    px-3 py-1.5
                    rounded-full
                    bg-[#d9d5e2]/90
                    text-[9px]
                    text-[#756c80]
                    font-mono
                    border border-white/60
                    shadow-[4px_4px_10px_rgba(80,70,95,.2),-3px_-3px_8px_rgba(255,255,255,.7)]
                  "
                >
                  {selectedImageIdx + 1} / {currentImages.length}
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT — PRODUCT INFO */}
          <section
            className="
              nikku-product-scroll
              nikku-product-info
              w-full md:w-[47%]
              max-h-[92vh] md:max-h-[88vh]
              overflow-y-auto
              bg-[#d9d5e2]
            "
          >
            <div className="p-5 sm:p-7 lg:p-9">

              {/* CATEGORY / RATING */}
              <div className="flex items-center justify-between gap-4 pr-10">

                <span
                  className="
                    text-[9px]
                    font-mono
                    tracking-[0.16em]
                    text-[#887995]
                    uppercase
                  "
                >
                  {product.category}
                  {product.fit ? ` · ${product.fit}` : ''}
                </span>

                <div
                  className="
                    flex items-center gap-1.5
                    px-3 py-1.5
                    rounded-full
                    bg-[#d9d5e2]
                    shadow-[inset_3px_3px_7px_rgba(116,105,130,.18),inset_-3px_-3px_7px_rgba(255,255,255,.7)]
                  "
                >
                  <Star
                    className="w-3.5 h-3.5 text-[#a08da9] fill-current"
                  />

                  <span className="font-mono text-[10px] text-[#554d60]">
                    {product.rating}
                  </span>

                  <span className="text-[9px] text-[#8a8291]">
                    ({product.reviewsCount})
                  </span>
                </div>
              </div>

              {/* TITLE */}
              <h2
                className="
                  mt-4
                  font-['Syne']
                  text-[24px] sm:text-[30px]
                  leading-[1.05]
                  font-semibold
                  tracking-[-0.025em]
                  text-[#403947]
                  uppercase
                "
              >
                {product.name}
              </h2>

              {/* PRICE */}
              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">

                <span
                  className="
                    font-mono
                    text-[22px] sm:text-[26px]
                    font-semibold
                    text-[#403947]
                  "
                >
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>

                {currentOriginalPrice > currentPrice && (
                  <>
                    <span
                      className="
                        font-mono
                        text-[12px]
                        text-[#918998]
                        line-through
                      "
                    >
                      ₹
                      {currentOriginalPrice.toLocaleString(
                        'en-IN'
                      )}
                    </span>

                    <span className="text-[10px] text-[#688a76] font-medium">
                      Save ₹
                      {(
                        currentOriginalPrice -
                        currentPrice
                      ).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              {/* DELIVERY */}
              <div
                className="
                  mt-4
                  flex flex-wrap
                  items-center
                  gap-x-3 gap-y-2
                  text-[9px]
                  font-mono
                "
              >
                <span className="flex items-center gap-1.5 text-[#688a76]">
                  <Truck className="w-3.5 h-3.5" />
                  FREE EXPRESS DELIVERY
                </span>

                <span className="text-[#aaa3ae]">•</span>

                <span className="text-[#89818e]">
                  DISPATCH FROM NAWALGARH
                </span>
              </div>

              <div className="my-6 h-px bg-white/60 shadow-[0_1px_0_rgba(116,105,130,.12)]" />

              {/* COLOR */}
              <div>

                <div className="flex items-center justify-between mb-3">
                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#5c5364]
                    "
                  >
                    Color
                  </span>

                  <span className="text-[9px] font-mono text-[#887f8e] uppercase">
                    {activeColor.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">

                  {product.colors.map((color, index) => {

                    const isSelected =
                      activeColor.name === color.name;

                    const variantPrice =
                      product.variants?.find(
                        variant =>
                          variant.colorName.toLowerCase() ===
                          color.name.toLowerCase()
                      )?.price || product.price;

                    return (
                      <button
                        key={index}
                        onClick={() =>
                          handleColorChange(color)
                        }
                        className={`
                          min-h-[40px]
                          px-3
                          rounded-[14px]
                          border
                          flex items-center gap-2
                          cursor-pointer
                          transition-all
                          ${
                            isSelected
                              ? `
                                border-[#a391ad]
                                bg-[#d9d5e2]
                                text-[#4e4657]
                                shadow-[inset_3px_3px_7px_rgba(116,105,130,.18),inset_-3px_-3px_7px_rgba(255,255,255,.72)]
                              `
                              : `
                                border-white/60
                                text-[#817889]
                                bg-[#d9d5e2]
                                shadow-[4px_4px_9px_rgba(116,105,130,.16),-3px_-3px_8px_rgba(255,255,255,.68)]
                                hover:-translate-y-0.5
                              `
                          }
                        `}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/90 shrink-0"
                          style={{
                            backgroundColor: color.hex
                          }}
                        />

                        <span className="text-[9px] font-mono uppercase">
                          {color.name}
                        </span>

                        <span className="text-[8px] text-[#918995] font-mono">
                          ₹{variantPrice.toLocaleString('en-IN')}
                        </span>

                        {isSelected && (
                          <Check className="w-3 h-3 text-[#917e9d]" />
                        )}
                      </button>
                    );
                  })}

                </div>
              </div>

              {/* SIZE */}
              <div className="mt-6">

                <div className="flex items-center justify-between mb-3">

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#5c5364]
                    "
                  >
                    Size
                  </span>

                  <button
                    onClick={() =>
                      setIsSizeGuideOpen(true)
                    }
                    className="
                      flex items-center gap-1.5
                      text-[9px]
                      text-[#887995]
                      hover:text-[#554d60]
                      uppercase
                      tracking-[0.08em]
                      cursor-pointer
                    "
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>

                </div>

                <div className="flex flex-wrap gap-2">

                  {product.sizes.map(size => {

                    const selected =
                      activeSize === size;

                    return (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(size)
                        }
                        className={`
                          min-w-[48px]
                          h-10
                          px-3
                          rounded-[14px]
                          border
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          cursor-pointer
                          transition-all
                          ${
                            selected
                              ? `
                                bg-[#a794b0]
                                border-[#a794b0]
                                text-white
                                shadow-[5px_5px_11px_rgba(116,105,130,.25),-4px_-4px_10px_rgba(255,255,255,.7)]
                              `
                              : `
                                bg-[#d9d5e2]
                                border-white/60
                                text-[#675e6e]
                                shadow-[4px_4px_9px_rgba(116,105,130,.16),-3px_-3px_8px_rgba(255,255,255,.7)]
                                hover:-translate-y-0.5
                              `
                          }
                        `}
                      >
                        {size}
                      </button>
                    );
                  })}

                </div>
              </div>

              {/* QUANTITY / STOCK */}
              <div className="mt-6 flex items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#777080]
                    "
                  >
                    Quantity
                  </span>

                  <div
                    className="
                      flex h-10
                      rounded-[14px]
                      overflow-hidden
                      bg-[#d9d5e2]
                      border border-white/60
                      shadow-[inset_4px_4px_9px_rgba(116,105,130,.18),inset_-4px_-4px_9px_rgba(255,255,255,.72)]
                    "
                  >
                    <button
                      onClick={() =>
                        setQuantity(q =>
                          Math.max(1, q - 1)
                        )
                      }
                      className="
                        w-9
                        flex items-center justify-center
                        text-[#777080]
                        hover:text-[#4d4655]
                        cursor-pointer
                      "
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span
                      className="
                        w-10
                        flex items-center justify-center
                        font-mono
                        text-[11px]
                        text-[#514958]
                        border-x
                        border-white/50
                      "
                    >
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity(q => q + 1)
                      }
                      className="
                        w-9
                        flex items-center justify-center
                        text-[#777080]
                        hover:text-[#4d4655]
                        cursor-pointer
                      "
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">

                  <div className="flex items-center justify-end gap-1.5 text-[9px] font-mono text-[#688a76]">

                    <span className="w-1.5 h-1.5 rounded-full bg-[#688a76]" />

                    {currentStock > 0
                      ? 'IN STOCK'
                      : 'LOW STOCK'}

                  </div>

                  {currentStock > 0 && (
                    <span className="block mt-1 text-[8px] text-[#918995] font-mono">
                      {currentStock} available
                    </span>
                  )}

                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 grid grid-cols-[1fr_1fr_52px] gap-2">

                {/* ADD TO BAG */}
                <button
                  onClick={handleAdd}
                  className={`
                    nikku-clay-button
                    h-[50px]
                    rounded-[16px]
                    font-bold
                    text-[9px]
                    uppercase
                    tracking-[0.13em]
                    flex items-center
                    justify-center
                    gap-2
                    cursor-pointer
                    border
                    ${
                      addedToBag
                        ? `
                          bg-[#a9c0b0]
                          border-white/50
                          text-white
                        `
                        : `
                          bg-[#e7e3eb]
                          border-white/70
                          text-[#504856]
                        `
                    }
                    shadow-[7px_7px_15px_rgba(116,105,130,.24),-6px_-6px_14px_rgba(255,255,255,.8)]
                  `}
                >
                  {addedToBag ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* BUY NOW */}
                <button
                  onClick={handleBuyNow}
                  disabled={buyingNow}
                  className="
                    nikku-clay-button
                    h-[50px]
                    rounded-[16px]
                    bg-[#a794b0]
                    border border-white/30
                    disabled:opacity-60
                    text-white
                    font-bold
                    text-[9px]
                    uppercase
                    tracking-[0.13em]
                    flex items-center
                    justify-center
                    gap-2
                    cursor-pointer
                    shadow-[7px_7px_15px_rgba(116,105,130,.28),-6px_-6px_14px_rgba(255,255,255,.72)]
                  "
                >
                  <Zap className="w-4 h-4 fill-current" />

                  <span>
                    {buyingNow
                      ? 'Processing'
                      : 'Buy Now'}
                  </span>
                </button>

                {/* WISHLIST */}
                <button
                  onClick={() =>
                    toggleWishlist(product.id)
                  }
                  className={`
                    nikku-clay-button
                    h-[50px]
                    rounded-[16px]
                    border
                    flex items-center
                    justify-center
                    cursor-pointer
                    ${
                      isFavorited
                        ? `
                          bg-[#a794b0]
                          border-[#a794b0]
                          text-white
                        `
                        : `
                          bg-[#d9d5e2]
                          border-white/60
                          text-[#6f6678]
                        `
                    }
                    shadow-[7px_7px_15px_rgba(116,105,130,.22),-6px_-6px_14px_rgba(255,255,255,.76)]
                  `}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`
                      w-[18px]
                      h-[18px]
                      ${isFavorited ? 'fill-current' : ''}
                    `}
                  />
                </button>

              </div>

              {/* SECURITY */}
              <div
                className="
                  mt-3
                  flex items-center
                  justify-center gap-2
                  text-[8px]
                  font-mono
                  uppercase
                  tracking-[0.06em]
                  text-[#918995]
                "
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#82768c]" />
                Secure payment · Easy 7-day returns
              </div>

              {/* DETAILS */}
              <div
                className="
                  mt-7
                  rounded-[22px]
                  bg-[#d9d5e2]
                  border border-white/50
                  shadow-[inset_4px_4px_10px_rgba(116,105,130,.12),inset_-4px_-4px_10px_rgba(255,255,255,.65)]
                  overflow-hidden
                "
              >

                {/* DESCRIPTION */}
                <div className="border-b border-white/50">

                  <button
                    onClick={() =>
                      toggleSection('desc')
                    }
                    className="
                      nikku-clay-section
                      w-full
                      px-5
                      py-4
                      flex items-center
                      justify-between
                      text-left
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#5b5263]
                      cursor-pointer
                    "
                  >
                    <span>Product Details</span>

                    {openSection === 'desc' ? (
                      <ChevronUp className="w-4 h-4 text-[#918697]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#918697]" />
                    )}
                  </button>

                  {openSection === 'desc' && (
                    <p className="px-5 pb-5 text-[11px] leading-6 text-[#817888]">
                      {product.description}
                    </p>
                  )}

                </div>

                {/* FABRIC */}
                <div className="border-b border-white/50">

                  <button
                    onClick={() =>
                      toggleSection('fabric')
                    }
                    className="
                      nikku-clay-section
                      w-full
                      px-5
                      py-4
                      flex items-center
                      justify-between
                      text-left
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#5b5263]
                      cursor-pointer
                    "
                  >
                    <span>Material & Care</span>

                    {openSection === 'fabric' ? (
                      <ChevronUp className="w-4 h-4 text-[#918697]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#918697]" />
                    )}
                  </button>

                  {openSection === 'fabric' && (
                    <ul
                      className="
                        px-5 pb-5 pl-9
                        text-[11px]
                        leading-6
                        text-[#817888]
                        list-disc
                      "
                    >
                      {product.fabricCare.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  )}

                </div>

                {/* SHIPPING */}
                <div>

                  <button
                    onClick={() =>
                      toggleSection('shipping')
                    }
                    className="
                      nikku-clay-section
                      w-full
                      px-5
                      py-4
                      flex items-center
                      justify-between
                      text-left
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#5b5263]
                      cursor-pointer
                    "
                  >
                    <span>Delivery & Returns</span>

                    {openSection === 'shipping' ? (
                      <ChevronUp className="w-4 h-4 text-[#918697]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#918697]" />
                    )}
                  </button>

                  {openSection === 'shipping' && (
                    <div
                      className="
                        px-5 pb-5
                        text-[11px]
                        leading-6
                        text-[#817888]
                        space-y-2
                      "
                    >
                      <p>
                        {product.shippingReturns}
                      </p>

                      <p className="text-[#887995]">
                        Flagship store: Station Road,
                        Nawalgarh, Jhunjhunu, Rajasthan.
                        Instant local pickup and doorstep
                        trial also available.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </section>
        </div>
      </div>
    </>
  );
};