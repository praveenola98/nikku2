import React from 'react';
import { Crown, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

const VALUES = [
  {
    icon: Crown,
    title: '14.5oz Selvedge Denim',
    subtitle: 'Woven on shuttle looms'
  },
  {
    icon: RotateCcw,
    title: '7-Day Easy Returns',
    subtitle: 'Doorstep pickup across India'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    subtitle: 'Instant UPI & Card encryption'
  },
  {
    icon: Truck,
    title: 'Express Dispatch',
    subtitle: 'Direct from Nawalgarh studio'
  }
];

export const ValueProps: React.FC = () => {
  return (
    <section
      id="value-props-bar"
      className="
        relative
        w-full
        overflow-hidden
        border-y border-white/60
        bg-[#e9e3ee]
      "
    >
      {/* Soft ambient background */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-1/2
          h-56
          w-56
          -translate-y-1/2
          rounded-full
          bg-[#d8cce0]/45
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          top-1/2
          h-56
          w-56
          -translate-y-1/2
          rounded-full
          bg-[#f7f3f9]/80
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          sm:px-6
          lg:px-10
          xl:px-12
        "
      >
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;

            return (
              <div
                key={idx}
                className={`
                  value-prop
                  group
                  relative
                  flex
                  min-h-[94px]
                  items-center
                  gap-3
                  px-2
                  py-4
                  sm:min-h-[104px]
                  sm:gap-4
                  sm:px-4
                  lg:min-h-[112px]
                  lg:px-6
                  xl:px-7

                  ${idx === 1
                    ? 'border-l border-white/55'
                    : ''}

                  ${idx === 3
                    ? 'border-l border-white/55'
                    : ''}

                  ${idx >= 2
                    ? 'border-t border-white/55 lg:border-t-0'
                    : ''}

                  ${idx === 2
                    ? 'lg:border-l lg:border-white/55'
                    : ''}
                `}
                style={{
                  animationDelay: `${idx * 80}ms`
                }}
              >
                {/* Desktop divider */}

                {idx > 0 && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      hidden
                      h-8
                      w-px
                      -translate-y-1/2
                      bg-[#cfc4d5]
                      lg:block
                    "
                  />
                )}

                {/* ICON */}

                <div
                  className="
                    value-icon
                    relative
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-[14px]
                    border
                    border-white/70
                    bg-[#e9e3ee]
                    text-[#76657f]
                    shadow-[
                      6px_6px_13px_rgba(116,100,132,.20),
                      -5px_-5px_11px_rgba(255,255,255,.82)
                    ]
                    transition-all
                    duration-400
                    sm:h-11
                    sm:w-11
                    sm:rounded-[15px]
                  "
                >
                  <Icon
                    className="
                      h-[17px]
                      w-[17px]
                      transition-transform
                      duration-400
                      sm:h-[18px]
                      sm:w-[18px]
                    "
                    strokeWidth={1.6}
                  />
                </div>

                {/* CONTENT */}

                <div className="min-w-0">
                  <h2
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      leading-[1.35]
                      tracking-[0.06em]
                      text-[#55465d]
                      transition-colors
                      duration-300
                      sm:text-[10px]
                      lg:text-[11px]
                      xl:text-[12px]
                    "
                  >
                    {val.title}
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      font-medium
                      leading-relaxed
                      tracking-[0.01em]
                      text-[#91838f]
                      transition-colors
                      duration-300
                      sm:text-[9px]
                      lg:text-[10px]
                      xl:text-[11px]
                    "
                  >
                    {val.subtitle}
                  </p>
                </div>

                {/* Hover line */}

                <span
                  className="
                    absolute
                    bottom-0
                    left-4
                    right-4
                    h-[2px]
                    origin-left
                    scale-x-0
                    rounded-full
                    bg-[#786681]
                    transition-transform
                    duration-400
                    group-hover:scale-x-100
                    sm:left-6
                    sm:right-6
                  "
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .value-prop {
          opacity: 0;
          transform: translateY(8px);
          animation: valuePropIn 650ms cubic-bezier(.22,.61,.36,1) forwards;
        }

        .value-prop:hover {
          background: rgba(255,255,255,.12);
        }

        .value-prop:hover .value-icon {
          transform: translateY(-2px);
          background: #e1d9e7;
          border-color: rgba(120,102,129,.28);
          box-shadow:
            8px 8px 16px rgba(116,100,132,.23),
            -7px -7px 15px rgba(255,255,255,.88);
        }

        .value-prop:hover .value-icon svg {
          transform: scale(1.08);
        }

        .value-prop:hover h2 {
          color: #493b52;
        }

        .value-prop:hover p {
          color: #776980;
        }

        @keyframes valuePropIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .value-prop:nth-child(1),
          .value-prop:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,.55);
          }

          .value-prop:nth-child(2),
          .value-prop:nth-child(4) {
            border-left: 1px solid rgba(255,255,255,.55);
          }

          .value-prop:nth-child(3),
          .value-prop:nth-child(4) {
            border-top: 0;
          }
        }

        @media (max-width: 380px) {
          .value-prop {
            gap: 9px;
            padding-left: 7px;
            padding-right: 7px;
          }

          .value-icon {
            width: 36px;
            height: 36px;
            border-radius: 12px;
          }

          .value-icon svg {
            width: 15px;
            height: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .value-prop {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .value-prop,
          .value-icon,
          .value-icon svg {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};