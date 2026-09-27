import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSETS } from '../data/products';

export const CollectionsGrid: React.FC = function () {

  const { openCatalog } = useShop();

  return (
    <>
      <style>{`

        /* =========================================================
           NIKKU COLLECTIONS — CLAYMORPHISM
           ========================================================= */

        .collections-section {
          --clay-bg: #e7e3f0;
          --clay-surface: #eeeaf6;
          --clay-light: #f8f5fb;
          --clay-dark: #d8d2e5;

          --clay-purple: #8d70ca;
          --clay-purple-dark: #7355b4;
          --clay-purple-light: #cfc2e8;

          --clay-text: #40374b;
          --clay-muted: #81778d;

          background:
            radial-gradient(
              circle at 15% 5%,
              rgba(157,126,211,.14),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 25%,
              rgba(194,178,222,.18),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              #eeeaf5,
              #e4e0ed
            );

          color:
            var(--clay-text);

          border-top:
            1px solid
            rgba(255,255,255,.82);

          position:
            relative;
        }

        /* =========================================================
           SECTION WRAPPER
           ========================================================= */

        .collections-inner {
          position:
            relative;

          max-width:
            1440px;

          margin:
            0 auto;

          padding:
            0 20px;
        }

        /* =========================================================
           HEADER
           ========================================================= */

        .collections-header {
          position:
            relative;

          display:
            flex;

          align-items:
            flex-end;

          justify-content:
            space-between;

          gap:
            24px;

          margin-bottom:
            34px;

          padding:
            0 0 22px;

          border-bottom:
            1px solid
            rgba(255,255,255,.72);
        }

        .collections-heading-wrap {
          min-width:
            0;
        }

        .collections-kicker {
          display:
            inline-flex;

          align-items:
            center;

          gap:
            9px;

          margin-bottom:
            10px;

          color:
            var(--clay-purple-dark);

          font-family:
            monospace;

          font-size:
            9px;

          font-weight:
            900;

          letter-spacing:
            .25em;

          text-transform:
            uppercase;
        }

        .collections-kicker-line {
          width:
            25px;

          height:
            2px;

          border-radius:
            999px;

          background:
            linear-gradient(
              90deg,
              #b69cde,
              #805fbd
            );

          box-shadow:
            2px 2px 4px
            rgba(91,76,118,.13),

            -2px -2px 4px
            rgba(255,255,255,.72);
        }

        .collections-title {
          margin:
            0;

          color:
            #433a4d;

          font-family:
            'Syne',
            sans-serif;

          font-size:
            clamp(
              30px,
              5vw,
              62px
            );

          font-weight:
            900;

          letter-spacing:
            -.045em;

          line-height:
            .92;

          text-transform:
            uppercase;
        }

        .collections-title-accent {
          color:
            var(--clay-purple-dark);
        }

        /* =========================================================
           VIEW ALL BUTTON
           ========================================================= */

        .collections-all-button {
          min-height:
            42px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            8px;

          flex-shrink:
            0;

          padding:
            0 14px;

          border-radius:
            12px;

          color:
            var(--clay-purple-dark);

          background:
            linear-gradient(
              145deg,
              #f5f2fa,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.88);

          box-shadow:
            6px 6px 12px
            rgba(91,76,118,.13),

            -5px -5px 10px
            rgba(255,255,255,.85);

          font-family:
            monospace;

          font-size:
            8px;

          font-weight:
            900;

          letter-spacing:
            .12em;

          text-transform:
            uppercase;

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease;
        }

        .collections-all-button:hover {
          color:
            #6749a7;

          transform:
            translateY(-2px);

          box-shadow:
            8px 8px 16px
            rgba(91,76,118,.16),

            -6px -6px 12px
            rgba(255,255,255,.90);
        }

        .collections-all-button:active {
          transform:
            translateY(1px);

          box-shadow:
            inset 3px 3px 7px
            rgba(91,76,118,.12),

            inset -3px -3px 7px
            rgba(255,255,255,.82);
        }

        /* =========================================================
           FEATURED CARDS
           ========================================================= */

        .collection-feature-card {
          position:
            relative;

          height:
            510px;

          overflow:
            hidden;

          cursor:
            pointer;

          isolation:
            isolate;

          border-radius:
            24px;

          background:
            #ddd7e8;

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            13px 13px 27px
            rgba(91,76,118,.18),

            -10px -10px 23px
            rgba(255,255,255,.90);

          transform:
            translateZ(0);

          transition:
            transform 350ms cubic-bezier(.22,.61,.36,1),
            box-shadow 350ms ease;
        }

        .collection-feature-card:hover {
          transform:
            translateY(-5px);

          box-shadow:
            17px 17px 33px
            rgba(91,76,118,.22),

            -12px -12px 25px
            rgba(255,255,255,.95);
        }

        .collection-main-image {
          width:
            100%;

          height:
            100%;

          display:
            block;

          object-fit:
            cover;

          object-position:
            center top;

          filter:
            saturate(.88)
            contrast(.98);

          transition:
            transform
            1000ms
            cubic-bezier(.22,.61,.36,1),
            filter 500ms ease;
        }

        .collection-feature-card:hover
        .collection-main-image {
          transform:
            scale(1.045);

          filter:
            saturate(.98)
            contrast(1.02);
        }

        /* =========================================================
           IMAGE OVERLAY
           ========================================================= */

        .collection-image-overlay {
          position:
            absolute;

          inset:
            0;

          background:
            linear-gradient(
              to bottom,
              rgba(44,35,57,.03) 0%,
              rgba(44,35,57,.03) 40%,
              rgba(44,35,57,.72) 100%
            );

          z-index:
            1;
        }

        .collection-image-soft-glow {
          position:
            absolute;

          inset:
            0;

          background:
            radial-gradient(
              circle at 50% 25%,
              rgba(255,255,255,.12),
              transparent 42%
            );

          opacity:
            .7;

          z-index:
            2;

          pointer-events:
            none;
        }

        /* =========================================================
           IMAGE SHEEN
           ========================================================= */

        .collection-image-sheen {
          position:
            absolute;

          inset:
            0;

          z-index:
            3;

          pointer-events:
            none;

          background:
            linear-gradient(
              115deg,
              transparent 0%,
              transparent 40%,
              rgba(255,255,255,.17) 50%,
              transparent 60%,
              transparent 100%
            );

          transform:
            translateX(-125%);

          transition:
            transform
            1000ms
            cubic-bezier(.22,.61,.36,1);
        }

        .collection-feature-card:hover
        .collection-image-sheen,

        .collection-small-card:hover
        .collection-image-sheen {
          transform:
            translateX(125%);
        }

        /* =========================================================
           CARD CONTENT
           ========================================================= */

        .collection-feature-content {
          position:
            absolute;

          left:
            0;

          right:
            0;

          bottom:
            0;

          z-index:
            5;

          display:
            flex;

          align-items:
            flex-end;

          justify-content:
            space-between;

          gap:
            18px;

          padding:
            28px;
        }

        .collection-meta {
          color:
            #ddd3e8;

          font-family:
            monospace;

          font-size:
            8px;

          font-weight:
            800;

          letter-spacing:
            .23em;

          text-transform:
            uppercase;
        }

        .collection-feature-title {
          margin:
            4px 0 0;

          color:
            #fff;

          font-family:
            'Syne',
            sans-serif;

          font-size:
            clamp(
              31px,
              4vw,
              44px
            );

          font-weight:
            900;

          letter-spacing:
            -.025em;

          line-height:
            .95;

          text-transform:
            uppercase;
        }

        .collection-description {
          max-width:
            440px;

          margin-top:
            8px;

          color:
            rgba(255,255,255,.78);

          font-size:
            11px;

          line-height:
            1.6;
        }

        /* =========================================================
           NUMBER BADGE
           ========================================================= */

        .collection-number {
          position:
            absolute;

          top:
            17px;

          left:
            18px;

          z-index:
            5;

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          padding:
            6px 9px;

          border-radius:
            9px;

          color:
            rgba(255,255,255,.84);

          background:
            rgba(48,39,62,.28);

          border:
            1px solid
            rgba(255,255,255,.20);

          backdrop-filter:
            blur(9px);

          font-family:
            monospace;

          font-size:
            8px;

          letter-spacing:
            .16em;
        }

        .collection-number-line {
          width:
            24px;

          height:
            1px;

          background:
            rgba(255,255,255,.35);
        }

        /* =========================================================
           FEATURE ARROW
           ========================================================= */

        .collection-arrow {
          width:
            48px;

          height:
            48px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            15px;

          color:
            #fff;

          background:
            rgba(48,39,62,.42);

          border:
            1px solid
            rgba(255,255,255,.28);

          backdrop-filter:
            blur(10px);

          box-shadow:
            5px 5px 10px
            rgba(25,19,34,.20),

            inset 1px 1px 0
            rgba(255,255,255,.12);

          transition:
            transform 350ms ease,
            background 350ms ease,
            color 350ms ease,
            box-shadow 350ms ease;
        }

        .collection-feature-card:hover
        .collection-arrow {
          color:
            #6849a4;

          background:
            linear-gradient(
              145deg,
              #f8f5fc,
              #ddd7e8
            );

          transform:
            translateY(-3px)
            scale(1.05);

          box-shadow:
            7px 7px 14px
            rgba(38,29,51,.20),

            -5px -5px 10px
            rgba(255,255,255,.72);
        }

        /* =========================================================
           SMALL CARDS
           ========================================================= */

        .collection-small-card {
          position:
            relative;

          height:
            350px;

          overflow:
            hidden;

          cursor:
            pointer;

          isolation:
            isolate;

          border-radius:
            21px;

          background:
            #ddd7e8;

          border:
            1px solid
            rgba(255,255,255,.91);

          box-shadow:
            10px 10px 22px
            rgba(91,76,118,.16),

            -8px -8px 18px
            rgba(255,255,255,.88);

          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .collection-small-card:hover {
          transform:
            translateY(-4px);

          box-shadow:
            14px 14px 27px
            rgba(91,76,118,.20),

            -10px -10px 21px
            rgba(255,255,255,.94);
        }

        .collection-small-image {
          width:
            100%;

          height:
            100%;

          display:
            block;

          object-fit:
            cover;

          filter:
            saturate(.88);

          transition:
            transform
            850ms
            cubic-bezier(.22,.61,.36,1),
            filter 450ms ease;
        }

        .collection-small-card:hover
        .collection-small-image {
          transform:
            scale(1.065);

          filter:
            saturate(.98);
        }

        .collection-small-overlay {
          position:
            absolute;

          inset:
            0;

          z-index:
            1;

          background:
            linear-gradient(
              to bottom,
              rgba(44,35,57,.04),
              rgba(44,35,57,.70)
            );
        }

        .collection-small-number {
          position:
            absolute;

          top:
            14px;

          left:
            14px;

          z-index:
            5;

          width:
            28px;

          height:
            28px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            9px;

          color:
            rgba(255,255,255,.86);

          background:
            rgba(48,39,62,.30);

          border:
            1px solid
            rgba(255,255,255,.20);

          backdrop-filter:
            blur(8px);

          font-family:
            monospace;

          font-size:
            8px;
        }

        .collection-small-content {
          position:
            absolute;

          left:
            0;

          right:
            0;

          bottom:
            0;

          z-index:
            5;

          display:
            flex;

          align-items:
            flex-end;

          justify-content:
            space-between;

          gap:
            10px;

          padding:
            18px;
        }

        .collection-small-title {
          color:
            #fff;

          font-family:
            'Syne',
            sans-serif;

          font-size:
            18px;

          font-weight:
            900;

          line-height:
            1;

          text-transform:
            uppercase;
        }

        .collection-small-description {
          margin-top:
            5px;

          color:
            rgba(255,255,255,.75);

          font-size:
            9px;
        }

        .collection-small-arrow {
          width:
            34px;

          height:
            34px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            10px;

          color:
            #fff;

          background:
            rgba(48,39,62,.38);

          border:
            1px solid
            rgba(255,255,255,.22);

          backdrop-filter:
            blur(8px);

          transition:
            transform 250ms ease,
            background 250ms ease,
            color 250ms ease;
        }

        .collection-small-card:hover
        .collection-small-arrow {
          color:
            #6849a4;

          background:
            #eeeaf6;

          transform:
            translateX(2px)
            translateY(-2px);
        }

        /* =========================================================
           RESPONSIVE
           ========================================================= */

        @media (max-width: 1024px) {

          .collections-inner {
            padding:
              0 24px;
          }

          .collection-feature-card {
            height:
              460px;
          }

          .collection-small-card {
            height:
              310px;
          }

        }

        @media (max-width: 767px) {

          .collections-section {
            padding-top:
              55px !important;

            padding-bottom:
              60px !important;
          }

          .collections-inner {
            padding:
              0 14px;
          }

          .collections-header {
            align-items:
              flex-start;

            flex-direction:
              column;

            gap:
              16px;

            margin-bottom:
              22px;

            padding-bottom:
              17px;
          }

          .collections-kicker {
            font-size:
              7px;

            letter-spacing:
              .19em;

            margin-bottom:
              8px;
          }

          .collections-kicker-line {
            width:
              20px;
          }

          .collections-title {
            font-size:
              clamp(
                27px,
                9vw,
                42px
              );

            line-height:
              .94;
          }

          .collections-all-button {
            min-height:
              38px;

            padding:
              0 11px;

            font-size:
              7px;

            align-self:
              flex-start;
          }

          .collection-feature-card {
            height:
              410px;

            border-radius:
              18px;
          }

          .collection-feature-content {
            padding:
              18px;
          }

          .collection-meta {
            font-size:
              7px;
          }

          .collection-feature-title {
            font-size:
              31px;
          }

          .collection-description {
            max-width:
              280px;

            font-size:
              9px;

            line-height:
              1.5;
          }

          .collection-arrow {
            width:
              40px;

            height:
              40px;

            border-radius:
              12px;
          }

          .collection-number {
            top:
              12px;

            left:
              12px;
          }

          .collection-small-card {
            height:
              260px;

            border-radius:
              16px;
          }

          .collection-small-content {
            padding:
              14px;
          }

          .collection-small-title {
            font-size:
              15px;
          }

          .collection-small-description {
            font-size:
              8px;
          }

          .collection-small-arrow {
            width:
              31px;

            height:
              31px;

            border-radius:
              9px;
          }

        }

        @media (max-width: 390px) {

          .collections-inner {
            padding:
              0 11px;
          }

          .collection-feature-card {
            height:
              385px;

            border-radius:
              16px;
          }

          .collection-feature-content {
            padding:
              15px;
          }

          .collection-feature-title {
            font-size:
              28px;
          }

          .collection-description {
            max-width:
              230px;

            font-size:
              8px;
          }

          .collection-arrow {
            width:
              36px;

            height:
              36px;
          }

          .collection-small-card {
            height:
              235px;

            border-radius:
              14px;
          }

          .collection-small-content {
            padding:
              11px;
          }

          .collection-small-title {
            font-size:
              13px;
          }

          .collection-small-description {
            font-size:
              7px;
          }

        }

        @media (min-width: 1536px) {

          .collections-inner {
            padding:
              0 28px;
          }

          .collection-feature-card {
            height:
              550px;
          }

          .collection-small-card {
            height:
              380px;
          }

        }

        /* =========================================================
           ACCESSIBILITY / MOTION
           ========================================================= */

        @media (prefers-reduced-motion: reduce) {

          .collection-feature-card,
          .collection-small-card,
          .collection-main-image,
          .collection-small-image,
          .collection-image-sheen,
          .collection-arrow,
          .collection-small-arrow,
          .collections-all-button {
            transition:
              none !important;
          }

          .collection-feature-card:hover,
          .collection-small-card:hover {
            transform:
              none !important;
          }

        }

      `}</style>

      <section
        className="
          collections-section
          relative
          w-full
          overflow-hidden
          py-16
          sm:py-20
          lg:py-24
        "
      >

        {/* =======================================================
            AMBIENT CLAY LIGHT
            ======================================================= */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
          "
          style={{
            background:
              `
              radial-gradient(
                circle at 50% 0%,
                rgba(255,255,255,.55),
                transparent 30%
              )
              `
          }}
        />

        <div className="collections-inner">

          {/* =====================================================
              SECTION HEADER
              ===================================================== */}

          <div className="collections-header">

            <div className="collections-heading-wrap">

              <div className="collections-kicker">

                <span className="collections-kicker-line" />

                <span>
                  Curated Wardrobe
                </span>

              </div>

              <h2 className="collections-title">

                Explore Our

                <br />

                <span className="collections-title-accent">
                  Collections
                </span>

              </h2>

            </div>

            <button
              onClick={function () {
                openCatalog('all');
              }}
              className="collections-all-button"
            >

              <span>
                View All Collections
              </span>

              <ArrowUpRight
                className="
                  w-4
                  h-4
                "
              />

            </button>

          </div>

          {/* =====================================================
              MEN + WOMEN
              ===================================================== */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
              lg:gap-6
              mb-5
              lg:mb-6
            "
          >

            {/* ===================================================
                MEN
                =================================================== */}

            <div
              onClick={function () {
                openCatalog('men');
              }}
              className="
                collection-feature-card
                group
              "
            >

              <img
                src={ASSETS.denimJacketShoot}
                alt="Men's Collection"
                className="collection-main-image"
              />

              <div className="collection-image-overlay" />

              <div className="collection-image-soft-glow" />

              <div className="collection-image-sheen" />

              <div className="collection-number">

                <span>
                  01
                </span>

                <span className="collection-number-line" />

                <span>
                  MEN
                </span>

              </div>

              <div className="collection-feature-content">

                <div>

                  <div className="collection-meta">
                    Collection 01
                  </div>

                  <h3 className="collection-feature-title">
                    Men
                  </h3>

                  <p className="collection-description">
                    Modern fits for every mood.
                    Tailored denim, jackets &amp; boxy tees.
                  </p>

                </div>

                <div className="collection-arrow">

                  <ArrowUpRight
                    className="
                      w-5
                      h-5
                    "
                  />

                </div>

              </div>

            </div>

            {/* ===================================================
                WOMEN
                =================================================== */}

            <div
              onClick={function () {
                openCatalog('women');
              }}
              className="
                collection-feature-card
                group
              "
            >

              <img
                src={ASSETS.womenCropShoot}
                alt="Women's Collection"
                className="collection-main-image"
              />

              <div className="collection-image-overlay" />

              <div className="collection-image-soft-glow" />

              <div className="collection-image-sheen" />

              <div className="collection-number">

                <span>
                  02
                </span>

                <span className="collection-number-line" />

                <span>
                  WOMEN
                </span>

              </div>

              <div className="collection-feature-content">

                <div>

                  <div className="collection-meta">
                    Collection 02
                  </div>

                  <h3 className="collection-feature-title">
                    Women
                  </h3>

                  <p className="collection-description">
                    Style that speaks you.
                    High-rise wide leg cuts &amp; seamless micro-knits.
                  </p>

                </div>

                <div className="collection-arrow">

                  <ArrowUpRight
                    className="
                      w-5
                      h-5
                    "
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              SMALL COLLECTIONS
              ===================================================== */}

          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-4
              lg:gap-6
            "
          >

            {/* ===================================================
                JEANS
                =================================================== */}

            <div
              onClick={function () {
                openCatalog('jeans');
              }}
              className="
                collection-small-card
                group
              "
            >

              <img
                src={ASSETS.denimJeansDetail}
                alt="Selvedge Jeans"
                className="collection-small-image"
              />

              <div className="collection-small-overlay" />

              <div className="collection-image-sheen" />

              <div className="collection-small-number">
                03
              </div>

              <div className="collection-small-content">

                <div>

                  <h3 className="collection-small-title">
                    Jeans
                  </h3>

                  <p className="collection-small-description">
                    Fits for every story
                  </p>

                </div>

                <div className="collection-small-arrow">

                  <ArrowUpRight
                    className="
                      w-4
                      h-4
                    "
                  />

                </div>

              </div>

            </div>

            {/* ===================================================
                T-SHIRTS
                =================================================== */}

            <div
              onClick={function () {
                openCatalog('t-shirts');
              }}
              className="
                collection-small-card
                group
              "
            >

              <img
                src={ASSETS.oversizedTeeShoot}
                alt="Oversized T-Shirts"
                className="collection-small-image"
              />

              <div className="collection-small-overlay" />

              <div className="collection-image-sheen" />

              <div className="collection-small-number">
                04
              </div>

              <div className="collection-small-content">

                <div>

                  <h3 className="collection-small-title">
                    T-Shirts
                  </h3>

                  <p className="collection-small-description">
                    280 GSM Heavyweight
                  </p>

                </div>

                <div className="collection-small-arrow">

                  <ArrowUpRight
                    className="
                      w-4
                      h-4
                    "
                  />

                </div>

              </div>

            </div>

            {/* ===================================================
                TOPS
                =================================================== */}

            <div
              onClick={function () {
                openCatalog('tops');
              }}
              className="
                collection-small-card
                group
              "
            >

              <img
                src={ASSETS.womenCropShoot}
                alt="Tops & Knits"
                className="collection-small-image"
              />

              <div className="collection-small-overlay" />

              <div className="collection-image-sheen" />

              <div className="collection-small-number">
                05
              </div>

              <div className="collection-small-content">

                <div>

                  <h3 className="collection-small-title">
                    Tops
                  </h3>

                  <p className="collection-small-description">
                    Seamless Ribbed Knits
                  </p>

                </div>

                <div className="collection-small-arrow">

                  <ArrowUpRight
                    className="
                      w-4
                      h-4
                    "
                  />

                </div>

              </div>

            </div>

            {/* ===================================================
                JACKETS
                =================================================== */}

            <div
              onClick={function () {
                openCatalog('jackets');
              }}
              className="
                collection-small-card
                group
              "
            >

              <img
                src={ASSETS.denimJacketShoot}
                alt="Jackets & Outerwear"
                className="collection-small-image"
              />

              <div className="collection-small-overlay" />

              <div className="collection-image-sheen" />

              <div className="collection-small-number">
                06
              </div>

              <div className="collection-small-content">

                <div>

                  <h3 className="collection-small-title">
                    Jackets
                  </h3>

                  <p className="collection-small-description">
                    Selvedge Outerwear
                  </p>

                </div>

                <div className="collection-small-arrow">

                  <ArrowUpRight
                    className="
                      w-4
                      h-4
                    "
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
};