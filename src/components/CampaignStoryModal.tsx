import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  ArrowRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CampaignStoryModal: React.FC = function () {
  const {
    isCampaignStoryOpen,
    setIsCampaignStoryOpen,
    openCatalog,
  } = useShop();

  const [isMuted, setIsMuted] = useState(true);

  if (!isCampaignStoryOpen) return null;

  const closeStory = function () {
    setIsCampaignStoryOpen(false);
  };

  const shopCollection = function () {
    setIsCampaignStoryOpen(false);
    openCatalog('all');
  };

  const toggleMute = function () {
    setIsMuted(function (value) {
      return !value;
    });
  };

  return (
    <>
      <style>{`
        /* =========================================================
           NIKKU CAMPAIGN STORY
           DEEP CLAYMORPHISM SYSTEM
        ========================================================= */

        @keyframes campaignModalIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes campaignFrameIn {
          from {
            opacity: 0;
            transform: translateY(28px) scale(.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes campaignContentIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes campaignImageDrift {
          from {
            transform: scale(1.02);
          }

          to {
            transform: scale(1.075);
          }
        }

        @keyframes clayFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes clayGlow {
          0%,
          100% {
            opacity: .45;
          }

          50% {
            opacity: .8;
          }
        }

        .campaign-modal {
          animation: campaignModalIn 360ms ease-out both;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(143, 112, 211, .18),
              transparent 38%
            ),
            rgba(35, 31, 49, .88);
        }

        /*
          Main clay shell
        */
        .campaign-frame {
          animation:
            campaignFrameIn 500ms cubic-bezier(.22,.61,.36,1) both;

          position: relative;
          isolation: isolate;

          border: 1px solid rgba(255,255,255,.28) !important;

          border-radius: 30px !important;

          background:
            linear-gradient(
              145deg,
              rgba(245,242,252,.18),
              rgba(197,187,220,.08)
            );

          box-shadow:
            22px 22px 55px rgba(0,0,0,.55),
            -12px -12px 35px rgba(255,255,255,.08),
            inset 1px 1px 0 rgba(255,255,255,.22),
            inset -1px -1px 0 rgba(0,0,0,.22);

          transform-style: preserve-3d;
        }

        /*
          Inner clay frame border
        */
        .campaign-frame::before {
          content: "";
          position: absolute;
          inset: 7px;
          z-index: 20;
          pointer-events: none;

          border-radius: 24px;

          border: 1px solid rgba(255,255,255,.12);

          box-shadow:
            inset 2px 2px 8px rgba(255,255,255,.08),
            inset -2px -2px 8px rgba(0,0,0,.16);
        }

        /*
          Soft outer glow
        */
        .campaign-frame::after {
          content: "";
          position: absolute;
          width: 42%;
          height: 45%;
          left: -8%;
          top: -12%;

          pointer-events: none;
          z-index: 2;

          background:
            radial-gradient(
              circle,
              rgba(184,162,232,.18),
              transparent 70%
            );

          filter: blur(25px);
          animation: clayGlow 5s ease-in-out infinite;
        }

        .campaign-content {
          animation:
            campaignContentIn
            550ms
            cubic-bezier(.22,.61,.36,1)
            120ms
            both;
        }

        .campaign-image {
          animation:
            campaignImageDrift
            14s
            ease-out
            forwards;
        }

        /*
          Video treatment
        */
        .campaign-video-shell {
          background:
            linear-gradient(
              145deg,
              #24202f,
              #111017
            );

          box-shadow:
            inset 8px 8px 20px rgba(0,0,0,.28),
            inset -6px -6px 18px rgba(255,255,255,.035);
        }

        /*
          Close clay button
        */
        .campaign-close {
          position: relative;

          border: 1px solid rgba(255,255,255,.25) !important;

          background:
            linear-gradient(
              145deg,
              rgba(238,233,248,.32),
              rgba(105,91,135,.22)
            ) !important;

          box-shadow:
            7px 7px 16px rgba(0,0,0,.45),
            -5px -5px 13px rgba(255,255,255,.09),
            inset 1px 1px 0 rgba(255,255,255,.18),
            inset -1px -1px 0 rgba(0,0,0,.16);

          backdrop-filter: blur(18px);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .campaign-close:hover {
          transform: translateY(-2px);

          border-color:
            rgba(178,155,229,.8) !important;

          box-shadow:
            9px 9px 20px rgba(0,0,0,.48),
            -6px -6px 14px rgba(255,255,255,.11),
            inset 1px 1px 0 rgba(255,255,255,.2);
        }

        .campaign-close:active {
          transform: translateY(1px);

          box-shadow:
            inset 5px 5px 12px rgba(0,0,0,.35),
            inset -4px -4px 9px rgba(255,255,255,.08);
        }

        .campaign-close svg {
          transition:
            transform 300ms ease,
            filter 200ms ease;
        }

        .campaign-close:hover svg {
          transform: rotate(90deg);
          filter:
            drop-shadow(0 0 5px rgba(190,165,238,.7));
        }

        /*
          Brand clay badge
        */
        .campaign-brand {
          position: relative;

          border: 1px solid rgba(224,214,244,.45) !important;

          background:
            linear-gradient(
              145deg,
              rgba(230,224,243,.32),
              rgba(89,75,119,.24)
            ) !important;

          border-radius: 14px !important;

          box-shadow:
            6px 6px 14px rgba(0,0,0,.38),
            -5px -5px 12px rgba(255,255,255,.09),
            inset 1px 1px 0 rgba(255,255,255,.18),
            inset -1px -1px 0 rgba(0,0,0,.14);

          backdrop-filter: blur(14px);

          transition:
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .campaign-brand:hover {
          transform: translateY(-2px);

          box-shadow:
            8px 8px 18px rgba(0,0,0,.42),
            -6px -6px 14px rgba(255,255,255,.1),
            inset 1px 1px 0 rgba(255,255,255,.2);
        }

        /*
          Top information glass-clay panel
        */
        .campaign-meta {
          padding: 9px 13px;

          border-radius: 16px;

          background:
            linear-gradient(
              145deg,
              rgba(236,231,248,.14),
              rgba(67,58,87,.13)
            );

          border:
            1px solid rgba(255,255,255,.14);

          box-shadow:
            6px 6px 15px rgba(0,0,0,.25),
            -5px -5px 14px rgba(255,255,255,.04),
            inset 1px 1px 0 rgba(255,255,255,.08);

          backdrop-filter: blur(14px);
        }

        /*
          Bottom information clay panel
        */
        .campaign-bottom-panel {
          position: relative;

          padding: 18px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(37,32,49,.68),
              rgba(14,12,20,.5)
            );

          border:
            1px solid rgba(255,255,255,.13);

          box-shadow:
            12px 12px 28px rgba(0,0,0,.32),
            -7px -7px 18px rgba(255,255,255,.035),
            inset 1px 1px 0 rgba(255,255,255,.08),
            inset -2px -2px 7px rgba(0,0,0,.16);

          backdrop-filter: blur(18px);
        }

        /*
          Audio clay button
        */
        .campaign-audio {
          position: relative;

          border:
            1px solid rgba(255,255,255,.2) !important;

          background:
            linear-gradient(
              145deg,
              rgba(230,225,243,.22),
              rgba(67,57,88,.3)
            ) !important;

          box-shadow:
            7px 7px 15px rgba(0,0,0,.4),
            -5px -5px 12px rgba(255,255,255,.07),
            inset 1px 1px 0 rgba(255,255,255,.13),
            inset -2px -2px 6px rgba(0,0,0,.18);

          backdrop-filter: blur(14px);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .campaign-audio:hover {
          transform: translateY(-2px);

          border-color:
            rgba(181,158,231,.7) !important;

          box-shadow:
            9px 9px 18px rgba(0,0,0,.43),
            -6px -6px 14px rgba(255,255,255,.08),
            inset 1px 1px 0 rgba(255,255,255,.15);
        }

        .campaign-audio:active {
          transform: translateY(1px);

          box-shadow:
            inset 5px 5px 11px rgba(0,0,0,.3),
            inset -4px -4px 8px rgba(255,255,255,.06);
        }

        /*
          Main clay CTA
        */
        .campaign-shop {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          border:
            1px solid rgba(255,255,255,.35) !important;

          border-radius: 15px !important;

          background:
            linear-gradient(
              145deg,
              #c9b8ec,
              #9578d4
            ) !important;

          color: #241d35 !important;

          box-shadow:
            9px 9px 18px rgba(0,0,0,.38),
            -6px -6px 14px rgba(255,255,255,.1),
            inset 2px 2px 0 rgba(255,255,255,.25),
            inset -2px -2px 5px rgba(86,61,137,.2);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            filter 180ms ease;
        }

        /*
          Purple shine
        */
        .campaign-shop::before {
          content: "";

          position: absolute;
          inset: 2px;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.23),
              transparent 42%
            );

          pointer-events: none;
          z-index: -1;
        }

        /*
          Moving shine
        */
        .campaign-shop::after {
          content: "";

          position: absolute;

          top: -80%;
          left: -35%;

          width: 35%;
          height: 260%;

          transform: rotate(25deg) translateX(-180%);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.25),
              transparent
            );

          transition:
            transform 650ms cubic-bezier(.22,.61,.36,1);

          pointer-events: none;
        }

        .campaign-shop:hover {
          transform: translateY(-3px);

          filter: brightness(1.04);

          box-shadow:
            12px 12px 23px rgba(0,0,0,.42),
            -7px -7px 16px rgba(255,255,255,.11),
            inset 2px 2px 0 rgba(255,255,255,.28),
            inset -2px -2px 6px rgba(86,61,137,.22);
        }

        .campaign-shop:hover::after {
          transform:
            rotate(25deg)
            translateX(500%);
        }

        .campaign-shop:active {
          transform: translateY(1px);

          box-shadow:
            inset 6px 6px 13px rgba(84,61,133,.3),
            inset -5px -5px 10px rgba(255,255,255,.18);
        }

        .campaign-shop svg {
          transition:
            transform 260ms cubic-bezier(.22,.61,.36,1);
        }

        .campaign-shop:hover svg {
          transform: translateX(5px);
        }

        /*
          Purple accent
        */
        .campaign-accent {
          color: #cbb8ee !important;

          text-shadow:
            0 0 14px rgba(185,157,235,.28);
        }

        /*
          Main heading subtle embossed feel
        */
        .campaign-title {
          text-shadow:
            1px 1px 0 rgba(255,255,255,.08),
            3px 4px 10px rgba(0,0,0,.42);
        }

        /*
          Editorial line
        */
        .campaign-editorial-line {
          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(201,183,236,.7),
              rgba(255,255,255,.08),
              transparent
            );

          box-shadow:
            0 1px 4px rgba(0,0,0,.35);
        }

        /*
          Corner counter clay chip
        */
        .campaign-counter {
          padding: 8px 12px;

          border-radius: 12px;

          border:
            1px solid rgba(255,255,255,.12);

          background:
            rgba(31,27,42,.48);

          box-shadow:
            5px 5px 12px rgba(0,0,0,.25),
            -3px -3px 8px rgba(255,255,255,.03),
            inset 1px 1px 0 rgba(255,255,255,.06);

          backdrop-filter: blur(12px);
        }

        /*
          Mobile
        */
        @media (max-width: 640px) {
          .campaign-modal {
            padding: 10px !important;
          }

          .campaign-frame {
            border-radius: 22px !important;
          }

          .campaign-frame::before {
            inset: 5px;
            border-radius: 17px;
          }

          .campaign-bottom-panel {
            padding: 13px;

            border-radius: 18px;

            background:
              linear-gradient(
                145deg,
                rgba(30,26,40,.72),
                rgba(12,10,17,.56)
              );
          }

          .campaign-title {
            font-size: 1.55rem !important;
            line-height: .96 !important;
          }

          .campaign-shop {
            min-width: 0;
            height: 44px !important;
            padding-left: 15px !important;
            padding-right: 15px !important;
          }

          .campaign-audio {
            width: 44px !important;
            height: 44px !important;
          }

          .campaign-close {
            width: 38px !important;
            height: 38px !important;
            right: 12px !important;
            top: 12px !important;
          }
        }

        /*
          Very small phones
        */
        @media (max-width: 380px) {
          .campaign-modal {
            padding: 7px !important;
          }

          .campaign-frame {
            border-radius: 18px !important;
          }

          .campaign-frame::before {
            inset: 4px;
            border-radius: 14px;
          }

          .campaign-bottom-panel {
            padding: 11px;
          }

          .campaign-title {
            font-size: 1.3rem !important;
          }

          .campaign-shop {
            font-size: 8px !important;
            letter-spacing: .11em !important;
            padding-left: 11px !important;
            padding-right: 11px !important;
          }

          .campaign-audio {
            width: 40px !important;
            height: 40px !important;
          }

          .campaign-close {
            width: 34px !important;
            height: 34px !important;
          }
        }

        /*
          Tablet
        */
        @media (min-width: 641px) and (max-width: 1024px) {
          .campaign-frame {
            max-width: 92vw;
          }

          .campaign-bottom-panel {
            padding: 16px;
          }
        }

        /*
          Large desktop
        */
        @media (min-width: 1536px) {
          .campaign-frame {
            max-width: 1120px;
          }

          .campaign-bottom-panel {
            padding: 21px;
          }
        }

        /*
          Accessibility
        */
        @media (prefers-reduced-motion: reduce) {
          .campaign-modal,
          .campaign-frame,
          .campaign-content,
          .campaign-image,
          .campaign-frame::after {
            animation: none !important;
          }

          .campaign-close,
          .campaign-close svg,
          .campaign-shop,
          .campaign-shop svg,
          .campaign-audio,
          .campaign-brand {
            transition: none !important;
          }
        }
      `}</style>

      {/* =========================================================
          MODAL BACKDROP
      ========================================================= */}

      <div
        className="campaign-modal fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6"
        onClick={closeStory}
      >

        {/* =======================================================
            MAIN CLAY FRAME
        ======================================================= */}

        <div
          className="
            campaign-frame
            relative
            w-full
            max-w-5xl
            aspect-video
            overflow-hidden
          "
          onClick={function (e) {
            e.stopPropagation();
          }}
        >

          {/* =====================================================
              VIDEO
          ===================================================== */}

          <div className="campaign-video-shell absolute inset-0 overflow-hidden rounded-[28px]">

            <video
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1800&auto=format&fit=crop"
              className="campaign-image h-full w-full object-cover"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-for-a-fashion-photoshoot-41258-large.mp4"
                type="video/mp4"
              />
            </video>

            {/* Soft cinematic layer */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Top / Bottom cinematic depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(17,14,25,.66) 0%, rgba(17,14,25,.08) 34%, rgba(17,14,25,.16) 54%, rgba(12,10,18,.88) 100%)',
              }}
            />

            {/* Side depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(20,16,30,.42) 0%, transparent 45%, rgba(20,16,30,.22) 100%)',
              }}
            />

            {/* Purple cinematic tint */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 20% 30%, rgba(157,126,218,.10), transparent 34%)',
              }}
            />

          </div>

          {/* =====================================================
              CLOSE BUTTON
          ===================================================== */}

          <button
            onClick={closeStory}
            className="
              campaign-close
              absolute
              right-4
              top-4
              z-30
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-white
              cursor-pointer
            "
            aria-label="Close campaign story"
          >
            <X className="h-5 w-5" />
          </button>

          {/* =====================================================
              TOP CONTENT
          ===================================================== */}

          <div className="campaign-content relative z-10 flex items-start justify-between p-5 sm:p-7">

            {/* Brand */}
            <div className="flex items-center gap-3">

              <div
                className="
                  campaign-brand
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <span
                  className="
                    font-['Cinzel']
                    text-sm
                    font-bold
                    text-[#d5c4f2]
                  "
                >
                  N
                </span>
              </div>

              <div className="campaign-meta">

                <p
                  className="
                    font-['Syne']
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-white
                    sm:text-xs
                  "
                >
                  Nikku Fashion
                </p>

                <p
                  className="
                    campaign-accent
                    mt-1
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  Autumn / Winter 2026
                </p>

              </div>

            </div>

            {/* Campaign info */}
            <div className="hidden text-right sm:block campaign-meta">

              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-white/70
                "
              >
                Campaign Film
              </p>

              <p
                className="
                  mt-1
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-white/45
                "
              >
                Nawalgarh · Rajasthan
              </p>

            </div>

          </div>

          {/* =====================================================
              BOTTOM CONTENT
          ===================================================== */}

          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-7">

            <div className="campaign-bottom-panel">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                {/* Text */}
                <div className="min-w-0 max-w-xl">

                  <p
                    className="
                      campaign-accent
                      mb-2
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.3em]
                      sm:text-[9px]
                    "
                  >
                    Nawalgarh Cinematic Archive
                  </p>

                  <h3
                    className="
                      campaign-title
                      font-['Syne']
                      text-2xl
                      font-bold
                      uppercase
                      leading-[0.95]
                      tracking-tight
                      text-white
                      sm:text-4xl
                    "
                  >
                    Fashion Beyond Trends
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-lg
                      text-[10px]
                      leading-relaxed
                      text-white/70
                      sm:text-xs
                    "
                  >
                    Captured across the architectural streets of Shekhawati,
                    blending heritage texture with progressive streetwear cuts.
                  </p>

                </div>

                {/* Controls */}
                <div className="flex shrink-0 items-center gap-2.5">

                  {/* Audio */}
                  <button
                    onClick={toggleMute}
                    className="
                      campaign-audio
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-white
                      cursor-pointer
                    "
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    aria-label={
                      isMuted
                        ? 'Unmute Audio'
                        : 'Mute Audio'
                    }
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>

                  {/* Shop */}
                  <button
                    onClick={shopCollection}
                    className="
                      campaign-shop
                      flex
                      h-11
                      items-center
                      gap-3
                      px-5
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      cursor-pointer
                      sm:px-6
                    "
                  >
                    <span>
                      Shop Collection
                    </span>

                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>

                </div>

              </div>

              {/* =================================================
                  EDITORIAL LINE
              ================================================= */}

              <div className="mt-4 hidden items-center gap-3 sm:flex">

                <span className="campaign-editorial-line w-12" />

                <span
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.25em]
                    text-white/45
                  "
                >
                  Nikku Fashion · Nawalgarh
                </span>

              </div>

            </div>

          </div>

          {/* =====================================================
              COUNTER
          ===================================================== */}

          <div className="absolute bottom-7 right-7 z-20 hidden sm:block">

            <div className="campaign-counter">

              <span
                className="
                  font-mono
                  text-[8px]
                  tracking-[0.3em]
                  text-white/45
                "
              >
                01 / 01
              </span>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};