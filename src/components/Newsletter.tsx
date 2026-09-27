import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/products';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  const copyPromo = () => {
    navigator.clipboard.writeText('NIKKU10');
    setCopiedCode(true);

    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section className="newsletter-section relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">

      {/* Background */}
      <div className="absolute inset-0 bg-[#ddd8e8]" />

      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/35 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-48 -left-40 w-[550px] h-[550px] rounded-full bg-[#aaa0bd]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Main Clay Card */}
        <div className="newsletter-card relative overflow-hidden flex flex-col lg:flex-row items-stretch">

          {/* Top Decorative Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-[#9688a5] z-20 rounded-full" />

          {/* =========================
              IMAGE
          ========================= */}

          <div className="newsletter-image-wrapper w-full lg:w-5/12 h-64 sm:h-80 lg:h-[390px] relative overflow-hidden">

            <img
              src={ASSETS.oversizedTeeShoot}
              alt="Nikku VIP Club"
              className="newsletter-image w-full h-full object-cover object-top"
            />

            {/* Clay Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#d5cfe0]/90 hidden lg:block" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#d5cfe0]/80 via-transparent to-transparent lg:hidden" />

            <div className="absolute inset-0 bg-[#9c90aa]/10 mix-blend-multiply" />

            {/* Image Label */}
            <div className="absolute top-5 left-5 sm:top-7 sm:left-7 flex items-center gap-3">

              <span className="newsletter-label">
                026
              </span>

              <span className="w-8 h-[2px] bg-white/50 rounded-full" />

              <span className="newsletter-label uppercase">
                VIP CLUB
              </span>

            </div>

          </div>

          {/* =========================
              NEWSLETTER CONTENT
          ========================= */}

          <div className="relative w-full lg:w-7/12 p-6 sm:p-10 lg:p-12 xl:p-14 z-10 flex items-center">

            <div className="w-full">

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">

                <div className="newsletter-icon">
                  <Sparkles className="w-3.5 h-3.5 text-[#756a81]" />
                </div>

                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#756a81]">
                  EXCLUSIVE MEMBERSHIP
                </span>

              </div>

              {/* Heading */}
              <h2 className="font-['Syne'] text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#403848] tracking-tight leading-[0.98] mb-4 max-w-xl">
                GET 10% OFF
                <br className="hidden sm:block" />
                YOUR FIRST ORDER
              </h2>

              <p className="text-xs sm:text-sm text-[#716879] font-light max-w-lg mb-7 leading-relaxed">
                Be the first to access limited selvedge drops, seasonal releases,
                and Nawalgarh flagship studio events.
              </p>

              {!subscribed ? (

                /* =========================
                   SIGNUP FORM
                ========================= */

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md"
                >

                  <div className="relative flex-1">

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="newsletter-input w-full px-5 py-3.5 rounded-full text-sm text-[#4d4556] placeholder-[#93899c] focus:outline-none transition-all duration-300"
                    />

                  </div>

                  <button
                    type="submit"
                    className="newsletter-submit group relative overflow-hidden px-6 py-3.5 rounded-full text-[#443b4e] font-semibold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shrink-0"
                  >

                    <span className="relative z-10">
                      JOIN CLUB
                    </span>

                    <ArrowRight
                      className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    />

                  </button>

                </form>

              ) : (

                /* =========================
                   SUCCESS / COUPON
                ========================= */

                <div className="newsletter-success p-4 sm:p-5 max-w-md rounded-[22px]">

                  <div className="flex items-center gap-2 text-[#4a4252] text-sm font-semibold mb-2">

                    <div className="newsletter-check">
                      <Check className="w-3 h-3 text-[#675b73]" />
                    </div>

                    <span>
                      Welcome to Nikku Fashion
                    </span>

                  </div>

                  <p className="text-xs text-[#746b7c] mb-4">
                    Use coupon code at checkout for 10% discount:
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">

                    <span className="promo-code">
                      NIKKU10
                    </span>

                    <button
                      onClick={copyPromo}
                      className="copy-button"
                    >

                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#68755f]" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        'TAP TO COPY'
                      )}

                    </button>

                  </div>

                </div>

              )}

              {/* Benefits */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[9px] sm:text-[10px] text-[#81778a] uppercase tracking-[0.12em]">

                <span>NO SPAM</span>

                <span className="text-[#aaa1b2]">·</span>

                <span>UNSUBSCRIBE ANYTIME</span>

                <span className="text-[#aaa1b2]">·</span>

                <span className="text-[#756981]">
                  INSTANT VOUCHER
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`

        /* =========================
           MAIN CARD
        ========================= */

        .newsletter-card {
          min-height: 390px;

          background:
            linear-gradient(
              145deg,
              rgba(235,231,242,.94),
              rgba(209,203,224,.90)
            );

          border: 1px solid rgba(255,255,255,.62);

          border-radius: 34px;

          box-shadow:
            18px 18px 42px rgba(106,97,126,.20),
            -18px -18px 42px rgba(255,255,255,.75),
            inset 1px 1px 0 rgba(255,255,255,.58);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          isolation: isolate;
        }

        /* =========================
           IMAGE
        ========================= */

        .newsletter-image-wrapper {
          isolation: isolate;
        }

        .newsletter-image {
          will-change: transform;

          filter:
            saturate(.78)
            contrast(.94)
            brightness(1.03);

          transition:
            transform 1400ms cubic-bezier(.22,.61,.36,1);
        }

        .newsletter-card:hover .newsletter-image {
          transform: scale(1.035);
        }

        .newsletter-label {
          font-family: monospace;
          font-size: 9px;
          letter-spacing: .22em;
          color: rgba(255,255,255,.82);

          text-shadow:
            0 1px 5px rgba(0,0,0,.3);
        }

        /* =========================
           ICON
        ========================= */

        .newsletter-icon {
          width: 30px;
          height: 30px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              145deg,
              #e5deec,
              #c8bfd7
            );

          border: 1px solid rgba(255,255,255,.58);

          box-shadow:
            4px 4px 9px rgba(106,97,126,.16),
            -4px -4px 9px rgba(255,255,255,.72),
            inset 1px 1px 0 rgba(255,255,255,.55);
        }

        /* =========================
           INPUT
        ========================= */

        .newsletter-input {
          height: 54px;

          background:
            linear-gradient(
              145deg,
              #d1c9df,
              #e2ddea
            );

          border: 1px solid rgba(255,255,255,.62);

          box-shadow:
            inset 5px 5px 11px rgba(111,101,130,.15),
            inset -5px -5px 11px rgba(255,255,255,.72);

          caret-color: #71657e;
        }

        .newsletter-input:focus {
          border-color: rgba(126,113,143,.55);

          box-shadow:
            inset 5px 5px 11px rgba(111,101,130,.17),
            inset -5px -5px 11px rgba(255,255,255,.76),
            0 0 0 3px rgba(142,128,159,.10);
        }

        .newsletter-input::selection {
          background: rgba(126,113,143,.25);
        }

        /* =========================
           SUBMIT BUTTON
        ========================= */

        .newsletter-submit {
          height: 54px;

          background:
            linear-gradient(
              145deg,
              #d0c6de,
              #bdb1cf
            );

          border: 1px solid rgba(255,255,255,.62);

          box-shadow:
            7px 7px 16px rgba(106,97,126,.20),
            -7px -7px 16px rgba(255,255,255,.78),
            inset 1px 1px 0 rgba(255,255,255,.55);
        }

        .newsletter-submit:hover {
          transform: translateY(-2px);

          background:
            linear-gradient(
              145deg,
              #c5b9d4,
              #b2a4c4
            );

          box-shadow:
            9px 9px 20px rgba(106,97,126,.23),
            -9px -9px 20px rgba(255,255,255,.82);
        }

        .newsletter-submit:active {
          transform: translateY(0) scale(.98);

          box-shadow:
            inset 5px 5px 11px rgba(106,97,126,.18),
            inset -5px -5px 11px rgba(255,255,255,.72);
        }

        /* =========================
           SUCCESS CARD
        ========================= */

        .newsletter-success {
          background:
            linear-gradient(
              145deg,
              rgba(224,218,234,.92),
              rgba(202,195,217,.88)
            );

          border: 1px solid rgba(255,255,255,.60);

          box-shadow:
            inset 5px 5px 12px rgba(106,97,126,.13),
            inset -5px -5px 12px rgba(255,255,255,.70),
            5px 5px 12px rgba(106,97,126,.10);

          animation:
            newsletterSuccess
            400ms
            cubic-bezier(.22,.61,.36,1)
            both;
        }

        .newsletter-check {
          width: 22px;
          height: 22px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d0c6dc;

          box-shadow:
            inset 2px 2px 5px rgba(106,97,126,.18),
            inset -2px -2px 5px rgba(255,255,255,.72);
        }

        /* =========================
           PROMO CODE
        ========================= */

        .promo-code {
          font-family: monospace;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: .18em;

          color: #5e536b;

          padding: 9px 14px;

          border-radius: 12px;

          background:
            linear-gradient(
              145deg,
              #d0c7dd,
              #e2ddea
            );

          border: 1px solid rgba(255,255,255,.58);

          box-shadow:
            inset 3px 3px 7px rgba(106,97,126,.16),
            inset -3px -3px 7px rgba(255,255,255,.72);
        }

        /* =========================
           COPY BUTTON
        ========================= */

        .copy-button {
          display: flex;
          align-items: center;
          gap: 6px;

          padding: 9px 13px;

          border-radius: 999px;

          color: #6c6276;

          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .12em;

          background:
            linear-gradient(
              145deg,
              #e2ddea,
              #cbc3d8
            );

          border: 1px solid rgba(255,255,255,.58);

          box-shadow:
            4px 4px 9px rgba(106,97,126,.14),
            -4px -4px 9px rgba(255,255,255,.68);

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .copy-button:hover {
          color: #554b60;
          transform: translateY(-1px);
        }

        .copy-button:active {
          transform: scale(.97);

          box-shadow:
            inset 3px 3px 7px rgba(106,97,126,.16),
            inset -3px -3px 7px rgba(255,255,255,.70);
        }

        /* =========================
           ANIMATION
        ========================= */

        @keyframes newsletterSuccess {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 640px) {

          .newsletter-section {
            padding-top: 56px;
            padding-bottom: 56px;
          }

          .newsletter-card {
            border-radius: 27px;
            min-height: auto;
          }

          .newsletter-image-wrapper {
            height: 260px;
          }

          .newsletter-input,
          .newsletter-submit {
            height: 52px;
          }

          .newsletter-submit {
            width: 100%;
          }
        }

        /* =========================
           SMALL PHONES
        ========================= */

        @media (max-width: 380px) {

          .newsletter-card {
            border-radius: 23px;
          }

          .newsletter-image-wrapper {
            height: 235px;
          }
        }

        /* =========================
           LARGE DESKTOP
        ========================= */

        @media (min-width: 1536px) {

          .newsletter-card {
            min-height: 420px;
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {

          .newsletter-image,
          .newsletter-submit,
          .newsletter-success,
          .copy-button {
            transition: none !important;
            animation: none !important;
          }

          .newsletter-card:hover .newsletter-image {
            transform: none;
          }
        }

      `}</style>
    </section>
  );
};