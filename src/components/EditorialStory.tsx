import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSETS } from '../data/products';

export const EditorialStory: React.FC = function () {
  const { openCatalog } = useShop();

  return (
    <section className="editorial-story relative w-full min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden">

      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}

      <div className="absolute inset-0 z-0 overflow-hidden">

        <img
          src={ASSETS.heroCampaign}
          alt="Made For Your Everyday"
          className="
            editorial-background
            absolute inset-0
            w-full h-full
            object-cover object-center
            brightness-[0.7]
            contrast-[1.04]
            saturate-[0.92]
            transition-transform
            duration-[1800ms]
            ease-out
          "
        />

        {/* Main readability gradient */}
        <div
          className="
            absolute inset-0
            w-full lg:w-[72%]
            bg-gradient-to-r
            from-[#d9d3e7]/[0.96]
            via-[#ddd7e9]/[0.82]
            to-transparent
          "
        />

        {/* Bottom depth */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#d9d3e7]
            via-transparent
            to-[#c9c1da]/30
          "
        />

        {/* Soft lavender vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 65% 48%, transparent 0%, rgba(108,91,143,0.04) 45%, rgba(71,59,96,0.28) 100%)',
          }}
        />

        {/* Editorial light sweep */}
        <div className="editorial-sheen absolute inset-0 pointer-events-none" />
      </div>


      {/* =========================================================
          RIGHT EDITORIAL MARKER
      ========================================================= */}

      <div
        className="
          absolute
          right-5 lg:right-10
          top-1/2
          -translate-y-1/2
          hidden md:flex
          flex-col
          items-center
          gap-3
          opacity-70
          z-10
        "
      >

        <div
          className="
            editorial-marker
            flex
            items-center
            justify-center
            w-9
            h-28
            rounded-full
          "
        >
          <span
            className="
              text-[8px]
              tracking-[0.35em]
              text-[#5d536f]
              uppercase
              font-semibold
            "
            style={{
              writingMode: 'vertical-rl',
            }}
          >
            MADE IN NAWALGARH
          </span>
        </div>

        <span className="w-px h-14 bg-[#756889]/30" />

        <span
          className="
            editorial-year
            flex
            items-center
            justify-center
            w-8
            h-8
            rounded-full
            text-[8px]
            tracking-[0.2em]
            text-[#69549b]
            font-bold
          "
        >
          026
        </span>

      </div>


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div
        className="
          relative
          z-10
          max-w-[1440px]
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          w-full
          py-16
          lg:py-20
        "
      >

        <div className="max-w-xl">


          {/* =====================================================
              LOCATION BADGE
          ===================================================== */}

          <div
            className="
              editorial-reveal
              inline-flex
              items-center
              gap-3
              mb-5
              px-3
              py-2
              rounded-full
              editorial-clay-pill
            "
          >

            <div
              className="
                flex
                items-center
                justify-center
                w-8
                h-8
                rounded-full
                editorial-location-icon
              "
            >
              <MapPin
                className="
                  w-3.5
                  h-3.5
                  text-[#7056b7]
                "
              />
            </div>

            <span
              className="
                text-[8px]
                sm:text-[10px]
                font-bold
                tracking-[0.22em]
                sm:tracking-[0.28em]
                uppercase
                text-[#655879]
                pr-1
              "
            >
              FLAGSHIP STUDIO · NAWALGARH, RAJASTHAN
            </span>

          </div>


          {/* =====================================================
              HEADING
          ===================================================== */}

          <h2
            className="
              editorial-reveal
              font-['Syne']
              text-[2.55rem]
              sm:text-6xl
              lg:text-7xl
              font-extrabold
              uppercase
              text-[#29243a]
              tracking-tight
              leading-[0.88]
              mb-6
              max-w-[650px]
            "
          >
            MADE FOR
            <br />
            <span className="editorial-heading-highlight">
              YOUR FASHION
            </span>
          </h2>


          {/* =====================================================
              COPY CLAY PANEL
          ===================================================== */}

          <div
            className="
              editorial-copy-panel
              space-y-4
              mb-8
              max-w-xl
              p-5
              sm:p-6
              rounded-[24px]
            "
          >

            <p
              className="
                text-base
                sm:text-lg
                text-[#302a40]
                font-semibold
                leading-snug
              "
            >
              Premium fabrics. Timeless silhouettes.
              A style for every story.
            </p>

            <p
              className="
                text-xs
                sm:text-sm
                text-[#6f687d]
                font-medium
                leading-relaxed
              "
            >
              Rooted in the historic architectural artistry
              of Nawalgarh and inspired by contemporary
              global street culture, Nikku Fashion designs
              durable wardrobe staples that outlive fleeting
              fast-fashion cycles.
            </p>

          </div>


          {/* =====================================================
              CTA
          ===================================================== */}

          <div className="flex items-center gap-4">

            <button
              onClick={function () {
                openCatalog('all');
              }}
              className="
                editorial-cta
                group
                relative
                overflow-hidden
                px-6
                sm:px-7
                py-4
                rounded-[18px]
                bg-[#e8e3f0]
                text-[#352b4b]
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.18em]
                font-bold
                transition-all
                duration-300
                cursor-pointer
                flex
                items-center
                gap-3
              "
            >

              {/* Clay hover layer */}
              <span
                className="
                  absolute
                  inset-0
                  rounded-[18px]
                  bg-gradient-to-br
                  from-[#a993dc]
                  to-[#7056b7]
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform
                  duration-500
                  ease-out
                "
              />

              <span
                className="
                  relative
                  z-10
                  transition-colors
                  duration-300
                  group-hover:text-white
                "
              >
                BROWSE ALL PIECES
              </span>

              <ArrowRight
                className="
                  relative
                  z-10
                  w-4
                  h-4
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:text-white
                "
              />

            </button>

          </div>


          {/* =====================================================
              EDITORIAL FOOTER DETAIL
          ===================================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              mt-7
              opacity-75
            "
          >

            <span
              className="
                w-9
                h-[2px]
                rounded-full
                bg-[#75658d]/40
              "
            />

            <span
              className="
                text-[8px]
                tracking-[0.28em]
                uppercase
                text-[#777080]
                font-semibold
              "
            >
              NIKKU FASHION · EST. NAWALGARH
            </span>

          </div>

        </div>
      </div>


      {/* =========================================================
          CLAYMORPHISM STYLES
      ========================================================= */}

      <style>{`

        .editorial-story {
          background:
            linear-gradient(
              135deg,
              #e9e5f0 0%,
              #ded8e9 48%,
              #d2cadf 100%
            );
        }


        /* -----------------------------------------------
           Reveal animation
        ----------------------------------------------- */

        @keyframes editorialReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .editorial-reveal {
          animation:
            editorialReveal
            850ms
            cubic-bezier(.22,.61,.36,1)
            both;
        }

        .editorial-reveal:nth-child(2) {
          animation-delay: 100ms;
        }


        /* -----------------------------------------------
           Background image
        ----------------------------------------------- */

        .editorial-background {
          will-change: transform;
        }

        .editorial-story:hover
        .editorial-background {
          transform: scale(1.025);
        }


        /* -----------------------------------------------
           Light sweep
        ----------------------------------------------- */

        .editorial-sheen {
          background:
            linear-gradient(
              110deg,
              transparent 0%,
              transparent 40%,
              rgba(255,255,255,0.12) 50%,
              transparent 60%,
              transparent 100%
            );

          transform: translateX(-100%);

          transition:
            transform
            1800ms
            cubic-bezier(.22,.61,.36,1);
        }

        .editorial-story:hover
        .editorial-sheen {
          transform: translateX(100%);
        }


        /* -----------------------------------------------
           Clay location pill
        ----------------------------------------------- */

        .editorial-clay-pill {
          background:
            linear-gradient(
              145deg,
              rgba(242,239,248,0.92),
              rgba(220,214,232,0.9)
            );

          border:
            1px solid
            rgba(255,255,255,0.65);

          box-shadow:
            7px 7px 16px
            rgba(88,73,119,0.18),

            -7px -7px 16px
            rgba(255,255,255,0.9),

            inset 1px 1px 3px
            rgba(255,255,255,0.7);

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }


        /* -----------------------------------------------
           Location icon
        ----------------------------------------------- */

        .editorial-location-icon {
          background:
            linear-gradient(
              145deg,
              #eeeaf5,
              #d8d1e5
            );

          box-shadow:
            4px 4px 9px
            rgba(91,76,124,0.18),

            -4px -4px 9px
            rgba(255,255,255,0.9),

            inset 1px 1px 3px
            rgba(255,255,255,0.8);
        }


        /* -----------------------------------------------
           Heading highlight
        ----------------------------------------------- */

        .editorial-heading-highlight {
          color: #6d53b4;

          text-shadow:
            1px 1px 1px
            rgba(255,255,255,0.8),

            2px 2px 5px
            rgba(91,73,130,0.12);
        }


        /* -----------------------------------------------
           Copy clay panel
        ----------------------------------------------- */

        .editorial-copy-panel {
          background:
            linear-gradient(
              145deg,
              rgba(240,237,247,0.84),
              rgba(219,213,232,0.76)
            );

          border:
            1px solid
            rgba(255,255,255,0.58);

          box-shadow:
            10px 10px 24px
            rgba(86,71,117,0.16),

            -10px -10px 24px
            rgba(255,255,255,0.78),

            inset 1px 1px 4px
            rgba(255,255,255,0.55);

          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }


        /* -----------------------------------------------
           CTA
        ----------------------------------------------- */

        .editorial-cta {
          border:
            1px solid
            rgba(255,255,255,0.7);

          box-shadow:
            9px 9px 20px
            rgba(82,67,112,0.22),

            -8px -8px 18px
            rgba(255,255,255,0.9),

            inset 1px 1px 3px
            rgba(255,255,255,0.7);
        }

        .editorial-cta:hover {
          transform: translateY(-2px);

          box-shadow:
            12px 12px 25px
            rgba(78,63,108,0.24),

            -10px -10px 22px
            rgba(255,255,255,0.92);
        }

        .editorial-cta:active {
          transform: translateY(1px);

          box-shadow:
            inset 5px 5px 12px
            rgba(87,72,116,0.2),

            inset -4px -4px 10px
            rgba(255,255,255,0.65);
        }


        /* -----------------------------------------------
           Right marker
        ----------------------------------------------- */

        .editorial-marker {
          background:
            linear-gradient(
              145deg,
              rgba(239,235,246,0.78),
              rgba(211,204,225,0.78)
            );

          border:
            1px solid
            rgba(255,255,255,0.55);

          box-shadow:
            5px 5px 13px
            rgba(83,68,111,0.14),

            -5px -5px 13px
            rgba(255,255,255,0.75),

            inset 1px 1px 3px
            rgba(255,255,255,0.6);

          backdrop-filter: blur(8px);
        }


        .editorial-year {
          background:
            linear-gradient(
              145deg,
              #eeeaf6,
              #d7d0e5
            );

          box-shadow:
            4px 4px 9px
            rgba(83,68,111,0.15),

            -4px -4px 9px
            rgba(255,255,255,0.8);
        }


        /* -----------------------------------------------
           Tablet
        ----------------------------------------------- */

        @media (max-width: 1024px) {

          .editorial-story {
            min-height: 590px;
          }

          .editorial-copy-panel {
            max-width: 500px;
          }
        }


        /* -----------------------------------------------
           Mobile
        ----------------------------------------------- */

        @media (max-width: 640px) {

          .editorial-story {
            min-height: 680px;
          }

          .editorial-background {
            object-position: 62% center;
          }

          .editorial-story > div:first-child
          > div:nth-child(2) {
            width: 100%;
            background:
              linear-gradient(
                90deg,
                rgba(222,216,234,0.96),
                rgba(222,216,234,0.76),
                rgba(222,216,234,0.34)
              );
          }

          .editorial-copy-panel {
            padding: 18px;
            border-radius: 20px;
          }

          .editorial-cta {
            width: 100%;
            justify-content: center;
            min-height: 52px;
          }
        }


        /* -----------------------------------------------
           Very small phones
        ----------------------------------------------- */

        @media (max-width: 390px) {

          .editorial-story {
            min-height: 700px;
          }

          .editorial-copy-panel {
            padding: 16px;
          }

          .editorial-cta {
            padding-left: 18px;
            padding-right: 18px;
          }
        }


        /* -----------------------------------------------
           Large screens
        ----------------------------------------------- */

        @media (min-width: 1536px) {

          .editorial-story {
            min-height: 700px;
          }

          .editorial-copy-panel {
            max-width: 570px;
          }
        }


        /* -----------------------------------------------
           Reduced motion
        ----------------------------------------------- */

        @media (prefers-reduced-motion: reduce) {

          .editorial-reveal,
          .editorial-background,
          .editorial-sheen,
          .editorial-cta {
            animation: none !important;
            transition: none !important;
          }

          .editorial-story:hover
          .editorial-background,
          .editorial-story:hover
          .editorial-sheen {
            transform: none;
          }
        }

      `}</style>

    </section>
  );
};