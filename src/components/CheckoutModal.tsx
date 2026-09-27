import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  QrCode,
  Banknote,
  Copy,
  Upload,
  Check,
  AlertCircle,
  Eye,
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    createOrder,
    setIsUserOrdersOpen,
    setActiveTrackingId
  } = useShop();

  const [step, setStep] = useState<
    'details' | 'payment' | 'success'
  >('details');

  const [fullName, setFullName] = useState('Praveen Ola');
  const [phone, setPhone] = useState('9829283746');
  const [address, setAddress] = useState(
    'Station Road, Near Nawalgarh Fort'
  );
  const [city, setCity] = useState('Nawalgarh');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('333042');

  const [paymentMethod, setPaymentMethod] = useState<
    'upi_qr' | 'card' | 'cod' | 'netbanking'
  >('upi_qr');

  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotPreview, setScreenshotPreview] =
    useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [validationError, setValidationError] =
    useState('');

  const FREE_SHIPPING_THRESHOLD = 999;

  const shipping =
    cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 150;

  const total = cartSubtotal + shipping;

  const upiId = 'nikku.fashion@okaxis';

  useEffect(
    function resetCheckoutOnOpen() {
      if (isCheckoutOpen) {
        setStep('details');
        setValidationError('');
        setIsProcessing(false);
        setCreatedOrder(null);
        setUtrNumber('');
        setScreenshotPreview('');
      }
    },
    [isCheckoutOpen]
  );

  if (!isCheckoutOpen) return null;

  function handleCopyUPI() {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);

    setTimeout(function resetCopyState() {
      setCopiedUpi(false);
    }, 2000);
  }

  function handleScreenshotUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = function handleReaderLoad() {
      setScreenshotPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleDetailsSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setValidationError('');
    setStep('payment');
  }

  function handlePlaceOrder() {
    setValidationError('');

    if (paymentMethod === 'upi_qr') {
      if (!utrNumber || utrNumber.trim().length < 8) {
        setValidationError(
          'Please enter a valid UPI Reference / UTR Number from your payment app.'
        );
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(function createCustomerOrder() {
      setIsProcessing(false);

      const order = createOrder({
        shippingAddress: {
          fullName: fullName,
          phone: phone,
          streetAddress: address,
          city: city,
          state: state,
          pincode: pincode
        },
        paymentMethod: paymentMethod,
        utrNumber: utrNumber.trim(),
        screenshotUrl:
          screenshotPreview || undefined
      });

      setCreatedOrder(order);
      setStep('success');
    }, 1000);
  }

  function handleTrackOrderNow() {
    if (!createdOrder) return;

    setActiveTrackingId(createdOrder.id);
    setIsCheckoutOpen(false);
    setIsUserOrdersOpen(true);
  }

  function handleCloseCheckout() {
    setIsCheckoutOpen(false);
  }

  function handleBackToDetails() {
    setValidationError('');
    setStep('details');
  }

  function handleFullNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFullName(e.target.value);
  }

  function handlePhoneChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setPhone(e.target.value);
  }

  function handleAddressChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setAddress(e.target.value);
  }

  function handleCityChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setCity(e.target.value);
  }

  function handleStateChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setState(e.target.value);
  }

  function handlePincodeChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setPincode(e.target.value);
  }

  function handleUtrChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setUtrNumber(
      e.target.value.replace(/[^0-9]/g, '')
    );
  }

  return (
    <>
      <style>{`
        /* ================= CLAYMORPHISM CHECKOUT UI ================= */

        .checkout-backdrop {
          animation: checkoutFadeIn 220ms ease-out both;
          background: rgba(74, 63, 82, 0.34) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .checkout-modal {
          animation: checkoutModalIn 320ms cubic-bezier(.22,.61,.36,1) both;
          background: #eeeaf5 !important;
          color: #373341 !important;
          border: 1px solid rgba(255,255,255,.72) !important;
          border-radius: 30px !important;
          box-shadow:
            18px 18px 42px rgba(112, 99, 126, .24),
            -14px -14px 34px rgba(255,255,255,.92),
            inset 1px 1px 0 rgba(255,255,255,.75) !important;
        }

        .checkout-modal > button[aria-label="Close checkout"] {
          top: 18px !important;
          right: 18px !important;
          width: 42px !important;
          height: 42px !important;
          border: 1px solid rgba(255,255,255,.75) !important;
          background: #eeeaf5 !important;
          color: #777080 !important;
          border-radius: 50% !important;
          box-shadow:
            6px 6px 13px rgba(112, 99, 126, .20),
            -5px -5px 12px rgba(255,255,255,.90) !important;
        }

        .checkout-modal > button[aria-label="Close checkout"]:hover {
          color: #554d61 !important;
          background: #eeeaf5 !important;
          transform: translateY(-1px);
        }

        .checkout-modal > div:not(.checkout-backdrop) {
          background: transparent;
        }

        /* Header */
        .checkout-modal .border-b.border-gray-200 {
          border-color: rgba(255,255,255,.58) !important;
          background: rgba(242,239,248,.55) !important;
        }

        .checkout-modal .text-gray-950,
        .checkout-modal .text-gray-900 {
          color: #373341 !important;
        }

        .checkout-modal .text-gray-800,
        .checkout-modal .text-gray-700 {
          color: #514a5b !important;
        }

        .checkout-modal .text-gray-600,
        .checkout-modal .text-gray-500,
        .checkout-modal .text-gray-400 {
          color: #81798a !important;
        }

        /* Stepper */
        .checkout-modal .rounded-full.bg-gray-950 {
          background: #8f7bc2 !important;
          color: #fff !important;
          box-shadow:
            5px 5px 10px rgba(112, 99, 126, .22),
            -4px -4px 9px rgba(255,255,255,.85) !important;
        }

        .checkout-modal .rounded-full.border-gray-300 {
          border-color: rgba(255,255,255,.85) !important;
          background: #eeeaf5 !important;
          color: #938a9d !important;
          box-shadow:
            inset 3px 3px 7px rgba(112,99,126,.10),
            inset -3px -3px 7px rgba(255,255,255,.78) !important;
        }

        .checkout-modal .bg-gray-200 {
          background: rgba(185,175,198,.38) !important;
        }

        /* Main surfaces / side summaries */
        .checkout-modal .bg-gray-50 {
          background: #eeeaf5 !important;
        }

        .checkout-modal .border-gray-200,
        .checkout-modal .border-gray-300 {
          border-color: rgba(255,255,255,.74) !important;
        }

        .checkout-modal aside {
          background: #e9e5f0 !important;
          box-shadow:
            inset 1px 1px 0 rgba(255,255,255,.70),
            inset -1px -1px 0 rgba(193,184,203,.20) !important;
        }

        /* Inputs */
        .checkout-input {
          border: 1px solid rgba(255,255,255,.88) !important;
          background: #eeeaf5 !important;
          color: #373341 !important;
          border-radius: 15px !important;
          box-shadow:
            inset 5px 5px 10px rgba(119,105,132,.12),
            inset -5px -5px 10px rgba(255,255,255,.84) !important;
          transition:
            box-shadow 180ms ease,
            transform 180ms ease,
            border-color 180ms ease !important;
        }

        .checkout-input:focus {
          border-color: rgba(143,123,194,.46) !important;
          background: #eeeaf5 !important;
          box-shadow:
            inset 4px 4px 9px rgba(119,105,132,.10),
            inset -4px -4px 9px rgba(255,255,255,.88),
            0 0 0 4px rgba(143,123,194,.10) !important;
          transform: translateY(-1px);
        }

        .checkout-input::placeholder {
          color: #aaa2b2 !important;
        }

        /* Delivery information card */
        .checkout-modal .rounded-lg.border.border-gray-200.bg-gray-50 {
          background: #eeeaf5 !important;
          border-color: rgba(255,255,255,.78) !important;
          border-radius: 18px !important;
          box-shadow:
            8px 8px 16px rgba(112,99,126,.14),
            -7px -7px 15px rgba(255,255,255,.78) !important;
        }

        /* Buttons */
        .checkout-button {
          background: #8f7bc2 !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,.36) !important;
          border-radius: 16px !important;
          box-shadow:
            8px 8px 16px rgba(112,99,126,.22),
            -6px -6px 14px rgba(255,255,255,.76) !important;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            filter 180ms ease !important;
        }

        .checkout-button:hover {
          background: #8f7bc2 !important;
          filter: brightness(1.04);
          transform: translateY(-2px) !important;
          box-shadow:
            10px 10px 20px rgba(112,99,126,.24),
            -7px -7px 16px rgba(255,255,255,.80) !important;
        }

        .checkout-button:active {
          transform: translateY(1px) !important;
          box-shadow:
            inset 5px 5px 10px rgba(91,76,115,.22),
            inset -4px -4px 9px rgba(255,255,255,.24) !important;
        }

        /* Secondary buttons */
        .checkout-modal button:not(.checkout-button) {
          border-radius: 15px;
        }

        .checkout-modal button.border-gray-300,
        .checkout-modal label.border-gray-300 {
          background: #eeeaf5 !important;
          border-color: rgba(255,255,255,.82) !important;
          color: #5c5566 !important;
          box-shadow:
            6px 6px 13px rgba(112,99,126,.15),
            -5px -5px 11px rgba(255,255,255,.78) !important;
        }

        .checkout-modal button.border-gray-300:hover,
        .checkout-modal label.border-gray-300:hover {
          background: #eeeaf5 !important;
          transform: translateY(-1px);
        }

        /* Order item cards */
        .checkout-item {
          background: #eeeaf5 !important;
          border-radius: 16px !important;
          padding: 10px !important;
          box-shadow:
            5px 5px 11px rgba(112,99,126,.12),
            -5px -5px 10px rgba(255,255,255,.72) !important;
          transition: transform 160ms ease, box-shadow 160ms ease !important;
        }

        .checkout-item:hover {
          background: #eeeaf5 !important;
          transform: translateY(-1px);
          box-shadow:
            7px 7px 14px rgba(112,99,126,.15),
            -6px -6px 12px rgba(255,255,255,.76) !important;
        }

        .checkout-item img {
          border-radius: 13px !important;
          box-shadow:
            4px 4px 8px rgba(112,99,126,.13),
            -3px -3px 7px rgba(255,255,255,.75);
        }

        /* Payment method cards */
        .payment-option {
          border-color: rgba(255,255,255,.78) !important;
          background: #eeeaf5 !important;
          border-radius: 19px !important;
          box-shadow:
            8px 8px 16px rgba(112,99,126,.15),
            -7px -7px 15px rgba(255,255,255,.78) !important;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease !important;
        }

        .payment-option:hover {
          transform: translateY(-2px) !important;
          border-color: rgba(143,123,194,.40) !important;
        }

        .payment-option[class*="border-gray-950"] {
          background: #e8e1f4 !important;
          border-color: rgba(143,123,194,.48) !important;
          box-shadow:
            inset 4px 4px 9px rgba(119,105,132,.10),
            inset -4px -4px 9px rgba(255,255,255,.80),
            7px 7px 15px rgba(112,99,126,.13) !important;
        }

        /* Payment panel */
        .checkout-modal .overflow-hidden.rounded-lg.border.border-gray-200 {
          background: #eeeaf5 !important;
          border-radius: 21px !important;
          border-color: rgba(255,255,255,.78) !important;
          box-shadow:
            9px 9px 18px rgba(112,99,126,.14),
            -8px -8px 16px rgba(255,255,255,.78) !important;
        }

        /* QR / amount / inner cards */
        .checkout-modal .bg-white {
          background: #eeeaf5 !important;
        }

        .checkout-modal code {
          background: #e7e2ed !important;
          border-color: rgba(255,255,255,.74) !important;
          border-radius: 13px !important;
          box-shadow:
            inset 4px 4px 8px rgba(112,99,126,.10),
            inset -4px -4px 8px rgba(255,255,255,.75) !important;
        }

        /* QR container keeps a clean raised tile */
        .checkout-modal svg[viewBox="0 0 200 200"] {
          background: #fff !important;
          border-radius: 12px !important;
          box-shadow:
            7px 7px 14px rgba(112,99,126,.12),
            -5px -5px 11px rgba(255,255,255,.88) !important;
        }

        /* Success */
        .success-icon {
          animation: successPop 420ms cubic-bezier(.22,.61,.36,1) both;
          background: #e3dcf2 !important;
          border: 1px solid rgba(255,255,255,.80) !important;
          box-shadow:
            9px 9px 18px rgba(112,99,126,.17),
            -8px -8px 16px rgba(255,255,255,.84) !important;
        }

        .success-icon svg {
          color: #7f6ab5 !important;
        }

        .success-card {
          animation: successCardIn 350ms ease-out 100ms both;
          background: #eeeaf5 !important;
          border: 1px solid rgba(255,255,255,.78) !important;
          border-radius: 22px !important;
          box-shadow:
            10px 10px 21px rgba(112,99,126,.16),
            -9px -9px 18px rgba(255,255,255,.80) !important;
        }

        .checkout-modal .bg-green-50,
        .checkout-modal .bg-amber-50,
        .checkout-modal .bg-red-50 {
          background: #e7e1f0 !important;
        }

        .checkout-modal .text-green-600 {
          color: #6f8e79 !important;
        }

        .checkout-modal .text-amber-700 {
          color: #967348 !important;
        }

        .checkout-modal .text-red-700 {
          color: #a15f67 !important;
        }

        /* Soft dividers */
        .checkout-modal .border-t,
        .checkout-modal .border-b,
        .checkout-modal .border-l {
          border-color: rgba(255,255,255,.58) !important;
        }

        /* Scrollbar */
        .checkout-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .checkout-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .checkout-scroll::-webkit-scrollbar-thumb {
          background: #c8bfd2;
          border-radius: 10px;
        }

        /* Motion */
        @keyframes checkoutFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes checkoutModalIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes checkoutContentIn {
          from {
            opacity: 0;
            transform: translateY(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successPop {
          from {
            opacity: 0;
            transform: scale(.72);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes successCardIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .checkout-modal {
            border-radius: 26px 26px 0 0 !important;
            box-shadow:
              0 -10px 30px rgba(112,99,126,.20),
              -10px -10px 25px rgba(255,255,255,.82) !important;
          }

          .checkout-modal > button[aria-label="Close checkout"] {
            top: 13px !important;
            right: 13px !important;
            width: 38px !important;
            height: 38px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .checkout-backdrop,
          .checkout-modal,
          .checkout-content,
          .success-icon,
          .success-card {
            animation: none !important;
          }

          .checkout-input,
          .payment-option,
          .checkout-button,
          .checkout-item {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="checkout-backdrop fixed inset-0 z-[150] bg-black/45 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
        onClick={handleCloseCheckout}
      >
        <div
          className="
            checkout-modal
            relative
            w-full
            max-w-[1080px]
            bg-white
            text-gray-900
            sm:rounded-xl
            shadow-[0_25px_80px_rgba(0,0,0,.22)]
            overflow-hidden
            my-auto
            border border-gray-200
          "
          onClick={function stopCheckoutClose(e) {
            e.stopPropagation();
          }}
        >
          {/* CLOSE */}
          {step !== 'success' && (
            <button
              onClick={handleCloseCheckout}
              className="
                absolute top-4 right-4 z-40
                w-9 h-9
                rounded-full
                bg-white
                border border-gray-200
                text-gray-500
                hover:text-gray-900
                hover:bg-gray-50
                flex items-center justify-center
                transition-colors
                cursor-pointer
              "
              aria-label="Close checkout"
            >
              <X className="w-[17px] h-[17px]" />
            </button>
          )}

          {/* HEADER */}
          {step !== 'success' && (
            <div className="border-b border-gray-200 px-5 sm:px-8 py-5">
              <div className="flex items-center justify-between pr-11">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-500">
                    Nikku Fashion
                  </p>

                  <h1 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-gray-950">
                    Checkout
                  </h1>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-gray-700" />
                  <span>Secure checkout</span>
                </div>
              </div>

              {/* STEPPER */}
              <div className="mt-6 flex items-center max-w-[430px]">
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-7 h-7 rounded-full
                      flex items-center justify-center
                      text-xs font-semibold
                      ${
                        step === 'details'
                          ? 'bg-gray-950 text-white'
                          : 'bg-gray-950 text-white'
                      }
                    `}
                  >
                    {step === 'payment' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      '1'
                    )}
                  </div>

                  <span
                    className={`
                      text-xs font-medium
                      ${
                        step === 'details'
                          ? 'text-gray-950'
                          : 'text-gray-500'
                      }
                    `}
                  >
                    Delivery
                  </span>
                </div>

                <div className="w-10 sm:w-16 h-px bg-gray-200 mx-3" />

                <div className="flex items-center gap-2">
                  <div
                    className={`
                      w-7 h-7 rounded-full
                      flex items-center justify-center
                      text-xs font-semibold
                      ${
                        step === 'payment'
                          ? 'bg-gray-950 text-white'
                          : 'border border-gray-300 text-gray-400'
                      }
                    `}
                  >
                    2
                  </div>

                  <span
                    className={`
                      text-xs font-medium
                      ${
                        step === 'payment'
                          ? 'text-gray-950'
                          : 'text-gray-400'
                      }
                    `}
                  >
                    Payment
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= DELIVERY ================= */}

          {step === 'details' && (
            <div className="checkout-content grid lg:grid-cols-[1fr_350px]">
              <form
                onSubmit={handleDetailsSubmit}
                className="p-5 sm:p-8"
              >
                <div className="max-w-[650px]">
                  <div className="mb-7">
                    <p className="text-xs font-medium text-gray-500">
                      Step 1 of 2
                    </p>

                    <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-950">
                      Delivery details
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Enter the address where you want your
                      order delivered.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* NAME + PHONE */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-xs font-medium text-gray-700">
                          Full name
                        </label>

                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={handleFullNameChange}
                          className="
                            checkout-input
                            w-full h-11
                            rounded-md
                            bg-white
                            border border-gray-300
                            px-3
                            text-sm text-gray-900
                            outline-none
                          "
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-xs font-medium text-gray-700">
                          Mobile number
                        </label>

                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          className="
                            checkout-input
                            w-full h-11
                            rounded-md
                            bg-white
                            border border-gray-300
                            px-3
                            text-sm text-gray-900
                            outline-none
                          "
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div>
                      <label className="block mb-2 text-xs font-medium text-gray-700">
                        Street address / Landmark
                      </label>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

                        <input
                          type="text"
                          required
                          value={address}
                          onChange={handleAddressChange}
                          className="
                            checkout-input
                            w-full h-11
                            rounded-md
                            bg-white
                            border border-gray-300
                            pl-10 pr-3
                            text-sm text-gray-900
                            outline-none
                          "
                          placeholder="House / street / landmark"
                        />
                      </div>
                    </div>

                    {/* CITY STATE PIN */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-2 text-xs font-medium text-gray-700">
                          City
                        </label>

                        <input
                          type="text"
                          required
                          value={city}
                          onChange={handleCityChange}
                          className="
                            checkout-input
                            w-full h-11
                            rounded-md
                            bg-white
                            border border-gray-300
                            px-3
                            text-sm text-gray-900
                            outline-none
                          "
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-xs font-medium text-gray-700">
                          State
                        </label>

                        <input
                          type="text"
                          required
                          value={state}
                          onChange={handleStateChange}
                          className="
                            checkout-input
                            w-full h-11
                            rounded-md
                            bg-white
                            border border-gray-300
                            px-3
                            text-sm text-gray-900
                            outline-none
                          "
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-xs font-medium text-gray-700">
                          PIN code
                        </label>

                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={handlePincodeChange}
                          className="
                            checkout-input
                            w-full h-11
                            rounded-md
                            bg-white
                            border border-gray-300
                            px-3
                            text-sm text-gray-900
                            outline-none
                          "
                        />
                      </div>
                    </div>

                    {/* DELIVERY INFO */}
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <Package className="w-5 h-5 text-gray-700 mt-0.5 shrink-0" />

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Delivery information
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Orders are dispatched from Nawalgarh.
                          Free shipping is automatically applied
                          on orders of ₹999 or more.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="
                      checkout-button
                      mt-7
                      w-full h-12
                      rounded-md
                      bg-gray-950
                      hover:bg-gray-800
                      text-white
                      font-semibold
                      text-sm
                      flex items-center justify-center gap-2
                      cursor-pointer
                    "
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* ORDER SUMMARY */}
              <aside className="border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-gray-500">
                      Your order
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-gray-950">
                      Order summary
                    </h3>
                  </div>

                  <span className="text-xs text-gray-500">
                    {cart.length}{' '}
                    {cart.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto checkout-scroll">
                  {cart.map(function renderOrderItem(
                    item,
                    index
                  ) {
                    const itemPrice =
                      item.unitPrice || item.product.price;

                    return (
                      <div
                        key={index}
                        className="checkout-item flex gap-3 p-2 rounded-lg"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="
                            w-14 h-16
                            rounded-md
                            object-cover
                            object-top
                            shrink-0
                          "
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 leading-5 line-clamp-2">
                            {item.product.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {item.selectedColor.name} ·{' '}
                            {item.selectedSize} · ×
                            {item.quantity}
                          </p>
                        </div>

                        <span className="text-sm font-medium text-gray-900 shrink-0">
                          ₹
                          {(
                            itemPrice *
                            item.quantity
                          ).toLocaleString('en-IN')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-gray-900">
                      ₹
                      {cartSubtotal.toLocaleString(
                        'en-IN'
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-medium text-gray-900">
                      {shipping === 0
                        ? 'FREE'
                        : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="pt-4 mt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-950">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-gray-600" />
                  Secure order processing
                </div>
              </aside>
            </div>
          )}

          {/* ================= PAYMENT ================= */}

          {step === 'payment' && (
            <div className="checkout-content grid lg:grid-cols-[1fr_320px]">
              <div className="p-5 sm:p-8">
                <div className="mb-6">
                  <p className="text-xs font-medium text-gray-500">
                    Step 2 of 2
                  </p>

                  <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-950">
                    Choose payment method
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Select your preferred payment method
                    to complete your order.
                  </p>
                </div>

                {/* PAYMENT METHODS */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={function selectUPI() {
                      setPaymentMethod('upi_qr');
                      setValidationError('');
                    }}
                    className={`
                      payment-option
                      p-4
                      rounded-lg
                      border
                      text-left
                      cursor-pointer
                      ${
                        paymentMethod === 'upi_qr'
                          ? 'border-gray-950 bg-gray-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-400'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <QrCode
                        className={`
                          w-5 h-5
                          ${
                            paymentMethod === 'upi_qr'
                              ? 'text-gray-950'
                              : 'text-gray-500'
                          }
                        `}
                      />

                      {paymentMethod === 'upi_qr' && (
                        <Check className="w-4 h-4 text-gray-950" />
                      )}
                    </div>

                    <p className="mt-4 text-sm font-semibold text-gray-950">
                      UPI Payment
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      GPay · PhonePe · Paytm · BHIM
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={function selectCOD() {
                      setPaymentMethod('cod');
                      setValidationError('');
                    }}
                    className={`
                      payment-option
                      p-4
                      rounded-lg
                      border
                      text-left
                      cursor-pointer
                      ${
                        paymentMethod === 'cod'
                          ? 'border-gray-950 bg-gray-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-400'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <Banknote
                        className={`
                          w-5 h-5
                          ${
                            paymentMethod === 'cod'
                              ? 'text-gray-950'
                              : 'text-gray-500'
                          }
                        `}
                      />

                      {paymentMethod === 'cod' && (
                        <Check className="w-4 h-4 text-gray-950" />
                      )}
                    </div>

                    <p className="mt-4 text-sm font-semibold text-gray-950">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Pay when your order arrives
                    </p>
                  </button>
                </div>

                {/* UPI */}
                {paymentMethod === 'upi_qr' && (
                  <div className="mt-5 rounded-lg border border-gray-200 bg-white overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Pay via UPI
                      </span>

                      <span className="text-xs font-medium text-green-600">
                        Instant
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                        {/* QR */}
                        <div className="shrink-0">
                          <div className="p-2 rounded-lg bg-white border border-gray-200">
                            <svg
                              viewBox="0 0 200 200"
                              className="w-[150px] h-[150px]"
                            >
                              <rect
                                width="200"
                                height="200"
                                fill="white"
                              />

                              <rect
                                x="15"
                                y="15"
                                width="45"
                                height="45"
                                fill="black"
                              />
                              <rect
                                x="23"
                                y="23"
                                width="29"
                                height="29"
                                fill="white"
                              />
                              <rect
                                x="29"
                                y="29"
                                width="17"
                                height="17"
                                fill="black"
                              />

                              <rect
                                x="140"
                                y="15"
                                width="45"
                                height="45"
                                fill="black"
                              />
                              <rect
                                x="148"
                                y="23"
                                width="29"
                                height="29"
                                fill="white"
                              />
                              <rect
                                x="154"
                                y="29"
                                width="17"
                                height="17"
                                fill="black"
                              />

                              <rect
                                x="15"
                                y="140"
                                width="45"
                                height="45"
                                fill="black"
                              />
                              <rect
                                x="23"
                                y="148"
                                width="29"
                                height="29"
                                fill="white"
                              />
                              <rect
                                x="29"
                                y="154"
                                width="17"
                                height="17"
                                fill="black"
                              />

                              <rect
                                x="80"
                                y="80"
                                width="40"
                                height="40"
                                fill="#111111"
                                rx="4"
                              />

                              <text
                                x="100"
                                y="105"
                                fill="#111111"
                                fontSize="20"
                                fontWeight="bold"
                                textAnchor="middle"
                                fontFamily="sans-serif"
                              >
                                N
                              </text>

                              <rect x="70" y="20" width="10" height="10" />
                              <rect x="90" y="20" width="10" height="10" />
                              <rect x="110" y="20" width="10" height="10" />
                              <rect x="70" y="40" width="10" height="10" />
                              <rect x="110" y="40" width="10" height="10" />

                              <rect x="20" y="70" width="10" height="10" />
                              <rect x="40" y="70" width="10" height="10" />
                              <rect x="20" y="90" width="10" height="10" />
                              <rect x="40" y="110" width="10" height="10" />

                              <rect x="140" y="70" width="10" height="10" />
                              <rect x="160" y="70" width="10" height="10" />
                              <rect x="180" y="70" width="10" height="10" />
                              <rect x="140" y="90" width="10" height="10" />
                              <rect x="170" y="100" width="10" height="10" />

                              <rect x="70" y="130" width="10" height="10" />
                              <rect x="90" y="130" width="10" height="10" />
                              <rect x="110" y="130" width="10" height="10" />
                              <rect x="70" y="150" width="10" height="10" />
                              <rect x="110" y="150" width="10" height="10" />

                              <rect x="140" y="140" width="10" height="10" />
                              <rect x="160" y="150" width="10" height="10" />
                              <rect x="180" y="160" width="10" height="10" />
                              <rect x="150" y="170" width="10" height="10" />
                            </svg>
                          </div>

                          <p className="mt-2 text-center text-xs text-gray-500">
                            Scan to pay
                          </p>
                        </div>

                        {/* UPI INFO */}
                        <div className="flex-1 w-full">
                          <p className="text-xs text-gray-500">
                            Store UPI ID
                          </p>

                          <p className="mt-1 text-base font-semibold text-gray-950">
                            Nikku Fashion Nawalgarh
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <code className="flex-1 min-w-0 px-3 py-2.5 rounded-md bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800 truncate">
                              {upiId}
                            </code>

                            <button
                              type="button"
                              onClick={handleCopyUPI}
                              className="
                                h-10 px-3
                                rounded-md
                                border border-gray-200
                                bg-white
                                text-xs
                                text-gray-700
                                hover:bg-gray-50
                                flex items-center gap-1.5
                                cursor-pointer
                                transition-colors
                              "
                            >
                              {copiedUpi ? (
                                <Check className="w-3.5 h-3.5 text-green-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}

                              <span>
                                {copiedUpi
                                  ? 'Copied'
                                  : 'Copy'}
                              </span>
                            </button>
                          </div>

                          <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <span className="text-xs text-gray-500">
                              Amount to pay
                            </span>

                            <p className="mt-1 text-2xl font-bold text-gray-950">
                              ₹
                              {total.toLocaleString(
                                'en-IN'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* UTR */}
                      <div className="mt-6">
                        <label className="block mb-2 text-xs font-medium text-gray-700">
                          UPI Reference / UTR Number
                          <span className="text-red-500 ml-1">
                            *
                          </span>
                        </label>

                        <input
                          type="text"
                          maxLength={16}
                          value={utrNumber}
                          onChange={handleUtrChange}
                          className="
                            checkout-input
                            w-full h-11
                            rounded-md
                            bg-white
                            border border-gray-300
                            px-3
                            text-sm
                            text-gray-900
                            font-mono
                            tracking-wide
                            outline-none
                          "
                          placeholder="Enter payment reference number"
                        />

                        <p className="mt-2 text-xs leading-5 text-gray-500">
                          You can find the UPI reference number
                          on your GPay, PhonePe or Paytm
                          payment receipt.
                        </p>
                      </div>

                      {/* SCREENSHOT */}
                      <div className="mt-5">
                        <label className="block mb-2 text-xs font-medium text-gray-700">
                          Payment Screenshot
                          <span className="ml-1 text-gray-400 font-normal">
                            optional
                          </span>
                        </label>

                        <div className="flex flex-wrap items-center gap-3">
                          <label
                            className="
                              h-10 px-3
                              rounded-md
                              border border-gray-300
                              bg-white
                              hover:bg-gray-50
                              text-xs text-gray-700
                              flex items-center gap-2
                              cursor-pointer
                              transition-colors
                            "
                          >
                            <Upload className="w-4 h-4 text-gray-600" />

                            <span>
                              Attach screenshot
                            </span>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={
                                handleScreenshotUpload
                              }
                              className="hidden"
                            />
                          </label>

                          {screenshotPreview && (
                            <div className="flex items-center gap-2">
                              <img
                                src={screenshotPreview}
                                alt="Payment preview"
                                className="
                                  w-10 h-10
                                  rounded-md
                                  object-cover
                                  border border-gray-200
                                "
                              />

                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Attached
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* COD */}
                {paymentMethod === 'cod' && (
                  <div className="mt-5 p-5 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                        <Banknote className="w-5 h-5 text-gray-700" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-950">
                          Cash on Delivery
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-gray-500">
                          Keep the exact amount of{' '}
                          <span className="font-semibold text-gray-900">
                            ₹
                            {total.toLocaleString(
                              'en-IN'
                            )}
                          </span>{' '}
                          ready when your order arrives.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ERROR */}
                {validationError && (
                  <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* BUTTONS */}
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={handleBackToDetails}
                    className="
                      h-12 px-4
                      rounded-md
                      border border-gray-300
                      text-gray-700
                      hover:bg-gray-50
                      text-sm font-medium
                      flex items-center gap-2
                      cursor-pointer
                      transition-colors
                    "
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePlaceOrder}
                    className="
                      checkout-button
                      flex-1 h-12
                      rounded-md
                      bg-gray-950
                      hover:bg-gray-800
                      disabled:opacity-50
                      text-white
                      font-semibold
                      text-sm
                      flex items-center justify-center gap-2
                      cursor-pointer
                    "
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>
                          Processing order...
                        </span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          Confirm Order · ₹
                          {total.toLocaleString(
                            'en-IN'
                          )}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PAYMENT SUMMARY */}
              <aside className="border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-700" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Payment summary
                    </p>

                    <p className="mt-0.5 text-sm text-gray-950 font-semibold">
                      Nikku Fashion
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Items
                    </span>

                    <span className="font-medium text-gray-900">
                      {cart.length}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-gray-900">
                      ₹
                      {cartSubtotal.toLocaleString(
                        'en-IN'
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-medium text-gray-900">
                      {shipping === 0
                        ? 'FREE'
                        : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      Payable
                    </span>

                    <span className="text-xl font-bold text-gray-950">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200 space-y-4">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-gray-600 mt-0.5" />

                    <p className="text-xs leading-5 text-gray-500">
                      Your order details are securely recorded
                      for processing.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Truck className="w-4 h-4 text-gray-600 mt-0.5" />

                    <p className="text-xs leading-5 text-gray-500">
                      Orders are dispatched from Nawalgarh,
                      Rajasthan.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* ================= SUCCESS ================= */}

          {step === 'success' && createdOrder && (
            <div className="checkout-content px-5 sm:px-10 py-10 sm:py-14">
              <div className="max-w-[650px] mx-auto text-center">
                <div className="success-icon w-[68px] h-[68px] rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                    Order confirmed
                  </p>

                  <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-950">
                    Thank you,{' '}
                    {createdOrder.shippingAddress.fullName}
                  </h2>

                  <p className="mt-3 max-w-[500px] mx-auto text-sm leading-6 text-gray-500">
                    Your order has been recorded successfully.
                    Our team will verify the payment and begin
                    processing your order.
                  </p>
                </div>

                {/* SUCCESS CARD */}
                <div className="success-card mt-8 rounded-xl border border-gray-200 bg-white text-left overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Order details
                    </span>

                    <span className="text-xs font-medium text-green-600">
                      Received
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-sm text-gray-500">
                        Order ID
                      </span>

                      <span className="font-mono text-sm font-semibold text-gray-950 break-all text-right">
                        {createdOrder.id}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Total
                      </span>

                      <span className="text-base font-bold text-gray-950">
                        ₹
                        {createdOrder.totalAmount.toLocaleString(
                          'en-IN'
                        )}
                      </span>
                    </div>

                    {createdOrder.paymentDetails
                      .utrNumber && (
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-sm text-gray-500">
                          UTR
                        </span>

                        <span className="font-mono text-xs text-gray-900">
                          {
                            createdOrder.paymentDetails
                              .utrNumber
                          }
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Status
                      </span>

                      <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700">
                        Awaiting verification
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />

                        <div>
                          <span className="block text-xs font-medium text-gray-500">
                            Delivering to
                          </span>

                          <p className="mt-1 text-sm leading-6 text-gray-700">
                            {
                              createdOrder
                                .shippingAddress
                                .streetAddress
                            }
                            ,{' '}
                            {
                              createdOrder
                                .shippingAddress.city
                            }{' '}
                            -{' '}
                            {
                              createdOrder
                                .shippingAddress.pincode
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SUCCESS ACTIONS */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleTrackOrderNow}
                    className="
                      checkout-button
                      flex-1 h-12
                      rounded-md
                      bg-gray-950
                      hover:bg-gray-800
                      text-white
                      font-semibold
                      text-sm
                      flex items-center justify-center gap-2
                      cursor-pointer
                    "
                  >
                    <Eye className="w-4 h-4" />
                    <span>Track Order</span>
                  </button>

                  <button
                    onClick={handleCloseCheckout}
                    className="
                      h-12 px-6
                      rounded-md
                      border border-gray-300
                      hover:bg-gray-50
                      text-gray-800
                      text-sm font-medium
                      cursor-pointer
                      transition-colors
                    "
                  >
                    Continue Shopping
                  </button>
                </div>

                <p className="mt-5 text-xs text-gray-400">
                  Thank you for shopping with Nikku Fashion
                  Nawalgarh
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};