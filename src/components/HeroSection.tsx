import React from 'react';
import { ArrowRight, Play, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSETS } from '../data/products';

export const HeroSection: React.FC = () => {
  const { openCatalog, setIsCampaignStoryOpen } = useShop();

  return (
    <section
      className="relative w-full min-h-[92vh] sm:min-h-screen flex items-end bg-[#090909] select-none pt-24 pb-12 sm:pb-16 overflow-hidden"
      style={{
        isolation: 'isolate',
        background:
          'radial-gradient(circle at 78% 28%, rgba(197,168,128,0.12), transparent 28%), #090909',
      }}
    >
      {/* =========================================================
          CINEMATIC BACKGROUND
      ========================================================= */}
      <div
        className="absolute inset-0 z-0"
        style={{
          overflow: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        <img
          src={ASSETS.heroCampaign}
          alt="Nikku Fashion Campaign Nawalgarh"
          className="w-full h-full object-cover object-top filter brightness-[0.78] contrast-[1.05]"
          loading="eager"
          style={{
            transform: 'scale(1.035)',
            animation: 'heroCinematicZoom 14s cubic-bezier(.16,1,.3,1) forwards',
            willChange: 'transform',
          }}
        />

        {/* Deep cinematic gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,.12) 0%, rgba(0,0,0,.04) 35%, rgba(9,9,9,.92) 100%)',
          }}
        />

        {/* Directional editorial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(9,9,9,.94) 0%, rgba(9,9,9,.58) 31%, rgba(9,9,9,.16) 68%, rgba(9,9,9,.05) 100%)',
          }}
        />

        {/* Subtle warm cinematic light */}
        <div
          className="absolute"
          style={{
            width: '42vw',
            height: '42vw',
            right: '-14vw',
            top: '8%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(197,168,128,.13) 0%, rgba(197,168,128,.04) 32%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        {/* Film grain */}
        <div
          className="noise-overlay absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.35,
            mixBlendMode: 'soft-light',
          }}
        />
      </div>

      {/* =========================================================
          EDITORIAL FRAME / GRAPHICS
      ========================================================= */}

      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: '110px',
          right: '3.5vw',
          bottom: '38px',
          width: '1px',
          background:
            'linear-gradient(to bottom, transparent, rgba(255,255,255,.18), transparent)',
        }}
      />

      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: '110px',
          left: '3.5vw',
          bottom: '38px',
          width: '1px',
          background:
            'linear-gradient(to bottom, transparent, rgba(255,255,255,.10), transparent)',
        }}
      />

      {/* Vertical campaign label */}
      <div
        className="absolute hidden xl:flex right-[1.4vw] top-1/2 -translate-y-1/2 items-center gap-3"
        style={{
          writingMode: 'vertical-rl',
          transformOrigin: 'center',
          color: 'rgba(255,255,255,.42)',
          fontSize: '8px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
        }}
      >
        NIKKU / AUTUMN WINTER / 2026
      </div>

      {/* Floating editorial number */}
      <div
        className="absolute hidden md:block"
        style={{
          right: '6vw',
          top: '22%',
          color: 'rgba(255,255,255,.22)',
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(70px, 10vw, 150px)',
          fontWeight: 800,
          lineHeight: 0.8,
          letterSpacing: '-0.08em',
          pointerEvents: 'none',
        }}
      >
        01
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-3xl">

          {/* Campaign Tag */}
          <div
            className="flex items-center gap-3 mb-4"
            style={{
              animation: 'heroFadeUp .9s .25s cubic-bezier(.16,1,.3,1) both',
            }}
          >
            
          </div>

          {/* =====================================================
              MASSIVE TYPOGRAPHY
          ===================================================== */}
          <h1
            className="font-['Syne'] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl mb-6"
            style={{
              textShadow: '0 12px 45px rgba(0,0,0,.35)',
              animation: 'heroTitleReveal 1.15s .35s cubic-bezier(.16,1,.3,1) both',
            }}
          >
            <span
  style={{
    display: 'inline-block',
    color: '#ffffff',
    background:
      'linear-gradient(110deg, #c5a880 0%, #f0dfc3 45%, #a78a64 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: '#daa8a8',
    backgroundClip: 'text',
    backgroundSize: '180% auto',
    animation:
      'heroGoldShift 6s ease-in-out 1.5s infinite alternate',
  }}
>
  WEAR
