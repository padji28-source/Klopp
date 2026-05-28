import { useState } from 'react';
import { MenuItem, Order } from '../types';
import { formatRp } from '../data';
import { 
  Coffee, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ClipboardList, 
  Check, 
  AlertCircle, 
  ArrowLeftRight,
  Printer,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface CashierViewProps {
  orders: Order[];
  menus: MenuItem[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
  onUpdatePayment: (id: string, paymentStatus: Order['paymentStatus']) => void;
  onClearAll: () => void;
  onToggleSoldOut: (id: string) => void;
}

export function CashierView({ orders, menus, onUpdateStatus, onUpdatePayment, onClearAll, onToggleSoldOut }: CashierViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'unpaid' | 'active' | 'completed'>('all');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Filter orders based on tabs
  const filteredOrders = orders.filter(o => {
    if (activeTab === 'unpaid') return o.paymentStatus === 'unpaid' && o.status !== 'cancelled';
    if (activeTab === 'active') return o.status === 'pending' || o.status === 'preparing';
    if (activeTab === 'completed') return o.status === 'completed';
    return true; // 'all'
  });

  // Calculate statistics
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'paid' && o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const activeCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;
  const unpaidCount = orders.filter(o => o.paymentStatus === 'unpaid' && o.status !== 'cancelled').length;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative min-h-[90vh] bg-white/60 backdrop-blur-lg z-10 rounded-[3rem] mt-4 mb-4 shadow-xl border border-white/50">
      {/* Decorative bright bubbles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header View */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-orange-100 pb-6 relative z-10">
        <div>
          <span className="bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mb-1">
             Aplikasi Kasir Online Klopp.tb
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">Dashboard <span className="text-orange-500">Kasir Klopp 🧑‍🍳</span></h2>
          <p className="text-slate-500 text-sm font-semibold mt-1">Pantau & kelola pesanan meja secara real-time dari pelanggan setia.</p>
        </div>
        
        {orders.length > 0 && (
          <button 
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mengatur ulang data pesanan kasir hari ini?')) {
                onClearAll();
              }
            }}
            className="px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-200/60 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Data Kasir
          </button>
        )}
      </div>

      {/* STATS DECK */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 relative z-10">
        {/* Stat 1 */}
        <div className="bg-white/85 p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-orange-100/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] md:text-xs font-bold block mb-0.5">Total Pendapatan</span>
            <span className="text-sm md:text-lg font-black text-emerald-600">Rp {formatRp(totalRevenue)}</span>
          </div>
        </div>
        
        {/* Stat 2 */}
        <div className="bg-white/85 p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-orange-100/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] md:text-xs font-bold block mb-0.5">Pesanan Aktif</span>
            <span className="text-sm md:text-lg font-black text-slate-800">{activeCount} Antrean</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white/85 p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-orange-100/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] md:text-xs font-bold block mb-0.5">Belum Bayar (Meja)</span>
            <span className="text-sm md:text-lg font-black text-amber-600">{unpaidCount} Tagihan</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white/85 p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-orange-100/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] md:text-xs font-bold block mb-0.5">Selesai Disajikan</span>
            <span className="text-sm md:text-lg font-black text-blue-600">{completedCount} Pesanan</span>
          </div>
        </div>
      </div>

      {/* TABS FILTER */}
      <div className="flex gap-2.5 overflow-x-auto pb-4 justify-start mb-6 relative z-10">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-5 py-2.5 text-xs font-black rounded-full cursor-pointer shrink-0 transition-all ${
            activeTab === 'all' 
              ? 'bg-orange-500 text-white shadow-md' 
              : 'bg-orange-50/60 text-slate-700 hover:bg-orange-100/60'
          }`}
        >
          Semua ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('unpaid')}
          className={`px-5 py-2.5 text-xs font-black rounded-full cursor-pointer shrink-0 transition-all ${
            activeTab === 'unpaid' 
              ? 'bg-amber-500 text-white shadow-md' 
              : 'bg-orange-50/60 text-slate-700 hover:bg-orange-100/60'
          }`}
        >
          Tagihan Belum Bayar ({unpaidCount})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-5 py-2.5 text-xs font-black rounded-full cursor-pointer shrink-0 transition-all ${
            activeTab === 'active' 
              ? 'bg-orange-100 text-orange-700 border border-orange-300 shadow-sm' 
              : 'bg-orange-50/60 text-slate-700 hover:bg-orange-100/60'
          }`}
        >
          Proses Masak ({activeCount})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-5 py-2.5 text-xs font-black rounded-full cursor-pointer shrink-0 transition-all ${
            activeTab === 'completed' 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 shadow-sm' 
              : 'bg-orange-50/60 text-slate-700 hover:bg-orange-100/60'
          }`}
        >
          Selesai ({completedCount})
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Orders Card Deck Column (Spans 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-2">
            <ClipboardList className="text-orange-500 w-5 h-5" />
            Daftar Antrean Meja Klopp
            <span className="text-xs font-bold text-slate-400">({filteredOrders.length} pesanan)</span>
          </h3>

          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-orange-100 shadow-sm">
              <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-30 text-orange-500" />
              <p className="font-bold text-slate-700">Tidak ada pesanan.</p>
              <p className="text-xs text-slate-500 mt-1">Semua meja bersih dan terlayani saat ini. Kerja bagus!</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
              return (
                <div 
                  key={order.id} 
                  className={`bg-white p-6 rounded-3xl border-2 transition-all duration-200 shadow-sm ${
                    order.status === 'completed' 
                      ? 'border-emerald-200/75 bg-emerald-50/20' 
                      : order.paymentStatus === 'unpaid'
                      ? 'border-amber-200 bg-amber-50/10'
                      : 'border-orange-100 hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-orange-100/60 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-orange-500 text-white text-xs font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                        <MapPin className="w-3.5 h-3.5" /> Meja {order.tableNumber}
                      </span>
                      <h4 className="text-slate-900 font-extrabold text-sm md:text-base">{order.customerName}</h4>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                      <Clock className="w-3.5 h-3.5 text-orange-500" /> {formattedDate}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 py-1 mb-4">
                    {order.items.map((it) => (
                      <div key={it.id} className="flex justify-between items-center text-xs md:text-sm text-slate-700 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-lg text-xs shrink-0">
                            {it.qty}x
                          </span>
                          <span className="font-semibold text-slate-800">{it.name}</span>
                        </div>
                        <span className="text-slate-500 font-bold">Rp {formatRp(it.price * it.qty)}</span>
                      </div>
                    ))}
                    
                    {order.notes && (
                      <div className="mt-3 bg-orange-50/50 p-3 rounded-2xl border border-orange-100/60 text-xs text-orange-800 font-medium leading-relaxed">
                        <span className="font-extrabold text-orange-600 block text-[9px] uppercase tracking-wider mb-0.5">Catatan Tambahan:</span>
                        "{order.notes}"
                      </div>
                    )}
                  </div>

                  {/* Total and Badges */}
                  <div className="flex flex-wrap justify-between items-center gap-3 border-t border-orange-100/60 pt-4">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-wider">Total Bill</span>
                      <span className="text-base md:text-lg font-black text-orange-600">Rp {formatRp(order.totalAmount)}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Payment Status Badge / Action */}
                      {order.paymentStatus === 'unpaid' ? (
                        <button 
                          onClick={() => onUpdatePayment(order.id, 'paid')}
                          className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" /> Lunasi Tagihan
                        </button>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3.5 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                          <Check className="w-3.5 h-3.5" /> Paid (Lunas)
                        </span>
                      )}

                      {/* State Progress Button */}
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => onUpdateStatus(order.id, 'preparing')}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
                        >
                          Mulai Masak 🍳
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button 
                          onClick={() => onUpdateStatus(order.id, 'completed')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          Sajikan Pesanan ☕
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-extrabold px-3.5 py-1.5 rounded-xl">
                          Selesai Disajikan 🎉
                        </span>
                      )}

                      {/* Print Receipt Button */}
                      <button 
                        onClick={() => setSelectedReceiptOrder(order)}
                        className="p-2 bg-orange-50 border border-orange-100 hover:border-orange-500 text-orange-600 hover:bg-orange-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0 shadow-sm"
                        title="Dapatkan Struk"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sales & Analytics Insight Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <TrendingUp className="text-orange-500 w-5 h-5" />
              Insights Hari Ini
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-6 text-slate-400 font-medium text-xs md:text-sm">
                Belum ada transaksi terekam hari ini.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-slate-400 text-xs font-bold block mb-1">Rata-rata Tagihan Meja</span>
                  <p className="text-2xl font-black text-orange-600">
                    Rp {formatRp(Math.round(totalRevenue / (orders.filter(o => o.status === 'completed').length || 1)))}
                  </p>
                </div>

                <div className="border-t border-orange-100/60 pt-4">
                  <span className="text-slate-400 text-xs font-bold block mb-2">Metode Pembayaran Online</span>
                  <div className="space-y-2 text-xs font-semibold">
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-orange-500" /> Dompet Digital / QRIS</span>
                      <span className="font-extrabold text-slate-900">60%</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-orange-500" /> Cash di Kasir</span>
                      <span className="font-extrabold text-slate-900">40%</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-orange-100/60 pt-4">
                  <span className="text-slate-500 text-[10px] font-black block uppercase tracking-wider mb-2">Informasi Meja Terisi</span>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 8, 10, 11, 12].map(num => {
                      const activeTableOrder = orders.find(o => parseInt(o.tableNumber) === num && o.status !== 'completed' && o.status !== 'cancelled');
                      return (
                        <span 
                          key={num} 
                          className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center border transition-all ${
                            activeTableOrder 
                              ? 'bg-amber-500 text-white border-amber-500 animate-pulse shadow-sm' 
                              : 'bg-orange-50/50 text-orange-600 border-orange-100/60'
                          }`}
                          title={activeTableOrder ? `Meja ${num}: ${activeTableOrder.customerName}` : `Meja ${num}: Kosong`}
                        >
                          {num}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 mt-3.5 text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-orange-50 border border-orange-100 inline-block"></span> Kosong</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> Terisi</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <ToggleLeft className="text-orange-500 w-5 h-5 flex-shrink-0" />
              Kelola Menu
            </h3>
            <p className="text-xs text-slate-500 mb-4 font-semibold leading-relaxed">
              Tandai menu habis ("Sold Out") agar tidak bisa dipesan.
            </p>
            
            <div className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
              {menus.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-orange-50/40 p-3 rounded-2xl border border-orange-100/50 shadow-sm">
                   <div className="flex items-center gap-3">
                     <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                     <div>
                       <p className="text-slate-800 font-bold text-sm leading-tight">{item.name}</p>
                       <p className={`text-[10px] mt-0.5 font-black uppercase ${item.isSoldOut ? 'text-red-500' : 'text-emerald-500'}`}>
                         {item.isSoldOut ? 'Habis (Sold)' : 'Tersedia'}
                       </p>
                     </div>
                   </div>
                   <button 
                     onClick={() => onToggleSoldOut(item.id)}
                     className={`p-2 rounded-xl border transition-all cursor-pointer shadow-sm ${item.isSoldOut ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}
                     title={item.isSoldOut ? "Tandai Tersedia" : "Tandai Habis"}
                   >
                     {item.isSoldOut ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                   </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-200/50">
            <h4 className="font-black text-orange-700 text-sm mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-orange-500" /> Petunjuk Kasir Hebat
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-semibold leading-relaxed">
              <li>Pelanggan memesan langsung dari meja via scan QR (menggunakan parameter <code className="text-orange-600 font-mono">?table=[noMeja]</code>).</li>
              <li>Setiap pesanan otomatis masuk ke panel ini secara real-time.</li>
              <li>Kasir memproses pesanan dan mencetak struk fisik/simulasi jika diperlukan.</li>
              <li>Status pembayaran dan penyajian dapat diperbarui secara interaktif dengan sekali ketuk.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* RECEIPT MODAL (High-Fidelity Printed Receipt Vibe) */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white text-slate-950 p-6 rounded-3xl max-w-sm w-full font-mono text-xs shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 border-t-8 border-orange-500">
            <div className="text-center border-b border-dashed border-slate-300 pb-3 mb-3">
              <h4 className="font-black text-sm uppercase">KLOPP.TB</h4>
              <p className="text-[10px] text-slate-500">Tebet, Jakarta Selatan</p>
              <p className="text-[9px] text-slate-500">#TempatBercerita</p>
            </div>
            
            <div className="space-y-1.5 border-b border-dashed border-slate-300 pb-3 mb-3">
              <div className="flex justify-between">
                <span>Tanggal:</span>
                <span>{new Date(selectedReceiptOrder.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>No. Meja:</span>
                <span className="font-bold">MEJA {selectedReceiptOrder.tableNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Pelanggan:</span>
                <span>{selectedReceiptOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Metode:</span>
                <span className="font-bold uppercase">{selectedReceiptOrder.paymentStatus === 'paid' ? 'Paid - Digital' : 'Tagihan Belum Lunas'}</span>
              </div>
            </div>

            <div className="space-y-2 border-b border-dashed border-slate-300 pb-3 mb-3">
              {selectedReceiptOrder.items.map(it => (
                <div key={it.id} className="flex justify-between">
                  <span>{it.qty}x {it.name}</span>
                  <span>Rp {formatRp(it.price * it.qty)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 border-b border-dashed border-slate-300 pb-3 mb-4">
              <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span>Rp {formatRp(selectedReceiptOrder.totalAmount)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm">
                <span>TOTAL:</span>
                <span>Rp {formatRp(selectedReceiptOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-500 space-y-1">
              <p>Terima kasih telah bercerita bersama kami!</p>
              <p>Instagram: @klopp.tb</p>
            </div>

            <button 
              onClick={() => setSelectedReceiptOrder(null)}
              className="mt-6 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl cursor-pointer transition-colors shadow-sm"
            >
              Tutup Struk
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
