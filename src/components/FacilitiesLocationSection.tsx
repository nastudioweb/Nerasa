import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Camera,
  Users,
  Wind,
  Car,
  HeartHandshake,
  Wifi,
  Navigation,
} from 'lucide-react';

export const FacilitiesLocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CAFE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const facilityIcons: Record<string, any> = {
    sparkles: Sparkles,
    camera: Camera,
    users: Users,
    wind: Wind,
    car: Car,
    heart: HeartHandshake,
    wifi: Wifi,
  };

  return (
    <section id="fasilitas" className="py-20 bg-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DBD0] text-xs font-bold uppercase tracking-wider text-[#A85827] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kenyamanan & Fasilitas Pengunjung</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F1C] tracking-tight">
            Fasilitas Lengkap & Lokasi Strategis
          </h2>
          <p className="text-[#635B50] text-sm sm:text-base leading-relaxed">
            Didesain khusus untuk memenuhi kebutuhan nongkrong santai, WFC dengan colokan lengkap,
            rapat bisnis di meeting room, hingga kumpul keluarga ramah anak di Air Hitam, Samarinda.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {CAFE_INFO.facilities.map((fac, idx) => {
            const Icon = facilityIcons[fac.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E2DBD0] hover:border-[#C97A44] transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 group flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] group-hover:bg-[#C97A44]/15 text-[#C97A44] flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#231F1C] text-base mb-1.5 group-hover:text-[#A85827] transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-[#665D52] text-xs leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location & Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white border border-[#E2DBD0] shadow-md shadow-stone-200/50 space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#A85827] uppercase tracking-wider block mb-1">
                    Lokasi Outlet
                  </span>
                  <h3 className="text-2xl font-black text-[#231F1C]">Nerasa Cafe Samarinda</h3>
                  <p className="text-xs text-[#786E62] mt-1 font-medium">
                    Kecamatan Samarinda Ulu, Kota Samarinda, Kalimantan Timur
                  </p>
                </div>

                {/* Address block with copy button */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3DBD0] space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C97A44] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-semibold text-[#231F1C] leading-relaxed">
                        {CAFE_INFO.address}
                      </p>
                      <p className="text-[#A85827] font-mono text-[11px] mt-1 font-bold">
                        Plus Code: {CAFE_INFO.plusCode}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyAddress}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F2ECE3] text-[#3E3830] text-xs font-bold border border-[#DDD5C9] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#A85827]" />
                        <span>Salin Alamat Lengkap</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Operating Hours */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-[#231F1C] font-bold">
                    <Clock className="w-4 h-4 text-[#C97A44]" />
                    <span>Jadwal Operasional Setiap Hari</span>
                  </div>
                  <div className="pl-6 space-y-1 text-[#665D52]">
                    <p className="text-[#231F1C] font-semibold">Buka Pukul 08:00 – 23:00 WITA</p>
                    <p className="text-[11px] text-[#7A7064]">
                      Waktu Teramai: Siang (12:00–14:00) & Malam (18:30–21:30 WITA)
                    </p>
                  </div>
                </div>

                {/* Direct Contacts */}
                <div className="space-y-2.5 pt-4 border-t border-[#EFE8DF] text-xs">
                  <a
                    href={`tel:${CAFE_INFO.phone}`}
                    className="flex items-center gap-3 text-[#4A4238] hover:text-[#231F1C] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#C97A44] border border-[#E8DFD3]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{CAFE_INFO.phone} (Telepon / WhatsApp Reservasi)</span>
                  </a>

                  <a
                    href={`mailto:${CAFE_INFO.email}`}
                    className="flex items-center gap-3 text-[#4A4238] hover:text-[#231F1C] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#C97A44] border border-[#E8DFD3]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{CAFE_INFO.email} (Kerjasama / Partnership)</span>
                  </a>
                </div>
              </div>

              {/* External Google Maps Button */}
              <div className="pt-4">
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Buka Petunjuk Arah di Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map View Column (Right) */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2DBD0] shadow-md shadow-stone-200/50 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#231F1C]">
                  <MapPin className="w-4 h-4 text-[#C97A44]" />
                  <span>Peta Lokasi Nerasa</span>
                </div>
                <span className="text-[11px] text-[#7A7064] font-semibold">Air Hitam, Samarinda Ulu</span>
              </div>

              {/* Clean natural map container */}
              <div className="relative flex-1 w-full min-h-[350px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#E2DBD0] bg-[#FAF8F5]">
                <iframe
                  title="Peta Lokasi Nerasa Cafe Samarinda"
                  src="https://maps.google.com/maps?q=-0.485,117.135&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full opacity-95"
                  loading="lazy"
                  style={{ border: 0 }}
                />

                {/* Overlay Card on Top of Map */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2DBD0] shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#231F1C] text-sm">Nerasa Cafe</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      4.4 ★
                    </span>
                  </div>
                  <p className="text-[11px] text-[#554E44] leading-snug">
                    Jl. Wijaya Kusuma, Air Hitam, Samarinda Ulu.
                  </p>
                  <a
                    href={CAFE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#A85827] hover:underline font-bold"
                  >
                    <span>Navigasi Sekarang</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
