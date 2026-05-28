import { Menu, ShoppingCart, Instagram } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img 
              src="/klopp.jpg" 
              alt="Logo Klopp" 
              className="w-12 h-12 rounded-xl object-contain shadow-md border-2 border-orange-500/50 bg-white" 
            />
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">KLOPP<span className="text-orange-500">.tb</span></span>
              <span className="text-xs text-orange-600 tracking-widest font-bold mt-0.5">#TempatBercerita</span>
            </div>
          </div>
          
          {/* Menu Desktop & Cart */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex items-center space-x-8 mr-4">
              <a href="#home" className="hover:text-orange-500 transition-colors px-3 py-2 rounded-md text-sm font-semibold text-slate-700">Home</a>
              <a href="#vibe" className="hover:text-orange-500 transition-colors px-3 py-2 rounded-md text-sm font-semibold text-slate-700">Vibe & Info</a>
              <a href="#menu" className="hover:text-orange-500 transition-colors px-3 py-2 rounded-md text-sm font-semibold text-slate-700">Menu</a>
              <a href="https://www.instagram.com/klopp.tb/" target="_blank" rel="noreferrer" className="bg-orange-500/10 text-orange-600 border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-all px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
                <Instagram className="w-4 h-4" />
                @klopp.tb
              </a>
            </div>

            {/* Cart Button */}
            <button 
              onClick={onCartClick} 
              className="relative p-2.5 text-slate-700 hover:text-orange-500 transition flex items-center justify-center bg-orange-50 border border-orange-100/50 hover:border-orange-500/50 rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center pl-2">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-orange-100 animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-3 pb-5 space-y-2 flex flex-col">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-500 text-slate-800 hover:bg-orange-50/50 px-3 py-2.5 rounded-xl text-base font-semibold transition-all">Home</a>
            <a href="#vibe" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-500 text-slate-800 hover:bg-orange-50/50 px-3 py-2.5 rounded-xl text-base font-semibold transition-all">Vibe & Info</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-500 text-slate-800 hover:bg-orange-50/50 px-3 py-2.5 rounded-xl text-base font-semibold transition-all">Menu</a>
            <a href="https://www.instagram.com/klopp.tb/" target="_blank" rel="noreferrer" className="text-orange-600 bg-orange-50 px-3 py-2.5 rounded-xl text-base font-bold flex items-center gap-2 mt-2">
              <Instagram className="w-5 h-5" /> Ikuti di Instagram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
