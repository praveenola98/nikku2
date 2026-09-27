import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({
  onComplete
}) => {
  const [phase, setPhase] = useState<'scene1' | 'scene2' | 'exit' | 'done'>(
    'scene1'
  );

  useEffect(() => {
    const scene2Timer = window.setTimeout(() => {
      setPhase('scene2');
    }, 1500);

    const exitTimer = window.setTimeout(() => {
      setPhase('exit');
    }, 2700);

    const completeTimer = window.setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3450);

    return () => {
      window.clearTimeout(scene2Timer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      <style>{`
        * {
          --nikku-bg: #090909;
          --nikku-text: #f4f2ee;
          --nikku-accent: #efce9b;
        }

        @keyframes nkIntro {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes nkPanelLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes nkPanelRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes nkTextReveal {
          0% {
            opacity: 0;
            transform: translateY(100%);
            letter-spacing: 0.5em;
          }

          55% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.18em;
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.18em;
          }
        }

        @keyframes nkFashionReveal {
          from {
            opacity: 0;
            transform: translateY(40px);
            letter-spacing: 0.7em;
          }

          to {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.42em;
          }
        }

        @keyframes nkTextSplitTop {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-120%);
          }
        }

        @keyframes nkTextSplitBottom {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(120%);
          }
        }

        @keyframes nkSceneWipe {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }

          45% {
            transform: scaleX(1);
            transform-origin: left;
          }

          55% {
            transform: scaleX(1);
            transform-origin: right;
          }

          100% {
            transform: scaleX(0);
            transform-origin: right;
          }
        }

        @keyframes nkSceneTwo {
          from {
            opacity: 0;
            transform: scale(1.08);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes nkLineMove {
          from {
            transform: translateX(-120%);
          }

          to {
            transform: translateX(120%);
          }
        }

        @keyframes nkLocation {
          from {
            opacity: 0;
            transform: translateY(15px);
            letter-spacing: 0.8em;
          }

          to {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.35em;
          }
        }

        @keyframes nkFinalExit {
          0% {
            clip-path: inset(0 0 0 0);
          }

          100% {
            clip-path: inset(0 0 100% 0);
          }
        }

        @keyframes nkNumber {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nk-screen {
          animation: nkIntro 400ms ease-out both;
        }

        .nk-panel-left {
          animation:
            nkPanelLeft
            900ms
            cubic-bezier(.76,0,.24,1)
            both;
        }

        .nk-panel-right {
          animation:
            nkPanelRight
            900ms
            cubic-bezier(.76,0,.24,1)
            both;
        }

        .nk-main-text {
          animation:
            nkTextReveal
            900ms
            cubic-bezier(.22,.61,.36,1)
            450ms
            both;
        }

        .nk-fashion {
          animation:
            nkFashionReveal
            700ms
            cubic-bezier(.22,.61,.36,1)
            720ms
            both;
        }

        .nk-scene-two {
          animation:
            nkSceneTwo
            700ms
            cubic-bezier(.22,.61,.36,1)
            both;
        }

        .nk-location {
          animation:
            nkLocation
            800ms
            cubic-bezier(.22,.61,.36,1)
            150ms
            both;
        }

        .nk-line {
          animation:
            nkLineMove
            1500ms
            cubic-bezier(.22,.61,.36,1)
            infinite;
        }

        .nk-number {
          animation:
            nkNumber
            500ms
            ease-out
            200ms
            both;
        }

        .nk-exit {
          animation:
            nkFinalExit
            700ms
            cubic-bezier(.76,0,.24,1)
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .nk-screen,
          .nk-panel-left,
          .nk-panel-right,
          .nk-main-text,
          .nk-fashion,
          .nk-scene-two,
          .nk-location,
          .nk-line,
          .nk-number,
          .nk-exit {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className={`
          nk-screen
          fixed
          inset-0
          z-[100000]
          overflow-hidden
          bg-[#090909]
          text-[#f4f2ee]
          ${
            phase === 'exit'
              ? 'nk-exit pointer-events-none'
              : ''
          }
        `}
      >

        {/* =====================================================
            SCENE 01 — FULL SCREEN BRAND REVEAL
        ====================================================== */}

        {phase === 'scene1' && (
          <div className="absolute inset-0">

            {/* Large moving background panels */}
            <div
              className="
                nk-panel-left
                absolute
                inset-y-0
                left-0
                w-1/2
                bg-[#111111]
                border-r
                border-white/[0.06]
              "
            />

            <div
              className="
                nk-panel-right
                absolute
                inset-y-0
                right-0
                w-1/2
                bg-[#0d0d0d]
              "
            />

            {/* Giant editorial lines */}
            <div className="absolute inset-0 overflow-hidden opacity-20">

              <div
                className="
                  nk-line
                  absolute
                  left-[-20%]
                  top-[30%]
                  h-px
                  w-[140%]
                  bg-[#c5a880]
                "
              />

              <div
                className="
                  nk-line
                  absolute
                  left-[-20%]
                  top-[70%]
                  h-px
                  w-[140%]
                  bg-white
                  [animation-delay:400ms]
                "
              />

            </div>

            {/* Scene number */}
            <div
              className="
                nk-number
                absolute
                left-7
                top-7
                font-mono
                text-[9px]
                tracking-[0.3em]
                text-[#6e6a63]
              "
            >
              01 / 02
            </div>

            {/* Main typography */}
            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                overflow-hidden
              "
            >

              <div className="overflow-hidden">

                <h1
                  className="
                    nk-main-text
                    whitespace-nowrap
                    font-['Syne']
                    text-[13vw]
                    font-bold
                    uppercase
                    leading-[0.82]
                    text-[#f4f2ee]
                    md:text-[11vw]
                  "
                >
                  NIKKU
                </h1>

              </div>

              <div className="overflow-hidden">

                <h2
                  className="
                    nk-fashion
                    whitespace-nowrap
                    font-['Syne']
                    text-[5vw]
                    font-medium
                    uppercase
                    leading-none
                    text-[#c5a880]
                    md:text-[4vw]
                  "
                >
                  FASHION
                </h2>

              </div>

            </div>

            {/* Bottom information */}
            <div
              className="
                absolute
                bottom-7
                left-7
                right-7
                flex
                items-end
                justify-between
              "
            >

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.28em]
                  text-[#55514b]
                "
              >
                EST. 2024
              </span>

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.28em]
                  text-[#55514b]
                "
              >
                NAWALGARH
              </span>

            </div>

          </div>
        )}

        {/* =====================================================
            SCENE 02 — EDITORIAL TRANSITION
        ====================================================== */}

        {phase !== 'scene1' && (
          <div
            className="
              nk-scene-two
              absolute
              inset-0
              bg-[#c5a880]
            "
          >

            {/* Black center field */}
            <div
              className="
                absolute
                inset-[10px]
                overflow-hidden
                bg-[#090909]
              "
            >

              {/* Moving horizontal bars */}
              <div
                className="
                  absolute
                  left-[-20%]
                  top-[28%]
                  h-px
                  w-[140%]
                  bg-[#c5a880]/40
                  nk-line
                "
              />

              <div
                className="
                  absolute
                  left-[-20%]
                  top-[72%]
                  h-px
                  w-[140%]
                  bg-white/10
                  nk-line
                  [animation-delay:300ms]
                "
              />

              {/* Scene number */}
              <div
                className="
                  nk-number
                  absolute
                  left-7
                  top-7
                  font-mono
                  text-[9px]
                  tracking-[0.3em]
                  text-[#77736c]
                "
              >
                02 / 02
              </div>

              {/* Main content */}
              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >

                <p
                  className="
                    nk-location
                    mb-8
                    font-mono
                    text-[9px]
                    uppercase
                    text-[#c5a880]
                    md:text-[11px]
                  "
                >
                  NAWALGARH · RAJASTHAN
                </p>

                <div className="overflow-hidden">

                  <div
                    className="
                      font-['Syne']
                      text-[11vw]
                      font-bold
                      uppercase
                      leading-[0.8]
                      tracking-[-0.04em]
                      text-[#f4f2ee]
                      md:text-[9vw]
                    "
                  >
                    YOUR
                  </div>

                </div>

                <div className="overflow-hidden">

                  <div
                    className="
                      font-['Syne']
                      text-[11vw]
                      font-bold
                      uppercase
                      leading-[0.8]
                      tracking-[-0.04em]
                      text-[#f4f2ee]
                      md:text-[9vw]
                    "
                  >
                    EVERYDAY
                  </div>

                </div>

                <div
                  className="
                    mt-8
                    h-px
                    w-24
                    bg-[#c5a880]
                  "
                />

                <p
                  className="
                    mt-5
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.38em]
                    text-[#5e5a54]
                  "
                >
                  WEAR IT · MAKE IT YOURS
                </p>

              </div>

            </div>

            {/* Full-screen wipe during scene transition */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                origin-left
                bg-[#f4f2ee]
                opacity-0
              "
              style={{
                animation:
                  phase === 'scene2'
                    ? 'nkSceneWipe 900ms cubic-bezier(.76,0,.24,1) 0ms both'
                    : 'none'
              }}
            />

          </div>
        )}

      </div>
    </>
  );
};