import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const {
    isSizeGuideOpen,
    setIsSizeGuideOpen
  } = useShop();

  const [unit, setUnit] = useState<'cm' | 'in'>('in');
  const [activeTab, setActiveTab] = useState<
    'jeans' | 'tops'
  >('jeans');

  if (!isSizeGuideOpen) return null;

  return (
    <>
      <style>{`
        .nikku-size-backdrop {
          animation: claySizeBackdrop 240ms ease-out both;
          backdrop-filter: blur(12px);
        }

        .nikku-size-modal {
          animation: claySizeModal 340ms cubic-bezier(.22,.61,.36,1) both;
        }

        .nikku-size-table-row {
          transition:
            background-color 160ms ease,
            transform 160ms ease;
        }

        .nikku-size-table-row:hover {
          background: rgba(255,255,255,.20);
        }

        .nikku-size-tab,
        .nikku-size-unit,
        .nikku-size-close {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            color 180ms ease,
            background-color 180ms ease;
        }

        .nikku-size-tab:hover,
        .nikku-size-unit:hover {
          transform: translateY(-1px);
        }

        .nikku-size-close:hover {
          transform: translateY(-2px);
        }

        .nikku-size-scroll::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        .nikku-size-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .nikku-size-scroll::-webkit-scrollbar-thumb {
          background: rgba(125,110,145,.28);
          border-radius: 999px;
        }

        .nikku-size-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(125,110,145,.42);
        }

        @keyframes claySizeBackdrop {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes claySizeModal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.975);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 640px) {
          .nikku-size-modal {
            max-height: calc(100vh - 24px);
          }
        }

        @media (max-width: 380px) {
          .nikku-size-modal {
            border-radius: 24px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nikku-size-backdrop,
          .nikku-size-modal {
            animation: none !important;
          }

          .nikku-size-table-row,
          .nikku-size-tab,
          .nikku-size-unit,
          .nikku-size-close {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="
          nikku-size-backdrop
          fixed inset-0 z-[150]
          bg-[#d9d5e2]/85
          flex items-center justify-center
          p-3 sm:p-5 md:p-6
          overflow-y-auto
        "
        onClick={() => setIsSizeGuideOpen(false)}
      >
        <div
          className="
            nikku-size-modal
            relative
            w-full max-w-[800px]
            max-h-[94vh]
            overflow-hidden
            my-auto
            rounded-[28px]
            bg-[#d9d5e2]
            border border-white/65
            shadow-[20px_20px_55px_rgba(116,105,130,.28),-16px_-16px_45px_rgba(255,255,255,.82)]
          "
          onClick={(e) => e.stopPropagation()}
        >

          {/* HEADER */}
          <header
            className="
              px-5 sm:px-7
              py-5
              border-b border-white/50
            "
          >
            <div className="flex items-start justify-between gap-5">

              <div>

                <div className="flex items-center gap-2">

                  <div
                    className="
                      w-8 h-8
                      rounded-[12px]
                      bg-[#d9d5e2]
                      border border-white/60
                      flex items-center justify-center
                      shadow-[4px_4px_9px_rgba(116,105,130,.18),-3px_-3px_8px_rgba(255,255,255,.7)]
                    "
                  >
                    <Ruler className="w-4 h-4 text-[#8d7998]" />
                  </div>

                  <span
                    className="
                      text-[9px]
                      font-mono
                      uppercase
                      tracking-[0.16em]
                      text-[#8d7998]
                    "
                  >
                    Nikku Fit Guide
                  </span>

                </div>

                <h2
                  className="
                    mt-3
                    font-['Syne']
                    text-[20px] sm:text-[26px]
                    font-semibold
                    uppercase
                    tracking-[-0.015em]
                    text-[#47404f]
                  "
                >
                  Find Your Size
                </h2>

                <p
                  className="
                    mt-1.5
                    max-w-[540px]
                    text-[10px] sm:text-[11px]
                    leading-5
                    text-[#817888]
                  "
                >
                  Use your body measurements to find the closest
                  Nikku size. Measurements are based on our current
                  collection.
                </p>

              </div>

              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="
                  nikku-size-close
                  shrink-0
                  w-10 h-10
                  rounded-full
                  border border-white/65
                  text-[#756c80]
                  bg-[#d9d5e2]
                  flex items-center justify-center
                  cursor-pointer
                  shadow-[5px_5px_11px_rgba(116,105,130,.20),-4px_-4px_10px_rgba(255,255,255,.75)]
                "
                aria-label="Close size guide"
              >
                <X className="w-[17px] h-[17px]" />
              </button>

            </div>
          </header>

          {/* CONTROLS */}
          <div
            className="
              px-5 sm:px-7
              py-4
              border-b border-white/50
              bg-[#d5d1dc]
            "
          >
            <div
              className="
                flex flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              "
            >

              {/* CATEGORY */}
              <div
                className="
                  flex
                  rounded-[17px]
                  border border-white/60
                  bg-[#d9d5e2]
                  p-1
                  shadow-[inset_3px_3px_7px_rgba(116,105,130,.14),inset_-3px_-3px_7px_rgba(255,255,255,.65)]
                "
              >

                <button
                  onClick={() => setActiveTab('jeans')}
                  className={`
                    nikku-size-tab
                    px-3 sm:px-4
                    py-2.5
                    rounded-[13px]
                    text-[9px] sm:text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    cursor-pointer
                    ${
                      activeTab === 'jeans'
                        ? `
                          bg-[#a794b0]
                          text-white
                          shadow-[5px_5px_10px_rgba(116,105,130,.22),-4px_-4px_9px_rgba(255,255,255,.65)]
                        `
                        : `
                          text-[#817889]
                          hover:text-[#574f60]
                        `
                    }
                  `}
                >
                  Jeans & Bottoms
                </button>

                <button
                  onClick={() => setActiveTab('tops')}
                  className={`
                    nikku-size-tab
                    px-3 sm:px-4
                    py-2.5
                    rounded-[13px]
                    text-[9px] sm:text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    cursor-pointer
                    ${
                      activeTab === 'tops'
                        ? `
                          bg-[#a794b0]
                          text-white
                          shadow-[5px_5px_10px_rgba(116,105,130,.22),-4px_-4px_9px_rgba(255,255,255,.65)]
                        `
                        : `
                          text-[#817889]
                          hover:text-[#574f60]
                        `
                    }
                  `}
                >
                  Tees, Tops & Jackets
                </button>

              </div>

              {/* UNIT */}
              <div className="flex items-center gap-2">

                <span
                  className="
                    text-[9px]
                    font-mono
                    uppercase
                    tracking-[0.08em]
                    text-[#8b8291]
                  "
                >
                  Measure in
                </span>

                <div
                  className="
                    flex
                    rounded-[13px]
                    border border-white/60
                    overflow-hidden
                    bg-[#d9d5e2]
                    shadow-[4px_4px_9px_rgba(116,105,130,.15),-3px_-3px_8px_rgba(255,255,255,.65)]
                  "
                >

                  <button
                    onClick={() => setUnit('in')}
                    className={`
                      nikku-size-unit
                      px-3.5
                      py-2
                      text-[9px]
                      font-mono
                      cursor-pointer
                      ${
                        unit === 'in'
                          ? `
                            bg-[#a794b0]
                            text-white
                            font-bold
                          `
                          : `
                            bg-transparent
                            text-[#817889]
                            hover:text-[#574f60]
                          `
                      }
                    `}
                  >
                    IN
                  </button>

                  <button
                    onClick={() => setUnit('cm')}
                    className={`
                      nikku-size-unit
                      px-3.5
                      py-2
                      text-[9px]
                      font-mono
                      cursor-pointer
                      ${
                        unit === 'cm'
                          ? `
                            bg-[#a794b0]
                            text-white
                            font-bold
                          `
                          : `
                            bg-transparent
                            text-[#817889]
                            hover:text-[#574f60]
                          `
                      }
                    `}
                  >
                    CM
                  </button>

                </div>

              </div>

            </div>
          </div>

          {/* TABLE */}
          <div
            className="
              nikku-size-scroll
              overflow-x-auto
              px-5 sm:px-7
              py-5
            "
          >

            {activeTab === 'jeans' ? (

              <table
                className="
                  w-full
                  min-w-[600px]
                  border-collapse
                  text-left
                "
              >
                <thead>

                  <tr className="border-b border-white/60">

                    <th className="pb-3 pr-5 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Waist Size
                    </th>

                    <th className="pb-3 px-4 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Waist ({unit.toUpperCase()})
                    </th>

                    <th className="pb-3 px-4 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Hip ({unit.toUpperCase()})
                    </th>

                    <th className="pb-3 px-4 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Thigh ({unit.toUpperCase()})
                    </th>

                    <th className="pb-3 pl-4 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Inseam ({unit.toUpperCase()})
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="nikku-size-table-row border-b border-white/40">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      28
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '28 - 29"'
                        : '71 - 74 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '37"' : '94 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '22"' : '56 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '31"' : '79 cm'}
                    </td>

                  </tr>

                  <tr className="nikku-size-table-row border-b border-white/40">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      30
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '30 - 31"'
                        : '76 - 79 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '39"' : '99 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '23.5"' : '60 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '32"' : '81 cm'}
                    </td>

                  </tr>

                  <tr className="nikku-size-table-row border-b border-white/40">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      32
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '32 - 33"'
                        : '81 - 84 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '41"' : '104 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '24.5"' : '62 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '32"' : '81 cm'}
                    </td>

                  </tr>

                  <tr className="nikku-size-table-row border-b border-white/40">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      34
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '34 - 35"'
                        : '86 - 89 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '43"' : '109 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '25.5"' : '65 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '32"' : '81 cm'}
                    </td>

                  </tr>

                  <tr className="nikku-size-table-row">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      36
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '36 - 37"'
                        : '91 - 94 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '45"' : '114 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '26.5"' : '67 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '32.5"' : '83 cm'}
                    </td>

                  </tr>

                </tbody>
              </table>

            ) : (

              <table
                className="
                  w-full
                  min-w-[520px]
                  border-collapse
                  text-left
                "
              >

                <thead>

                  <tr className="border-b border-white/60">

                    <th className="pb-3 pr-5 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Size
                    </th>

                    <th className="pb-3 px-4 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Chest ({unit.toUpperCase()})
                    </th>

                    <th className="pb-3 px-4 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Shoulder ({unit.toUpperCase()})
                    </th>

                    <th className="pb-3 pl-4 text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-[0.10em] text-[#8d7998]">
                      Length ({unit.toUpperCase()})
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="nikku-size-table-row border-b border-white/40">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      S
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '40 - 42"'
                        : '102 - 107 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '21"' : '53 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '28"' : '71 cm'}
                    </td>

                  </tr>

                  <tr className="nikku-size-table-row border-b border-white/40">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      M
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '42 - 44"'
                        : '107 - 112 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '22"' : '56 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '29"' : '74 cm'}
                    </td>

                  </tr>

                  <tr className="nikku-size-table-row border-b border-white/40">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      L
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '44 - 46"'
                        : '112 - 117 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '23"' : '58 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '30"' : '76 cm'}
                    </td>

                  </tr>

                  <tr className="nikku-size-table-row">

                    <td className="py-4 pr-5 font-['Syne'] text-[12px] font-semibold text-[#4b4352]">
                      XL
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in'
                        ? '46 - 48"'
                        : '117 - 122 cm'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '24"' : '61 cm'}
                    </td>

                    <td className="py-4 pl-4 font-mono text-[10px] text-[#817888]">
                      {unit === 'in' ? '31"' : '79 cm'}
                    </td>

                  </tr>

                </tbody>

              </table>

            )}

          </div>

          {/* FIT NOTE */}
          <div className="px-5 sm:px-7 pb-5 sm:pb-6">

            <div
              className="
                p-4
                rounded-[20px]
                bg-[#d9d5e2]
                border border-white/55
                flex gap-3
                shadow-[inset_4px_4px_9px_rgba(116,105,130,.13),inset_-4px_-4px_9px_rgba(255,255,255,.65)]
              "
            >

              <div
                className="
                  w-8 h-8
                  rounded-[12px]
                  bg-[#d9d5e2]
                  flex items-center
                  justify-center
                  shrink-0
                  border border-white/60
                  shadow-[4px_4px_8px_rgba(116,105,130,.18),-3px_-3px_7px_rgba(255,255,255,.7)]
                "
              >
                <Check className="w-3.5 h-3.5 text-[#8d7998]" />
              </div>

              <div>

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.10em]
                    text-[#5b5263]
                  "
                >
                  Fit note
                </p>

                <p
                  className="
                    mt-1.5
                    text-[10px]
                    leading-5
                    text-[#817888]
                  "
                >
                  Our T-shirts and Hoodies are designed with an
                  intentional boxy drop-shoulder cut. If you prefer
                  a tailored regular fit, we recommend ordering one
                  size down.
                </p>

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <footer
            className="
              px-5 sm:px-7
              py-3
              border-t border-white/50
              bg-[#d5d1dc]
              flex items-center
              justify-between
            "
          >

            <span
              className="
                text-[8px]
                font-mono
                uppercase
                tracking-[0.10em]
                text-[#918995]
              "
            >
              Nikku Fashion · Fit Guide
            </span>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="
                text-[8px]
                font-mono
                uppercase
                tracking-[0.10em]
                text-[#817889]
                hover:text-[#514958]
                cursor-pointer
                transition-colors
              "
            >
              Close
            </button>

          </footer>

        </div>
      </div>
    </>
  );
};