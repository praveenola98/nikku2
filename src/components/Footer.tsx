import React, { useState } from 'react';
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ArrowUpRight,
  MapPin,
  Mail,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = function () {
  const { openCatalog, setIsSizeGuideOpen } = useShop();

  const [newsletterInput, setNewsletterInput] =
    useState('');

  const [submitted, setSubmitted] =
    useState(false);

  const handleSub = function (
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (newsletterInput.trim()) {
      setSubmitted(true);
    }
  };

  const handleBackToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <style>{`

        /* =====================================================
           FOOTER BASE
        ===================================================== */

        .nikku-footer {
          position: relative;
          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              #e9e5f1 0%,
              #e1dbea 45%,
              #d8d1e3 100%
            );

          color: #2d283b;
        }


        /* Soft ambient blobs */

        .footer-ambient-one {
          position: absolute;
          width: 360px;
          height: 360px;
          top: -180px;
          right: -100px;

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              rgba(143,117,207,0.14),
              transparent 68%
            );

          pointer-events: none;
          filter: blur(8px);
        }


        .footer-ambient-two {
          position: absolute;
          width: 300px;
          height: 300px;
          bottom: 80px;
          left: -150px;

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              rgba(175,154,220,0.13),
              transparent 68%
            );

          pointer-events: none;
          filter: blur(10px);
        }


        /* =====================================================
           SECTION DIVIDERS
        ===================================================== */

        .footer-divider {
          border-color:
            rgba(93, 79, 119, 0.12);
        }


        /* =====================================================
           BRAND LABEL
        ===================================================== */

        .footer-brand-label {
          color: #7658bd;
          text-shadow:
            1px 1px 1px rgba(255,255,255,0.75);
        }


        /* =====================================================
           TOP BRAND PANEL
        ===================================================== */

        .footer-statement-panel {
          position: relative;

          padding: 38px 42px;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(239,236,247,0.9),
              rgba(218,211,230,0.82)
            );

          border:
            1px solid
            rgba(255,255,255,0.72);

          box-shadow:
            12px 12px 28px
            rgba(83,69,111,0.17),

            -12px -12px 28px
            rgba(255,255,255,0.86),

            inset 1px 1px 4px
            rgba(255,255,255,0.7);

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }


        .footer-main-heading {
          color: #2d273c;

          text-shadow:
            1px 1px 1px rgba(255,255,255,0.85),

            3px 4px 8px
            rgba(86,70,118,0.10);
        }


        .footer-heading-highlight {
          color: #7155b4;
        }


        /* =====================================================
           FOOTER CARDS
        ===================================================== */

        .footer-card {
          position: relative;

          padding: 28px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(239,236,247,0.88),
              rgba(219,212,231,0.82)
            );

          border:
            1px solid
            rgba(255,255,255,0.66);

          box-shadow:
            9px 9px 22px
            rgba(82,68,110,0.15),

            -9px -9px 22px
            rgba(255,255,255,0.8),

            inset 1px 1px 3px
            rgba(255,255,255,0.58);

          transition:
            transform 280ms ease,
            box-shadow 280ms ease;
        }


        .footer-card:hover {
          transform: translateY(-2px);

          box-shadow:
            12px 12px 27px
            rgba(82,68,110,0.18),

            -11px -11px 25px
            rgba(255,255,255,0.84),

            inset 1px 1px 3px
            rgba(255,255,255,0.65);
        }


        /* =====================================================
           HEADINGS
        ===================================================== */

        .footer-section-title {
          color: #363044;

          text-shadow:
            1px 1px 1px
            rgba(255,255,255,0.8);
        }


        .footer-small-label {
          color: #786d88;
        }


        /* =====================================================
           NAV LINKS
        ===================================================== */

        .footer-nav-link {
          position: relative;

          display: inline-flex;
          align-items: center;

          color: #756d80;

          transition:
            color 220ms ease,
            transform 220ms ease;
        }


        .footer-nav-link::after {
          content: '';

          position: absolute;

          left: 0;
          bottom: -4px;

          width: 100%;
          height: 2px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              #8b6bd0,
              #b5a1e1
            );

          transform:
            scaleX(0);

          transform-origin: right;

          transition:
            transform 260ms ease;
        }


        .footer-nav-link:hover {
          color: #664da1;

          transform:
            translateX(3px);
        }


        .footer-nav-link:hover::after {
          transform:
            scaleX(1);

          transform-origin: left;
        }


        /* =====================================================
           SOCIAL BUTTONS
        ===================================================== */

        .footer-social {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 42px;
          height: 42px;

          border-radius: 14px;

          color: #766e82;

          background:
            linear-gradient(
              145deg,
              #eeeaf5,
              #d8d1e4
            );

          border:
            1px solid
            rgba(255,255,255,0.7);

          box-shadow:
            6px 6px 13px
            rgba(81,67,108,0.17),

            -6px -6px 13px
            rgba(255,255,255,0.86),

            inset 1px 1px 3px
            rgba(255,255,255,0.7);

          transition:
            color 220ms ease,
            transform 220ms ease,
            box-shadow 220ms ease;
        }


        .footer-social:hover {
          color: #7355b9;

          transform:
            translateY(-3px);

          box-shadow:
            8px 8px 17px
            rgba(81,67,108,0.2),

            -7px -7px 16px
            rgba(255,255,255,0.9),

            inset 1px 1px 3px
            rgba(255,255,255,0.75);
        }


        .footer-social:active {
          transform:
            translateY(0);

          box-shadow:
            inset 4px 4px 9px
            rgba(85,70,112,0.18),

            inset -4px -4px 8px
            rgba(255,255,255,0.7);
        }


        /* =====================================================
           STUDIO INFO
        ===================================================== */

        .footer-location-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 34px;
          height: 34px;

          border-radius: 11px;

          background:
            linear-gradient(
              145deg,
              #efebf6,
              #d8d0e5
            );

          box-shadow:
            5px 5px 10px
            rgba(81,67,108,0.15),

            -5px -5px 10px
            rgba(255,255,255,0.82),

            inset 1px 1px 3px
            rgba(255,255,255,0.7);
        }


        .footer-accent-text {
          color: #7658bd;
        }


        /* =====================================================
           NEWSLETTER
        ===================================================== */

        .footer-newsletter {
          display: flex;
          align-items: center;

          min-height: 54px;

          padding: 5px;

          border-radius: 17px;

          background:
            linear-gradient(
              145deg,
              #d9d2e4,
              #eeeaf5
            );

          border:
            1px solid
            rgba(255,255,255,0.72);

          box-shadow:
            inset 5px 5px 11px
            rgba(91,75,119,0.14),

            inset -5px -5px 11px
            rgba(255,255,255,0.72);

          transition:
            box-shadow 220ms ease;
        }


        .footer-newsletter:focus-within {
          box-shadow:
            inset 5px 5px 11px
            rgba(91,75,119,0.16),

            inset -5px -5px 11px
            rgba(255,255,255,0.76),

            0 0 0 2px
            rgba(122,92,191,0.14);
        }


        .footer-newsletter input {
          color: #393143;
        }


        .footer-newsletter input::placeholder {
          color: #958da1;
        }


        .footer-join {
          min-height: 44px;

          border-radius: 13px;

          background:
            linear-gradient(
              145deg,
              #9478d4,
              #7255b8
            );

          color: white;

          box-shadow:
            5px 5px 11px
            rgba(81,65,111,0.22),

            -4px -4px 9px
            rgba(255,255,255,0.52),

            inset 1px 1px 2px
            rgba(255,255,255,0.28);

          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            background 220ms ease;
        }


        .footer-join:hover {
          background:
            linear-gradient(
              145deg,
              #a088dc,
              #7a5bc0
            );

          transform:
            translateY(-1px);

          box-shadow:
            7px 7px 14px
            rgba(81,65,111,0.25),

            -5px -5px 10px
            rgba(255,255,255,0.58);
        }


        .footer-join:active {
          transform:
            translateY(1px);

          box-shadow:
            inset 4px 4px 8px
            rgba(69,54,98,0.24),

            inset -3px -3px 7px
            rgba(255,255,255,0.42);
        }


        /* =====================================================
           SUCCESS MESSAGE
        ===================================================== */

        .footer-success {
          display: inline-flex;
          align-items: center;

          padding: 7px 12px;

          border-radius: 999px;

          color: #664da1;

          background:
            linear-gradient(
              145deg,
              #eeeaf6,
              #d9d1e6
            );

          box-shadow:
            inset 3px 3px 7px
            rgba(83,68,110,0.12),

            inset -3px -3px 7px
            rgba(255,255,255,0.72);
        }


        /* =====================================================
           STORE STRIP
        ===================================================== */

        .footer-store-strip {
          padding: 18px 22px;

          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              rgba(225,219,235,0.78),
              rgba(238,234,246,0.72)
            );

          border:
            1px solid
            rgba(255,255,255,0.55);

          box-shadow:
            inset 3px 3px 8px
            rgba(84,69,110,0.08),

            inset -3px -3px 8px
            rgba(255,255,255,0.68);
        }


        /* =====================================================
           LEGAL LINKS
        ===================================================== */

        .footer-legal {
          color: #837b8d;

          transition:
            color 220ms ease,
            transform 220ms ease;
        }


        .footer-legal:hover {
          color: #674da3;
        }


        /* =====================================================
           BACK TO TOP
        ===================================================== */

        .footer-top-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding: 8px 13px;

          border-radius: 12px;

          color: #6d5a91;

          background:
            linear-gradient(
              145deg,
              #eeeaf5,
              #d9d2e5
            );

          box-shadow:
            4px 4px 9px
            rgba(82,68,108,0.13),

            -4px -4px 9px
            rgba(255,255,255,0.76);

          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
        }


        .footer-top-button:hover {
          transform:
            translateY(-2px);

          box-shadow:
            6px 6px 12px
            rgba(82,68,108,0.17),

            -5px -5px 11px
            rgba(255,255,255,0.84);
        }


        .footer-top-button:active {
          transform:
            translateY(0);

          box-shadow:
            inset 3px 3px 7px
            rgba(82,68,108,0.14),

            inset -3px -3px 7px
            rgba(255,255,255,0.7);
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {

          .footer-statement-panel {
            padding: 24px 20px;
            border-radius: 22px;
          }

          .footer-card {
            padding: 21px;
            border-radius: 21px;
          }

          .footer-newsletter {
            min-height: 52px;
          }

          .footer-join {
            padding-left: 17px;
            padding-right: 17px;
          }

          .footer-store-strip {
            padding: 16px;
          }
        }


        /* =====================================================
           VERY SMALL MOBILE
        ===================================================== */

        @media (max-width: 380px) {

          .footer-statement-panel {
            padding: 20px 16px;
          }

          .footer-card {
            padding: 18px;
          }

          .footer-social {
            width: 39px;
            height: 39px;
            border-radius: 12px;
          }

          .footer-newsletter {
            padding: 4px;
          }

          .footer-join {
            min-height: 42px;
            padding-left: 13px;
            padding-right: 13px;
          }
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (min-width: 641px) and (max-width: 1024px) {

          .footer-statement-panel {
            padding: 32px;
          }

          .footer-card {
            padding: 24px;
          }
        }


        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        @media (min-width: 1536px) {

          .footer-statement-panel {
            padding: 46px 50px;
          }

          .footer-card {
            padding: 31px;
          }
        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .footer-card,
          .footer-nav-link,
          .footer-social,
          .footer-newsletter,
          .footer-join,
          .footer-legal,
          .footer-top-button {
            transition: none !important;
          }
        }

      `}</style>


      <footer className="nikku-footer w-full">


        {/* Ambient decoration */}

        <div className="footer-ambient-one" />
        <div className="footer-ambient-two" />


        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">


          {/* =====================================================
              TOP BRAND STATEMENT
          ===================================================== */}

          <div className="py-10 sm:py-14 lg:py-20">


            <div className="footer-statement-panel">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">


                <div className="lg:col-span-7">

                  <p className="
                    footer-brand-label
                    text-[9px]
                    tracking-[0.32em]
                    uppercase
                    mb-5
                    font-bold
                  ">
                    Nikku Fashion · Nawalgarh
                  </p>


                  <h2 className="
                    footer-main-heading
                    font-['Syne']
                    text-[clamp(2rem,4.5vw,4.8rem)]
                    leading-[0.95]
                    tracking-[-0.045em]
                    font-semibold
                    uppercase
                    max-w-4xl
                  ">
                    Wear it.
                    <br />
                    <span className="footer-heading-highlight">
                      Make it yours.
                    </span>
                  </h2>

                </div>


                <div className="lg:col-span-5 lg:pb-1">

                  <p className="
                    max-w-md
                    text-sm
                    leading-7
                    text-[#756d80]
                    font-medium
                  ">
                    Contemporary clothing and artisanal denim
                    made for everyday life. Designed with a focus
                    on fit, fabric and lasting style.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              MAIN FOOTER
          ===================================================== */}

          <div className="pb-12 sm:pb-16 lg:pb-20">


            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-12
              gap-5
              lg:gap-6
            ">


              {/* =================================================
                  BRAND
              ================================================= */}

              <div className="footer-card lg:col-span-4">

                <div className="mb-7">

                  <div className="
                    font-['Syne']
                    text-lg
                    sm:text-xl
                    font-bold
                    tracking-[0.2em]
                    text-[#302a3e]
                    uppercase
                  ">
                    NIKKU FASHION
                  </div>

                  <div className="
                    text-[9px]
                    tracking-[0.38em]
                    uppercase
                    footer-brand-label
                    mt-2
                    font-bold
                  ">
                    NAWALGARH
                  </div>

                </div>


                <p className="
                  max-w-sm
                  text-xs
                  sm:text-sm
                  leading-6
                  text-[#756d80]
                  font-medium
                ">
                  Modern contemporary clothing and artisanal
                  denim for men and women. Crafted in Nawalgarh,
                  Rajasthan.
                </p>


                {/* Socials */}

                <div className="
                  flex
                  items-center
                  gap-2
                  mt-8
                ">

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="footer-social"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>


                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="footer-social"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>


                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="footer-social"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>


                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="footer-social"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>

                </div>

              </div>


              {/* =================================================
                  SHOP
              ================================================= */}

              <div className="footer-card lg:col-span-2">

                <h3 className="
                  footer-section-title
                  text-[10px]
                  tracking-[0.25em]
                  uppercase
                  font-bold
                  mb-6
                ">
                  Shop
                </h3>


                <ul className="
                  space-y-4
                  text-xs
                ">

                  <li>
                    <button
                      onClick={function () {
                        openCatalog('men');
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Men’s Collection
                    </button>
                  </li>


                  <li>
                    <button
                      onClick={function () {
                        openCatalog('women');
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Women’s Collection
                    </button>
                  </li>


                  <li>
                    <button
                      onClick={function () {
                        openCatalog('jeans');
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Selvedge Denim
                    </button>
                  </li>


                  <li>
                    <button
                      onClick={function () {
                        openCatalog('t-shirts');
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Heavyweight T-Shirts
                    </button>
                  </li>


                  <li>
                    <button
                      onClick={function () {
                        openCatalog('jackets');
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Outerwear &amp; Jackets
                    </button>
                  </li>

                </ul>

              </div>


              {/* =================================================
                  CLIENT CARE
              ================================================= */}

              <div className="footer-card lg:col-span-2">

                <h3 className="
                  footer-section-title
                  text-[10px]
                  tracking-[0.25em]
                  uppercase
                  font-bold
                  mb-6
                ">
                  Client Care
                </h3>


                <ul className="
                  space-y-4
                  text-xs
                ">

                  <li>
                    <button
                      onClick={function () {
                        alert(
                          'Shipping: Fast 2-4 day pan-India doorstep delivery.'
                        );
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Shipping Policy
                    </button>
                  </li>


                  <li>
                    <button
                      onClick={function () {
                        alert(
                          'Returns: 7-day hassle-free doorstep returns and exchanges.'
                        );
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      7-Day Returns &amp; Exchanges
                    </button>
                  </li>


                  <li>
                    <button
                      onClick={function () {
                        setIsSizeGuideOpen(true);
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Size &amp; Fit Guide
                    </button>
                  </li>


                  <li>
                    <button
                      onClick={function () {
                        alert(
                          'Store Contact: WhatsApp / Call +91 98290 00000 · Nawalgarh'
                        );
                      }}
                      className="footer-nav-link cursor-pointer"
                    >
                      Contact Studio
                    </button>
                  </li>

                </ul>

              </div>


              {/* =================================================
                  STUDIO + NEWSLETTER
              ================================================= */}

              <div className="footer-card lg:col-span-4">

                <h3 className="
                  footer-section-title
                  text-[10px]
                  tracking-[0.25em]
                  uppercase
                  font-bold
                  mb-6
                ">
                  Flagship Studio
                </h3>


                <div className="
                  flex
                  items-start
                  gap-3
                  mb-8
                ">

                  <div className="footer-location-icon shrink-0">
                    <MapPin className="
                      w-4
                      h-4
                      text-[#7557b9]
                    " />
                  </div>


                  <div className="
                    text-xs
                    leading-6
                    text-[#756d80]
                    font-medium
                  ">

                    <p className="
                      text-[#383144]
                      font-bold
                    ">
                      Nikku Fashion Flagship
                    </p>

                    <p>
                      Station Road, Near Clock Tower
                    </p>

                    <p>
                      Nawalgarh, Rajasthan 333042
                    </p>

                    <p className="
                      footer-accent-text
                      mt-1
                      font-bold
                    ">
                      Mon–Sun · 10:00 AM – 9:30 PM
                    </p>

                  </div>

                </div>


                {/* Newsletter */}

                <div>

                  <div className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  ">

                    <Mail className="
                      w-3.5
                      h-3.5
                      text-[#7759bb]
                    " />

                    <p className="
                      text-[9px]
                      tracking-[0.28em]
                      uppercase
                      footer-small-label
                      font-bold
                    ">
                      New arrivals &amp; private drops
                    </p>

                  </div>


                  <form
                    onSubmit={handleSub}
                    className="footer-newsletter"
                  >

                    <input
                      type="email"
                      value={newsletterInput}
                      onChange={function (
                        e
                      ) {
                        setNewsletterInput(
                          e.target.value
                        );
                      }}
                      placeholder="Your email address"
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        px-3
                        py-3
                        text-xs
                        font-medium
                        focus:outline-none
                      "
                    />


                    <button
                      type="submit"
                      className="
                        footer-join
                        px-5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        shrink-0
                      "
                    >
                      Join
                    </button>

                  </form>


                  {submitted && (
                    <p className="
                      footer-success
                      text-[10px]
                      mt-3
                      font-semibold
                    ">
                      You're on the list.
                    </p>
                  )}

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              STORE STRIP
          ===================================================== */}

          <div className="pb-5">

            <div className="footer-store-strip">

              <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-3
              ">

                <p className="
                  text-[9px]
                  tracking-[0.22em]
                  uppercase
                  text-[#827a8c]
                  font-semibold
                ">
                  Nawalgarh · Rajasthan · India
                </p>


                <p className="
                  text-[9px]
                  tracking-[0.18em]
                  uppercase
                  text-[#827a8c]
                  font-semibold
                ">
                  Crafted for everyday wear
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              BOTTOM
          ===================================================== */}

          <div className="
            py-6
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            justify-between
            gap-5
          ">

            <p className="
              text-[10px]
              text-[#8b8395]
              font-medium
            ">
              © 2026 Nikku Fashion Nawalgarh.
              All rights reserved.
            </p>


            <div className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3
              text-[10px]
            ">

              <span className="
                footer-legal
                cursor-pointer
              ">
                Privacy Policy
              </span>


              <span className="
                footer-legal
                cursor-pointer
              ">
                Terms of Service
              </span>


              <span className="
                footer-legal
                cursor-pointer
              ">
                Refund Policy
              </span>


              <button
                type="button"
                onClick={handleBackToTop}
                className="
                  footer-top-button
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  cursor-pointer
                "
              >
                Back to top

                <ArrowUpRight className="
                  w-3
                  h-3
                " />
              </button>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
};