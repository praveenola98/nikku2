import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    setIsCheckoutOpen
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999;

  const progressToFreeShipping = Math.min(
    100,
    (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const remainingForFree = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cartSubtotal
  );

  const discountAmount =
    appliedPromo === 'NIKKU10'
      ? Math.round(cartSubtotal * 0.1)
      : 0;

  const shippingAmount =
    cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0
      ? 0
      : 150;

  const grandTotal = Math.max(
    0,
    cartSubtotal - discountAmount + shippingAmount
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();

    if (promoInput.trim().toUpperCase() === 'NIKKU10') {
      setAppliedPromo('NIKKU10');
      setPromoError('');
    } else {
      setAppliedPromo(null);
      setPromoError('Invalid promo code. Try NIKKU10 for 10% off.');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
     <style>{`
  /* =========================================================
     NIKKU FASHION — DEEP CLAYMORPHISM CART
  ========================================================= */

  :root {
    --cart-bg: #e8e4f1;
    --cart-surface: #eeeaf6;
    --cart-surface-light: #f5f2fa;
    --cart-surface-dark: #d8d3e5;

    --cart-text: #29253a;
    --cart-muted: #81798f;

    --cart-purple: #8a6bd1;
    --cart-purple-dark: #7052b9;
    --cart-purple-light: #cdbdea;

    --cart-green: #5d9875;
    --cart-red: #b85d68;

    --cart-shadow-dark:
      rgba(83, 73, 105, .24);

    --cart-shadow-light:
      rgba(255, 255, 255, .82);
  }


  /* =========================================================
     ANIMATIONS
  ========================================================= */

  @keyframes cartBackdropIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes cartPanelIn {
    from {
      opacity: 0;
      transform: translateX(55px) scale(.985);
    }

    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes cartItemIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(.985);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes cartSoftFloat {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-2px);
    }
  }

  @keyframes cartGlow {
    0%,
    100% {
      opacity: .35;
    }

    50% {
      opacity: .65;
    }
  }


  /* =========================================================
     BACKDROP
  ========================================================= */

  .cart-backdrop {
    animation:
      cartBackdropIn
      260ms
      ease-out
      both;

    background:
      radial-gradient(
        circle at 85% 40%,
        rgba(142, 111, 210, .18),
        transparent 38%
      ),
      rgba(35, 31, 48, .62) !important;

    backdrop-filter:
      blur(12px)
      saturate(.85);
  }


  /* =========================================================
     MAIN DRAWER
  ========================================================= */

  .cart-panel {
    animation:
      cartPanelIn
      420ms
      cubic-bezier(.22,.61,.36,1)
      both;

    position: relative;

    background:
      linear-gradient(
        145deg,
        var(--cart-surface-light),
        var(--cart-bg)
      ) !important;

    border-left:
      1px solid rgba(255,255,255,.72) !important;

    box-shadow:
      -20px 20px 50px rgba(48, 41, 64, .28),
      12px 0 35px rgba(255,255,255,.28),
      inset 2px 0 0 rgba(255,255,255,.55);

    color: var(--cart-text);

    overflow: hidden;
  }

  /*
    Large soft purple glow inside drawer
  */
  .cart-panel::before {
    content: "";

    position: absolute;

    width: 320px;
    height: 320px;

    top: -150px;
    right: -130px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(160,135,218,.17),
        transparent 68%
      );

    filter: blur(20px);

    pointer-events: none;

    animation:
      cartGlow
      6s
      ease-in-out
      infinite;
  }


  /* =========================================================
     HEADER
  ========================================================= */

  .cart-panel > header {
    position: relative;
    z-index: 5;

    background:
      linear-gradient(
        145deg,
        rgba(245,242,250,.96),
        rgba(231,227,240,.92)
      ) !important;

    border-bottom:
      1px solid rgba(255,255,255,.72) !important;

    box-shadow:
      0 8px 22px rgba(87,77,108,.10),
      inset 0 -1px 0 rgba(255,255,255,.6);
  }


  /* =========================================================
     HEADER ICON
  ========================================================= */

  .cart-panel header .flex.h-9.w-9 {
    border:
      1px solid rgba(255,255,255,.7) !important;

    background:
      linear-gradient(
        145deg,
        #f4f0fa,
        #ded9e9
      ) !important;

    border-radius: 12px !important;

    box-shadow:
      6px 6px 12px rgba(94,83,117,.18),
      -5px -5px 10px rgba(255,255,255,.8),
      inset 1px 1px 0 rgba(255,255,255,.8),
      inset -1px -1px 0 rgba(105,92,129,.08);
  }


  /* =========================================================
     HEADER TEXT
  ========================================================= */

  .cart-panel h2 {
    color: var(--cart-text) !important;
  }

  .cart-panel header p,
  .cart-panel header span {
    color: var(--cart-muted) !important;
  }


  /* =========================================================
     CLOSE BUTTON
  ========================================================= */

  .cart-panel header button {
    position: relative;

    border:
      1px solid rgba(255,255,255,.75) !important;

    background:
      linear-gradient(
        145deg,
        #f4f1f9,
        #ded9e9
      ) !important;

    color: #777084 !important;

    border-radius: 12px !important;

    box-shadow:
      6px 6px 13px rgba(87,76,108,.18),
      -5px -5px 11px rgba(255,255,255,.82),
      inset 1px 1px 0 rgba(255,255,255,.85);

    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      color 180ms ease;
  }

  .cart-panel header button:hover {
    transform: translateY(-2px);

    color: var(--cart-purple-dark) !important;

    box-shadow:
      8px 8px 17px rgba(87,76,108,.22),
      -6px -6px 13px rgba(255,255,255,.86);
  }

  .cart-panel header button:active {
    transform: translateY(1px);

    box-shadow:
      inset 5px 5px 10px rgba(96,84,119,.18),
      inset -4px -4px 9px rgba(255,255,255,.75);
  }


  /* =========================================================
     SHIPPING PROGRESS
  ========================================================= */

  .cart-panel header .h-\[4px\] {
    height: 9px !important;

    border:
      1px solid rgba(255,255,255,.65);

    background:
      #d8d3e5 !important;

    border-radius: 999px !important;

    box-shadow:
      inset 4px 4px 8px rgba(102,91,124,.15),
      inset -3px -3px 7px rgba(255,255,255,.7);
  }

  .cart-panel header .h-\[4px\] > div {
    background:
      linear-gradient(
        90deg,
        #7355bc,
        #a084dc
      ) !important;

    box-shadow:
      2px 2px 5px rgba(91,69,146,.25),
      inset 1px 1px 2px rgba(255,255,255,.3);

    transition:
      width 500ms cubic-bezier(.22,.61,.36,1);
  }


  /* =========================================================
     FREE SHIPPING SUCCESS
  ========================================================= */

  .cart-panel .text-green-600 {
    color: var(--cart-green) !important;
  }


  /* =========================================================
     CART SCROLL AREA
  ========================================================= */

  .cart-scroll {
    position: relative;

    background:
      linear-gradient(
        145deg,
        #e8e4f1,
        #ebe7f3
      );
  }

  .cart-scroll::-webkit-scrollbar {
    width: 7px;
  }

  .cart-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .cart-scroll::-webkit-scrollbar-thumb {
    background:
      linear-gradient(
        180deg,
        #c4bbd8,
        #aaa0c1
      );

    border-radius: 999px;

    border:
      2px solid transparent;

    background-clip: padding-box;
  }


  /* =========================================================
     EMPTY CART
  ========================================================= */

  .cart-scroll .h-16.w-16 {
    border:
      1px solid rgba(255,255,255,.75) !important;

    background:
      linear-gradient(
        145deg,
        #f1eef8,
        #dcd7e8
      ) !important;

    box-shadow:
      10px 10px 20px rgba(89,78,112,.18),
      -8px -8px 17px rgba(255,255,255,.82),
      inset 2px 2px 0 rgba(255,255,255,.65),
      inset -2px -2px 0 rgba(94,81,119,.08);
  }


  /* =========================================================
     EMPTY CART BUTTON
  ========================================================= */

  .cart-scroll button.bg-gray-950 {
    background:
      linear-gradient(
        145deg,
        #9a7cda,
        #7557bd
      ) !important;

    color: #fff !important;

    border:
      1px solid rgba(255,255,255,.28);

    border-radius: 14px !important;

    box-shadow:
      8px 8px 17px rgba(81,62,128,.25),
      -6px -6px 13px rgba(255,255,255,.55),
      inset 1px 1px 0 rgba(255,255,255,.25);
  }

  .cart-scroll button.bg-gray-950:hover {
    background:
      linear-gradient(
        145deg,
        #a486df,
        #7b5dc2
      ) !important;

    transform: translateY(-2px);
  }


  /* =========================================================
     PRODUCT CARD
  ========================================================= */

  .cart-item {
    position: relative;

    border:
      1px solid rgba(255,255,255,.75) !important;

    background:
      linear-gradient(
        145deg,
        #f2eff8,
        #e2ddeb
      ) !important;

    border-radius: 20px !important;

    box-shadow:
      10px 10px 20px rgba(91,80,113,.18),
      -8px -8px 17px rgba(255,255,255,.78),
      inset 1px 1px 0 rgba(255,255,255,.65),
      inset -1px -1px 0 rgba(102,91,127,.06);

    transition:
      transform 200ms ease,
      box-shadow 200ms ease,
      border-color 200ms ease;
  }

  .cart-item:hover {
    transform: translateY(-2px);

    border-color:
      rgba(164,141,216,.38) !important;

    box-shadow:
      13px 13px 24px rgba(91,80,113,.21),
      -9px -9px 19px rgba(255,255,255,.82),
      inset 1px 1px 0 rgba(255,255,255,.72);
  }


  /* =========================================================
     PRODUCT IMAGE FRAME
  ========================================================= */

  .cart-item .relative.h-\[96px\] {
    border:
      1px solid rgba(255,255,255,.72);

    border-radius: 15px !important;

    background:
      #ddd8e7 !important;

    box-shadow:
      inset 5px 5px 10px rgba(93,81,119,.15),
      inset -5px -5px 10px rgba(255,255,255,.72),
      4px 4px 8px rgba(87,76,106,.09);

    padding: 3px;
  }

  .cart-image {
    border-radius: 12px;

    transition:
      transform 400ms cubic-bezier(.22,.61,.36,1),
      filter 300ms ease;
  }

  .cart-item:hover .cart-image {
    transform: scale(1.045);
    filter: saturate(1.04);
  }


  /* =========================================================
     PRODUCT TITLE
  ========================================================= */

  .cart-item h3 {
    color: var(--cart-text) !important;
  }


  /* =========================================================
     PRODUCT META
  ========================================================= */

  .cart-item .text-gray-500 {
    color: var(--cart-muted) !important;
  }

  .cart-item .text-gray-300 {
    color: #b5aec2 !important;
  }


  /* =========================================================
     COLOR DOT
  ========================================================= */

  .cart-item .h-2\.5.w-2\.5 {
    border:
      2px solid rgba(255,255,255,.8) !important;

    box-shadow:
      2px 2px 5px rgba(71,62,91,.2),
      -1px -1px 3px rgba(255,255,255,.7);
  }


  /* =========================================================
     REMOVE BUTTON
  ========================================================= */

  .cart-remove {
    border-radius: 10px !important;

    transition:
      transform 160ms ease,
      background 160ms ease,
      color 160ms ease,
      box-shadow 160ms ease;
  }

  .cart-remove:hover {
    background:
      linear-gradient(
        145deg,
        #f1dfe3,
        #e5cbd0
      ) !important;

    color:
      var(--cart-red) !important;

    transform: translateY(-1px);

    box-shadow:
      4px 4px 8px rgba(128,80,89,.13),
      -3px -3px 7px rgba(255,255,255,.7);
  }

  .cart-remove:active {
    transform: translateY(1px);

    box-shadow:
      inset 3px 3px 7px rgba(126,79,88,.14);
  }


  /* =========================================================
     QUANTITY CONTROL
  ========================================================= */

  .cart-item .h-7 {
    border:
      1px solid rgba(255,255,255,.72) !important;

    background:
      linear-gradient(
        145deg,
        #e1dce9,
        #f0edf6
      ) !important;

    border-radius: 11px !important;

    box-shadow:
      inset 4px 4px 8px rgba(92,81,116,.13),
      inset -4px -4px 8px rgba(255,255,255,.76);
  }

  .cart-control {
    border-radius: 9px;

    color: #766e83 !important;

    transition:
      background 150ms ease,
      color 150ms ease,
      transform 150ms ease;
  }

  .cart-control:hover {
    background:
      rgba(255,255,255,.55) !important;

    color:
      var(--cart-purple-dark) !important;
  }

  .cart-control:active {
    transform: scale(.88);
  }


  /* =========================================================
     PRICE
  ========================================================= */

  .cart-item .text-gray-950 {
    color: var(--cart-text) !important;
  }


  /* =========================================================
     FOOTER
  ========================================================= */

  .cart-panel > footer {
    position: relative;
    z-index: 5;

    background:
      linear-gradient(
        145deg,
        #f0edf6,
        #e4dfed
      ) !important;

    border-top:
      1px solid rgba(255,255,255,.75) !important;

    box-shadow:
      0 -9px 23px rgba(86,76,107,.12),
      inset 0 1px 0 rgba(255,255,255,.7);
  }


  /* =========================================================
     PROMO INPUT
  ========================================================= */

  .cart-input {
    border:
      1px solid rgba(255,255,255,.78) !important;

    background:
      linear-gradient(
        145deg,
        #ddd8e8,
        #eeeaf5
      ) !important;

    color:
      var(--cart-text) !important;

    border-radius: 13px !important;

    box-shadow:
      inset 5px 5px 10px rgba(91,80,113,.13),
      inset -5px -5px 10px rgba(255,255,255,.75);

    transition:
      box-shadow 180ms ease,
      border-color 180ms ease;
  }

  .cart-input:focus {
    border-color:
      rgba(137,106,207,.48) !important;

    box-shadow:
      inset 5px 5px 10px rgba(91,80,113,.12),
      inset -5px -5px 10px rgba(255,255,255,.72),
      0 0 0 3px rgba(138,107,209,.11) !important;
  }

  .cart-input::placeholder {
    color: #9b94a7 !important;
  }


  /* =========================================================
     APPLY PROMO
  ========================================================= */

  .cart-panel form button {
    border:
      1px solid rgba(255,255,255,.78) !important;

    background:
      linear-gradient(
        145deg,
        #f1eef7,
        #ddd8e8
      ) !important;

    color:
      #665e74 !important;

    border-radius: 13px !important;

    box-shadow:
      6px 6px 12px rgba(87,76,108,.15),
      -5px -5px 10px rgba(255,255,255,.78),
      inset 1px 1px 0 rgba(255,255,255,.7);

    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      color 160ms ease;
  }

  .cart-panel form button:hover {
    color:
      var(--cart-purple-dark) !important;

    transform: translateY(-1px);

    box-shadow:
      8px 8px 15px rgba(87,76,108,.18),
      -6px -6px 12px rgba(255,255,255,.82);
  }

  .cart-panel form button:active {
    transform: translateY(1px);

    box-shadow:
      inset 4px 4px 8px rgba(87,76,108,.14),
      inset -3px -3px 7px rgba(255,255,255,.7);
  }


  /* =========================================================
     PROMO SUCCESS
  ========================================================= */

  .cart-panel .text-green-600 {
    color:
      var(--cart-green) !important;
  }


  /* =========================================================
     PROMO ERROR
  ========================================================= */

  .cart-panel .text-red-500 {
    color:
      var(--cart-red) !important;
  }


  /* =========================================================
     SUMMARY
  ========================================================= */

  .cart-panel footer .border-t {
    border-color:
      rgba(255,255,255,.72) !important;
  }

  .cart-panel footer .text-gray-500 {
    color:
      var(--cart-muted) !important;
  }

  .cart-panel footer .text-gray-800 {
    color:
      #4b4559 !important;
  }


  /* =========================================================
     TOTAL
  ========================================================= */

  .cart-panel footer .text-\[18px\] {
    color:
      var(--cart-purple-dark) !important;

    text-shadow:
      1px 1px 0 rgba(255,255,255,.65);
  }


  /* =========================================================
     CHECKOUT BUTTON
  ========================================================= */

  .cart-checkout {
    position: relative;
    overflow: hidden;

    border:
      1px solid rgba(255,255,255,.35) !important;

    border-radius: 16px !important;

    background:
      linear-gradient(
        145deg,
        #9c7ddd,
        #7455bc
      ) !important;

    color:
      #ffffff !important;

    box-shadow:
      10px 10px 20px rgba(78,59,125,.28),
      -7px -7px 15px rgba(255,255,255,.56),
      inset 2px 2px 0 rgba(255,255,255,.25),
      inset -2px -2px 5px rgba(70,49,117,.2);

    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      filter 180ms ease;
  }

  .cart-checkout::after {
    content: "";

    position: absolute;

    top: -100%;
    left: -45%;

    width: 35%;
    height: 300%;

    transform: rotate(25deg) translateX(-220%);

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.3),
        transparent
      );

    transition:
      transform 650ms cubic-bezier(.22,.61,.36,1);

    pointer-events: none;
  }

  .cart-checkout:hover {
    transform: translateY(-3px);

    filter: brightness(1.05);

    box-shadow:
      13px 13px 25px rgba(78,59,125,.32),
      -8px -8px 17px rgba(255,255,255,.62),
      inset 2px 2px 0 rgba(255,255,255,.3),
      inset -2px -2px 6px rgba(70,49,117,.22);
  }

  .cart-checkout:hover::after {
    transform:
      rotate(25deg)
      translateX(520%);
  }

  .cart-checkout:active {
    transform: translateY(1px);

    box-shadow:
      inset 7px 7px 14px rgba(65,47,108,.28),
      inset -5px -5px 10px rgba(255,255,255,.2);
  }

  .cart-checkout > * {
    position: relative;
    z-index: 2;
  }


  /* =========================================================
     SECURITY LABEL
  ========================================================= */

  .cart-panel footer .text-gray-400 {
    color:
      #958da2 !important;
  }

  .cart-panel footer .text-gray-500 svg {
    color:
      var(--cart-purple) !important;
  }


  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 640px) {

    .cart-panel {
      width: 100% !important;

      border-left: 0 !important;

      border-radius:
        24px 0 0 24px;
    }

    .cart-item {
      border-radius: 17px !important;
    }

    .cart-scroll {
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    .cart-panel > footer {
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    .cart-item .relative.h-\[96px\] {
      width: 72px !important;
      height: 90px !important;
    }
  }


  /* =========================================================
     SMALL PHONES
  ========================================================= */

  @media (max-width: 380px) {

    .cart-panel {
      border-radius: 20px 0 0 20px;
    }

    .cart-panel header > div {
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    .cart-item {
      gap: 9px !important;
      padding: 9px !important;
      border-radius: 15px !important;
    }

    .cart-item .relative.h-\[96px\] {
      width: 64px !important;
      height: 82px !important;
    }

    .cart-item h3 {
      font-size: 11px !important;
    }

    .cart-item .text-\[14px\] {
      font-size: 13px !important;
    }

    .cart-checkout {
      height: 48px !important;
      border-radius: 14px !important;
    }
  }


  /* =========================================================
     TABLET
  ========================================================= */

  @media (min-width: 641px) and (max-width: 1024px) {

    .cart-panel {
      max-width: 460px !important;
    }
  }


  /* =========================================================
     LARGE DESKTOP
  ========================================================= */

  @media (min-width: 1536px) {

    .cart-panel {
      max-width: 470px !important;
    }

    .cart-item {
      border-radius: 21px !important;
    }
  }


  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {

    .cart-backdrop,
    .cart-panel,
    .cart-item,
    .cart-panel::before {
      animation: none !important;
    }

    .cart-image,
    .cart-control,
    .cart-remove,
    .cart-checkout,
    .cart-input,
    .cart-panel header button {
      transition: none !important;
    }
  }
`}</style>

      <div
        className="
          cart-backdrop
          fixed inset-0
          z-[120]
          bg-black/40
        "
        onClick={() => setIsCartOpen(false)}
      >
        <div
          className="
            cart-panel
            ml-auto
            flex
            h-full
            w-full
            flex-col
            border-l
            border-gray-200
            bg-white
            shadow-[-18px_0_50px_rgba(0,0,0,.12)]
            sm:max-w-[440px]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* ================= HEADER ================= */}

          <header className="shrink-0 border-b border-gray-200 bg-white">
            <div className="flex pt-26 items-center justify-between px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9 w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                  "
                >
                  <ShoppingBag className="h-[17px] w-[17px] text-gray-800" />
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-[15px] font-semibold tracking-tight text-gray-950">
                      Your Cart
                    </h2>

                    <span className="text-[11px] text-gray-500">
                      {cartCount}{' '}
                      {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] text-gray-500">
                    Nikku Fashion Nawalgarh
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="
                  flex
                  h-9 w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-gray-500
                  transition-colors
                  hover:bg-gray-50
                  hover:text-gray-900
                "
                aria-label="Close cart"
              >
                <X className="h-[17px] w-[17px]" />
              </button>
            </div>

            {/* ================= SHIPPING PROGRESS ================= */}

            {cart.length > 0 && (
              <div className="px-5 pb-4 sm:px-6">
                <div className="mb-2 flex items-center justify-between">
                  {remainingForFree === 0 ? (
                    <span className="text-[11px] font-medium text-green-600">
                      Free shipping unlocked
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-500">
                      Add{' '}
                      <span className="font-medium text-gray-900">
                        ₹{remainingForFree.toLocaleString('en-IN')}
                      </span>{' '}
                      for free shipping
                    </span>
                  )}

                  <span className="text-[10px] text-gray-400">
                    {Math.round(progressToFreeShipping)}%
                  </span>
                </div>

                <div className="h-[4px] w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gray-900
                      transition-[width]
                      duration-500
                      ease-out
                    "
                    style={{
                      width: `${progressToFreeShipping}%`
                    }}
                  />
                </div>
              </div>
            )}
          </header>

          {/* ================= CART CONTENT ================= */}

          <div className="cart-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            {cart.length === 0 ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">
                <div
                  className="
                    mb-5
                    flex
                    h-16 w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                  "
                >
                  <ShoppingBag className="h-6 w-6 text-gray-400" />
                </div>

                <h3 className="text-[15px] font-semibold text-gray-900">
                  Your cart is empty
                </h3>

                <p className="mt-2 max-w-[260px] text-[12px] leading-5 text-gray-500">
                  Discover denim, heavyweight tees, jackets
                  and everyday essentials from Nikku Fashion.
                </p>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="
                    mt-6
                    cursor-pointer
                    rounded-md
                    bg-gray-950
                    px-6 py-3
                    text-[11px]
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-gray-800
                  "
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item, idx) => {
                  const matchedVariant = item.product.variants?.find(
                    (v) =>
                      v.colorName.toLowerCase() ===
                      item.selectedColor.name.toLowerCase()
                  );

                  const displayImg =
                    matchedVariant?.images?.[0] ||
                    item.product.images[0];

                  const price =
                    item.unitPrice || item.product.price;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}-${idx}`}
                      className="
                        cart-item
                        group
                        flex
                        gap-3.5
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        p-3
                      "
                    >
                      {/* PRODUCT IMAGE */}

                      <div
                        className="
                          relative
                          h-[96px]
                          w-[78px]
                          shrink-0
                          overflow-hidden
                          rounded-md
                          bg-gray-100
                        "
                      >
                        <img
                          src={displayImg}
                          alt={item.product.name}
                          className="
                            cart-image
                            h-full
                            w-full
                            object-cover
                            object-top
                          "
                        />
                      </div>

                      {/* PRODUCT DETAILS */}

                      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-start gap-2">
                            <h3 className="line-clamp-2 text-[12px] font-semibold leading-4 text-gray-900">
                              {item.product.name}
                            </h3>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.selectedSize
                                )
                              }
                              className="
                                cart-remove
                                ml-auto
                                flex
                                h-6 w-6
                                shrink-0
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-md
                                text-gray-400
                              "
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-[13px] w-[13px]" />
                            </button>
                          </div>

                          <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-500">
                            <span
                              className="
                                h-2.5 w-2.5
                                shrink-0
                                rounded-full
                                border
                                border-gray-200
                              "
                              style={{
                                backgroundColor:
                                  item.selectedColor.hex
                              }}
                            />

                            <span>
                              {item.selectedColor.name}
                            </span>

                            <span className="text-gray-300">
                              /
                            </span>

                            <span>
                              Size {item.selectedSize}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-end justify-between gap-3">
                          <div>
                            <span className="text-[14px] font-semibold text-gray-950">
                              ₹
                              {(
                                price * item.quantity
                              ).toLocaleString('en-IN')}
                            </span>

                            {item.quantity > 1 && (
                              <span className="mt-0.5 block text-[9px] text-gray-400">
                                ₹{price.toLocaleString('en-IN')} each
                              </span>
                            )}
                          </div>

                          {/* QUANTITY */}

                          <div
                            className="
                              flex
                              h-7
                              items-center
                              overflow-hidden
                              rounded-md
                              border
                              border-gray-200
                              bg-gray-50
                            "
                          >
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.selectedSize,
                                  -1
                                )
                              }
                              className="
                                cart-control
                                flex
                                h-full w-7
                                cursor-pointer
                                items-center
                                justify-center
                                text-gray-500
                              "
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>

                            <span className="w-7 text-center text-[10px] font-medium text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.selectedSize,
                                  1
                                )
                              }
                              className="
                                cart-control
                                flex
                                h-full w-7
                                cursor-pointer
                                items-center
                                justify-center
                                text-gray-500
                              "
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
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

          {/* ================= FOOTER ================= */}

          {cart.length > 0 && (
            <footer className="shrink-0 border-t border-gray-200 bg-white px-5 pb-5 pt-4 sm:px-6">
              
              {/* PROMO */}

              <form
                onSubmit={handleApplyPromo}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <Tag
                    className="
                      absolute
                      left-3
                      top-1/2
                      h-3.5 w-3.5
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);

                      if (promoError) {
                        setPromoError('');
                      }
                    }}
                    placeholder="Promo code"
                    className="
                      cart-input
                      h-10
                      w-full
                      rounded-md
                      border
                      border-gray-200
                      bg-gray-50
                      pl-9 pr-3
                      text-[11px]
                      uppercase
                      tracking-wide
                      text-gray-900
                      outline-none
                      placeholder:text-gray-400
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    h-10
                    cursor-pointer
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-4
                    text-[10px]
                    font-semibold
                    text-gray-700
                    transition-colors
                    hover:bg-gray-50
                    hover:text-gray-950
                  "
                >
                  APPLY
                </button>
              </form>

              {appliedPromo && (
                <p className="mt-2 text-[10px] font-medium text-green-600">
                  NIKKU10 applied — 10% discount
                </p>
              )}

              {promoError && (
                <p className="mt-2 text-[10px] text-red-500">
                  {promoError}
                </p>
              )}

              {/* SUMMARY */}

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-[12px] text-gray-500">
                  <span>Subtotal</span>

                  <span className="font-medium text-gray-800">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[12px] text-green-600">
                    <span>Discount</span>

                    <span className="font-medium">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[12px] text-gray-500">
                  <span>Shipping</span>

                  <span className="font-medium text-gray-800">
                    {shippingAmount === 0
                      ? 'FREE'
                      : `₹${shippingAmount}`}
                  </span>
                </div>

                <div className="mt-2 flex items-end justify-between border-t border-gray-100 pt-3">
                  <div>
                    <span className="block text-[10px] text-gray-400">
                      Total
                    </span>

                    <span className="mt-0.5 block text-[14px] font-semibold text-gray-950">
                      Estimated total
                    </span>
                  </div>

                  <span className="text-[18px] font-semibold text-gray-950">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                onClick={handleCheckout}
                className="
                  cart-checkout
                  mt-4
                  flex
                  h-[50px]
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  gap-3
                  rounded-md
                  bg-gray-950
                  text-[11px]
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                <span>Proceed to Checkout</span>

                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-gray-500" />

                <span>
                  Secure checkout · encrypted payment
                </span>
              </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};