</span>
            <br />

            <span
              style={{
                display: 'inline-block',
                color: '#c5a880',
                background:
                  'linear-gradient(110deg, #c5a880 0%, #f0dfc3 45%, #a78a64 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '180% auto',
                animation:
                  'heroGoldShift 6s ease-in-out 1.5s infinite alternate',
              }}
            >
              BEYOND
            </span>

            <br />

            <span
              className="text-stone-300"
              style={{
                display: 'inline-block',
                position: 'relative',
              }}
            >
              TRENDS

              {/* Underline graphic */}
              <span
                style={{
                  position: 'absolute',
                  left: '2px',
                  right: '0',
                  bottom: '-7px',
                  height: '1px',
                  background:
                    'linear-gradient(90deg, #c5a880, rgba(197,168,128,.1))',
                  transformOrigin: 'left',
                  animation: 'heroLineReveal 1.2s 1.15s cubic-bezier(.16,1,.3,1) both',
                }}
              />
            </span>
          </h1>

          {/* Brand Copy */}
          <p
            className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-lg mb-8"
            style={{
              animation: 'heroFadeUp .9s .9s cubic-bezier(.16,1,.3,1) both',
              textShadow: '0 2px 20px rgba(0,0,0,.7)',
            }}
          >
            Premium clothing engineered for those who create their own style.
            Heavyweight selvedge denim, 280 GSM cotton drops, and contemporary
            silhouettes.
          </p>

          {/* =====================================================
              CTA AREA
          ===================================================== */}
          <div
            className="flex flex-wrap items-center gap-4"
            style={{
              animation: 'heroFadeUp .9s 1.05s cubic-bezier(.16,1,.3,1) both',
            }}
          >
            <button
              onClick={() => openCatalog('men')}
              className="group px-7 sm:px-9 py-4 bg-white hover:bg-stone-200 text-black font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase flex items-center gap-3 cursor-pointer"
              style={{
                position: 'relative',
                overflow: 'hidden',
                transition:
                  'transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s ease',
                boxShadow: '0 12px 35px rgba(0,0,0,.22)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 18px 45px rgba(0,0,0,.38)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 12px 35px rgba(0,0,0,.22)';
              }}
            >
              <span>SHOP MEN</span>

              <ArrowRight
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => openCatalog('women')}
              className="group px-7 sm:px-9 py-4 text-white border border-white/20 hover:border-[#c5a880] font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase flex items-center gap-3 backdrop-blur-sm cursor-pointer"
              style={{
                background:
                  'linear-gradient(120deg, rgba(20,20,20,.88), rgba(20,20,20,.48))',
                transition:
                  'transform .45s cubic-bezier(.16,1,.3,1), border-color .4s ease, background .4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.background =
                  'linear-gradient(120deg, rgba(197,168,128,.14), rgba(20,20,20,.55))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background =
                  'linear-gradient(120deg, rgba(20,20,20,.88), rgba(20,20,20,.48))';
              }}
            >
              <span>SHOP WOMEN</span>

              <ArrowRight
                className="w-4 h-4 text-[#c5a880] transition-transform duration-500 group-hover:translate-x-1"
              />
            </button>

            {/* Watch Film */}
            <button
              onClick={() => setIsCampaignStoryOpen(true)}
              className="group px-5 py-4 text-xs uppercase tracking-[0.2em] text-stone-300 hover:text-white flex items-center gap-2.5 cursor-pointer ml-1"
              style={{
                transition: 'transform .4s ease, color .3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  border: '1px solid rgba(255,255,255,.3)',
                  background: 'rgba(0,0,0,.22)',
                  backdropFilter: 'blur(8px)',
                  transition:
                    'transform .5s cubic-bezier(.16,1,.3,1), border-color .3s ease',
                }}
              >
                <Play className="w-3 h-3 text-[#c5a880] fill-current ml-0.5 transition-transform duration-500 group-hover:scale-125" />
              </div>

              <span className="hidden sm:inline">Watch Film</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            BOTTOM EDITORIAL STRIP
        ========================================================= */}
        <div
          className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400"
          style={{
            animation: 'heroFadeUp .9s 1.25s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          <div className="flex items-center gap-6">
            <span
              style={{
                letterSpacing: '0.12em',
              }}
            >
              MEN. WOMEN. EVERYDAY.
            </span>

            <span style={{ color: '#c5a880' }}>·</span>

            <span
              style={{
                letterSpacing: '0.08em',
              }}
            >
              100% ORGANIC COTTON &amp; SELVEDGE
            </span>
          </div>

          <div className="flex items-center gap-2 text-stone-300">
            <span
              style={{
                fontSize: '9px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,.42)',
              }}
            >
              FLAGSHIP STUDIO:
            </span>

            <span
              className="text-white font-medium"
              style={{
                position: 'relative',
              }}
            >
              Nawalgarh, Rajasthan
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM CORNER GRAPHIC
      ========================================================= */}
      <div
        className="absolute hidden md:block pointer-events-none"
        style={{
          right: '5vw',
          bottom: '70px',
          width: '80px',
          height: '80px',
          border: '1px solid rgba(197,168,128,.22)',
          borderRadius: '50%',
          animation: 'slowRotate 18s linear infinite',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            border: '1px dashed rgba(197,168,128,.28)',
            borderRadius: '50%',
          }}
        />

        <Plus
          size={12}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#c5a880',
          }}
        />
      </div>

      {/* =========================================================
          LOCAL HERO ANIMATION STYLES
      ========================================================= */}
      <style>
        {`
          @keyframes heroCinematicZoom {
            0% {
              transform: scale(1.08);
            }
            100% {
              transform: scale(1.035);
            }
          }

          @keyframes heroFadeUp {
            0% {
              opacity: 0;
              transform: translateY(28px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes heroTitleReveal {
            0% {
              opacity: 0;
              transform: translateY(35px);
              filter: blur(7px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          @keyframes heroLineReveal {
            0% {
              transform: scaleX(0);
              opacity: 0;
            }
            100% {
              transform: scaleX(1);
              opacity: 1;
            }
          }

          @keyframes heroGoldShift {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }

          @keyframes slowRotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </section>
  );
};