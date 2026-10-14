import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { isCafeOpenNow } from '../utils/formatters';
import { CAFE_INFO } from '../data/cafeData';
import { Menu, X, ShoppingBag, PhoneCall, Calendar, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cafeStatus = isCafeOpenNow();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reservasi', href: '#reservasi' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'Ulasan', href: '#ulasan' },
    { name: 'Fasilitas & Lokasi', href: '#fasilitas' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE4DC] shadow-sm py-3'
          : 'bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-[#EAE4DC]/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#beranda" className="flex items-center group">
            <BrandLogo showTagline size="md" variant="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F1ECE4]/90 backdrop-blur-sm border border-[#E2DBD1] rounded-full px-5 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#873E14] bg-[#C97A44]/15 border border-[#C97A44]/40 font-bold'
                      : 'text-[#5C544B] hover:text-[#231F1C] hover:bg-black/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Open Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#F3EFE9] border border-[#E2DBD1] rounded-full text-xs font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  cafeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className={cafeStatus.isOpen ? 'text-emerald-700' : 'text-amber-700'}>
                {cafeStatus.statusText}
              </span>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2.5 rounded-full bg-[#F3EFE9] hover:bg-[#EAE4DA] text-[#3A342E] border border-[#DDD5C9] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              aria-label="Keranjang Pesanan"
            >
              <ShoppingBag className="w-5 h-5 text-[#C97A44]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C97A44] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Online Reservation CTA */}
            <button
              onClick={onOpenReservation}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white font-semibold text-sm shadow-sm transition-all hover:shadow-[#C97A44]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Meja</span>
            </button>

            {/* WhatsApp Quick CTA */}
            <a
              href={`https://wa.me/${CAFE_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1DA851] border border-[#25D366]/30 transition-all cursor-pointer"
              title="Chat WhatsApp Cafe"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg bg-[#F3EFE9] text-[#3A342E] border border-[#DDD5C9]"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-[#EAE4DC] bg-[#FAF8F5] rounded-2xl p-4 shadow-xl border border-[#E4DDD3] space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between px-2 py-1 text-xs text-[#6B6359]">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    cafeStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                {cafeStatus.statusText} · {cafeStatus.subText}
              </span>
              <span className="text-[#C97A44] font-semibold">Samarinda Ulu</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#423C35] hover:text-[#1F1D1A] hover:bg-[#F2ECE3] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EAE4DC] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] text-white font-semibold text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Pesan / Reservasi Meja Sekarang</span>
              </button>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#F3EFE9] hover:bg-[#EAE4DA] text-[#4A433B] text-xs border border-[#DDD5C9]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C97A44]" />
                <span>Petunjuk Arah Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
