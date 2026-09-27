import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSETS } from '../data/products';

const STORY_SLIDES = [
  {
    category: 'DENIM ARCHIVE',
    title: '14.5oz Japanese Selvedge',
    desc: 'Heavyweight rigid denim that molds to your body over time with high-contrast fades.',
    image: ASSETS.denimJeansDetail,
    linkCat: 'jeans'
  },
  {
    category: 'STREETWEAR CUTS',
    title: '280 GSM Boxy Drop Tees',
    desc: 'Combed organic cotton pre-shrunk to retain its architectural silhouette wash after wash.',
    image: ASSETS.oversizedTeeShoot,
    linkCat: 't-shirts'
  },
  {
    category: 'OUTERWEAR EDIT',
    title: 'Vintage Denim Trucker',
    desc: 'Artisanal wash featuring custom antique shanks and reinforced dual chest pockets.',
    image: ASSETS.denimJacketShoot,
    linkCat: 'jackets'
  },
  {
    category: 'CONTEMPORARY KNITS',
    title: 'Sculptural Ribbed Top',
    desc: 'Ultra-soft micro-rib formulation engineered for effortless shape and all-day comfort.',
    image: ASSETS.womenCropShoot,
    linkCat: 'tops'
  },
  {
    category: 'WINTER ESSENTIALS',
    title: '450 GSM Loopback Fleece',
    desc: 'Dense French terry fleece hoodie with a double-layered crossover hood and no drawstrings.',
    image: ASSETS.fleeceHoodieShoot,
    linkCat: 'hoodies'
  }
];

