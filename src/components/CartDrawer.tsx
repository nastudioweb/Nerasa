import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatRupiah, createOrderWhatsAppUrl } from '../utils/formatters';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  Calendar,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOpenReservation: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenReservation,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleWhatsAppOrder = () => {
    const url = createOrderWhatsAppUrl(items, {
      name: customerName.trim() || undefined,
      tableOrAddress: tableOrAddress.trim() || undefined,
      notes: orderNotes.trim() || undefined,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E2DBD0] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E8E2D7] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C97A44] border border-[#E8DFD3]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#231F1C] text-base">Keranjang Pesanan</h3>
                <span className="text-xs text-[#7A7064] font-medium">
                  {totalItemsCount} menu dipilih
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-[#8C8276] hover:text-red-600 p-2 text-xs transition-colors cursor-pointer"
                  title="Kosongkan Keranjang"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-[#FAF8F5] text-[#554E44] hover:text-[#231F1C] border border-[#E2DBD0] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white text-[#B0A79A] border border-[#E2DBD0] flex items-center justify-center mx-auto shadow-xs">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-[#231F1C] font-bold text-base">Keranjang Anda Masih Kosong</p>
                  <p className="text-xs text-[#7A7064] max-w-xs mx-auto">
                    Pilih aneka menu makanan, kopi spesial, atau mocktail segar favorit Anda di Nerasa.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F2ECE3] text-[#3E3830] text-xs font-bold border border-[#DDD5C9] shadow-xs cursor-pointer"
                >
                  Lihat Buku Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#E2DBD0] flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#231F1C] text-sm truncate">
                          {cartItem.item.name}
                        </h4>
                        {cartItem.item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C97A44]/15 text-[#9A4B1D] font-bold">
                            {cartItem.item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-[#9A4B1D] mt-0.5">
                        {formatRupiah(cartItem.item.price * cartItem.quantity)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-[#FAF8F5] text-[#332E28] hover:bg-[#EAE4DA] border border-[#DDD5C9] flex items-center justify-center text-xs cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-[#231F1C]">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-[#FAF8F5] text-[#332E28] hover:bg-[#EAE4DA] border border-[#DDD5C9] flex items-center justify-center text-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(cartItem.item.id)}
                        className="text-[#9E9487] hover:text-red-600 p-1 transition-colors ml-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Additional Inputs */}
                <div className="pt-4 border-t border-[#E8E2D7] space-y-3">
                  <p className="text-xs font-bold text-[#231F1C] uppercase tracking-wider">
                    Informasi Tambahan
                  </p>
                  <div>
                    <input
                      type="text"
                      placeholder="Nama Anda (Contoh: Budi)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white text-[#231F1C] text-xs rounded-xl px-3 py-2 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Nomor Meja (Dine-in) atau Alamat Antar"
                      value={tableOrAddress}
                      onChange={(e) => setTableOrAddress(e.target.value)}
                      className="w-full bg-white text-[#231F1C] text-xs rounded-xl px-3 py-2 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Catatan (contoh: jangan pedas / request oat milk)"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full bg-white text-[#231F1C] text-xs rounded-xl px-3 py-2 border border-[#DDD5C9] focus:outline-none focus:border-[#C97A44]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action Buttons */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D7] bg-white space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6E6457] font-semibold">Total Pembayaran</span>
                <span className="text-xl font-black text-[#9A4B1D] font-mono">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-neutral-900 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesanan ke WhatsApp Nerasa</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-xl bg-[#F6F2EB] hover:bg-[#EAE4DA] text-[#4A4239] text-xs font-bold border border-[#DDD5C9] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C97A44]" />
                <span>Sekalian Reservasi Meja Online</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
