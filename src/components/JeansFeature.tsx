import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { DENIM_FITS, ASSETS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const JeansFeature: React.FC = () => {
  const { openCatalog } = useShop();
  const [selectedFit, setSelectedFit] = useState('Straight');

  return (
    <section className="jeans-feature relative w-full min-h-[640px] lg:min-h-[720px] bg-[#080808] flex items-center overflow-hidden border-t border-white/[0.08] select-none py-16 lg:py-0">

      {/* Background Photoshoot */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        <img
          src={ASSETS.denimBannerSpread}
          alt="Denim That Moves"
          className="
            jeans-background
            absolute inset-0
            w-full h-full
            object-cover object-center
            filter
            brightness-[0.76]
            contrast-[1.08]
            saturate-[0.92]
            transition-transform duration-[1800ms]
            ease-out
          "
        />

        {/* Main readability gradient */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#080808]/95
            via-[#080808]/78
            to-transparent
            w-full lg:w-[68%]
          "
        />

        {/* Bottom cinematic fade */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#080808]
            via-transparent
            to-[#080808]/45
          "
        />

        {/* Subtle right-side vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 65% 45%, transparent 0%, rgba(0,0,0,0.08) 48%, rgba(0,0,0,0.38) 100%)'
          }}
        />

        {/* Moving light texture */}
        <div className="absolute inset-0 denim-sheen pointer-events-none" />
      </div>

      {/* Editorial vertical marker */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 opacity-50">
        <span
          className="text-[8px] tracking-[0.35em] text-white uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          NIKKU DENIM
        </span>

        <span className="w-px h-16 bg-white/20" />

        <span className="text-[8px] tracking-[0.2em] text-[#c5a880]">
          026
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full">

        <div className="max-w-xl">

          {/* Eyebrow */}
          <div
            className="
              jeans-content-reveal
              flex items-center gap-3 mb-4
            "
          >
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#c5a880]">
              RAW INDIGO &amp; SELVEDGE
            </span>

            <span className="w-8 h-px bg-white/25" />
          </div>

          {/* Main Heading */}
          <h2
            className="
              jeans-content-reveal
              font-['Syne']
              text-4xl sm:text-6xl lg:text-7xl
              font-extrabold
              uppercase
              text-white
              tracking-tight
              leading-[0.9]
              mb-6
            "
          >
            DENIM
            <br />
            THAT MOVES
            <br />
            <span className="text-stone-300">WITH YOU</span>
          </h2>

          {/* Description */}
          <div className="space-y-2 mb-8">

            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
              FIT. COMFORT. CONFIDENCE.
            </p>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-lg">
              Crafted from 14.5oz ring-spun raw cotton woven on vintage shuttle looms. Finished with custom antiqued copper rivets and heavy gauge chain stitching.
            </p>

          </div>

          {/* Interactive Fit Selector */}
          <div className="mb-8">

            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-3">
              Explore Our Signature Cuts:
            </p>

            <div className="flex flex-wrap gap-2">

              {DENIM_FITS.slice(1).map((fit, idx) => (
                <button
                  key={fit.id}
                  onClick={() => setSelectedFit(fit.id)}
                  className={`
                    denim-fit-button
                    relative
                    px-4 py-2.5
                    text-[10px] sm:text-xs
                    uppercase
                    tracking-[0.12em]
                    transition-all duration-300
                    cursor-pointer
                    overflow-hidden
                    ${
                      selectedFit === fit.id
                        ? 'bg-white text-black font-bold border border-white'
                        : 'bg-black/50 text-stone-300 hover:text-white border border-white/10 hover:border-white/30'
                    }
                  `}
                  style={{
                    animation: `fitReveal 450ms ease-out ${idx * 55}ms both`
                  }}
                >
                  {selectedFit === fit.id && (
                    <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#c5a880]" />
                  )}

                  <span className="relative z-10">
                    {fit.label}
                  </span>
                </button>
              ))}

            </div>

            {/* Selected Fit Description */}
            <div className="mt-4 flex items-start gap-2.5 min-h-[20px]">

              <Check
                className="
                  w-3.5 h-3.5
                  text-[#c5a880]
                  shrink-0
                  mt-0.5
                "
              />

              <span
                key={selectedFit}
                className="
                  fit-description
                  text-xs
                  text-stone-400
                  font-light
                  leading-relaxed
                "
              >
                {DENIM_FITS.find(f => f.id === selectedFit)?.desc}
              </span>

            </div>

          </div>

          {/* CTA */}
          <button
            onClick={() => openCatalog('jeans', selectedFit)}
            className="
              denim-cta
              group
              relative
              overflow-hidden
              px-8 py-4
              bg-white
              hover:bg-stone-200
              text-black
              font-semibold
              text-xs sm:text-sm
              tracking-[0.18em]
              uppercase
              flex items-center gap-3
              transition-all duration-500
              cursor-pointer
            "
          >
            {/* Gold hover fill */}
            <span
              className="
                absolute inset-0
                bg-[#c5a880]
                translate-y-full
                group-hover:translate-y-0
                transition-transform duration-500
                ease-out
              "
            />

            <span className="relative z-10">
              EXPLORE {selectedFit.toUpperCase()} JEANS
            </span>

            <ArrowRight
              className="
                relative z-10
                w-4 h-4
                transition-transform duration-400
                group-hover:translate-x-1
              "
            />
          </button>

        </div>
      </div>

      {/* Bottom left editorial detail */}
      <div className="absolute bottom-7 left-5 sm:left-8 lg:left-12 flex items-center gap-3 opacity-50">
        <span className="text-[8px] tracking-[0.25em] text-white">
          14.5 OZ
        </span>

        <span className="w-6 h-px bg-white/25" />

        <span className="text-[8px] tracking-[0.25em] text-white">
          RAW COTTON
        </span>
      </div>

      <style>{`
        @keyframes fitReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contentReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .jeans-content-reveal {
          animation: contentReveal 800ms cubic-bezier(.22,.61,.36,1) both;
        }

        .jeans-background {
          will-change: transform;
        }

        .jeans-feature:hover .jeans-background {
          transform: scale(1.025);
        }

        .denim-sheen {
          background:
            linear-gradient(
              110deg,
              transparent 0%,
              transparent 40%,
              rgba(255,255,255,0.035) 50%,
              transparent 60%,
              transparent 100%
            );
          transform: translateX(-100%);
          transition: transform 1800ms cubic-bezier(.22,.61,.36,1);
        }

        .jeans-feature:hover .denim-sheen {
          transform: translateX(100%);
        }

        .denim-fit-button {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .denim-fit-button:hover {
          transform: translateY(-1px);
        }

        .denim-cta {
          box-shadow: 0 10px 35px rgba(0,0,0,0.18);
        }

        .denim-cta:hover {
          box-shadow: 0 14px 45px rgba(0,0,0,0.28);
        }

        .fit-description {
          animation: contentReveal 350ms ease-out both;
        }

        @media (max-width: 1023px) {
          .jeans-feature {
            min-height: 680px;
          }
        }

        @media (max-width: 640px) {
          .jeans-feature {
            min-height: 700px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jeans-background,
          .denim-sheen,
          .denim-fit-button,
          .denim-cta {
            transition: none !important;
            animation: none !important;
          }

          .jeans-feature:hover .jeans-background {
            transform: none;
          }

          .jeans-feature:hover .denim-sheen {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};