export const HorizontalStory: React.FC = function () {
  const { openCatalog } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right'): void {
    if (!scrollRef.current) {
      return;
    }

    const amount = dir === 'left' ? -400 : 400;

    scrollRef.current.scrollBy({
      left: amount,
      behavior: 'smooth'
    });
  }

  function handleStoryClick(linkCat: string): void {
    openCatalog(linkCat);
  }

  return (
    <section className="horizontal-story relative w-full overflow-hidden py-20 sm:py-28">
      
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================= */}
      <div className="absolute inset-0 pointer-events-none story-bg-glow" />

      <div className="absolute top-0 left-0 right-0 h-px story-top-line" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="story-header relative flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 pb-7">

          <div>

            <div className="flex items-center gap-3 mb-4">

              <span className="story-heading-line" />

              <span className="story-eyebrow">
                SEASONAL EDITORIAL
              </span>

              <span className="story-heading-dot" />

            </div>

            <h2 className="
              story-main-title
              font-['Syne']
              text-3xl
              sm:text-5xl
              font-extrabold
              uppercase
              tracking-tight
              leading-[0.95]
            ">
              FASHION IN MOTION
            </h2>

            <p className="story-subtitle">
              Curated pieces. Distinct silhouettes. Built for everyday movement.
            </p>

          </div>

          {/* =================================================
              CONTROLS
          ================================================= */}
          <div className="flex items-center gap-2 sm:gap-3">

            <span className="hidden sm:block story-scroll-label">
              SCROLL
            </span>

            <button
              type="button"
              onClick={function () {
                scroll('left');
              }}
              className="story-control group"
              aria-label="Previous story slide"
            >
              <ChevronLeft className="
                w-4
                h-4
                transition-transform
                duration-300
                group-hover:-translate-x-1
              " />
            </button>

            <button
              type="button"
              onClick={function () {
                scroll('right');
              }}
              className="story-control group"
              aria-label="Next story slide"
            >
              <ChevronRight className="
                w-4
                h-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              " />
            </button>

          </div>
        </div>

        {/* =====================================================
            HORIZONTAL CAROUSEL
        ===================================================== */}
        <div
          ref={scrollRef}
          className="
            story-carousel
            flex
            gap-4
            sm:gap-6
            overflow-x-auto
            no-scrollbar
            scroll-smooth
            pb-6
            snap-x
            snap-mandatory
          "
        >

          {STORY_SLIDES.map(function (slide, idx) {
            return (
              <article
                key={idx}
                onClick={function () {
                  handleStoryClick(slide.linkCat);
                }}
                className="
                  story-card
                  group
                  relative
                  w-[320px]
                  sm:w-[400px]
                  h-[520px]
                  shrink-0
                  overflow-hidden
                  cursor-pointer
                  snap-start
                "
                style={{
                  animation:
                    `storyReveal 700ms cubic-bezier(.22,.61,.36,1) ${idx * 70}ms both`
                }}
              >

                {/* ===========================================
                    IMAGE
                =========================================== */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="
                    story-image
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-[1100ms]
                    ease-[cubic-bezier(.22,.61,.36,1)]
                    group-hover:scale-[1.06]
                  "
                  loading="lazy"
                />

                {/* Image darkening */}
                <div className="absolute inset-0 story-image-overlay" />

                {/* Bottom gradient */}
                <div className="absolute inset-0 story-gradient" />

                {/* Soft vignette */}
                <div className="absolute inset-0 story-vignette pointer-events-none" />

                {/* Light sweep */}
                <div className="story-sheen absolute inset-0 pointer-events-none" />

                {/* ===========================================
                    TOP NUMBER
                =========================================== */}
                <div className="
                  absolute
                  top-5
                  left-5
                  sm:top-6
                  sm:left-6
                  flex
                  items-center
                  gap-3
                  z-10
                ">

                  <span className="story-number">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <span className="story-number-line" />

                </div>

                {/* ===========================================
                    CATEGORY CLAY BADGE
                =========================================== */}
                <div className="relative z-10 p-5 sm:p-7">

                  <span className="story-category">
                    <span className="story-category-dot" />
                    {slide.category}
                  </span>

                </div>

                {/* ===========================================
                    BOTTOM CONTENT
                =========================================== */}
                <div className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  sm:p-7
                  z-10
                ">

                  <div className="story-content-panel">

                    <h3 className="
                      story-card-title
                      font-['Syne']
                      text-2xl
                      sm:text-[26px]
                      font-bold
                      uppercase
                      tracking-tight
                      leading-[1.02]
                      mb-3
                    ">
                      {slide.title}
                    </h3>

                    <p className="
                      story-card-desc
                      text-xs
                      sm:text-sm
                      font-light
                      leading-relaxed
                      mb-5
                      max-w-[340px]
                    ">
                      {slide.desc}
                    </p>

                    {/* Discover */}
                    <div className="story-discover">

                      <span>
                        DISCOVER PIECE
                      </span>

                      <span className="story-arrow">

                        <ArrowUpRight className="
                          w-4
                          h-4
                          transition-transform
                          duration-400
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        " />

                      </span>

                    </div>

                    <div className="story-discover-line" />

                  </div>

                </div>

              </article>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM INFO
        ===================================================== */}
        <div className="
          flex
          items-center
          justify-between
          mt-2
        ">

          <div className="flex items-center gap-3">

            <span className="story-bottom-line" />

            <span className="story-bottom-label">
              EXPLORE THE EDIT
            </span>

          </div>

          <span className="story-count">
            {STORY_SLIDES.length.toString().padStart(2, '0')} STORIES
          </span>

        </div>

      </div>

      {/* =========================================================
          CLAYMORPHISM STYLES
      ========================================================= */}
      <style>{`

        .horizontal-story {
          background:
            linear-gradient(
              145deg,
              #e8e4f1 0%,
              #ded9ea 45%,
              #e9e5f2 100%
            );
          color: #29253a;
        }

        .story-bg-glow {
          background:
            radial-gradient(
              circle at 50% -10%,
              rgba(145,116,208,.24),
              transparent 36%
            ),
            radial-gradient(
              circle at 10% 70%,
              rgba(255,255,255,.38),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(125,99,180,.10),
              transparent 30%
            );
        }

        .story-top-line {
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(119,95,172,.25),
              transparent
            );
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .story-header {
          border-bottom:
            1px solid rgba(103,88,139,.14);
        }

        .story-heading-line {
          width: 32px;
          height: 3px;
          border-radius: 999px;
          background:
            linear-gradient(
              90deg,
              #8d6dcb,
              #bba5e4
            );
          box-shadow:
            2px 2px 5px rgba(95,77,135,.22),
            -2px -2px 4px rgba(255,255,255,.65);
        }

        .story-heading-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #9679d1;
          box-shadow:
            0 0 0 4px rgba(150,121,209,.10),
            0 0 12px rgba(150,121,209,.35);
        }

        .story-eyebrow {
          color: #8062bb;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .28em;
        }

        .story-main-title {
          color: #29253a;
          text-shadow:
            2px 2px 4px rgba(118,102,147,.18),
            -2px -2px 4px rgba(255,255,255,.65);
        }

        .story-subtitle {
          margin-top: 9px;
          color: #7a728c;
          font-size: 11px;
          line-height: 1.6;
          max-width: 470px;
        }

        .story-scroll-label {
          color: #8a819a;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .24em;
          margin-right: 5px;
        }

        /* =====================================================
           CLAY CONTROLS
        ===================================================== */

        .story-control {
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #65557e;

          background:
            linear-gradient(
              145deg,
              #eeeaf5,
              #d8d2e4
            );

          box-shadow:
            7px 7px 15px rgba(107,94,132,.23),
            -6px -6px 13px rgba(255,255,255,.78),
            inset 1px 1px 2px rgba(255,255,255,.7);

          transition:
            transform .3s ease,
            box-shadow .3s ease,
            color .3s ease;
        }

        .story-control:hover {
          color: #8061bb;
          transform: translateY(-3px);

          box-shadow:
            9px 10px 19px rgba(107,94,132,.27),
            -7px -7px 15px rgba(255,255,255,.82),
            inset 1px 1px 2px rgba(255,255,255,.75);
        }

        .story-control:active {
          transform: translateY(1px);

          box-shadow:
            inset 4px 4px 9px rgba(116,99,142,.18),
            inset -3px -3px 7px rgba(255,255,255,.72);
        }

        /* =====================================================
           CAROUSEL
        ===================================================== */

        .story-carousel {
          overscroll-behavior-x: contain;
          scroll-padding-left: 1px;
        }

        .story-carousel::-webkit-scrollbar {
          height: 6px;
        }

        .story-carousel::-webkit-scrollbar-track {
          background: rgba(132,116,157,.08);
          border-radius: 99px;
        }

        .story-carousel::-webkit-scrollbar-thumb {
          background:
            linear-gradient(
              90deg,
              #aa93d2,
              #8062b9
            );
          border-radius: 99px;
          box-shadow:
            inset 1px 1px 2px rgba(255,255,255,.35);
        }

        /* =====================================================
           STORY CARD
        ===================================================== */

        .story-card {
          isolation: isolate;
          transform: translateZ(0);

          border-radius: 27px;

          background:
            linear-gradient(
              145deg,
              #ebe7f3,
              #d9d3e6
            );

          border:
            1px solid rgba(255,255,255,.48);

          box-shadow:
            16px 18px 34px rgba(91,77,116,.25),
            -12px -12px 28px rgba(255,255,255,.72),
            inset 1px 1px 2px rgba(255,255,255,.72);

          transition:
            transform .5s cubic-bezier(.16,1,.3,1),
            box-shadow .5s ease;
        }

        .story-card:hover {
          transform:
            translateY(-8px);

          box-shadow:
            21px 25px 43px rgba(83,69,108,.31),
            -13px -13px 31px rgba(255,255,255,.78),
            inset 1px 1px 2px rgba(255,255,255,.75);
        }

        .story-card::before {
          content: '';
          position: absolute;
          inset: 7px;
          border-radius: 21px;
          border: 1px solid rgba(255,255,255,.12);
          pointer-events: none;
          z-index: 5;
        }

        .story-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 27px;
          border: 2px solid rgba(154,125,211,0);
          pointer-events: none;
          z-index: 20;
          transition:
            border-color .45s ease,
            box-shadow .45s ease;
        }

        .story-card:hover::after {
          border-color: rgba(154,125,211,.28);
          box-shadow:
            inset 0 0 25px rgba(154,125,211,.07);
        }

        /* =====================================================
           IMAGE
        ===================================================== */

        .story-image {
          will-change: transform;
          filter:
            brightness(.72)
            saturate(.78)
            contrast(1.04);
        }

        .story-image-overlay {
          background:
            linear-gradient(
              145deg,
              rgba(26,22,35,.12),
              rgba(26,22,35,.3)
            );
          mix-blend-mode: multiply;
        }

        .story-gradient {
          background:
            linear-gradient(
              to top,
              rgba(19,16,28,.95) 0%,
              rgba(24,20,34,.78) 25%,
              rgba(28,24,38,.25) 58%,
              rgba(24,21,33,.10) 100%
            );
        }

        .story-vignette {
          background:
            radial-gradient(
              circle at 50% 35%,
              transparent 0%,
              rgba(20,16,29,.08) 50%,
              rgba(11,9,17,.45) 100%
            );
        }

        /* =====================================================
           SHEEN
        ===================================================== */

        .story-sheen {
          background:
            linear-gradient(
              115deg,
              transparent 0%,
              transparent 42%,
              rgba(255,255,255,.13) 50%,
              transparent 58%,
              transparent 100%
            );

          transform: translateX(-120%);
          transition:
            transform 1100ms cubic-bezier(.22,.61,.36,1);
          z-index: 7;
        }

        .story-card:hover .story-sheen {
          transform: translateX(120%);
        }

        /* =====================================================
           CARD NUMBER
        ===================================================== */

        .story-number {
          color: rgba(246,242,251,.72);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .28em;

          text-shadow:
            1px 2px 4px rgba(0,0,0,.4);
        }

        .story-number-line {
          width: 30px;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.35),
              transparent
            );
        }

        /* =====================================================
           CATEGORY
        ===================================================== */

        .story-category {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border-radius: 10px;

          color: rgba(248,245,252,.86);

          font-size: 8px;
          font-weight: 700;
          letter-spacing: .22em;

          background:
            linear-gradient(
              145deg,
              rgba(61,53,75,.82),
              rgba(31,27,41,.76)
            );

          border:
            1px solid rgba(219,207,240,.13);

          box-shadow:
            6px 6px 14px rgba(5,4,9,.3),
            -4px -4px 11px rgba(255,255,255,.04),
            inset 0 1px 1px rgba(255,255,255,.09);

          backdrop-filter: blur(12px);

          transition:
            border-color .4s ease,
            transform .4s ease;
        }

        .story-card:hover .story-category {
          border-color: rgba(170,143,221,.4);
          transform: translateY(-2px);
        }

        .story-category-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #a58add;
          box-shadow:
            0 0 10px rgba(165,138,221,.65);
        }

        /* =====================================================
           CONTENT PANEL
        ===================================================== */

        .story-content-panel {
          padding: 17px;
          border-radius: 17px;

          background:
            linear-gradient(
              145deg,
              rgba(51,44,65,.83),
              rgba(25,22,35,.82)
            );

          border:
            1px solid rgba(222,210,242,.1);

          box-shadow:
            8px 9px 22px rgba(4,3,8,.32),
            -5px -5px 14px rgba(255,255,255,.035),
            inset 0 1px 1px rgba(255,255,255,.08);

          backdrop-filter: blur(13px);
        }

        .story-card-title {
          color: #f5f1f9;
          text-shadow:
            0 4px 15px rgba(0,0,0,.35);

          transition:
            color .4s ease;
        }

        .story-card:hover .story-card-title {
          color: #d8c9ef;
        }

        .story-card-desc {
          color: rgba(233,226,240,.67);
        }

        /* =====================================================
           DISCOVER
        ===================================================== */

        .story-discover {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          color: #eee9f5;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .18em;

          transition:
            color .4s ease;
        }

        .story-card:hover .story-discover {
          color: #b49be2;
        }

        .story-arrow {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;

          background:
            linear-gradient(
              145deg,
              #9174ca,
              #7254aa
            );

          box-shadow:
            4px 4px 9px rgba(7,5,12,.35),
            -3px -3px 7px rgba(255,255,255,.07),
            inset 0 1px 1px rgba(255,255,255,.18);

          color: #fff;
        }

        .story-discover-line {
          width: 58px;
          height: 2px;
          margin-top: 10px;
          border-radius: 99px;

          background:
            linear-gradient(
              90deg,
              #9a7bd0,
              transparent
            );

          transform-origin: left;
          transform: scaleX(.65);

          transition:
            transform .5s cubic-bezier(.16,1,.3,1);
        }

        .story-card:hover .story-discover-line {
          transform: scaleX(1);
        }

        /* =====================================================
           BOTTOM INFO
        ===================================================== */

        .story-bottom-line {
          width: 30px;
          height: 2px;
          border-radius: 99px;
          background: #a18bd0;
          box-shadow:
            2px 2px 4px rgba(103,84,143,.2),
            -2px -2px 3px rgba(255,255,255,.65);
        }

        .story-bottom-label {
          color: #8a8199;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .25em;
        }

        .story-count {
          color: #9a91a8;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: .2em;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1024px) {
          .story-card {
            width: 360px;
            height: 510px;
          }

          .story-content-panel {
            padding: 15px;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {

          .horizontal-story {
            padding-top: 70px;
            padding-bottom: 75px;
          }

          .story-main-title {
            font-size: 2.15rem;
          }

          .story-subtitle {
            font-size: 10px;
            max-width: 340px;
          }

          .story-control {
            width: 42px;
            height: 42px;
            border-radius: 13px;
          }

          .story-carousel {
            gap: 15px;
            margin-right: -20px;
            padding-right: 20px;
          }

          .story-card {
            width: 82vw;
            max-width: 390px;
            height: 500px;
            border-radius: 24px;
          }

          .story-card::before {
            border-radius: 18px;
          }

          .story-card::after {
            border-radius: 24px;
          }

          .story-category {
            font-size: 7px;
            padding: 7px 9px;
          }

          .story-content-panel {
            padding: 14px;
            border-radius: 15px;
          }

          .story-card-title {
            font-size: 21px;
          }

          .story-card-desc {
            font-size: 11px;
          }

          .story-bottom-label,
          .story-count {
            font-size: 7px;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 390px) {

          .horizontal-story {
            padding-top: 60px;
          }

          .story-main-title {
            font-size: 1.95rem;
          }

          .story-heading-line {
            width: 24px;
          }

          .story-eyebrow {
            font-size: 7px;
            letter-spacing: .2em;
          }

          .story-card {
            width: 84vw;
            height: 470px;
          }

          .story-content-panel {
            padding: 12px;
          }

          .story-card-title {
            font-size: 19px;
          }

          .story-card-desc {
            margin-bottom: 14px;
          }
        }

        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        @media (min-width: 1536px) {

          .story-card {
            width: 420px;
            height: 545px;
          }

          .story-content-panel {
            padding: 19px;
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .story-card,
          .story-image,
          .story-sheen,
          .story-control,
          .story-category,
          .story-discover,
          .story-discover-line {
            animation: none !important;
            transition: none !important;
          }

          .story-card:hover {
            transform: none !important;
          }

          .story-card:hover .story-image {
            transform: none !important;
          }

          .story-card:hover .story-sheen {
            transform: none !important;
          }
        }

      `}</style>
    </section>
  );
};