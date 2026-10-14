import React, { useState } from 'react';
import { AUTHENTIC_REVIEWS, CAFE_INFO } from '../data/cafeData';
import { ReviewItem } from '../types';
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Share2,
  CheckCircle,
  PlusCircle,
  CornerDownRight,
  Filter,
  Sparkles,
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(AUTHENTIC_REVIEWS);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newFoodRating, setNewFoodRating] = useState(5);
  const [newServiceRating, setNewServiceRating] = useState(5);
  const [newAmbienceRating, setNewAmbienceRating] = useState(5);
  const [newTag, setNewTag] = useState('Suasana & Interior');

  const filterTags = [
    { id: 'all', label: 'Semua Ulasan' },
    { id: 'luas', label: 'Area Luas (16)' },
    { id: 'keluarga', label: 'Keluarga & Toddler (8)' },
    { id: 'pesan', label: 'Reservasi & Pesan (12)' },
    { id: 'kasir', label: 'Pelayanan (13)' },
    { id: 'bubur', label: 'Bubur Manado & Platter' },
  ];

  const filteredReviews = reviews.filter((rev) => {
    if (selectedTag === 'all') return true;
    if (selectedTag === 'luas')
      return (
        rev.comment.toLowerCase().includes('luas') ||
        rev.tags.some((t) => t.toLowerCase().includes('luas') || t.toLowerCase().includes('fasilitas'))
      );
    if (selectedTag === 'keluarga')
      return (
        rev.comment.toLowerCase().includes('toddler') ||
        rev.comment.toLowerCase().includes('anak') ||
        rev.tags.some((t) => t.toLowerCase().includes('toddler') || t.toLowerCase().includes('babychair'))
      );
    if (selectedTag === 'pesan')
      return (
        rev.comment.toLowerCase().includes('reservasi') ||
        rev.tags.some((t) => t.toLowerCase().includes('reservasi'))
      );
    if (selectedTag === 'kasir')
      return (
        rev.comment.toLowerCase().includes('pelayanan') ||
        rev.comment.toLowerCase().includes('staff') ||
        rev.comment.toLowerCase().includes('admin')
      );
    if (selectedTag === 'bubur')
      return (
        rev.comment.toLowerCase().includes('bubur') ||
        rev.comment.toLowerCase().includes('platter') ||
        rev.tags.some((t) => t.toLowerCase().includes('bubur') || t.toLowerCase().includes('platter'))
      );
    return true;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRevItem: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newAuthor.trim(),
      role: 'Pengunjung Baru · Terverifikasi',
      rating: newRating,
      date: 'Baru saja',
      comment: newComment.trim(),
      orderType: 'Makan di tempat (Dine-in)',
      priceRange: 'Rp 50.000 – 75.000 / orang',
      ratingsBreakdown: {
        food: newFoodRating,
        service: newServiceRating,
        ambience: newAmbienceRating,
      },
      tags: [newTag, 'Ulasan Pengunjung'],
    };

    setReviews([newRevItem, ...reviews]);
    setShowAddReviewModal(false);
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <section id="ulasan" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DBD0] text-xs font-bold uppercase tracking-wider text-[#A85827] shadow-xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Transparansi & Pengalaman Pelanggan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F1C] tracking-tight">
            Ulasan Pengunjung Nerasa
          </h2>
          <p className="text-[#635B50] text-sm sm:text-base leading-relaxed">
            Kejujuran rasa, kenyamanan ruang, dan layanan ramah yang dinilai langsung oleh ratusan
            pelanggan di Google Maps.
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2DBD0] shadow-md shadow-stone-200/50 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Big Rating */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#EFE8DF] pb-6 md:pb-0 md:pr-6">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-6xl font-black text-[#231F1C]">4,4</span>
                <span className="text-[#786E62] text-lg font-bold">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-amber-500 gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/40 text-amber-400/60'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#6B6256] font-medium">
                Berdasarkan {CAFE_INFO.reviewCount} ulasan asli Google Maps
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F5F2EC] text-[#554C42] text-xs font-bold border border-[#E2DBD0]">
                <span>Tarif: Rp 50.000 – 75.000 / orang</span>
              </div>
            </div>

            {/* Rating breakdown bars */}
            <div className="md:col-span-5 space-y-1.5 text-xs text-[#524B41]">
              <div className="flex items-center gap-2">
                <span className="w-3 text-right font-bold">5</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <div className="flex-1 h-2 bg-[#EFE9DF] rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '70%' }} />
                </div>
                <span className="w-8 text-[#8C8276] text-right font-semibold">70%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 text-right font-bold">4</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <div className="flex-1 h-2 bg-[#EFE9DF] rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }} />
                </div>
                <span className="w-8 text-[#8C8276] text-right font-semibold">20%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 text-right font-bold">3</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <div className="flex-1 h-2 bg-[#EFE9DF] rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '6%' }} />
                </div>
                <span className="w-8 text-[#8C8276] text-right font-semibold">6%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 text-right font-bold">2</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <div className="flex-1 h-2 bg-[#EFE9DF] rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '2%' }} />
                </div>
                <span className="w-8 text-[#8C8276] text-right font-semibold">2%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 text-right font-bold">1</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <div className="flex-1 h-2 bg-[#EFE9DF] rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '2%' }} />
                </div>
                <span className="w-8 text-[#8C8276] text-right font-semibold">2%</span>
              </div>
            </div>

            {/* Write Review CTA */}
            <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center space-y-3 pt-4 md:pt-0 border-t md:border-t-0 border-[#EFE8DF]">
              <button
                onClick={() => setShowAddReviewModal(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tulis Ulasan Anda</span>
              </button>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A85827] hover:underline font-bold"
              >
                Lihat di Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Filter Pills based on Google Maps Highlights */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <span className="text-xs font-bold text-[#6E6559] flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Topik Populer:
          </span>
          {filterTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-[#C97A44] text-white shadow-xs'
                  : 'bg-white text-[#524B40] hover:text-[#231F1C] hover:bg-[#F2ECE3] border border-[#E2DBD0]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white border border-[#E2DBD0] hover:border-[#C4B7A6] transition-all space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* Author row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C97A44] to-[#874921] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#231F1C] text-sm">{rev.name}</h4>
                      <p className="text-[11px] text-[#786E62] font-medium">{rev.role || 'Pengunjung'}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#8C8276] font-medium">{rev.date}</span>
                </div>

                {/* Rating stars & badges */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-neutral-300 text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.orderType && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3EFE9] text-[#635B50] font-semibold">
                      {rev.orderType}
                    </span>
                  )}
                </div>

                {/* Comment text */}
                <p className="text-xs sm:text-sm text-[#4A4238] leading-relaxed whitespace-pre-line mb-3">
                  {rev.comment}
                </p>

                {/* Sub ratings if available */}
                {rev.ratingsBreakdown && (
                  <div className="flex flex-wrap gap-3 py-2 px-3 rounded-xl bg-[#FAF7F2] text-[11px] text-[#554C42] border border-[#E8E2D7] mb-3">
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="text-[#786E62]">Makanan:</span>
                      <strong className="text-[#A85827]">{rev.ratingsBreakdown.food}/5</strong>
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="text-[#786E62]">Layanan:</span>
                      <strong className="text-[#A85827]">{rev.ratingsBreakdown.service}/5</strong>
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="text-[#786E62]">Suasana:</span>
                      <strong className="text-[#A85827]">{rev.ratingsBreakdown.ambience}/5</strong>
                    </span>
                  </div>
                )}

                {/* Tags */}
                {rev.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {rev.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4EFE7] text-[#9A4B1D] font-bold"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Owner Response if present */}
              {rev.ownerReply && (
                <div className="mt-3 p-3.5 rounded-2xl bg-[#F6F1EA] border border-[#E3D9CC] space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-[#A85827] font-bold text-[11px]">
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Tanggapan dari Pemilik Nerasa ({rev.ownerReply.date})</span>
                  </div>
                  <p className="text-[#554C42] text-[11px] leading-relaxed pl-5">
                    {rev.ownerReply.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Review Modal Form */}
        {showAddReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-[#E2DBD0] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#EFE8DF] pb-3">
                <h3 className="text-lg font-bold text-[#231F1C] flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span>Tulis Ulasan untuk Nerasa</span>
                </h3>
                <button
                  onClick={() => setShowAddReviewModal(false)}
                  className="text-[#6E6457] hover:text-[#231F1C] text-xs px-2.5 py-1 rounded-lg bg-[#F3EFE9] font-bold cursor-pointer"
                >
                  Batal
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#524B41] mb-1">
                    Nama Anda *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sarah Anindita"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-[#231F1C] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#524B41] mb-1.5">
                    Rating Keseluruhan *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#231F1C] ml-2">
                      {newRating} dari 5 Bintang
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[#6E6457] font-semibold mb-1">Makanan</label>
                    <select
                      value={newFoodRating}
                      onChange={(e) => setNewFoodRating(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] text-[#231F1C] rounded-lg p-2 border border-[#DDD5C9]"
                    >
                      <option value={5}>5 - Sangat Enak</option>
                      <option value={4}>4 - Enak</option>
                      <option value={3}>3 - Cukup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#6E6457] font-semibold mb-1">Layanan</label>
                    <select
                      value={newServiceRating}
                      onChange={(e) => setNewServiceRating(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] text-[#231F1C] rounded-lg p-2 border border-[#DDD5C9]"
                    >
                      <option value={5}>5 - Cepat & Ramah</option>
                      <option value={4}>4 - Baik</option>
                      <option value={3}>3 - Cukup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#6E6457] font-semibold mb-1">Suasana</label>
                    <select
                      value={newAmbienceRating}
                      onChange={(e) => setNewAmbienceRating(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] text-[#231F1C] rounded-lg p-2 border border-[#DDD5C9]"
                    >
                      <option value={5}>5 - Sangat Nyaman</option>
                      <option value={4}>4 - Nyaman</option>
                      <option value={3}>3 - Standar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#524B41] mb-1">
                    Ceritakan Pengalaman Anda *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ceritakan tentang menu yang dicicipi, keramahan staf, kenyamanan tempat, photo booth, atau fasilitas mushola..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-[#231F1C] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Kirim Ulasan Saya</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
