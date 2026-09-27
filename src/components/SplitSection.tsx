import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSETS } from '../data/products';

export const SplitSection: React.FC = () => {
  const { openCatalog } = useShop();

  return (
    <section className="split-section relative w-full overflow-hidden bg-[#090909] py-16 sm:py-24">
      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">

        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.32em] text-[#c5a880]">
              THE NIKKU EDIT
            </p>

            <h2 className="font-['Syne'] text-2xl font-semibold uppercase tracking-[-0.02em] text-[#f4f2ee] sm:text-3xl lg:text-4xl">
              TWO WAYS TO WEAR IT
            </h2>
          </div>

          <p className="hidden max-w-xs text-right text-[11px] leading-relaxed text-white/40 sm:block">
            Distinct silhouettes. Everyday confidence.
          </p>
        </div>

        {/* Main split */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

          {/* ================= MEN ================= */}
          <article
            onClick={() => openCatalog('men')}
            className="split-panel group relative h-[520px] cursor-pointer overflow-hidden rounded-[6px] bg-[#141414] sm:h-[600px] lg:h-[680px]"
          >
            <img
              src={ASSETS.denimJacketShoot}
              alt="Men's Collection"
              className="split-image absolute inset-0 h-full w-full object-cover object-top"
            />

            <div className="split-image-overlay absolute inset-0" />

            {/* Top label */}
            <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/70">
                01
              </span>

              <span className="text-[9px] uppercase tracking-[0.25em] text-white/45">
                MEN
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 lg:p-10">

              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c5a880]">
                FALL / WINTER EDIT
              </p>

              <h3 className="font-['Syne'] text-4xl font-bold uppercase leading-[0.9] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                MEN'S
                <br />
                COLLECTION
              </h3>

              <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/65 sm:text-sm">
                Modern essentials built around structured denim,
                relaxed silhouettes and everyday streetwear.
              </p>

              <button
                type="button"
                className="split-button mt-6 inline-flex items-center gap-3 border border-white/35 bg-transparent px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
              >
                <span className="split-button-fill absolute inset-0 -z-0 translate-y-full bg-white" />

                <span className="relative z-10 split-button-text">
                  Explore Men
                </span>

                <ArrowRight
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

            </div>
          </article>

          {/* ================= WOMEN ================= */}
          <article
            onClick={() => openCatalog('women')}
            className="split-panel group relative h-[520px] cursor-pointer overflow-hidden rounded-[6px] bg-[#141414] sm:h-[600px] lg:h-[680px]"
          >
            <img
              src={ASSETS.womenCropShoot}
              alt="Women's Collection"
              className="split-image absolute inset-0 h-full w-full object-cover object-top"
            />

            <div className="split-image-overlay absolute inset-0" />

            {/* Top label */}
            <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/70">
                02
              </span>

              <span className="text-[9px] uppercase tracking-[0.25em] text-white/45">
                WOMEN
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 lg:p-10">

              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c5a880]">
                CONTEMPORARY EDIT
              </p>

              <h3 className="font-['Syne'] text-4xl font-bold uppercase leading-[0.9] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                WOMEN'S
                <br />
                COLLECTION
              </h3>

              <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/65 sm:text-sm">
                Contemporary pieces designed around effortless
                proportions, denim and modern everyday dressing.
              </p>

              <button
                type="button"
                className="split-button split-button-women relative mt-6 inline-flex items-center gap-3 overflow-hidden border border-white bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black"
              >
                <span className="split-button-fill absolute inset-0 -z-0 translate-y-full bg-[#c5a880]" />

                <span className="relative z-10 split-button-text">
                  Explore Women
                </span>

                <ArrowRight
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

            </div>
          </article>

        </div>
      </div>

      <style>{`
        .split-panel {
          isolation: isolate;
          transform: translateZ(0);
        }

        /* Image */
        .split-image {
          will-change: transform;
          filter:
            brightness(.86)
            contrast(1.04)
            saturate(.94);
          transform: scale(1.01);
          transition:
            transform 1400ms cubic-bezier(.22,.61,.36,1),
            filter 700ms ease;
        }

        .split-panel:hover .split-image {
          transform: scale(1.065);
          filter:
            brightness(.92)
            contrast(1.04)
            saturate(1);
        }

        /* Bottom cinematic fade */
        .split-image-overlay {
          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,.04) 0%,
              rgba(0,0,0,.04) 32%,
              rgba(0,0,0,.28) 58%,
              rgba(0,0,0,.86) 100%
            );
        }

        /* Fine image sweep */
        .split-panel::before {
          content: '';
          position: absolute;
          z-index: 5;
          inset: 0;
          pointer-events: none;

          background:
            linear-gradient(
              105deg,
              transparent 38%,
              rgba(255,255,255,.07) 50%,
              transparent 62%
            );

          transform: translateX(-120%);
          transition:
            transform 1200ms cubic-bezier(.22,.61,.36,1);
        }

        .split-panel:hover::before {
          transform: translateX(120%);
        }

        /* Clean border */
        .split-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 6px;
          transition:
            border-color 400ms ease;
        }

        .split-panel:hover::after {
          border-color: rgba(197,168,128,.45);
        }

        /* Button */
        .split-button {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            border-color 350ms ease,
            color 350ms ease;
        }

        .split-button-fill {
          transition:
            transform 450ms cubic-bezier(.22,.61,.36,1);
        }

        .split-button:hover .split-button-fill {
          transform: translateY(0);
        }

        .split-button:hover .split-button-text {
          color: #090909;
        }

        .split-button:hover {
          border-color: #fff;
        }

        .split-button-women:hover {
          border-color: #c5a880;
        }

        /* Slight content lift */
        .split-panel > div:last-child {
          transition:
            transform 500ms cubic-bezier(.22,.61,.36,1);
        }

        .split-panel:hover > div:last-child {
          transform: translateY(-5px);
        }

        @media (max-width: 640px) {
          .split-panel {
            height: 500px;
          }

          .split-panel > div:last-child {
            transform: none !important;
          }

          .split-image {
            transform: scale(1.01);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .split-image,
          .split-panel::before,
          .split-panel::after,
          .split-button,
          .split-button-fill,
          .split-panel > div:last-child {
            transition: none !important;
          }

          .split-panel:hover .split-image {
            transform: none;
          }

          .split-panel:hover::before {
            transform: translateX(-120%);
          }

          .split-panel:hover > div:last-child {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};