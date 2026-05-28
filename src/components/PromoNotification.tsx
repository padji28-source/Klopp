import { X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PromoNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification after 1.5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 50);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}
        onTransitionEnd={() => {
          if (!isVisible) setIsOpen(false);
        }}
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white text-slate-600 hover:text-slate-900 rounded-full backdrop-blur-md transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Promo Image / Header */}
        <div className="h-48 bg-gradient-to-br from-orange-400 to-amber-500 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&h=400&fit=crop')] opacity-30 mix-blend-overlay object-cover"></div>
          <div className="relative z-10 text-center text-white p-6">
            <Sparkles className="w-10 h-10 mx-auto mb-3 text-amber-200 animate-pulse" />
            <h3 className="text-3xl font-black tracking-tight drop-shadow-md">PROMO SPESIAL!</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 text-center bg-[#fffdf9]">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-4">Terbatas</span>
          <h4 className="text-xl font-extrabold text-slate-900 mb-2">Diskon 20% Semua Menu Kopi</h4>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Khusus hari ini! Nikmati kopi favoritmu di Klopp.tb dengan harga lebih hemat. Tunjukkan notifikasi ini ke kasir kami.
          </p>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="w-full py-3.5 bg-slate-900 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Klaim Promo Sekarang
          </button>
          
          <p className="text-slate-400 text-[10px] mt-4">*Syarat dan ketentuan berlaku</p>
        </div>
      </div>
    </div>
  );
}
