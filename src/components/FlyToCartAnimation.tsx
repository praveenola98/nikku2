import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';

export const FlyToCartAnimation: React.FC = function () {
  const { flyItem } = useShop();

  const [active, setActive] = useState(false);

  const [targetPos, setTargetPos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(
    function () {
      if (!flyItem) {
        return;
      }

      const cartIcon = document.getElementById(
        'navbar-cart-button'
      );

      if (cartIcon) {
        const rect =
          cartIcon.getBoundingClientRect();

        setTargetPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      } else {
        setTargetPos({
          x: window.innerWidth - 60,
          y: 40,
        });
      }

      setActive(true);

      const timer = window.setTimeout(
        function () {
          setActive(false);
        },
        760
      );

      return function () {
        window.clearTimeout(timer);
      };
    },
    [flyItem]
  );

  if (!flyItem || !active) {
    return null;
  }

  const startX = flyItem.startPos.x;
  const startY = flyItem.startPos.y;

  const moveX =
    targetPos.x - startX;

  const moveY =
    targetPos.y - startY;

  return (
    <>
      <style>{`

        /* =====================================================
           FLY TO CART
        ===================================================== */

        @keyframes nikkuFlyToCart {

          0% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              translate3d(0, 0, 0)
              scale(0.82)
              rotate(0deg);
          }

          8% {
            opacity: 1;
            transform:
              translate(-50%, -50%)
              translate3d(
                calc(var(--move-x) * 0.04),
                calc(var(--move-y) * 0.04),
                0
              )
              scale(1)
              rotate(-2deg);
          }

          28% {
            opacity: 1;
            transform:
              translate(-50%, -50%)
              translate3d(
                calc(var(--move-x) * 0.28),
                calc(var(--move-y) * 0.28),
                0
              )
              scale(0.9)
              rotate(-4deg);
          }

          55% {
            opacity: 0.94;
            transform:
              translate(-50%, -50%)
              translate3d(
                calc(var(--move-x) * 0.55),
                calc(var(--move-y) * 0.55),
                0
              )
              scale(0.62)
              rotate(4deg);
          }

          78% {
            opacity: 0.78;
            transform:
              translate(-50%, -50%)
              translate3d(
                calc(var(--move-x) * 0.78),
                calc(var(--move-y) * 0.78),
                0
              )
              scale(0.4)
              rotate(7deg);
          }

          94% {
            opacity: 0.45;
            transform:
              translate(-50%, -50%)
              translate3d(
                calc(var(--move-x) * 0.94),
                calc(var(--move-y) * 0.94),
                0
              )
              scale(0.24)
              rotate(9deg);
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              translate3d(
                var(--move-x),
                var(--move-y),
                0
              )
              scale(0.12)
              rotate(12deg);
          }
        }


        /* =====================================================
           SOFT GLOW
        ===================================================== */

        @keyframes nikkuFlyGlow {

          0% {
            opacity: 0;
            transform: scale(0.65);
          }

          15% {
            opacity: 0.8;
          }

          65% {
            opacity: 0.38;
            transform: scale(1.15);
          }

          100% {
            opacity: 0;
            transform: scale(0.7);
          }
        }


        /* =====================================================
           CART PULSE
        ===================================================== */

        @keyframes nikkuCartPulse {

          0% {
            transform: scale(1);
          }

          45% {
            transform: scale(1.13);
          }

          100% {
            transform: scale(1);
          }
        }


        /* =====================================================
           FLY CARD
        ===================================================== */

        .nikku-fly-image {

          animation:
            nikkuFlyToCart
            760ms
            cubic-bezier(.22,.61,.36,1)
            forwards;

          transform-origin: center center;

          will-change:
            transform,
            opacity;

          border-radius: 16px;

          background:
            linear-gradient(
              145deg,
              #f0edf7,
              #d9d3e6
            );

          border:
            1px solid
            rgba(255,255,255,0.75);

          box-shadow:
            12px 12px 28px
            rgba(82,68,112,0.24),

            -10px -10px 24px
            rgba(255,255,255,0.9),

            inset 2px 2px 5px
            rgba(255,255,255,0.75),

            inset -2px -2px 5px
            rgba(188,179,210,0.28);

          overflow: hidden;
        }


        /* =====================================================
           IMAGE
        ===================================================== */

        .nikku-fly-image img {

          filter:
            saturate(0.96)
            contrast(1.02);

          transform: scale(1.01);
        }


        /* =====================================================
           IMAGE GLASS OVERLAY
        ===================================================== */

        .nikku-fly-overlay {

          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.18),
              transparent 42%,
              rgba(91,72,135,0.16)
            );

          pointer-events: none;
        }


        /* =====================================================
           CLAY GLOW
        ===================================================== */

        .nikku-fly-glow {

          position: fixed;

          width: 100px;
          height: 100px;

          left: 0;
          top: 0;

          border-radius: 999px;

          pointer-events: none;

          background:
            radial-gradient(
              circle,
              rgba(134,105,211,0.28) 0%,
              rgba(134,105,211,0.12) 38%,
              transparent 72%
            );

          filter: blur(8px);

          animation:
            nikkuFlyGlow
            760ms
            ease-out
            forwards;

          transform-origin: center;
        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .nikku-fly-image {
            animation-duration: 250ms;
          }

          .nikku-fly-glow {
            animation-duration: 250ms;
          }
        }

      `}</style>


      {/* =====================================================
          FLYING PRODUCT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99997]
          nikku-fly-glow
        "
        style={{
          left: startX,
          top: startY,

          '--move-x': `${moveX}px`,
          '--move-y': `${moveY}px`,
        } as React.CSSProperties}
      />


      {/* =====================================================
          FLYING PRODUCT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99999]
          nikku-fly-image
        "
        style={{
          left: startX,
          top: startY,

          width: 64,
          height: 84,

          '--move-x': `${moveX}px`,
          '--move-y': `${moveY}px`,
        } as React.CSSProperties}
      >

        <img
          src={flyItem.imgSrc}
          alt="Adding to bag"
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Clay glass overlay */}
        <div className="nikku-fly-overlay" />

        {/* Soft highlight */}
        <div
          className="
            absolute
            left-2
            top-2
            h-3
            w-8
            rounded-full
            bg-white/30
            blur-[3px]
          "
        />

      </div>
    </>
  );
};