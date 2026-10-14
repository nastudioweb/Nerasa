import React from 'react';
import { BrandLogo } from './BrandLogo';
import { CAFE_INFO } from '../data/cafeData';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EFEAE1] border-t border-[#DFD7CA] text-[#554C42] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo showTagline size="lg" variant="dark" />
            <p className="text-[#635A4F] text-xs sm:text-sm max-w-sm leading-relaxed">
              Ruang temu modern di Samarinda Ulu yang memadukan kehangatan desain Japandi,
              kelezatan hidangan nusantara & fusion, serta racikan kopi berkualitas tinggi.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#C97A44] hover:text-white border border-[#DDD5C8] flex items-center justify-center text-[#4A4239] transition-colors shadow-xs"
                title="Instagram Nerasa"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#25D366] hover:text-neutral-900 border border-[#DDD5C8] flex items-center gap-2 text-xs font-bold text-[#2C2721] transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#C97A44]" />
                <span>WhatsApp: {CAFE_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#231F1C] font-bold text-sm tracking-wider uppercase">Navigasi</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#beranda" className="hover:text-[#A85827] transition-colors">
                  Beranda Utama
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#A85827] transition-colors">
                  Buku Menu & Minuman
                </a>
              </li>
              <li>
                <a href="#reservasi" className="hover:text-[#A85827] transition-colors">
                  Pemesanan Meja Online
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-[#A85827] transition-colors">
                  Galeri Foto & Suasana
                </a>
              </li>
              <li>
                <a href="#ulasan" className="hover:text-[#A85827] transition-colors">
                  Ulasan Pengunjung Google (4.4 ★)
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-[#A85827] transition-colors">
                  Fasilitas & Peta Lokasi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[#231F1C] font-bold text-sm tracking-wider uppercase">Kontak & Jam</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C97A44] shrink-0 mt-0.5" />
                <span className="font-medium text-[#4A4239]">{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C97A44] shrink-0" />
                <span className="font-medium text-[#4A4239]">{CAFE_INFO.email}</span>
              </div>
              <div className="pt-2 text-[11px] text-[#6E6457] leading-relaxed border-t border-[#DFD7CA]">
                <p className="font-bold text-[#231F1C]">Jam Buka:</p>
                <p>Senin – Minggu: 08:00 – 23:00 WITA</p>
                <p className="text-[#9A4B1D] font-semibold">Reservasi meja disarankan untuk akhir pekan & makan malam.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#DFD7CA] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A7064]">
          <p>© {new Date().getFullYear()} Nerasa. All rights reserved. Discover The Root Of Taste.</p>
          <p className="flex items-center gap-1 font-medium">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>untuk penikmat kafe di Samarinda, Kalimantan Timur</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
