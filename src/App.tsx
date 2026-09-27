import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { FlyToCartAnimation } from './components/FlyToCartAnimation';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValueProps } from './components/ValueProps';
import { CollectionsGrid } from './components/CollectionsGrid';
import { SplitSection } from './components/SplitSection';
import { NewArrivals } from './components/NewArrivals';
import { JeansFeature } from './components/JeansFeature';
import { HorizontalStory } from './components/HorizontalStory';
import { EditorialStory } from './components/EditorialStory';
import { LookbookSection } from './components/LookbookSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CatalogView } from './components/CatalogView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CampaignStoryModal } from './components/CampaignStoryModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { UserOrdersModal } from './components/UserOrdersModal';
import { Shield, Package, UserCheck } from 'lucide-react';
import { ADMIN_EMAIL } from './data/initialStoreData';

const StoreContent: React.FC = () => {
  const {
    isCatalogOpen,
    isAdmin,
    setIsAdminPortalOpen,
    setIsAuthModalOpen,
    setIsUserOrdersOpen,
  } = useShop();

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#090909',
        color: '#f4f2ee',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Micro-interaction cart flight */}
      <FlyToCartAnimation />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main View: Full Editorial Campaign Home or Catalog */}
      <main style={{ flex: 1 }}>
        {isCatalogOpen ? (
          <CatalogView />
        ) : (
          <>
            {/* 1. Fullscreen High Fashion Campaign Hero */}
            <HeroSection />

            {/* 2. Fabric & Service Guarantees */}
            <ValueProps />

            {/* 3. Curated Collections: Men, Women, Jeans, T-Shirts, Tops, Jackets */}
            <CollectionsGrid />

            {/* 4. Men & Women Split Section */}
            <SplitSection />

            {/* 5. New Arrivals Rotation with Flipkart-Style Color Switch */}
            <NewArrivals />

            {/* 6. Denim Spotlight: Raw Selvedge Archive */}
            <JeansFeature />

            {/* 7. Horizontal Runway & Fabric Stories */}
            <HorizontalStory />

            {/* 8. Flagship Story & Origin */}
            <EditorialStory />

            {/* 9. Follow The Look / Lookbook */}
            <LookbookSection />

            {/* 10. VIP Member Club */}
            <Newsletter />
          </>
        )}
      </main>

      {/* Floating Quick Action Bar (Bottom Right) for Instant Admin & Tracking Access with Inline Styles */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px'
        }}
      >
        {isAdmin ? (
          <button
            onClick={() => setIsAdminPortalOpen(true)}
            style={{
              padding: '10px 18px',
              backgroundColor: '#c5a880',
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              border: '1px solid rgba(0,0,0,0.3)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Shield style={{ width: '16px', height: '16px', fill: '#000000' }} />
            <span>Admin Portal ({ADMIN_EMAIL})</span>
          </button>
        ) : (
          <div
            
          >
            

            
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Functional Retail Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <CheckoutModal />
      <SizeGuideModal />
      <CampaignStoryModal />

      {/* Store Management & Authentication Modals */}
      <GoogleAuthModal />
      <AdminPortalModal />
      <UserOrdersModal />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <StoreContent />
    </ShopProvider>
  );
}
