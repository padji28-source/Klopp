import { Coffee, CupSoda, Plus, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { formatRp } from '../data';
import { MenuItem } from '../types';

interface MenuSectionProps {
  menus: MenuItem[];
  onAdd: (item: MenuItem) => void;
}

export function MenuSection({ menus, onAdd }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coffee' | 'non-coffee'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menus.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all' as const, label: 'Semua Menu', icon: null },
    { id: 'coffee' as const, label: 'Coffee Based', icon: Coffee },
    { id: 'non-coffee' as const, label: 'Non-Coffee & Bites', icon: CupSoda },
  ];

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white/40 backdrop-blur-md z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" /> Menu Favorit
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">Pilihan Menu Terbaik</h2>
          <p className="text-slate-500 font-medium text-base md:text-lg">Setiap hidangan dibuat dengan cinta untuk mencerahkan harimu. Let's order! ☕✨</p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          {/* Search bar */}
          <div className="relative shadow-md rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
            <input 
              type="text"
              placeholder="Cari kopi, matcha segar, atau snack favoritmu di sini..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-orange-100/80 text-slate-800 placeholder-slate-400 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm md:text-base font-medium"
            />
          </div>

          {/* Categories Filter (Mobile-friendly horizontal scroll) */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-black text-xs md:text-sm transition-all duration-300 shrink-0 flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-white border-orange-500 shadow-[0_8px_20px_rgba(249,115,22,0.25)] scale-105'
                      : 'bg-orange-50/60 text-orange-700 hover:bg-orange-100/60 border-orange-100/50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  {cat.id === 'all' ? 'Semua Menu' : cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-slate-400 max-w-sm mx-auto">
            <p className="text-lg font-bold">Yah, menu tidak ditemukan.</p>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white border-2 border-orange-100/40 rounded-3xl overflow-hidden group hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full shadow-sm hover:-translate-y-1">
                
                <div className="relative h-56 img-zoom-hover">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-70"></div>
                  <span className="absolute bottom-3 right-3 font-black text-white bg-orange-500 px-3.5 py-1.5 rounded-full text-xs shadow-md">
                    Rp {formatRp(item.price)}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow bg-white">
                  <h4 className="font-extrabold text-lg text-slate-900 mb-1.5 group-hover:text-orange-500 transition-colors">{item.name}</h4>
                  <p className="text-xs md:text-sm text-slate-500 mb-5 flex-grow font-semibold leading-relaxed">{item.desc}</p>
                  
                  {item.isSoldOut ? (
                    <button 
                      disabled
                      className="w-full py-3 rounded-xl font-bold bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      Stok Habis
                    </button>
                  ) : (
                    <button 
                      onClick={() => onAdd(item)}
                      className="w-full py-3 rounded-xl font-extrabold bg-orange-50 border border-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all flex items-center justify-center gap-2 duration-200 cursor-pointer shadow-sm active:scale-95"
                    >
                      <Plus className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors" /> Tambah Pesanan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
