import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuCategory, MenuItem } from '../types';
import { formatRupiah } from '../utils/formatters';
import {
  Search,
  Sparkles,
  Flame,
  Plus,
  Check,
  Coffee,
  Utensils,
  Pizza,
  Wine,
  IceCream,
  Info,
  Filter,
  X,
} from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Record<string, number>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartItemIds }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'SIGNATURE' | 'BEST SELLER' | 'NEW'>('all');
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  const categories: { id: MenuCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'Semua Menu', icon: Utensils },
    { id: 'new', label: 'Menu Baru & Juara', icon: Sparkles },
    { id: 'meals', label: 'Meals & Platter', icon: Utensils },
    { id: 'rice-bowl', label: 'Rice & Bowl', icon: Utensils },
    { id: 'main-course', label: 'Main Course', icon: Utensils },
    { id: 'pasta', label: 'Artisan Pasta', icon: Pizza },
    { id: 'starter', label: 'Starter & Toast', icon: Utensils },
    { id: 'soup-dessert', label: 'Soup & Dessert', icon: IceCream },
    { id: 'mont-blanc', label: 'Mont Blanc Series', icon: Coffee },
    { id: 'flavored-coffee', label: 'Flavored Coffee', icon: Coffee },
    { id: 'classic-coffee', label: 'Classic Coffee', icon: Coffee },
    { id: 'non-coffee', label: 'Non-Coffee', icon: IceCream },
    { id: 'mocktails', label: 'Mocktails Segar', icon: Wine },
    { id: 'frappe', label: 'Frappe & Blended', icon: IceCream },
    { id: 'tea-others', label: 'Artisan Tea & Lainnya', icon: Coffee },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Badge filter match
      const matchBadge =
        badgeFilter === 'all' || item.badge === badgeFilter;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

      return matchCategory && matchBadge && matchSearch;
    });
  }, [selectedCategory, badgeFilter, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#F5F2ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DBD0] text-xs font-bold uppercase tracking-wider text-[#A85827] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Resmi Nerasa Cafe</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F1C] tracking-tight">
            Menu Pilihan & Racikan Spesial
          </h2>
          <p className="text-[#635B50] text-sm sm:text-base leading-relaxed">
            Dari racikan kopi Mont Blanc series, Bubur Manado Tinutuan juara, hingga Mix Bite Platter
            porsi melimpah untuk dinikmati bersama.
          </p>

          {/* Toddler Friendly Notice */}
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2DBD0] text-xs text-[#524B41] shadow-xs">
            <span className="text-amber-600 font-bold">✨ Catatan Ramah Keluarga:</span>
            <span>Menu kentang & cemilan bisa direquest tanpa garam/micin untuk anak/toddler.</span>
          </div>
        </div>

        {/* Search & Badge Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2DBD0] shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C8377] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari menu, kopi, platter, bubur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] text-[#231F1C] placeholder-[#8C8377] text-sm rounded-xl pl-10 pr-9 py-2.5 border border-[#DFD8CC] focus:outline-none focus:border-[#C97A44] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8377] hover:text-[#231F1C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-[#6E6559] flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            <button
              onClick={() => setBadgeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                badgeFilter === 'all'
                  ? 'bg-[#C97A44] text-white shadow-xs'
                  : 'bg-[#F3EFE9] text-[#554E44] hover:bg-[#EAE4DA]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setBadgeFilter('SIGNATURE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                badgeFilter === 'SIGNATURE'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-[#F3EFE9] text-[#554E44] hover:bg-[#EAE4DA]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              Signature
            </button>
            <button
              onClick={() => setBadgeFilter('BEST SELLER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                badgeFilter === 'BEST SELLER'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-[#F3EFE9] text-[#554E44] hover:bg-[#EAE4DA]'
              }`}
            >
              <Flame className="w-3 h-3 text-red-300" />
              Best Seller
            </button>
            <button
              onClick={() => setBadgeFilter('NEW')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                badgeFilter === 'NEW'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-[#F3EFE9] text-[#554E44] hover:bg-[#EAE4DA]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              Menu Baru
            </button>
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#C97A44] to-[#B06330] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F3EFE9] text-[#524A40] hover:text-[#1F1C19] border border-[#E2DBD0]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#C97A44]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#E2DBD0] space-y-3 shadow-xs">
            <Utensils className="w-10 h-10 text-[#A89E91] mx-auto" />
            <p className="text-[#231F1C] font-bold">Tidak ada menu yang sesuai dengan pencarian Anda.</p>
            <p className="text-[#6E6559] text-xs">Coba gunakan kata kunci lain atau reset filter kategori.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setBadgeFilter('all');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-[#F0EBE2] text-[#3E3831] text-xs font-semibold hover:bg-[#E6DFD4]"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const inCartQty = cartItemIds[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-white border border-[#E4DCD0] hover:border-[#C97A44] p-4 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 flex flex-col justify-between"
                >
                  {/* Item Image */}
                  {item.image && (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-[#EFEBE4]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-xs ${
                              item.badge === 'BEST SELLER'
                                ? 'bg-red-600'
                                : item.badge === 'SIGNATURE'
                                ? 'bg-amber-600'
                                : 'bg-emerald-600'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Top content */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-[#231F1C] text-base group-hover:text-[#A85827] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {!item.image && item.badge && (
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase text-white ${
                            item.badge === 'BEST SELLER'
                              ? 'bg-red-600'
                              : item.badge === 'SIGNATURE'
                              ? 'bg-amber-600'
                              : 'bg-emerald-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-[#665D52] text-xs leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4EFE7] text-[#554C41] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom bar: Price & Order Action */}
                  <div className="pt-3 border-t border-[#EFE8DF] flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[11px] text-[#786E62] block -mb-0.5">Harga</span>
                      <span className="text-base font-extrabold text-[#9A4B1D]">
                        {formatRupiah(item.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveItemModal(item)}
                        className="p-2 rounded-xl bg-[#F4EFE7] text-[#524B40] hover:text-[#1F1C18] hover:bg-[#EAE2D6] text-xs transition-colors"
                        title="Lihat Rincian Menu"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(item)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          inCartQty > 0
                            ? 'bg-[#25D366] text-neutral-900 shadow-xs'
                            : 'bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white shadow-xs'
                        }`}
                      >
                        {inCartQty > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>({inCartQty}) Tambah</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Pesan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Item Detail Modal */}
        {activeItemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-[#E2DBD0] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-[#3A332C] hover:bg-white shadow-sm transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {activeItemModal.image && (
                <div className="h-56 w-full relative bg-[#F5F2ED]">
                  <img
                    src={activeItemModal.image}
                    alt={activeItemModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#231F1C]">{activeItemModal.name}</h3>
                    <p className="text-[#A85827] font-black text-lg mt-0.5">
                      {formatRupiah(activeItemModal.price)}
                    </p>
                  </div>
                  {activeItemModal.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C97A44] text-white">
                      {activeItemModal.badge}
                    </span>
                  )}
                </div>

                <p className="text-[#554C42] text-sm leading-relaxed">
                  {activeItemModal.description}
                </p>

                {activeItemModal.tags && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeItemModal.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#F3EFE9] text-[#554E44] font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6DFD4] text-xs text-[#52493E] space-y-1">
                  <p className="font-bold text-[#231F1C]">✨ Request Tambahan:</p>
                  <p className="text-[#665D52]">
                    Bisa disesuaikan tingkat kepedasan, pilihan susu alternatif (oat milk +7k),
                    ekstra espresso shot (+8k), atau sajian tanpa garam untuk si kecil.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(activeItemModal);
                      setActiveItemModal(null);
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambahkan ke Keranjang ({formatRupiah(activeItemModal.price)})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
