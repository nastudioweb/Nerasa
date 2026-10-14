import { CartItem, Reservation } from '../types';
import { CAFE_INFO } from '../data/cafeData';

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const isCafeOpenNow = (): { isOpen: boolean; statusText: string; subText: string } => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeDec = currentHour + currentMinute / 60;

  // Open: 08:00 - 23:00 every day
  const openTime = 8.0;
  const closeTime = 23.0;

  if (currentTimeDec >= openTime && currentTimeDec < closeTime) {
    return {
      isOpen: true,
      statusText: 'Buka Sekarang',
      subText: 'Tutup pukul 23:00 WITA',
    };
  } else {
    return {
      isOpen: false,
      statusText: 'Tutup Sementara',
      subText: 'Buka besok pukul 08:00 WITA',
    };
  }
};

export const generateReservationCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'NRS-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const createReservationWhatsAppUrl = (reservation: Reservation): string => {
  const areaLabels: Record<string, string> = {
    indoor: 'Indoor Main Hall (AC - Non Smoking)',
    outdoor: 'Teras Semi-Outdoor (Smoking)',
    meeting: 'Private Meeting Room',
    sofa: 'Cozy Sofa Lounge Area',
    bar: 'Bar Stool Counter',
  };

  const requestsText =
    reservation.specialRequests.length > 0
      ? reservation.specialRequests.join(', ')
      : 'Tidak ada permintaan khusus';

  const message = `Halo Admin Nerasa Coffee & Resto! 👋
Saya ingin konfirmasi reservasi meja dengan rincian berikut:

📌 *Kode Booking:* ${reservation.code}
👤 *Nama:* ${reservation.name}
📱 *No. WhatsApp:* ${reservation.phone}
👥 *Jumlah Tamu:* ${reservation.guests} Orang
📅 *Tanggal:* ${reservation.date}
⏰ *Jam:* ${reservation.time} WITA
🪑 *Pilihan Area:* ${areaLabels[reservation.area] || reservation.area}
✨ *Permintaan Khusus:* ${requestsText}
${reservation.customNotes ? `📝 *Catatan Tambahan:* ${reservation.customNotes}\n` : ''}
Mohon konfirmasi ketersediaan mejanya ya kak. Terima kasih! 🙏`;

  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const createOrderWhatsAppUrl = (
  items: CartItem[],
  customerInfo?: { name?: string; tableOrAddress?: string; notes?: string }
): string => {
  const subtotal = items.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  let message = `Halo Nerasa Samarinda! 👋\nSaya ingin memesan menu berikut:\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.item.name}* (x${item.quantity}) - ${formatRupiah(
      item.item.price * item.quantity
    )}\n`;
    if (item.notes) {
      message += `   ↳ Catatan: ${item.notes}\n`;
    }
  });

  message += `\n💰 *Total Pesanan:* ${formatRupiah(subtotal)}\n`;

  if (customerInfo?.name) {
    message += `👤 *Nama Pemesan:* ${customerInfo.name}\n`;
  }
  if (customerInfo?.tableOrAddress) {
    message += `📍 *Meja / Alamat Pengiriman:* ${customerInfo.tableOrAddress}\n`;
  }
  if (customerInfo?.notes) {
    message += `📝 *Catatan Tambahan:* ${customerInfo.notes}\n`;
  }

  message += `\nMohon diproses pesanannya ya kak. Terima kasih! ✨`;

  return `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
