import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { GalleryItem } from '../types';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'interior' | 'exterior' | 'food' | 'facilities'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Semua Foto' },
    { id: 'interior', label: 'Suasana Interior' },
    { id: 'exterior', label: 'Eksterior & Parkir' },
    { id: 'food', label: 'Makanan & Minuman' },
    { id: 'facilities', label: 'Fasilitas & Photo Booth' },
  ];

  const filteredPhotos =
    selectedFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  const openLightbox = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((p) => p.id === item.id);
    if (idx !== -1) setActivePhotoIndex(idx);
  };

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const activePhoto = activePhotoIndex !== null ? GALLERY_ITEMS[activePhotoIndex] : null;

  return (
    <section id="galeri" className="py-20 bg-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DBD0] text-xs font-bold uppercase tracking-wider text-[#A85827] shadow-xs">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi Visual & Suasana</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F1C] tracking-tight">
            Galeri Suasana Nerasa
          </h2>
          <p className="text-[#635B50] text-sm sm:text-base leading-relaxed">
            Intip kehangatan interior bergaya Japandi minimalis, sudut photo booth estetik,
            area barista, dan ragam sajian kopi serta makanan menggoda selera.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-gradient-to-r from-[#C97A44] to-[#B06330] text-white shadow-sm'
                  : 'bg-white text-[#524B40] hover:text-[#1F1C18] hover:bg-[#F2ECE3] border border-[#E2DBD0] shadow-xs'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2DBD0] aspect-[4/3] cursor-pointer shadow-xs hover:shadow-xl hover:border-[#C97A44] transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#231F1C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-4 h-4 text-[#A85827]" />
              </div>

              {/* Photo Title & Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#E8AF84] block mb-0.5">
                  {photo.category}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#F3E5D8] transition-colors leading-snug">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-neutral-200 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-12 text-center p-6 sm:p-7 rounded-3xl bg-white border border-[#E2DBD0] max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-left">
            <h4 className="text-base font-bold text-[#231F1C]">Bagikan Momen Anda di Nerasa</h4>
            <p className="text-xs text-[#6E6559]">
              Tag @nerasa.id di Instagram Story atau mention kami di TikTok @nerasa.corp
            </p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EBE3] text-[#2C2722] text-xs font-bold border border-[#DDD5C9] transition-all flex items-center gap-2 whitespace-nowrap shadow-xs"
          >
            <span>Follow @nerasa.id</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/90 text-[#231F1C] hover:bg-white transition-colors cursor-pointer shadow-md"
            aria-label="Tutup Galeri"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-[#231F1C] hover:bg-white transition-colors cursor-pointer shadow-md"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-[#231F1C] hover:bg-white transition-colors cursor-pointer shadow-md"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/40">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="text-center mt-4 max-w-2xl px-4 space-y-1">
              <h3 className="text-lg font-bold text-white">{activePhoto.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{activePhoto.caption}</p>
              <span className="text-[11px] text-neutral-400 font-mono block pt-1">
                {activePhotoIndex! + 1} dari {GALLERY_ITEMS.length} foto
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
