import React from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { isCafeOpenNow } from '../utils/formatters';
import {
  Calendar,
  UtensilsCrossed,
  MapPin,
  Star,
  Sparkles,
  ShieldCheck,
  Camera,
  Users,
  Car,
  Clock,
  Compass,
} from 'lucide-react';
import heroBg from '../assets/images/nerasa_night_facade_1791995124399.jpg';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const cafeStatus = isCafeOpenNow();

  return (
    <section id="beranda" className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#FAF8F5]">
      {/* Background with soft warm off-white overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Nerasa Cafe Exterior Night View"
          className="w-full h-full object-cover object-center filter contrast-[0.95] opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/90 to-[#FAF8F5]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-[#FAF8F5]/50" />
        {/* Soft terracotta warm radiant glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#E8AF84]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Pill - Category & Location */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DFD4] shadow-xs text-xs font-semibold text-[#4F473E]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide">
                {CAFE_INFO.category} · Air Hitam, Samarinda
              </span>
              <span className="text-[#D6CCC0]">|</span>
              <span className="text-[#A85827] font-bold">{CAFE_INFO.priceRange}</span>
            </div>

            {/* Typography Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#231F1C] leading-none">
                nerasa
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-[#8A461E] italic font-serif tracking-wide">
                “{CAFE_INFO.tagline}”
              </p>
            </div>

            {/* Description / Summary */}
            <p className="text-base sm:text-lg text-[#554D43] max-w-2xl font-normal leading-relaxed">
              Ruang temu hangat di Samarinda dengan interior kayu Japandi modern. Sajian kopi spesial,
              aneka rice bowl, pasta artisan, hingga cemilan favorit porsi melimpah untuk dinikmati
              bersama keluarga maupun teman kerja.
            </p>

            {/* Rating & Social Proof Bar */}
            <div className="flex flex-wrap items-center gap-4 py-1 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#E5DFD4] shadow-xs">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/40 text-amber-400/60'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-extrabold text-[#231F1C] text-base">4,4</span>
                <span className="text-[#756C62] text-xs font-medium">({CAFE_INFO.reviewCount} ulasan di Google)</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A5248]">
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs">
                  Makan di tempat
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs">
                  Bawa pulang
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs">
                  Antar tanpa bertemu
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenReservation}
                type="button"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white font-bold text-base shadow-md shadow-[#C97A44]/20 hover:shadow-[#C97A44]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Reservasi Meja Online</span>
              </button>

              <a
                href="#menu"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F5EFE6] text-[#2C2723] hover:text-[#181513] font-semibold text-base border border-[#E0D7CB] shadow-xs transition-all flex items-center gap-2"
              >
                <UtensilsCrossed className="w-5 h-5 text-[#C97A44]" />
                <span>Buku Menu Lengkap</span>
              </a>

              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-[#F2ECE3] hover:bg-[#EAE2D7] text-[#4A4239] text-sm border border-[#DDD3C5] transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#C97A44]" />
                <span>Rute Maps</span>
              </a>
            </div>

            {/* Facility Highlights Chips */}
            <div className="pt-4 border-t border-[#E5DFD4] flex flex-wrap gap-2 text-xs text-[#524B41]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C97A44]" /> Mushola Bersih & Wudhu
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs font-medium">
                <Camera className="w-3.5 h-3.5 text-[#C97A44]" /> Aesthetic Photo Booth
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs font-medium">
                <Users className="w-3.5 h-3.5 text-[#C97A44]" /> VIP / Meeting Room
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs font-medium">
                <Car className="w-3.5 h-3.5 text-[#C97A44]" /> Parkir Luas Depan Outlet
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DFD4] shadow-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C97A44]" /> Baby Chair & Ramah Balita
              </span>
            </div>
          </div>

          {/* Quick Info & Schedule Card (Right Column) */}
          <div className="lg:col-span-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E5DFD4] shadow-lg shadow-stone-200/40 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DC]">
                <span className="text-xs uppercase font-bold tracking-wider text-[#73695D]">
                  Status Outlet Hari Ini
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    cafeStatus.isOpen
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {cafeStatus.statusText}
                </span>
              </div>

              {/* Hours details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 text-[#4A4239]">
                  <Clock className="w-4 h-4 text-[#C97A44] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#231F1C]">Jam Operasional</p>
                    <p className="text-[#696055] text-xs">Setiap Hari: 08:00 – 23:00 WITA</p>
                    <p className="text-[11px] text-[#8C8173] mt-0.5">
                      Jam Ramai Pengunjung: 12.00–14.00 & 19.00–21.30 WITA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#4A4239] pt-2 border-t border-[#EDE6DC]">
                  <Compass className="w-4 h-4 text-[#C97A44] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#231F1C]">Alamat Lengkap</p>
                    <p className="text-[#696055] text-xs leading-relaxed">
                      {CAFE_INFO.address}
                    </p>
                    <p className="text-[11px] text-[#A65422] mt-0.5 font-mono font-semibold">
                      Plus Code: {CAFE_INFO.plusCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Connect */}
              <div className="p-4 rounded-2xl bg-[#F6F2EB] border border-[#E3DBD0] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#4A4239] font-bold">Bantuan Cepat & Tanya Menu</span>
                  <span className="text-emerald-700 font-bold text-[11px]">Online</span>
                </div>
                <a
                  href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20Admin%20Nerasa,%20saya%20ingin%20tanya%20menu%20dan%20reservasi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-neutral-900 font-bold text-xs shadow-xs transition-all"
                >
                  <span>Chat WhatsApp (0853-9388-6194)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
