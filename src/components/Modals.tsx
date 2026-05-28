import { ShoppingBag, X, ShoppingCart, Minus, Plus, MapPin, Info, Sparkles, CheckCircle } from 'lucide-react';
import { CartItem, Order } from '../types';
import { formatRp } from '../data';
import { FormEvent, useState } from 'react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onProceed: () => void;
}

export function CartModal({ isOpen, onClose, cart, onUpdateQty, onProceed }: CartModalProps) {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 border-2 border-orange-100">
        <div className="flex justify-between items-center mb-6 border-b border-orange-100 pb-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag className="text-orange-500 w-6 h-6 animate-bounce" /> Pesanan Kamu
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-orange-500 transition-colors bg-orange-50 hover:bg-orange-100 rounded-full p-2 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            <ShoppingCart className="w-14 h-14 mx-auto mb-4 text-orange-400/80" />
            <p className="font-bold text-slate-700">Keranjang kamu kosong nih.</p>
            <p className="text-xs text-slate-500 mt-1">Pilih rasa favoritmu di menu dan mulailah bercerita!</p>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto pr-2 space-y-4 flex-grow mb-6 custom-scrollbar text-slate-800">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-orange-50/40 p-3 rounded-2xl border-2 border-orange-100/30 shadow-sm">
                  <img src={item.img} className="w-14 h-14 rounded-2xl object-cover shrink-0 border-2 border-orange-100 shadow-sm" alt={item.name} />
                  <div className="flex-1 px-3">
                    <h4 className="font-extrabold text-slate-900 text-sm md:text-base leading-snug">{item.name}</h4>
                    <p className="text-orange-600 font-extrabold text-xs mt-0.5">Rp {formatRp(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-orange-100 rounded-full px-2 py-1 shadow-sm">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="text-slate-400 hover:text-orange-500 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="text-slate-900 font-black w-4 text-center text-xs">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="text-slate-400 hover:text-orange-500 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-orange-100 pt-4 bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-600 font-bold">Total Pembayaran:</span> 
                <span className="text-2xl font-black text-orange-600">Rp {formatRp(totalPrice)}</span>
              </div>
              <button 
                onClick={onProceed} 
                className="w-full py-4 rounded-2xl font-black text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-[0_8px_20px_rgba(249,115,22,0.25)] active:scale-95 duration-100 cursor-pointer text-center block text-sm md:text-base"
              >
                Lanjut Lakukan Pemesanan 🎉
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSubmit: (name: string, table: string) => void;
  defaultTable?: string;
  orders: Order[];
}

export function CheckoutModal({ isOpen, onClose, onBack, onSubmit, defaultTable = '', orders }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [table, setTable] = useState(defaultTable);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedTable = table.replace(/[^0-9]/g, '');
    if (!parsedTable) {
        setError('Nomor meja harus berupa angka.');
        return;
    }

    const isBooked = orders.some(o => o.tableNumber === parsedTable && o.status !== 'completed' && o.status !== 'cancelled');
    if (isBooked) {
        setError(`Maaf, Meja ${parsedTable} sedang dipesan/aktif. Silakan pilih meja lain.`);
        return;
    }

    onSubmit(name, parsedTable);
    if (!defaultTable) {
        setName('');
        setTable('');
        setNotes('');
    } else {
        setName('');
        setNotes('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border-2 border-orange-100">
        <h3 className="text-2xl font-black text-slate-900 mb-2">Detail Pesanan Klopp Kopi</h3>
        <p className="text-xs md:text-sm text-slate-500 mb-6 font-semibold leading-relaxed">Satu langkah lagi! Lengkapi data pemesanan agar barista kami dapat langsung menyajikan.</p>
        
        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-4 border border-red-100 animate-in fade-in slide-in-from-top-2">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs md:text-sm font-black text-slate-700 mb-1.5">Nama Pemesan</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama ceriamu..." 
              className="w-full px-4 py-3 rounded-2xl bg-orange-50/30 border-2 border-orange-100/70 text-slate-800 placeholder-slate-400 focus:border-orange-500/80 outline-none transition-all font-semibold" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs md:text-sm font-black text-orange-600 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-500" /> Nomor Meja
            </label>
            <input 
              type="text" 
              value={table}
              onChange={(e) => setTable(e.target.value)}
              readOnly={!!defaultTable}
              placeholder="Contoh: Meja 12" 
              className={`w-full px-4 py-3 rounded-2xl border-2 text-slate-800 placeholder-slate-400 outline-none transition-all font-black text-center ${
                defaultTable 
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-700 cursor-not-allowed text-lg' 
                : 'bg-orange-50/30 border-orange-100/70 focus:border-orange-500/80'
              }`} 
              required 
            />
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wide">Nomor meja tempat kamu duduk dan bernavigasi saat ini.</p>
          </div>
          
          <div>
            <label className="block text-xs md:text-sm font-black text-slate-700 mb-1.5">Catatan Tambahan (Bebas!)</label>
            <textarea 
              value={notes}
              id="cust-notes"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Misal: Kurangi es, gula sedikit saja, atau minta senyum hangat barista..." 
              className="w-full px-4 py-3 rounded-2xl bg-orange-50/30 border-2 border-orange-100/75 text-slate-800 placeholder-slate-400 focus:border-orange-500/80 outline-none transition-all resize-none h-24 font-medium"
            ></textarea>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-orange-100">
            <button type="button" onClick={onBack} className="w-1/3 py-3 rounded-2xl font-bold border-2 border-orange-100 text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all cursor-pointer">Kembali</button> 
            <button type="submit" className="w-2/3 py-3 rounded-2xl font-black text-white transition-all shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer">Pesan Sekarang! 🚀</button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface AlertProps {
  message: string;
  onClose: () => void;
}

export function CustomAlert({ message, onClose }: AlertProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center border-2 border-orange-100 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">Horas! Pesanan Masuk</h3>
        <p className="text-slate-600 mb-8 font-semibold text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message }}></p>
        <button onClick={onClose} className="bg-orange-500 text-white px-6 py-3 rounded-full font-black hover:bg-orange-600 w-full transition-colors shadow-md cursor-pointer">
          Mengerti, Tunggu Pesanan 👍
        </button>
      </div>
    </div>
  );
}
