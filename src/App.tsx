import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FacilitiesLocationSection } from './components/FacilitiesLocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartItem, MenuItem } from './types';
import { CAFE_INFO } from './data/cafeData';
import { Calendar, MessageCircle, ShoppingBag, ArrowUp } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('nerasa_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nerasa_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Track active section and scroll top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['beranda', 'menu', 'reservasi', 'galeri', 'ulasan', 'fasilitas'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.item.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const cartItemIdsMap: Record<string, number> = {};
  cartItems.forEach((c) => {
    cartItemIdsMap[c.item.id] = c.quantity;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#C97A44] selection:text-white">
      {/* Top sticky navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservation}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenReservation={scrollToReservation} />
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIdsMap}
        />
        <ReservationSection />
        <GallerySection />
        <ReviewsSection />
        <FacilitiesLocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenReservation={() => {
          setIsCartOpen(false);
          scrollToReservation();
        }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            type="button"
            className="p-3 rounded-full bg-white/95 hover:bg-white text-[#4A4239] hover:text-[#1F1C18] border border-[#DDD5C9] shadow-lg shadow-stone-200/50 backdrop-blur-sm pointer-events-auto transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Kembali ke Atas"
          >
            <ArrowUp className="w-5 h-5 text-[#C97A44]" />
          </button>
        )}

        {/* Floating WhatsApp Chat Button */}
        <a
          href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20Admin%20Nerasa%20Samarinda!%20Saya%20ingin%20bertanya%20seputar%20kafe%20dan%20reservasi.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BE5C] text-neutral-900 font-bold text-sm shadow-xl shadow-[#25D366]/30 pointer-events-auto transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-neutral-900" />
          <span className="hidden sm:inline">WhatsApp Nerasa</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar for Quick Booking */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[#E2DBD0] flex items-center justify-between gap-2 shadow-lg">
        <button
          onClick={scrollToReservation}
          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Reservasi Meja Online</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="p-2.5 rounded-xl bg-[#FAF8F5] text-[#231F1C] border border-[#DDD5C9] relative"
        >
          <ShoppingBag className="w-5 h-5 text-[#C97A44]" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C97A44] text-[10px] font-bold flex items-center justify-center text-white">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
