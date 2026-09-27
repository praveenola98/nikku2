import React, { useState, useEffect } from 'react';

import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Package,
  User as UserIcon,
  Shield,
  LogOut,
  ChevronDown
} from 'lucide-react';

import { useShop } from '../context/ShopContext';
import { ADMIN_EMAIL } from '../data/initialStoreData';

export const Navbar: React.FC = function () {

  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    openCatalog,
    setIsCatalogOpen,
    currentUser,
    isAdmin,
    setIsAuthModalOpen,
    setIsAdminPortalOpen,
    setIsUserOrdersOpen,
    logout
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  /* ============================================================
     SCROLL
     ============================================================ */

  useEffect(function () {

    const handleScroll = function () {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    return function () {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };

  }, []);

  /* ============================================================
     NAVIGATION
     ============================================================ */

  const handleNavClick = function (
    category?: string,
    fit?: string
  ) {

    setMobileMenuOpen(false);
    setUserDropdownOpen(false);

    if (category) {

      openCatalog(
        category,
        fit
      );

    } else {

      setIsCatalogOpen(false);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
  };

  /* ============================================================
     MOBILE COLLECTIONS
     ============================================================ */

  const mobileItems = [
    {
      label: "Men's Collection",
      cat: 'men'
    },
    {
      label: "Women's Collection",
      cat: 'women'
    },
    {
      label: 'Selvedge Denim & Jeans',
      cat: 'jeans'
    },
    {
      label: 'Heavyweight T-Shirts',
      cat: 't-shirts'
    },
    {
      label: 'Casual Shirts',
      cat: 'shirts'
    },
    {
      label: 'Tops & Knits',
      cat: 'tops'
    },
    {
      label: 'Jackets & Outerwear',
      cat: 'jackets'
    },
    {
      label: 'Hoodies & Fleece',
      cat: 'hoodies'
    },
    {
      label: 'All New Season Pieces',
      cat: 'all'
    }
  ];

  return (
    <>
      <style>{`

        /* ========================================================
           CLAYMORPHISM NAVBAR
           ======================================================== */

        .nikku-navbar {
          --clay-bg: #e7e3f0;
          --clay-surface: #eeeaf6;
          --clay-light: #f8f5fb;
          --clay-dark: #d8d2e5;

          --clay-purple: #8d70ca;
          --clay-purple-dark: #7355b4;
          --clay-purple-light: #cfc2e8;

          --clay-text: #3f3749;
          --clay-muted: #7c7287;

          position: fixed;

          top: 0;
          left: 0;
          right: 0;

          width: 100%;

          z-index: 1000;

          pointer-events: none;
        }

        .nikku-navbar-shell,
        .nikku-mobile-overlay {
          pointer-events: auto;
        }

        /* ========================================================
           DESKTOP NAV SHELL
           ======================================================== */

        .nikku-navbar-shell {
          width:
            calc(100% - 18px);

          max-width:
            1440px;

          margin:
            7px auto 0;

          border-radius:
            19px;

          background:
            linear-gradient(
              145deg,
              rgba(246,243,250,.96),
              rgba(221,216,232,.94)
            );

          border:
            1px solid
            rgba(255,255,255,.92);

          box-shadow:
            10px 10px 25px
            rgba(91,76,118,.15),

            -8px -8px 21px
            rgba(255,255,255,.90),

            inset 1px 1px 0
            rgba(255,255,255,.84);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          transition:
            margin 280ms ease,
            border-radius 280ms ease,
            box-shadow 280ms ease;
        }

        .nikku-navbar-shell.scrolled {
          margin-top:
            4px;

          border-radius:
            16px;

          box-shadow:
            12px 12px 30px
            rgba(91,76,118,.18),

            -8px -8px 20px
            rgba(255,255,255,.92),

            inset 1px 1px 0
            rgba(255,255,255,.86);
        }

        /* ========================================================
           TOP STRIP
           ======================================================== */

        .nikku-top-strip {
          min-height:
            27px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            15px;

          padding:
            4px 17px;

          border-bottom:
            1px solid
            rgba(255,255,255,.65);

          color:
            var(--clay-muted);

          font-family:
            monospace;

          font-size:
            8px;

          letter-spacing:
            .04em;
        }

        .nikku-top-left,
        .nikku-top-right {
          min-width:
            0;

          display:
            flex;

          align-items:
            center;

          gap:
            9px;
        }

        .nikku-top-left span {
          white-space:
            nowrap;
        }

        .nikku-top-delivery {
          color:
            var(--clay-purple-dark);

          font-weight:
            800;
        }

        .nikku-top-orders {
          display:
            inline-flex;

          align-items:
            center;

          gap:
            5px;

          color:
            #766d80;

          transition:
            color 180ms ease;
        }

        .nikku-top-orders:hover {
          color:
            var(--clay-purple-dark);
        }

        .nikku-top-admin {
          max-width:
            330px;

          display:
            inline-flex;

          align-items:
            center;

          gap:
            5px;

          padding:
            4px 8px;

          border-radius:
            8px;

          color:
            #fff;

          background:
            linear-gradient(
              145deg,
              #a285d7,
              #7959b8
            );

          border:
            1px solid
            rgba(255,255,255,.45);

          box-shadow:
            4px 4px 9px
            rgba(91,76,118,.14),

            -3px -3px 7px
            rgba(255,255,255,.60);

          font-family:
            monospace;

          font-size:
            8px;

          font-weight:
            800;

          white-space:
            nowrap;

          overflow:
            hidden;

          text-overflow:
            ellipsis;

          transition:
            transform 180ms ease;
        }

        .nikku-top-admin:hover {
          transform:
            translateY(-1px);
        }

        /* ========================================================
           MAIN NAV
           ======================================================== */

        .nikku-main-nav {
          min-height:
            63px;

          display:
            grid;

          grid-template-columns:
            1fr auto 1fr;

          align-items:
            center;

          gap:
            15px;

          padding:
            7px 17px;
        }

        /* ========================================================
           LEFT
           ======================================================== */

        .nikku-left-area {
          min-width:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            flex-start;
        }

        .nikku-desktop-links {
          display:
            flex;

          align-items:
            center;

          gap:
            5px;
        }

        .nikku-nav-link {
          min-height:
            36px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            7px 11px;

          border-radius:
            10px;

          color:
            #71677c;

          font-family:
            monospace;

          font-size:
            8px;

          font-weight:
            800;

          letter-spacing:
            .10em;

          text-transform:
            uppercase;

          white-space:
            nowrap;

          transition:
            color 180ms ease,
            background 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .nikku-nav-link:hover {
          color:
            var(--clay-purple-dark);

          background:
            rgba(255,255,255,.46);

          transform:
            translateY(-1px);

          box-shadow:
            4px 4px 9px
            rgba(91,76,118,.08),

            -3px -3px 7px
            rgba(255,255,255,.75);
        }

        .nikku-nav-link:active {
          transform:
            translateY(1px);

          box-shadow:
            inset 3px 3px 6px
            rgba(91,76,118,.10),

            inset -3px -3px 6px
            rgba(255,255,255,.78);
        }

        /* ========================================================
           MOBILE MENU BUTTON
           ======================================================== */

        .nikku-mobile-menu-button {
          width:
            38px;

          height:
            38px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            0;

          border-radius:
            11px;

          color:
            #675e71;

          background:
            linear-gradient(
              145deg,
              #f5f2f9,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.88);

          box-shadow:
            6px 6px 12px
            rgba(91,76,118,.13),

            -5px -5px 10px
            rgba(255,255,255,.84);

          transition:
            transform 180ms ease,
            color 180ms ease;
        }

        .nikku-mobile-menu-button:hover {
          color:
            var(--clay-purple-dark);

          transform:
            translateY(-1px);
        }

        .nikku-mobile-menu-button:active {
          transform:
            translateY(1px);
        }

        /* ========================================================
           BRAND
           ======================================================== */

        .nikku-brand {
          min-width:
            0;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          padding:
            4px 8px;

          border-radius:
            14px;

          cursor:
            pointer;

          transition:
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .nikku-brand:hover {
          transform:
            translateY(-1px);

          box-shadow:
            6px 6px 13px
            rgba(91,76,118,.08),

            -5px -5px 11px
            rgba(255,255,255,.70);
        }

        .nikku-brand-main {
          color:
            #453d50;

          font-family:
            'Syne',
            sans-serif;

          font-size:
            16px;

          font-weight:
            900;

          letter-spacing:
            .22em;

          line-height:
            1;

          white-space:
            nowrap;

          transition:
            color 180ms ease,
            letter-spacing 220ms ease;
        }

        .nikku-brand:hover
        .nikku-brand-main {
          color:
            var(--clay-purple-dark);

          letter-spacing:
            .26em;
        }

        .nikku-brand-sub {
          margin-top:
            4px;

          color:
            #9277bd;

          font-family:
            monospace;

          font-size:
            6px;

          font-weight:
            800;

          letter-spacing:
            .35em;

          text-transform:
            uppercase;
        }

        .nikku-brand-line {
          width:
            21px;

          height:
            2px;

          margin-top:
            5px;

          border-radius:
            99px;

          background:
            linear-gradient(
              90deg,
              #b69ce0,
              #8060bc
            );

          box-shadow:
            2px 2px 4px
            rgba(91,76,118,.12),

            -2px -2px 4px
            rgba(255,255,255,.72);

          transition:
            width 220ms ease;
        }

        .nikku-brand:hover
        .nikku-brand-line {
          width:
            32px;
        }

        /* ========================================================
           RIGHT ACTIONS
           ======================================================== */

        .nikku-right-actions {
          min-width:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            flex-end;

          gap:
            6px;
        }

        .nikku-icon {
          position:
            relative;

          width:
            37px;

          height:
            37px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            11px;

          color:
            #6d6478;

          background:
            linear-gradient(
              145deg,
              #f4f1f9,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.87);

          box-shadow:
            5px 5px 10px
            rgba(91,76,118,.12),

            -4px -4px 9px
            rgba(255,255,255,.82);

          transition:
            transform 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
        }

        .nikku-icon:hover {
          color:
            var(--clay-purple-dark);

          transform:
            translateY(-2px);

          box-shadow:
            7px 7px 13px
            rgba(91,76,118,.15),

            -5px -5px 10px
            rgba(255,255,255,.88);
        }

        .nikku-icon:active {
          transform:
            translateY(1px);

          box-shadow:
            inset 3px 3px 7px
            rgba(91,76,118,.12),

            inset -3px -3px 7px
            rgba(255,255,255,.80);
        }

        .nikku-track-button {
          width:
            auto;

          min-width:
            37px;

          padding:
            0 9px;

          gap:
            5px;

          font-family:
            monospace;

          font-size:
            8px;

          font-weight:
            800;

          text-transform:
            uppercase;
        }

        /* ========================================================
           BADGES
           ======================================================== */

        .nikku-badge {
          position:
            absolute;

          top:
            -4px;

          right:
            -4px;

          min-width:
            17px;

          height:
            17px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            0 4px;

          border-radius:
            999px;

          color:
            #fff;

          background:
            linear-gradient(
              145deg,
              #a084d7,
              #7858b7
            );

          border:
            2px solid
            #e9e5f2;

          box-shadow:
            3px 3px 7px
            rgba(91,76,118,.20);

          font-family:
            monospace;

          font-size:
            8px;

          font-weight:
            900;
        }

        /* ========================================================
           SIGN IN
           ======================================================== */

        .nikku-signin {
          min-height:
            37px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            6px;

          padding:
            0 11px;

          border-radius:
            11px;

          color:
            #6c6277;

          background:
            linear-gradient(
              145deg,
              #f4f1f9,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.88);

          box-shadow:
            5px 5px 10px
            rgba(91,76,118,.12),

            -4px -4px 9px
            rgba(255,255,255,.82);

          font-family:
            monospace;

          font-size:
            8px;

          font-weight:
            800;

          letter-spacing:
            .08em;

          transition:
            transform 180ms ease,
            color 180ms ease;
        }

        .nikku-signin:hover {
          color:
            var(--clay-purple-dark);

          transform:
            translateY(-1px);
        }

        /* ========================================================
           USER BUTTON
           ======================================================== */

        .nikku-user-button {
          min-height:
            37px;

          display:
            flex;

          align-items:
            center;

          gap:
            4px;

          padding:
            4px 6px;

          border-radius:
            999px;

          color:
            #6c6277;

          background:
            linear-gradient(
              145deg,
              #f4f1f9,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.88);

          box-shadow:
            5px 5px 10px
            rgba(91,76,118,.12),

            -4px -4px 9px
            rgba(255,255,255,.82);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .nikku-user-button:hover {
          transform:
            translateY(-1px);
        }

        .nikku-user-button.open {
          box-shadow:
            inset 3px 3px 7px
            rgba(91,76,118,.11),

            inset -3px -3px 7px
            rgba(255,255,255,.78);
        }

        .nikku-avatar {
          width:
            27px;

          height:
            27px;

          border-radius:
            50%;

          object-fit:
            cover;

          border:
            2px solid
            rgba(255,255,255,.90);

          box-shadow:
            2px 2px 5px
            rgba(91,76,118,.15);
        }

        /* ========================================================
           USER DROPDOWN
           ======================================================== */

        .nikku-dropdown {
          position:
            absolute;

          right:
            0;

          top:
            calc(100% + 11px);

          width:
            260px;

          padding:
            11px;

          border-radius:
            17px;

          background:
            linear-gradient(
              145deg,
              #f2eef8,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.91);

          box-shadow:
            14px 14px 30px
            rgba(76,63,97,.23),

            -9px -9px 20px
            rgba(255,255,255,.90);

          backdrop-filter:
            blur(16px);

          z-index:
            3000;

          animation:
            nikkuDropdownIn
            200ms
            ease
            both;
        }

        .nikku-user-info {
          padding:
            10px;

          margin-bottom:
            6px;

          border-radius:
            12px;

          background:
            linear-gradient(
              145deg,
              #f5f2f9,
              #ddd7e8
            );

          box-shadow:
            inset 3px 3px 7px
            rgba(91,76,118,.08),

            inset -3px -3px 7px
            rgba(255,255,255,.82);
        }

        .nikku-user-name {
          color:
            #4c4356;

          font-size:
            11px;

          font-weight:
            800;
        }

        .nikku-user-email {
          margin-top:
            3px;

          color:
            #8a8093;

          font-size:
            9px;
        }

        .nikku-admin-label {
          display:
            inline-flex;

          margin-top:
            7px;

          padding:
            4px 7px;

          border-radius:
            7px;

          color:
            #fff;

          background:
            linear-gradient(
              145deg,
              #a084d7,
              #7c5bb9
            );

          font-family:
            monospace;

          font-size:
            7px;

          font-weight:
            800;
        }

        .nikku-dropdown-item {
          width:
            100%;

          min-height:
            38px;

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          padding:
            8px 9px;

          border-radius:
            10px;

          color:
            #766c80;

          font-family:
            monospace;

          font-size:
            9px;

          text-align:
            left;

          transition:
            background 160ms ease,
            color 160ms ease,
            transform 160ms ease;
        }

        .nikku-dropdown-item:hover {
          color:
            var(--clay-purple-dark);

          background:
            rgba(255,255,255,.48);

          transform:
            translateX(2px);
        }

        .nikku-dropdown-item.admin {
          color:
            var(--clay-purple-dark);

          font-weight:
            800;
        }

        .nikku-dropdown-item.logout {
          margin-top:
            4px;

          border-top:
            1px solid
            rgba(255,255,255,.68);

          padding-top:
            10px;

          color:
            #b86b7c;
        }

        /* ========================================================
           MOBILE OVERLAY
           ======================================================== */

        .nikku-mobile-overlay {
          position:
            fixed;

          inset:
            0;

          width:
            100vw;

          height:
            100dvh;

          padding:
            5px;

          display:
            flex;

          align-items:
            stretch;

          justify-content:
            center;

          background:
            rgba(67,56,84,.32);

          backdrop-filter:
            blur(10px);

          -webkit-backdrop-filter:
            blur(10px);

          z-index:
            9999;

          opacity:
            0;

          visibility:
            hidden;

          pointer-events:
            none;

          transition:
            opacity 220ms ease,
            visibility 220ms ease;
        }

        .nikku-mobile-overlay.open {
          opacity:
            1;

          visibility:
            visible;

          pointer-events:
            auto;
        }

        /* ========================================================
           MOBILE DRAWER
           ======================================================== */

        .nikku-mobile-drawer {
          width:
            100%;

          max-width:
            430px;

          height:
            100%;

          max-height:
            100dvh;

          display:
            flex;

          flex-direction:
            column;

          overflow:
            hidden;

          border-radius:
            21px;

          background:
            linear-gradient(
              145deg,
              #f4f1f9,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            18px 18px 42px
            rgba(68,55,90,.28),

            -10px -10px 25px
            rgba(255,255,255,.90),

            inset 1px 1px 0
            rgba(255,255,255,.88);

          animation:
            nikkuDrawerIn
            280ms
            cubic-bezier(.22,.61,.36,1)
            both;
        }

        /* ========================================================
           MOBILE HEADER
           ======================================================== */

        .nikku-mobile-header {
          flex-shrink:
            0;

          min-height:
            69px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            12px;

          padding:
            10px 13px;

          border-bottom:
            1px solid
            rgba(255,255,255,.72);

          background:
            linear-gradient(
              145deg,
              rgba(249,247,252,.78),
              rgba(229,223,239,.70)
            );

          box-shadow:
            0 6px 13px
            rgba(91,76,118,.07);
        }

        .nikku-mobile-brand {
          min-width:
            0;

          overflow:
            hidden;
        }

        .nikku-mobile-brand-main {
          color:
            #484050;

          font-family:
            'Syne',
            sans-serif;

          font-size:
            14px;

          font-weight:
            900;

          letter-spacing:
            .17em;

          line-height:
            1;

          white-space:
            nowrap;

          overflow:
            hidden;

          text-overflow:
            ellipsis;
        }

        .nikku-mobile-brand-sub {
          margin-top:
            4px;

          color:
            #9278bf;

          font-family:
            monospace;

          font-size:
            6px;

          font-weight:
            800;

          letter-spacing:
            .30em;
        }

        .nikku-mobile-close {
          width:
            38px;

          height:
            38px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            11px;

          color:
            #6b6176;

          background:
            linear-gradient(
              145deg,
              #f5f2f9,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.90);

          box-shadow:
            6px 6px 12px
            rgba(91,76,118,.13),

            -5px -5px 10px
            rgba(255,255,255,.84);

          transition:
            transform 180ms ease,
            color 180ms ease;
        }

        .nikku-mobile-close:hover {
          color:
            var(--clay-purple-dark);

          transform:
            rotate(5deg);
        }

        /* ========================================================
           MOBILE CONTENT
           ======================================================== */

        .nikku-mobile-content {
          flex:
            1;

          min-height:
            0;

          overflow-x:
            hidden;

          overflow-y:
            auto;

          -webkit-overflow-scrolling:
            touch;

          padding:
            11px;

          scrollbar-width:
            thin;

          scrollbar-color:
            rgba(143,114,202,.35)
            transparent;
        }

        .nikku-mobile-content::-webkit-scrollbar {
          width:
            5px;
        }

        .nikku-mobile-content::-webkit-scrollbar-track {
          background:
            transparent;
        }

        .nikku-mobile-content::-webkit-scrollbar-thumb {
          background:
            rgba(143,114,202,.35);

          border-radius:
            999px;
        }

        /* ========================================================
           MOBILE QUICK ACTIONS
           ======================================================== */

        .nikku-mobile-actions {
          display:
            grid;

          grid-template-columns:
            repeat(2,minmax(0,1fr));

          gap:
            8px;

          margin-bottom:
            15px;

          padding-bottom:
            14px;

          border-bottom:
            1px solid
            rgba(255,255,255,.70);
        }

        .nikku-mobile-action {
          width:
            100%;

          min-width:
            0;

          min-height:
            44px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            6px;

          padding:
            7px 5px;

          border-radius:
            12px;

          color:
            #6e6479;

          background:
            linear-gradient(
              145deg,
              #f4f1f9,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.88);

          box-shadow:
            6px 6px 12px
            rgba(91,76,118,.12),

            -5px -5px 10px
            rgba(255,255,255,.82);

          font-family:
            monospace;

          font-size:
            7px;

          font-weight:
            800;

          letter-spacing:
            .04em;

          text-transform:
            uppercase;

          white-space:
            nowrap;

          overflow:
            hidden;

          transition:
            transform 180ms ease,
            color 180ms ease;
        }

        .nikku-mobile-action:hover {
          color:
            var(--clay-purple-dark);

          transform:
            translateY(-1px);
        }

        .nikku-mobile-action.admin {
          grid-column:
            1 / -1;

          color:
            #fff;

          background:
            linear-gradient(
              145deg,
              #a084d7,
              #7959b8
            );
        }

        /* ========================================================
           MOBILE SECTION LABEL
           ======================================================== */

        .nikku-mobile-section-label {
          margin:
            3px 3px 9px;

          color:
            #91879c;

          font-family:
            monospace;

          font-size:
            7px;

          font-weight:
            800;

          letter-spacing:
            .18em;

          text-transform:
            uppercase;
        }

        /* ========================================================
           MOBILE COLLECTION BUTTON
           ======================================================== */

        .nikku-mobile-item {
          width:
            100%;

          min-width:
            0;

          min-height:
            50px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            10px;

          margin-bottom:
            8px;

          padding:
            9px 10px 9px 12px;

          border-radius:
            14px;

          color:
            #62596e;

          background:
            linear-gradient(
              145deg,
              #f3eff8,
              #ddd7e8
            );

          border:
            1px solid
            rgba(255,255,255,.85);

          box-shadow:
            7px 7px 14px
            rgba(91,76,118,.13),

            -6px -6px 12px
            rgba(255,255,255,.82);

          font-family:
            'Syne',
            sans-serif;

          font-size:
            clamp(
              10px,
              3.15vw,
              12px
            );

          font-weight:
            800;

          text-align:
            left;

          transition:
            transform 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease;
        }

        .nikku-mobile-item:hover {
          color:
            var(--clay-purple-dark);

          transform:
            translateX(-2px)
            translateY(-1px);

          box-shadow:
            9px 9px 17px
            rgba(91,76,118,.16),

            -7px -7px 13px
            rgba(255,255,255,.88);
        }

        .nikku-mobile-item:active {
          transform:
            translateY(1px);

          box-shadow:
            inset 4px 4px 8px
            rgba(91,76,118,.12),

            inset -4px -4px 8px
            rgba(255,255,255,.80);
        }

        .nikku-mobile-item > span:first-child {
          min-width:
            0;

          overflow:
            hidden;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .nikku-mobile-item-arrow {
          width:
            28px;

          height:
            28px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            9px;

          color:
            #fff;

          background:
            linear-gradient(
              145deg,
              #a084d7,
              #7959b8
            );

          box-shadow:
            4px 4px 8px
            rgba(91,76,118,.16),

            -3px -3px 6px
            rgba(255,255,255,.55);

          transition:
            transform 180ms ease;
        }

        .nikku-mobile-item:hover
        .nikku-mobile-item-arrow {
          transform:
            translateX(3px);
        }

        /* ========================================================
           MOBILE FOOTER
           ======================================================== */

        .nikku-mobile-footer {
          flex-shrink:
            0;

          padding:
            9px 11px 12px;

          border-top:
            1px solid
            rgba(255,255,255,.72);
        }

        .nikku-mobile-footer-card {
          padding:
            10px 11px;

          border-radius:
            13px;

          background:
            linear-gradient(
              145deg,
              #f1edf7,
              #ded8e8
            );

          border:
            1px solid
            rgba(255,255,255,.84);

          box-shadow:
            inset 3px 3px 7px
            rgba(91,76,118,.08),

            inset -3px -3px 7px
            rgba(255,255,255,.80);
        }

        .nikku-mobile-footer-title {
          color:
            #62586e;

          font-size:
            9px;

          font-weight:
            800;
        }

        .nikku-mobile-footer-text {
          margin-top:
            3px;

          color:
            #8a8192;

          font-size:
            8px;
        }

        /* ========================================================
           ANIMATIONS
           ======================================================== */

        @keyframes nikkuDropdownIn {

          from {
            opacity:
              0;

            transform:
              translateY(-7px)
              scale(.97);
          }

          to {
            opacity:
              1;

            transform:
              translateY(0)
              scale(1);
          }

        }

        @keyframes nikkuDrawerIn {

          from {
            opacity:
              0;

            transform:
              translateX(25px);
          }

          to {
            opacity:
              1;

            transform:
              translateX(0);
          }

        }

        /* ========================================================
           TABLET
           ======================================================== */

        @media (max-width: 1199px) {

          .nikku-desktop-links {
            gap:
              2px;
          }

          .nikku-nav-link {
            padding:
              7px 8px;

            font-size:
              7px;
          }

          .nikku-main-nav {
            padding:
              7px 12px;
          }

          .nikku-brand-main {
            font-size:
              14px;
          }

        }

        /* ========================================================
           MOBILE
           ======================================================== */

        @media (max-width: 767px) {

          .nikku-navbar-shell {
            width:
              calc(100% - 10px);

            margin-top:
              5px;

            border-radius:
              16px;
          }

          .nikku-navbar-shell.scrolled {
            margin-top:
              4px;

            border-radius:
              14px;
          }

          .nikku-top-strip {
            display:
              none;
          }

          .nikku-main-nav {
            width:
              100%;

            min-height:
              58px;

            grid-template-columns:
              40px
              minmax(0,1fr)
              auto;

            gap:
              7px;

            padding:
              6px 7px;
          }

          .nikku-left-area {
            width:
              40px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;
          }

          .nikku-mobile-menu-button {
            width:
              38px;

            height:
              38px;
          }

          .nikku-desktop-links {
            display:
              none;
          }

          .nikku-brand {
            width:
              100%;

            min-width:
              0;

            max-width:
              100%;

            padding:
              3px 2px;

            overflow:
              hidden;
          }

          .nikku-brand-main {
            max-width:
              100%;

            overflow:
              hidden;

            text-overflow:
              ellipsis;

            font-size:
              clamp(
                10px,
                3.5vw,
                14px
              );

            letter-spacing:
              clamp(
                .08em,
                1.2vw,
                .18em
              );
          }

          .nikku-brand:hover
          .nikku-brand-main {
            letter-spacing:
              clamp(
                .08em,
                1.2vw,
                .18em
              );
          }

          .nikku-brand-sub {
            margin-top:
              3px;

            font-size:
              5px;

            letter-spacing:
              .23em;
          }

          .nikku-brand-line {
            width:
              17px;

            height:
              1.5px;

            margin-top:
              4px;
          }

          .nikku-right-actions {
            width:
              auto;

            display:
              flex;

            align-items:
              center;

            justify-content:
              flex-end;

            gap:
              5px;

            flex-shrink:
              0;
          }

          /* Search hidden from header */

          .nikku-right-actions
          .nikku-search-button {
            display:
              none !important;
          }

          /* Track hidden from header */

          .nikku-right-actions
          .nikku-track-button {
            display:
              none !important;
          }

          /* Wishlist hidden from header */

          .nikku-right-actions
          .nikku-wishlist-button {
            display:
              none !important;
          }

          /* Cart visible */

          #navbar-cart-button {
            display:
              flex !important;

            width:
              35px;

            height:
              35px;
          }

          /* User */

          .nikku-user-button {
            width:
              35px;

            height:
              35px;

            min-height:
              35px;

            padding:
              3px;

            justify-content:
              center;

            border-radius:
              10px;
          }

          .nikku-user-button svg {
            display:
              none;
          }

          .nikku-avatar {
            width:
              27px;

            height:
              27px;
          }

          /* Sign in */

          .nikku-signin {
            width:
              35px;

            height:
              35px;

            min-height:
              35px;

            padding:
              0;

            border-radius:
              10px;
          }

          .nikku-signin span {
            display:
              none;
          }

          .nikku-signin svg {
            width:
              15px;

            height:
              15px;
          }

          /* User dropdown */

          .nikku-dropdown {
            position:
              fixed;

            top:
              67px;

            right:
              7px;

            width:
              min(
                280px,
                calc(100vw - 14px)
              );

            max-height:
              calc(100dvh - 80px);

            overflow-y:
              auto;
          }

          /* Mobile drawer */

          .nikku-mobile-overlay {
            padding:
              5px;
          }

          .nikku-mobile-drawer {
            width:
              100%;

            max-width:
              430px;

            height:
              100%;

            max-height:
              100dvh;

            border-radius:
              20px;
          }

        }

        /* ========================================================
           SMALL PHONES
           ======================================================== */

        @media (max-width: 380px) {

          .nikku-navbar-shell {
            width:
              calc(100% - 8px);

            margin-top:
              4px;

            border-radius:
              14px;
          }

          .nikku-main-nav {
            min-height:
              55px;

            grid-template-columns:
              36px
              minmax(0,1fr)
              auto;

            gap:
              4px;

            padding:
              5px;
          }

          .nikku-left-area {
            width:
              36px;
          }

          .nikku-mobile-menu-button {
            width:
              34px;

            height:
              34px;
          }

          .nikku-brand-main {
            font-size:
              9px;

            letter-spacing:
              .06em;
          }

          .nikku-brand:hover
          .nikku-brand-main {
            letter-spacing:
              .06em;
          }

          .nikku-brand-sub {
            font-size:
              4.5px;

            letter-spacing:
              .17em;
          }

          .nikku-brand-line {
            width:
              14px;
          }

          .nikku-right-actions {
            gap:
              3px;
          }

          #navbar-cart-button,
          .nikku-user-button,
          .nikku-signin {
            width:
              33px;

            height:
              33px;
          }

          .nikku-avatar {
            width:
              25px;

            height:
              25px;
          }

          .nikku-mobile-header {
            min-height:
              63px;

            padding:
              9px 11px;
          }

          .nikku-mobile-brand-main {
            font-size:
              12px;

            letter-spacing:
              .12em;
          }

          .nikku-mobile-brand-sub {
            font-size:
              5px;

            letter-spacing:
              .21em;
          }

          .nikku-mobile-close {
            width:
              36px;

            height:
              36px;
          }

          .nikku-mobile-content {
            padding:
              9px;
          }

          .nikku-mobile-actions {
            gap:
              6px;
          }

          .nikku-mobile-action {
            min-height:
              41px;

            font-size:
              6.5px;
          }

          .nikku-mobile-item {
            min-height:
              46px;

            padding:
              8px 9px;

            font-size:
              10px;

            border-radius:
              13px;
          }

          .nikku-mobile-item-arrow {
            width:
              26px;

            height:
              26px;
          }

        }

        /* ========================================================
           LARGE DESKTOP
           ======================================================== */

        @media (min-width: 1536px) {

          .nikku-navbar-shell {
            width:
              calc(100% - 28px);

            margin-top:
              9px;

            border-radius:
              22px;
          }

          .nikku-main-nav {
            min-height:
              68px;

            padding:
              9px 23px;
          }

          .nikku-brand-main {
            font-size:
              18px;
          }

          .nikku-icon {
            width:
              40px;

            height:
              40px;
          }

        }

        /* ========================================================
           REDUCED MOTION
           ======================================================== */

        @media (prefers-reduced-motion: reduce) {

          .nikku-navbar-shell,
          .nikku-nav-link,
          .nikku-brand,
          .nikku-brand-main,
          .nikku-icon,
          .nikku-mobile-item,
          .nikku-mobile-action,
          .nikku-mobile-menu-button,
          .nikku-user-button,
          .nikku-signin {
            transition:
              none !important;
          }

          .nikku-dropdown,
          .nikku-mobile-drawer {
            animation:
              none !important;
          }

        }

      `}</style>

      {/* ========================================================
          DESKTOP / MAIN NAVBAR
          ======================================================== */}

      <header className="nikku-navbar">

        <div
          className={
            `nikku-navbar-shell ${
              isScrolled
                ? 'scrolled'
                : ''
            }`
          }
        >

          {/* ====================================================
              TOP STRIP
              ==================================================== */}

          <div className="nikku-top-strip">

            

            <div className="nikku-top-right">


              {isAdmin ? (

                <button
                  onClick={function () {
                    setIsAdminPortalOpen(true);
                  }}
                  className="nikku-top-admin"
                >

                  <Shield className="w-3 h-3" />

                  <span>
                    ADMIN PORTAL ({ADMIN_EMAIL})
                  </span>

                </button>

              ) : (

                <button
                  onClick={function () {
                    setIsAuthModalOpen(true);
                  }}
                  className="nikku-top-orders"
                >

                  <UserIcon className="w-3 h-3" />

                  <span>
                    BEYOND THE FASHION WITH NIKKU FASHION
                  </span>

                </button>

              )}

            </div>

          </div>

          {/* ====================================================
              MAIN NAV
              ==================================================== */}

          <div className="nikku-main-nav">

            {/* LEFT */}

            <div className="nikku-left-area">

              <button
                onClick={function () {
                  setMobileMenuOpen(true);
                }}
                className="
                  nikku-mobile-menu-button
                  lg:hidden
                "
                aria-label="Open menu"
              >

                <Menu className="w-5 h-5" />

              </button>

              <nav className="nikku-desktop-links">

                <button
                  onClick={function () {
                    handleNavClick('men');
                  }}
                  className="nikku-nav-link hidden lg:inline-flex"
                >
                  Men
                </button>

                <button
                  onClick={function () {
                    handleNavClick('women');
                  }}
                  className="nikku-nav-link hidden lg:inline-flex"
                >
                  Women
                </button>

                <button
                  onClick={function () {
                    handleNavClick('jeans');
                  }}
                  className="nikku-nav-link hidden lg:inline-flex"
                >
                  Denim &amp; Jeans
                </button>

                <button
                  onClick={function () {
                    handleNavClick('t-shirts');
                  }}
                  className="nikku-nav-link hidden lg:inline-flex"
                >
                  T-Shirts
                </button>

                <button
                  onClick={function () {
                    handleNavClick('jackets');
                  }}
                  className="nikku-nav-link hidden lg:inline-flex"
                >
                  Outerwear
                </button>

              </nav>

            </div>

            {/* ==================================================
                CENTER LOGO
                ================================================== */}

            <button
              onClick={function () {
                handleNavClick();
              }}
              className="nikku-brand"
            >

              <span className="nikku-brand-main">
                NIKKU FASHION
              </span>

              <span className="nikku-brand-sub">
                NAWALGARH
              </span>

              <span className="nikku-brand-line" />

            </button>

            {/* ==================================================
                RIGHT ACTIONS
                ================================================== */}

            <div className="nikku-right-actions">

              {/* SEARCH */}

              <button
                onClick={function () {
                  setIsSearchOpen(true);
                }}
                className="
                  nikku-icon
                  nikku-search-button
                "
                aria-label="Search collection"
              >

                <Search className="w-4 h-4" />

              </button>

              {/* TRACK */}

              <button
                onClick={function () {
                  setIsUserOrdersOpen(true);
                }}
                className="
                  nikku-icon
                  nikku-track-button
                "
                title="Track Order"
              >

                <Package className="w-4 h-4" />

                <span>
                  Track
                </span>

              </button>

              {/* WISHLIST */}

              <button
                onClick={function () {
                  setIsWishlistOpen(true);
                }}
                className="
                  nikku-icon
                  nikku-wishlist-button
                "
                aria-label="Wishlist"
              >

                <Heart className="w-4 h-4" />

                {wishlist.length > 0 && (

                  <span className="nikku-badge">

                    {wishlist.length}

                  </span>

                )}

              </button>

              {/* CART */}

              <button
                id="navbar-cart-button"
                onClick={function () {
                  setIsCartOpen(true);
                }}
                className="nikku-icon"
                aria-label="Cart"
              >

                <ShoppingBag className="w-4 h-4" />

                {cartCount > 0 && (

                  <span className="nikku-badge">

                    {cartCount}

                  </span>

                )}

              </button>

              {/* USER */}

              <div className="relative">

                {currentUser ? (

                  <div className="relative">

                    <button
                      onClick={function () {
                        setUserDropdownOpen(
                          !userDropdownOpen
                        );
                      }}
                      className={
                        `nikku-user-button ${
                          userDropdownOpen
                            ? 'open'
                            : ''
                        }`
                      }
                      aria-label="Account menu"
                    >

                      <img
                        src={
                          currentUser.avatar ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'
                        }
                        alt={currentUser.name}
                        className="nikku-avatar"
                      />

                      <ChevronDown
                        className="w-3 h-3"
                        style={{
                          transform:
                            userDropdownOpen
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)'
                        }}
                      />

                    </button>

                    {/* USER DROPDOWN */}

                    {userDropdownOpen && (

                      <div className="nikku-dropdown">

                        <div className="nikku-user-info">

                          <div className="nikku-user-name">
                            {currentUser.name}
                          </div>

                          <div className="nikku-user-email">
                            {currentUser.email}
                          </div>

                          {isAdmin && (

                            <span className="nikku-admin-label">
                              STORE OWNER · ADMIN
                            </span>

                          )}

                        </div>

                        {isAdmin && (

                          <button
                            onClick={function () {

                              setUserDropdownOpen(false);

                              setIsAdminPortalOpen(true);

                            }}
                            className="
                              nikku-dropdown-item
                              admin
                            "
                          >

                            <Shield className="w-3.5 h-3.5" />

                            <span>
                              Open Admin Portal
                            </span>

                          </button>

                        )}

                        <button
                          onClick={function () {

                            setUserDropdownOpen(false);

                            setIsUserOrdersOpen(true);

                          }}
                          className="nikku-dropdown-item"
                        >

                          <Package className="w-3.5 h-3.5" />

                          <span>
                            My Orders &amp; Tracking
                          </span>

                        </button>

                        <button
                          onClick={function () {

                            setUserDropdownOpen(false);

                            logout();

                          }}
                          className="
                            nikku-dropdown-item
                            logout
                          "
                        >

                          <LogOut className="w-3.5 h-3.5" />

                          <span>
                            Sign Out
                          </span>

                        </button>

                      </div>

                    )}

                  </div>

                ) : (

                  <button
                    onClick={function () {
                      setIsAuthModalOpen(true);
                    }}
                    className="nikku-signin"
                  >

                    <UserIcon className="w-3.5 h-3.5" />

                    <span>
                      SIGN IN
                    </span>

                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* ========================================================
          MOBILE MENU
          ======================================================== */}

      <div
        className={
          `nikku-mobile-overlay ${
            mobileMenuOpen
              ? 'open'
              : ''
          }`
        }
        onClick={function (event) {

          if (
            event.target ===
            event.currentTarget
          ) {

            setMobileMenuOpen(false);

          }

        }}
      >

        <div className="nikku-mobile-drawer">

          {/* ==================================================
              MOBILE HEADER
              ================================================== */}

          <div className="nikku-mobile-header">

            <div className="nikku-mobile-brand">

              <div className="nikku-mobile-brand-main">
                NIKKU FASHION
              </div>

              <div className="nikku-mobile-brand-sub">
                NAWALGARH
              </div>

            </div>

            <button
              onClick={function () {
                setMobileMenuOpen(false);
              }}
              className="nikku-mobile-close"
              aria-label="Close menu"
            >

              <X className="w-5 h-5" />

            </button>

          </div>

          {/* ==================================================
              MOBILE SCROLL AREA
              ================================================== */}

          <div className="nikku-mobile-content">

            {/* QUICK ACTIONS */}

            <div className="nikku-mobile-actions">

              {/* SEARCH */}

              <button
                onClick={function () {

                  setMobileMenuOpen(false);

                  setIsSearchOpen(true);

                }}
                className="nikku-mobile-action"
              >

                <Search className="w-4 h-4 text-[#8f72ca]" />

                <span>
                  Search
                </span>

              </button>

              {/* WISHLIST */}

              <button
                onClick={function () {

                  setMobileMenuOpen(false);

                  setIsWishlistOpen(true);

                }}
                className="nikku-mobile-action"
              >

                <Heart className="w-4 h-4 text-[#8f72ca]" />

                <span>
                  Wishlist
                </span>

              </button>

              {/* TRACK */}

              <button
                onClick={function () {

                  setMobileMenuOpen(false);

                  setIsUserOrdersOpen(true);

                }}
                className="nikku-mobile-action"
              >

                <Package className="w-4 h-4 text-[#8f72ca]" />

                <span>
                  Track Orders
                </span>

              </button>

              {/* ADMIN / LOGIN */}

              {isAdmin ? (

                <button
                  onClick={function () {

                    setMobileMenuOpen(false);

                    setIsAdminPortalOpen(true);

                  }}
                  className="
                    nikku-mobile-action
                    admin
                  "
                >

                  <Shield className="w-4 h-4" />

                  <span>
                    Admin Portal
                  </span>

                </button>

              ) : (

                <button
                  onClick={function () {

                    setMobileMenuOpen(false);

                    setIsAuthModalOpen(true);

                  }}
                  className="nikku-mobile-action"
                >

                  <UserIcon className="w-4 h-4 text-[#8f72ca]" />

                  <span>
                    Sign In
                  </span>

                </button>

              )}

            </div>

            {/* COLLECTION LABEL */}

            <div className="nikku-mobile-section-label">
              Shop Collections
            </div>

            {/* COLLECTION BUTTONS */}

            {mobileItems.map(function (
              item,
              index
            ) {

              return (

                <button
                  key={index}
                  onClick={function () {
                    handleNavClick(item.cat);
                  }}
                  className="nikku-mobile-item"
                >

                  <span>
                    {item.label}
                  </span>

                  <span className="nikku-mobile-item-arrow">

                    <ArrowRight className="w-3.5 h-3.5" />

                  </span>

                </button>

              );

            })}

          </div>

          {/* ==================================================
              MOBILE FOOTER
              ================================================== */}

          <div className="nikku-mobile-footer">

            <div className="nikku-mobile-footer-card">

              <div className="nikku-mobile-footer-title">
                Nikku Fashion Flagship Studio
              </div>

              <div className="nikku-mobile-footer-text">
                Nawalgarh, Rajasthan · Free Shipping Pan India
              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
};