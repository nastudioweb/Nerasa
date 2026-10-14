import React, { useState, useEffect } from 'react';
import { Reservation, SeatingAreaType } from '../types';
import { CAFE_INFO, SEATING_AREAS } from '../data/cafeData';
import {
  generateReservationCode,
  createReservationWhatsAppUrl,
} from '../utils/formatters';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Send,
  Sparkles,
  Baby,
  Zap,
  VolumeX,
  Cake,
  ShieldCheck,
  History,
  Info,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface ReservationSectionProps {
  initialArea?: SeatingAreaType;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  initialArea = 'indoor',
}) => {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('18:30');
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState<SeatingAreaType>(initialArea);
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState('');

  // UI state
  const [submittedReservation, setSubmittedReservation] = useState<Reservation | null>(null);
  const [savedReservations, setSavedReservations] = useState<Reservation[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load reservations from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nerasa_reservations');
      if (stored) {
        setSavedReservations(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const timeSlots = [
    '08:30', '09:30', '10:30', '11:30', '12:00', '12:30', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '18:30', '19:00',
    '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const quickRequestOptions = [
    { id: 'babychair', label: 'Baby Chair (Kursi Bayi Ramah Anak)', icon: Baby },
    { id: 'wfc_plug', label: 'Dekat Colokan Listrik (WFC / Laptop)', icon: Zap },
    { id: 'quiet', label: 'Posisi Meja Tenang / Pojok', icon: VolumeX },
    { id: 'birthday', label: 'Perayaan Ulang Tahun / Spesial', icon: Cake },
    { id: 'no_msg', label: 'Request Makanan Non-Micin (Balita)', icon: Sparkles },
  ];

  const toggleSpecialRequest = (label: string) => {
    if (specialRequests.includes(label)) {
      setSpecialRequests(specialRequests.filter((item) => item !== label));
    } else {
      setSpecialRequests([...specialRequests, label]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time) {
      return;
    }

    const newReservation: Reservation = {
      id: Date.now().toString(),
      code: generateReservationCode(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      date,
      time,
      guests,
      area,
      specialRequests,
      customNotes: customNotes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setSubmittedReservation(newReservation);
    const updated = [newReservation, ...savedReservations];
    setSavedReservations(updated);
    try {
      localStorage.setItem('nerasa_reservations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="reservasi" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DBD0] text-xs font-bold uppercase tracking-wider text-[#A85827] shadow-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>Pemesanan Meja Online Mudah & Cepat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#231F1C] tracking-tight">
            Reservasi Meja di Nerasa
          </h2>
          <p className="text-[#635B50] text-sm sm:text-base leading-relaxed">
            Hindari antre saat jam sibuk siang atau malam hari. Pilih spot favorit Anda, isi detail,
            dan konfirmasi instan via WhatsApp bersama admin fast-response kami.
          </p>

          {/* Social Proof Review Quote */}
          <div className="p-4 bg-white border border-[#E4DCD0] rounded-2xl max-w-xl mx-auto text-xs text-[#524B41] italic flex items-center gap-3 text-left shadow-xs">
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-[#2C2722]">
                “Sengaja reservasi dulu, karena untuk makan malam memang rame. Reservasi mudah bgt
                tinggal WA dan admin fast respon (thanks kak Pablo 🙏🏻)”
              </p>
              <span className="text-[#786E62] text-[11px] not-italic font-bold">
                — Yunisa Wahyuni (Google Local Guide)
              </span>
            </div>
          </div>
        </div>

        {/* History Toggle Bar */}
        {savedReservations.length > 0 && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#F5EFE6] text-[#4F473E] hover:text-[#1F1C18] text-xs font-bold border border-[#E2DBD0] transition-colors shadow-xs"
            >
              <History className="w-3.5 h-3.5 text-[#C97A44]" />
              <span>
                {showHistory
                  ? 'Sembunyikan Riwayat'
                  : `Lihat Reservasi Saya (${savedReservations.length})`}
              </span>
            </button>
          </div>
        )}

        {/* Saved Reservations History Accordion */}
        {showHistory && savedReservations.length > 0 && (
          <div className="mb-10 p-5 rounded-2xl bg-white border border-[#E2DBD0] space-y-3 shadow-xs">
            <h4 className="text-sm font-bold text-[#231F1C] flex items-center gap-2">
              <History className="w-4 h-4 text-[#C97A44]" />
              <span>Riwayat Kode Reservasi Anda</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedReservations.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DFD4] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#A85827] text-sm">{res.code}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Aktif
                    </span>
                  </div>
                  <p className="text-[#231F1C] font-bold">{res.name} ({res.guests} Pax)</p>
                  <p className="text-[#6E6457]">
                    📅 {res.date} · ⏰ {res.time} WITA · 🪑 {res.area}
                  </p>
                  <a
                    href={createReservationWhatsAppUrl(res)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#1CA851] hover:underline font-bold mt-1"
                  >
                    <span>Kirim Ulang ke WhatsApp Admin</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid: Form Left, Area & Live Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DBD0] shadow-md shadow-stone-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Guest Count & Date/Time */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#231F1C] flex items-center gap-2 border-b border-[#EFE8DF] pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#C97A44] text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Waktu & Jumlah Tamu</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-[#524B41] mb-1.5">
                      Pilih Tanggal
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full bg-[#FAF8F5] text-[#231F1C] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                      />
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-[#524B41] mb-1.5">
                      Jam Kunjungan (WITA)
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-[#231F1C] text-xs sm:text-sm rounded-xl px-3 py-2.5 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot} WITA
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-semibold text-[#524B41] mb-1.5">
                      Jumlah Tamu
                    </label>
                    <div className="flex items-center bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-lg bg-white text-[#231F1C] font-bold hover:bg-[#EAE4DA] flex items-center justify-center text-sm shadow-xs"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-[#231F1C] text-sm">
                        {guests} Orang
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(30, guests + 1))}
                        className="w-8 h-8 rounded-lg bg-white text-[#231F1C] font-bold hover:bg-[#EAE4DA] flex items-center justify-center text-sm shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Seating Area Selection */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#231F1C] flex items-center gap-2 border-b border-[#EFE8DF] pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#C97A44] text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Pilih Zona Meja & Suasana</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_AREAS.map((sa) => {
                    const isSelected = area === sa.id;
                    return (
                      <div
                        key={sa.id}
                        onClick={() => setArea(sa.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#C97A44]/10 border-[#C97A44] ring-1 ring-[#C97A44]'
                            : 'bg-[#FAF8F5] border-[#E2DBD0] hover:border-[#C4B7A6]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-[#231F1C] text-sm">{sa.name}</h4>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-[#C97A44] bg-[#C97A44]'
                                : 'border-[#9E9385]'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <p className="text-[#665D52] text-xs mb-2 leading-relaxed">
                          {sa.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-[#A85827] font-semibold">
                          <span>Kapasitas: {sa.capacity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Special Requests */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#231F1C] flex items-center gap-2 border-b border-[#EFE8DF] pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#C97A44] text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Kebutuhan Khusus Pengunjung</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickRequestOptions.map((opt) => {
                    const isChecked = specialRequests.includes(opt.label);
                    const Icon = opt.icon;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleSpecialRequest(opt.label)}
                        className={`px-3 py-2.5 rounded-xl border text-xs text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-amber-50 border-[#C97A44] text-[#8C461C] font-semibold'
                            : 'bg-[#FAF8F5] border-[#E2DBD0] text-[#554E44] hover:bg-[#F2ECE3]'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isChecked ? 'text-[#C97A44]' : 'text-[#8C8377]'
                          }`}
                        />
                        <span className="flex-1">{opt.label}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-[#C97A44] border-[#C97A44] text-white'
                              : 'border-[#AEA496]'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Info */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#231F1C] flex items-center gap-2 border-b border-[#EFE8DF] pb-2">
                  <span className="w-6 h-6 rounded-full bg-[#C97A44] text-white flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>Informasi Pemesan</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#524B41] mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Pratama"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-[#231F1C] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#524B41] mb-1">
                      No. WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF8F5] text-[#231F1C] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#524B41] mb-1">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Ada teman berulang tahun, tolong siapkan lilin di pancake..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-[#FAF8F5] text-[#231F1C] text-xs sm:text-sm rounded-xl px-3.5 py-2 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44] resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C97A44] to-[#B06330] hover:from-[#D88650] hover:to-[#C06C36] text-white font-bold text-base shadow-md shadow-[#C97A44]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Buat Tiket Reservasi Meja</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Booking Preview & Fast Confirmation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E2DBD0] shadow-md shadow-stone-200/50 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DF]">
                <h3 className="font-bold text-[#231F1C] text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C97A44]" />
                  <span>Ringkasan Reservasi Langsung</span>
                </h3>
                <span className="text-[11px] font-mono font-bold text-[#A85827] bg-[#A85827]/10 px-2.5 py-0.5 rounded-md">
                  PREVIEW
                </span>
              </div>

              {/* Preview Ticket Card */}
              <div className="p-5 rounded-2xl bg-[#F6F2EB] border border-[#E2DBD0] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E4DCD0] pb-3">
                  <div>
                    <span className="text-[10px] text-[#786E62] uppercase tracking-widest font-bold block">
                      Outlet
                    </span>
                    <span className="text-base font-bold text-[#231F1C]">Nerasa Samarinda</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#786E62] uppercase tracking-widest font-bold block">
                      Tamu
                    </span>
                    <span className="text-base font-bold text-[#A85827]">{guests} Pax</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#786E62] block mb-0.5 font-semibold">📅 Tanggal:</span>
                    <span className="text-[#231F1C] font-bold">{date || 'Pilih tanggal'}</span>
                  </div>
                  <div>
                    <span className="text-[#786E62] block mb-0.5 font-semibold">⏰ Waktu:</span>
                    <span className="text-[#231F1C] font-bold">{time} WITA</span>
                  </div>
                  <div>
                    <span className="text-[#786E62] block mb-0.5 font-semibold">🪑 Area Pilihan:</span>
                    <span className="text-[#231F1C] font-bold capitalize">
                      {SEATING_AREAS.find((s) => s.id === area)?.name || area}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#786E62] block mb-0.5 font-semibold">👤 Atas Nama:</span>
                    <span className="text-[#231F1C] font-bold">{name || '-'}</span>
                  </div>
                </div>

                {specialRequests.length > 0 && (
                  <div className="pt-2 border-t border-[#E4DCD0] text-[11px]">
                    <span className="text-[#786E62] font-semibold block mb-1">Permintaan Khusus:</span>
                    <div className="flex flex-wrap gap-1">
                      {specialRequests.map((req, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white text-[#A85827] font-bold border border-[#E2DBD0]"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-[#204E32] space-y-2">
                <p className="font-bold text-emerald-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Konfirmasi WhatsApp Cepat
                </p>
                <p className="text-[#2D5A3F] leading-relaxed text-[11px]">
                  Setelah membuat tiket, Anda bisa langsung membuka chat WhatsApp dengan admin outlet
                  (0853-9388-6194) untuk memastikan meja disiapkan sebelum Anda tiba.
                </p>
              </div>

              {/* Quick Contact & Map preview */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#6B6256] border-t border-[#EFE8DF]">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C97A44]" />
                  Air Hitam, Samarinda Ulu
                </span>
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A85827] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Cek Rute Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Confirmation popup after submitting */}
        {submittedReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-[#E2DBD0] rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#A85827] uppercase tracking-wider">
                  Tiket Berhasil Dibuat
                </span>
                <h3 className="text-2xl font-bold text-[#231F1C]">Reservasi Terdaftar!</h3>
                <p className="text-xs text-[#6B6256]">
                  Meja Anda di Nerasa telah dialokasikan sementara.
                </p>
              </div>

              {/* Booking Code Banner */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2DBD0] space-y-1">
                <span className="text-[10px] text-[#7A7064] uppercase tracking-wider font-bold block">
                  Kode Booking Anda
                </span>
                <span className="font-mono text-2xl font-black text-[#A85827] tracking-widest block">
                  {submittedReservation.code}
                </span>
                <span className="text-[11px] text-[#6B6256] font-semibold block">
                  {submittedReservation.date} · {submittedReservation.time} WITA ({submittedReservation.guests} Orang)
                </span>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <a
                  href={createReservationWhatsAppUrl(submittedReservation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-neutral-900 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim & Konfirmasi ke WhatsApp Admin</span>
                </a>

                <button
                  onClick={() => setSubmittedReservation(null)}
                  className="w-full py-2.5 rounded-xl bg-[#F0EBE3] hover:bg-[#E6E0D6] text-[#4F473E] text-xs font-bold transition-colors cursor-pointer"
                >
                  Tutup & Lanjutkan Menjelajah
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
