import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = function () {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [trailPos, setTrailPos] = useState({
    x: -100,
    y: -100,
  });

  const [cursorType, setCursorType] = useState<
    'default' | 'hover' | 'view'
  >('default');

  const [isVisible, setIsVisible] = useState(false);

  useEffect(function () {
    const isTouch = window.matchMedia(
      '(pointer: coarse)'
    ).matches;

    if (isTouch) {
      return;
    }

    let animationFrame: number;

    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = function (
      event: MouseEvent
    ) {
      setIsVisible(true);

      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const target =
        event.target as HTMLElement | null;

      if (!target) {
        return;
      }

      const isViewable = target.closest(
        '[data-cursor="view"]'
      );

      const isClickable = target.closest(
        'button, a, input, select, textarea, [role="button"], label, .clickable'
      );

      if (isViewable) {
        setCursorType('view');
      } else if (isClickable) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = function () {
      setIsVisible(false);
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      {
        passive: true,
      }
    );

    document.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    const animate = function () {
      currentX +=
        (position.x - currentX) * 0.14;

      currentY +=
        (position.y - currentY) * 0.14;

      setTrailPos({
        x: currentX,
        y: currentY,
      });

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return function () {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      document.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );

      cancelAnimationFrame(animationFrame);
    };
  }, [position.x, position.y]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .clay-cursor-dot {
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: #6f55b8;
            box-shadow:
              2px 2px 5px rgba(93, 78, 130, 0.28),
              -1px -1px 3px rgba(255, 255, 255, 0.9);
          }

          .clay-cursor-trail {
            position: fixed;
            left: 0;
            top: 0;
            pointer-events: none;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9998;
            will-change: transform, width, height;
          }

          .clay-cursor-default {
            width: 28px;
            height: 28px;
            border: 1px solid rgba(112, 86, 184, 0.22);
            background: rgba(236, 232, 245, 0.42);

            box-shadow:
              4px 4px 10px rgba(91, 76, 125, 0.18),
              -4px -4px 10px rgba(255, 255, 255, 0.88),
              inset 1px 1px 3px rgba(255, 255, 255, 0.55);

            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          .clay-cursor-hover {
            width: 42px;
            height: 42px;
            border: 1px solid rgba(112, 86, 184, 0.35);
            background: rgba(231, 225, 243, 0.82);

            box-shadow:
              6px 6px 14px rgba(91, 76, 125, 0.22),
              -6px -6px 14px rgba(255, 255, 255, 0.95),
              inset 1px 1px 4px rgba(255, 255, 255, 0.65);

            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .clay-cursor-view {
            width: 72px;
            height: 72px;

            border: 1px solid rgba(112, 86, 184, 0.32);

            background:
              radial-gradient(
                circle at 30% 25%,
                rgba(255,255,255,0.96),
                rgba(236,231,247,0.94) 48%,
                rgba(218,211,235,0.96)
              );

            color: #51417d;

            box-shadow:
              10px 10px 24px rgba(85, 70, 118, 0.24),
              -10px -10px 24px rgba(255, 255, 255, 0.95),
              inset 2px 2px 5px rgba(255, 255, 255, 0.72),
              inset -2px -2px 5px rgba(191, 181, 216, 0.35);

            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }

          .clay-cursor-view::before {
            content: "";
            position: absolute;
            width: 48px;
            height: 48px;
            border-radius: 999px;

            box-shadow:
              inset 3px 3px 7px rgba(188, 178, 214, 0.38),
              inset -3px -3px 7px rgba(255, 255, 255, 0.72);

            opacity: 0.7;
          }

          .clay-cursor-view-text {
            position: relative;
            z-index: 2;

            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;

            text-shadow:
              1px 1px 2px rgba(255,255,255,0.8);
          }

          @media (prefers-reduced-motion: reduce) {
            .clay-cursor-trail {
              transition: none !important;
            }
          }
        `}
      </style>

      {/* Precise cursor dot */}
      <div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          md:block
        "
        style={{
          transform: `
            translate3d(
              ${position.x}px,
              ${position.y}px,
              0
            )
            translate(-50%, -50%)
          `,
          opacity:
            cursorType === 'view' ? 0 : 1,
          transition:
            'opacity 180ms ease',
        }}
      >
        <div className="clay-cursor-dot" />
      </div>

      {/* Claymorphism trailing cursor */}
      <div
        className={`
          clay-cursor-trail
          hidden
          md:flex

          transition-all
          duration-300
          ease-out

          ${
            cursorType === 'view'
              ? 'clay-cursor-view'
              : cursorType === 'hover'
              ? 'clay-cursor-hover'
              : 'clay-cursor-default'
          }
        `}
        style={{
          transform: `
            translate3d(
              ${trailPos.x}px,
              ${trailPos.y}px,
              0
            )
            translate(-50%, -50%)
          `,
        }}
      >
        {cursorType === 'view' && (
          <span className="clay-cursor-view-text">
            VIEW
          </span>
        )}
      </div>
    </>
  );
};