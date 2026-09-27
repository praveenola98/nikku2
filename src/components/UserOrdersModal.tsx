import React, { useState } from 'react';
import {
  X,
  Package,
  Truck,
  Search,
  MapPin,
  CheckCircle2,
  Clock3,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types';

export const UserOrdersModal: React.FC = () => {
  const {
    isUserOrdersOpen,
    setIsUserOrdersOpen,
    orders,
    currentUser,
    activeTrackingId,
    setActiveTrackingId
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');

  if (!isUserOrdersOpen) return null;

  const userOrders = currentUser
    ? orders.filter(
        (o) =>
          o.userEmail.toLowerCase() === currentUser.email.toLowerCase() ||
          o.userId === currentUser.id
      )
    : orders.slice(0, 3);

  const trackingOrder = activeTrackingId
    ? orders.find((o) => o.id === activeTrackingId)
    : userOrders[0] || orders[0];

  function handleSearchOrder(e: React.FormEvent) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (found) {
      setActiveTrackingId(found.id);
    }
  }

  function getStepProgress(status: OrderStatus) {
    switch (status) {
      case 'pending_payment_verification':
        return 1;

      case 'payment_verified':
        return 2;

      case 'processing':
        return 3;

      case 'shipped':
        return 4;

      case 'out_for_delivery':
        return 4;

      case 'delivered':
        return 5;

      default:
        return 1;
    }
  }

  const currentStep = trackingOrder
    ? getStepProgress(trackingOrder.status)
    : 1;

  const steps = [
    { label: 'Placed', number: 1 },
    { label: 'Verified', number: 2 },
    { label: 'Packed', number: 3 },
    { label: 'Shipped', number: 4 },
    { label: 'Delivered', number: 5 }
  ];

  return (
    <>
      <style>{`
        .orders-backdrop {
          animation: ordersFadeIn 220ms ease-out both;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .orders-modal {
          animation: ordersModalIn 320ms cubic-bezier(.22,.61,.36,1) both;
        }

        .orders-content {
          animation: ordersContentIn 320ms ease-out both;
        }

        .order-card {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .order-card:hover {
          transform: translateY(-2px);
        }

        .order-close {
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .order-close:hover {
          transform: translateY(-1px);
        }

        .search-input {
          transition:
            box-shadow 180ms ease,
            transform 180ms ease;
        }

        .search-input:focus {
          transform: translateY(-1px);
        }

        .track-button {
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .track-button:hover {
          transform: translateY(-2px);
        }

        .track-button:active {
          transform: translateY(0);
        }

        .tracking-step {
          transition: transform 160ms ease;
        }

        .tracking-step:hover {
          transform: translateY(-2px);
        }

        .timeline-event {
          animation: timelineIn 320ms ease both;
        }

        .orders-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .orders-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .orders-scroll::-webkit-scrollbar-thumb {
          background: rgba(110, 96, 130, .28);
          border-radius: 999px;
        }

        @keyframes ordersFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes ordersModalIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.975);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes ordersContentIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes timelineIn {
          from {
            opacity: 0;
            transform: translateX(8px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 640px) {
          .orders-modal {
            max-height: 100dvh !important;
            min-height: 100dvh;
            border-radius: 0 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orders-backdrop,
          .orders-modal,
          .orders-content,
          .timeline-event {
            animation: none !important;
          }

          .order-card,
          .order-close,
          .search-input,
          .track-button,
          .tracking-step {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="
          orders-backdrop
          fixed inset-0
          z-[160]
          flex items-center justify-center
          overflow-y-auto
          bg-[#b9acc7]/55
          p-0 sm:p-4 md:p-6
        "
        onClick={() => setIsUserOrdersOpen(false)}
      >
        <div
          className="
            orders-modal
            relative
            my-auto
            flex
            max-h-[95vh]
            w-full
            max-w-6xl
            flex-col
            overflow-hidden
            rounded-none sm:rounded-[32px]
            border border-white/70
            bg-[#e9e3ee]
            shadow-[
              22px_22px_55px_rgba(116,100,132,.30),
              -16px_-16px_40px_rgba(255,255,255,.82)
            ]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* =====================================================
              HEADER
          ====================================================== */}

          <header
            className="
              shrink-0
              border-b border-white/50
              bg-[#e9e3ee]/95
              px-4 py-4
              sm:px-6 sm:py-5
              md:px-7
            "
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-[16px]
                    bg-[#e9e3ee]
                    text-[#655673]
                    shadow-[
                      7px_7px_14px_rgba(116,100,132,.24),
                      -6px_-6px_13px_rgba(255,255,255,.85)
                    ]
                  "
                >
                  <Package className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h2
                    className="
                      truncate
                      text-base font-bold tracking-tight
                      text-[#493d52]
                      sm:text-xl
                    "
                  >
                    Orders & Tracking
                  </h2>

                  <p
                    className="
                      mt-1
                      max-w-[210px]
                      truncate
                      text-[10px]
                      font-medium
                      text-[#81748b]
                      sm:max-w-none
                      sm:text-xs
                    "
                  >
                    {currentUser
                      ? `Logged in as: ${currentUser.email}`
                      : 'Nikku Fashion Nawalgarh Customer Portal'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsUserOrdersOpen(false)}
                className="
                  order-close
                  flex h-9 w-9 shrink-0
                  cursor-pointer
                  items-center justify-center
                  rounded-full
                  border border-white/70
                  bg-[#e9e3ee]
                  text-[#75677d]
                  shadow-[
                    6px_6px_12px_rgba(116,100,132,.20),
                    -5px_-5px_11px_rgba(255,255,255,.85)
                  ]
                "
                aria-label="Close orders"
              >
                <X className="h-[17px] w-[17px]" />
              </button>
            </div>
          </header>

          {/* =====================================================
              SEARCH
          ====================================================== */}

          <div
            className="
              shrink-0
              border-b border-white/40
              bg-[#ded6e5]/55
              px-4 py-4
              sm:px-6
              md:px-7
            "
          >
            <form
              onSubmit={handleSearchOrder}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search
                  className="
                    absolute
                    left-4
                    top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-[#897b91]
                  "
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Order ID to track"
                  className="
                    search-input
                    h-12
                    w-full
                    rounded-[17px]
                    border border-white/80
                    bg-[#e9e3ee]
                    pl-11 pr-4
                    text-sm
                    font-medium
                    text-[#493d52]
                    outline-none
                    placeholder:text-[#9a8da1]
                    shadow-[
                      inset_6px_6px_12px_rgba(116,100,132,.18),
                      inset_-6px_-6px_12px_rgba(255,255,255,.82)
                    ]
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  track-button
                  flex h-12
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-[17px]
                  border border-white/70
                  bg-[#e9e3ee]
                  px-6
                  text-sm
                  font-bold
                  text-[#5f5068]
                  shadow-[
                    8px_8px_17px_rgba(116,100,132,.23),
                    -7px_-7px_16px_rgba(255,255,255,.85)
                  ]
                  sm:min-w-[145px]
                "
              >
                Track Order
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* =====================================================
              BODY
          ====================================================== */}

          <div className="orders-scroll flex-1 overflow-y-auto">
            <div
              className="
                orders-content
                grid
                grid-cols-1
                gap-5
                p-4
                sm:gap-6 sm:p-6
                lg:grid-cols-[300px_1fr]
                lg:p-7
              "
            >
              {/* =================================================
                  ORDER HISTORY
              ================================================== */}

              <aside
                className="
                  min-w-0
                  lg:border-r lg:border-white/50
                  lg:pr-6
                "
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <span
                      className="
                        block
                        text-sm font-bold
                        text-[#4d4055]
                      "
                    >
                      Recent Orders
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        text-[11px]
                        text-[#897b91]
                      "
                    >
                      Select an order to view tracking
                    </span>
                  </div>

                  <span
                    className="
                      flex h-8 min-w-8
                      items-center justify-center
                      rounded-full
                      bg-[#e9e3ee]
                      px-2
                      text-xs
                      font-bold
                      text-[#75677d]
                      shadow-[
                        inset_4px_4px_8px_rgba(116,100,132,.17),
                        inset_-4px_-4px_8px_rgba(255,255,255,.85)
                      ]
                    "
                  >
                    {userOrders.length}
                  </span>
                </div>

                {userOrders.length === 0 ? (
                  <div
                    className="
                      rounded-[22px]
                      border border-white/60
                      bg-[#e9e3ee]
                      px-4 py-12
                      text-center
                      shadow-[
                        inset_6px_6px_13px_rgba(116,100,132,.15),
                        inset_-6px_-6px_13px_rgba(255,255,255,.82)
                      ]
                    "
                  >
                    <Package
                      className="
                        mx-auto mb-3
                        h-7 w-7
                        text-[#9b8da2]
                      "
                    />

                    <p className="text-sm text-[#81748b]">
                      No orders found on this account.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userOrders.map((order) => {
                      const isActive =
                        trackingOrder?.id === order.id;

                      return (
                        <button
                          type="button"
                          key={order.id}
                          onClick={() =>
                            setActiveTrackingId(order.id)
                          }
                          className={`
                            order-card
                            w-full
                            cursor-pointer
                            rounded-[21px]
                            border
                            p-4
                            text-left
                            ${
                              isActive
                                ? `
                                  border-white/80
                                  bg-[#e1d9e7]
                                  shadow-[
                                    inset_6px_6px_12px_rgba(116,100,132,.17),
                                    inset_-6px_-6px_12px_rgba(255,255,255,.82)
                                  ]
                                `
                                : `
                                  border-white/60
                                  bg-[#e9e3ee]
                                  shadow-[
                                    8px_8px_18px_rgba(116,100,132,.18),
                                    -7px_-7px_16px_rgba(255,255,255,.80)
                                  ]
                                `
                            }
                          `}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <span
                                className="
                                  block
                                  truncate
                                  font-mono
                                  text-[11px]
                                  font-bold
                                  text-[#504356]
                                "
                              >
                                {order.id}
                              </span>

                              <span
                                className="
                                  mt-1
                                  block
                                  text-[11px]
                                  text-[#8b7d92]
                                "
                              >
                                {order.createdAt.split(',')[0]}
                              </span>
                            </div>

                            <span
                              className="
                                shrink-0
                                text-sm
                                font-bold
                                text-[#594a61]
                              "
                            >
                              ₹
                              {order.totalAmount.toLocaleString(
                                'en-IN'
                              )}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <span
                              className={`
                                text-[11px]
                                font-semibold
                                capitalize
                                ${
                                  isActive
                                    ? 'text-[#55465d]'
                                    : 'text-[#887a90]'
                                }
                              `}
                            >
                              {order.status.replace(
                                /_/g,
                                ' '
                              )}
                            </span>

                            {isActive && (
                              <span
                                className="
                                  h-2.5 w-2.5
                                  rounded-full
                                  bg-[#786681]
                                  shadow-[0_0_0_4px_rgba(120,102,129,.10)]
                                "
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </aside>

              {/* =================================================
                  TRACKING
              ================================================== */}

              <main className="min-w-0">
                {trackingOrder ? (
                  <div className="space-y-5">

                    {/* ORDER SUMMARY */}

                    <section
                      className="
                        rounded-[25px]
                        border border-white/70
                        bg-[#e9e3ee]
                        p-5
                        shadow-[
                          9px_9px_20px_rgba(116,100,132,.18),
                          -8px_-8px_18px_rgba(255,255,255,.80)
                        ]
                        sm:p-6
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          justify-between
                          gap-4
                          sm:flex-row
                          sm:items-center
                        "
                      >
                        <div className="min-w-0">
                          <span
                            className="
                              block
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.16em]
                              text-[#95869c]
                            "
                          >
                            Currently tracking
                          </span>

                          <div
                            className="
                              mt-1.5
                              truncate
                              font-mono
                              text-sm
                              font-bold
                              text-[#4e4055]
                              sm:text-base
                            "
                          >
                            {trackingOrder.id}
                          </div>

                          <div
                            className="
                              mt-2
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-[#83758b]
                            "
                          >
                            <MapPin className="h-3.5 w-3.5 shrink-0" />

                            <span>
                              {trackingOrder.shippingAddress.city},{' '}
                              {trackingOrder.shippingAddress.state}
                            </span>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <span
                            className="
                              block
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.16em]
                              text-[#95869c]
                            "
                          >
                            Current status
                          </span>

                          <span
                            className="
                              mt-2
                              inline-flex
                              rounded-full
                              border border-white/70
                              bg-[#e1d9e7]
                              px-3.5 py-1.5
                              text-[11px]
                              font-bold
                              capitalize
                              text-[#5e5066]
                              shadow-[
                                inset_3px_3px_7px_rgba(116,100,132,.13),
                                inset_-3px_-3px_7px_rgba(255,255,255,.75)
                              ]
                            "
                          >
                            {trackingOrder.status.replace(
                              /_/g,
                              ' '
                            )}
                          </span>
                        </div>
                      </div>
                    </section>

                    {/* TRACKING TIMELINE */}

                    <section
                      className="
                        rounded-[25px]
                        border border-white/70
                        bg-[#e9e3ee]
                        p-5
                        shadow-[
                          9px_9px_20px_rgba(116,100,132,.18),
                          -8px_-8px_18px_rgba(255,255,255,.80)
                        ]
                        sm:p-6
                      "
                    >
                      <div className="mb-7 flex items-center justify-between gap-3">
                        <div>
                          <span
                            className="
                              block
                              text-sm
                              font-bold
                              text-[#504256]
                            "
                          >
                            Order tracking
                          </span>

                          <span
                            className="
                              mt-1
                              block
                              text-[11px]
                              text-[#897b91]
                            "
                          >
                            Your order journey
                          </span>
                        </div>

                        <span
                          className="
                            shrink-0
                            rounded-full
                            border border-white/70
                            bg-[#e1d9e7]
                            px-3 py-1
                            text-[10px]
                            font-bold
                            text-[#776980]
                            shadow-[
                              inset_3px_3px_7px_rgba(116,100,132,.12),
                              inset_-3px_-3px_7px_rgba(255,255,255,.78)
                            ]
                          "
                        >
                          Step {currentStep}/5
                        </span>
                      </div>

                      <div className="relative px-1">
                        {/* BASE LINE */}

                        <div
                          className="
                            absolute
                            left-[10%]
                            right-[10%]
                            top-[16px]
                            h-[3px]
                            rounded-full
                            bg-[#d2c8d8]
                          "
                        />

                        {/* ACTIVE LINE */}

                        <div
                          className="
                            absolute
                            left-[10%]
                            top-[16px]
                            h-[3px]
                            rounded-full
                            bg-[#786681]
                            transition-all
                            duration-700
                          "
                          style={{
                            width: `${Math.min(
                              80,
                              ((currentStep - 1) / 4) * 80
                            )}%`
                          }}
                        />

                        <div className="relative grid grid-cols-5">
                          {steps.map((step) => {
                            const completed =
                              currentStep >= step.number;

                            const isCurrent =
                              currentStep === step.number;

                            return (
                              <div
                                key={step.number}
                                className="
                                  tracking-step
                                  flex
                                  flex-col
                                  items-center
                                  text-center
                                "
                              >
                                <div
                                  className={`
                                    flex
                                    h-[32px]
                                    w-[32px]
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    text-[10px]
                                    font-bold
                                    ${
                                      completed
                                        ? `
                                          border-[#786681]
                                          bg-[#786681]
                                          text-white
                                          shadow-[
                                            4px_4px_8px_rgba(116,100,132,.23),
                                            -3px_-3px_7px_rgba(255,255,255,.75)
                                          ]
                                        `
                                        : `
                                          border-white/80
                                          bg-[#e9e3ee]
                                          text-[#a092a8]
                                          shadow-[
                                            inset_4px_4px_8px_rgba(116,100,132,.16),
                                            inset_-4px_-4px_8px_rgba(255,255,255,.82)
                                          ]
                                        `
                                    }
                                    ${
                                      isCurrent
                                        ? 'ring-4 ring-[#786681]/10'
                                        : ''
                                    }
                                  `}
                                >
                                  {completed ? (
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                  ) : (
                                    step.number
                                  )}
                                </div>

                                <span
                                  className={`
                                    mt-2.5
                                    text-[9px]
                                    sm:text-[11px]
                                    ${
                                      completed
                                        ? 'font-bold text-[#5a4b62]'
                                        : 'text-[#9a8ca1]'
                                    }
                                  `}
                                >
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* COURIER */}

                      {trackingOrder.courierName && (
                        <div
                          className="
                            mt-7
                            rounded-[20px]
                            border border-white/60
                            bg-[#e1d9e7]
                            p-4
                            shadow-[
                              inset_5px_5px_11px_rgba(116,100,132,.15),
                              inset_-5px_-5px_11px_rgba(255,255,255,.80)
                            ]
                          "
                        >
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-[#66576e]" />

                            <span
                              className="
                                text-sm
                                font-bold
                                text-[#56475e]
                              "
                            >
                              Courier
                            </span>

                            <span
                              className="
                                text-sm
                                text-[#887a90]
                              "
                            >
                              {trackingOrder.courierName}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                              <span
                                className="
                                  block
                                  text-[10px]
                                  font-bold
                                  uppercase
                                  tracking-wider
                                  text-[#9a8ca2]
                                "
                              >
                                Tracking / AWB
                              </span>

                              <span
                                className="
                                  mt-1
                                  block
                                  break-all
                                  font-mono
                                  text-xs
                                  font-bold
                                  text-[#5a4b62]
                                  sm:text-sm
                                "
                              >
                                {trackingOrder.trackingNumber}
                              </span>
                            </div>

                            <div>
                              <span
                                className="
                                  block
                                  text-[10px]
                                  font-bold
                                  uppercase
                                  tracking-wider
                                  text-[#9a8ca2]
                                "
                              >
                                Dispatch facility
                              </span>

                              <span
                                className="
                                  mt-1
                                  block
                                  text-xs
                                  text-[#70617a]
                                  sm:text-sm
                                "
                              >
                                {trackingOrder.dispatchHub ||
                                  'Nawalgarh Flagship Hub, Rajasthan'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PAYMENT */}

                      {trackingOrder.paymentDetails
                        .utrNumber && (
                        <div
                          className="
                            mt-3
                            flex
                            flex-col
                            gap-3
                            rounded-[19px]
                            border border-white/60
                            bg-[#e1d9e7]
                            px-4 py-3
                            shadow-[
                              inset_4px_4px_9px_rgba(116,100,132,.13),
                              inset_-4px_-4px_9px_rgba(255,255,255,.78)
                            ]
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-[#75667d]" />

                            <span className="text-xs text-[#8b7d93]">
                              UTR
                            </span>

                            <strong
                              className="
                                min-w-0
                                break-all
                                font-mono
                                text-[10px]
                                text-[#55465d]
                                sm:text-xs
                              "
                            >
                              {
                                trackingOrder
                                  .paymentDetails
                                  .utrNumber
                              }
                            </strong>
                          </div>

                          <span
                            className={`
                              shrink-0
                              text-[10px]
                              font-bold
                              sm:text-xs
                              ${
                                trackingOrder.paymentDetails
                                  .verifiedAt
                                  ? 'text-[#5d826b]'
                                  : 'text-[#a47743]'
                              }
                            `}
                          >
                            {trackingOrder.paymentDetails
                              .verifiedAt
                              ? '✓ Payment Verified'
                              : '⏳ Verification Pending'}
                          </span>
                        </div>
                      )}
                    </section>

                    {/* EVENT LOG */}

                    <section>
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <span
                            className="
                              block
                              text-sm
                              font-bold
                              text-[#514258]
                            "
                          >
                            Order updates
                          </span>

                          <span
                            className="
                              mt-1
                              block
                              text-[11px]
                              text-[#897b91]
                            "
                          >
                            Latest updates for this order
                          </span>
                        </div>

                        <div
                          className="
                            flex h-9 w-9
                            items-center justify-center
                            rounded-full
                            bg-[#e9e3ee]
                            text-[#8c7d94]
                            shadow-[
                              6px_6px_12px_rgba(116,100,132,.17),
                              -5px_-5px_10px_rgba(255,255,255,.80)
                            ]
                          "
                        >
                          <Clock3 className="h-4 w-4" />
                        </div>
                      </div>

                      <div
                        className="
                          relative
                          ml-1
                          border-l-2
                          border-[#d4cad9]
                          pl-6
                        "
                      >
                        {trackingOrder.timeline.map(
                          (evt, idx) => (
                            <div
                              key={idx}
                              className="
                                timeline-event
                                relative
                                pb-6
                                last:pb-0
                              "
                              style={{
                                animationDelay: `${idx * 70}ms`
                              }}
                            >
                              <div
                                className="
                                  absolute
                                  -left-[31px]
                                  top-[2px]
                                  h-3 w-3
                                  rounded-full
                                  border-2
                                  border-[#e9e3ee]
                                  bg-[#786681]
                                  shadow-[0_0_0_3px_rgba(120,102,129,.10)]
                                "
                              />

                              <div
                                className="
                                  rounded-[18px]
                                  border border-white/55
                                  bg-[#e9e3ee]
                                  p-4
                                  shadow-[
                                    6px_6px_13px_rgba(116,100,132,.13),
                                    -5px_-5px_11px_rgba(255,255,255,.72)
                                  ]
                                "
                              >
                                <div
                                  className="
                                    text-sm
                                    font-bold
                                    text-[#56475e]
                                  "
                                >
                                  {evt.title}
                                </div>

                                <div
                                  className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-[#83758c]
                                  "
                                >
                                  {evt.description}
                                </div>

                                <div
                                  className="
                                    mt-2
                                    font-mono
                                    text-[9px]
                                    text-[#a092a8]
                                  "
                                >
                                  {evt.timestamp}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      min-h-[340px]
                      flex-col
                      items-center
                      justify-center
                      rounded-[25px]
                      border border-white/70
                      bg-[#e9e3ee]
                      px-5
                      text-center
                      shadow-[
                        inset_7px_7px_15px_rgba(116,100,132,.15),
                        inset_-7px_-7px_15px_rgba(255,255,255,.82)
                      ]
                    "
                  >
                    <div
                      className="
                        mb-4
                        flex h-16 w-16
                        items-center justify-center
                        rounded-full
                        bg-[#e1d9e7]
                        text-[#95869d]
                        shadow-[
                          7px_7px_14px_rgba(116,100,132,.18),
                          -6px_-6px_13px_rgba(255,255,255,.82)
                        ]
                      "
                    >
                      <Package className="h-7 w-7" />
                    </div>

                    <p
                      className="
                        text-sm
                        font-bold
                        text-[#62536a]
                      "
                    >
                      Enter an Order ID to track your order.
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#91838f]
                      "
                    >
                      Your tracking information will appear here.
                    </p>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};