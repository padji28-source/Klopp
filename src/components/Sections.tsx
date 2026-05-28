import { Tag, Coffee, Music, Camera, ChevronRight, Instagram, Sparkles, Clock, Calendar } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
      <div className="text-center max-w-4xl mx-auto z-10 bg-white/85 backdrop-blur-lg p-8 md:p-16 rounded-[3rem] shadow-2xl border-2 border-white/50 mt-12 transition-all">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs md:text-sm text-orange-600 mb-8 font-bold shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
          Buka Setiap Hari | 08:00 - 22:00
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-slate-900 leading-tight">
          Lebih Dari Sekadar <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 text-glow">
            Kedai Kopi.
          </span>
        </h1>
        
        <p className="text-base md:text-xl lg:text-2xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
          Selamat datang di <span className="font-extrabold text-slate-800 border-b-2 border-orange-400">Klopp.tb</span>. Ruang hangat penuh cerita, tawa, dan rasa untuk menyambut hari terbaikmu! <span className="text-orange-500 font-bold">#TempatBercerita</span> 🧡
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="px-8 py-4 bg-orange-500 text-white rounded-full font-black hover:bg-orange-600 transition-all shadow-[0_10px_25px_rgba(249,115,22,0.35)] hover:-translate-y-1 block text-center">
            Lihat Menu Favorit
          </a>
          <a href="#vibe" className="px-8 py-4 bg-white/80 backdrop-blur-md rounded-full font-extrabold hover:bg-orange-50 text-slate-800 transition-all border border-orange-200/60 hover:-translate-y-1 block text-center shadow-sm">
            Temukan Info & Promo 🎉
          </a>
        </div>
      </div>
    </section>
  );
}

export function Divider() {
  return (
    <div className="w-full bg-white/40 backdrop-blur-md h-8 rounded-t-[3rem] -mb-8 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"></div>
  );
}

export function VibeSection() {
  return (
    <section id="vibe" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white/40 backdrop-blur-md rounded-t-[3rem] z-10 shadow-[0_-15px_40px_rgba(0,0,0,0.1)]">
      {/* Decorative bright bubbles */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-300/10 rounded-full blur-[80px] pointer-events-none floating-bounce"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none floating-bounce" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Ada Apa di Klopp?
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 leading-tight">Vibe & Info <span className="text-orange-500">Klopp.tb</span></h2>
          <p className="text-slate-500 font-medium text-base md:text-lg">Intip promo ceria, jadwal musik seru, dan momen hangat kita bersama!</p>
        </div>

        {/* 1. Promo Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-2.5 text-slate-900 border-b border-orange-100 pb-3">
            <Tag className="text-orange-500 w-6 h-6" /> Promo Spesial Minggu Ini
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promo Card 1 */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 to-amber-500 p-8 flex items-center shadow-lg group hover:shadow-orange-500/15 hover:shadow-xl transition-all duration-300 translate-y-0 hover:-translate-y-1">
              <div className="relative z-10 w-2/3">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black text-white mb-3">
                   Happy Hour Ceria
                </span>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">Diskon 20% Semua Kopi</h4>
                <p className="text-orange-50 text-sm font-semibold leading-relaxed">Berlaku setiap Senin - Kamis jam 08:00 - 12:00 WIB.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-500">
                <Coffee className="w-48 h-48 text-white" />
              </div>
            </div>
            
            {/* Promo Card 2 */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-orange-100 p-8 flex items-center shadow-md group hover:shadow-xl transition-all duration-300 translate-y-0 hover:-translate-y-1">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black mb-3">
                   WFC / Belajar Hemat
                </span>
                <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">Paket Bundling WFC</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dapatkan 1 Kopi Susu Klopp + 1 Mix Platter renyah hanya seharga <span className="text-orange-500 font-extrabold text-lg">Rp 40.000</span>
                </p>
              </div>
              <div className="absolute right-6 top-6 w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center font-bold text-sm">
                GO!
              </div>
            </div>
          </div>
        </div>

        {/* 2. Live Music */}
        <div className="mb-20">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-2.5 text-slate-900 border-b border-orange-100 pb-3">
            <Music className="text-orange-500 w-6 h-6" /> Jadwal Live Music Mingguan
          </h3>
          <div className="bg-orange-50/40 rounded-3xl p-6 md:p-8 border border-orange-100/50 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-2xl p-5 border border-orange-100/40 shadow-sm flex gap-4 items-center hover:scale-[1.02] transition-transform duration-200">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-xl flex flex-col justify-center items-center shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider">Jumat</span>
                  <span className="text-2xl font-black">19</span>
                </div>
                <div>
                  <h4 className="text-slate-900 font-black text-base">Acoustic Night</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Senja Project (20:00 WIB)</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-orange-100/40 shadow-sm flex gap-4 items-center hover:scale-[1.02] transition-transform duration-200">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-xl flex flex-col justify-center items-center shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider">Sabtu</span>
                  <span className="text-2xl font-black">20</span>
                </div>
                <div>
                  <h4 className="text-slate-900 font-black text-base">Saturday Grooves</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Special DJ Ardi (21:00 WIB)</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-orange-100/40 shadow-sm flex gap-4 items-center hover:scale-[1.02] transition-transform duration-200">
                <div className="w-16 h-16 bg-orange-500/10 text-orange-600 rounded-xl flex flex-col justify-center items-center shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider">Minggu</span>
                  <span className="text-2xl font-black">21</span>
                </div>
                <div>
                  <h4 className="text-slate-900 font-black text-base">Chill & Relax</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Karaoke & Open Mic Bareng!</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3. Momen Klopp (Gallery) */}
        <div>
          <h3 className="text-2xl font-black mb-8 flex items-center gap-2.5 text-slate-900 border-b border-orange-100 pb-3">
            <Camera className="text-orange-500 w-6 h-6" /> Galeri Kebersamaan Klopp.tb
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="img-zoom-hover rounded-3xl md:col-span-2 md:row-span-2 h-64 md:h-[530px] shadow-md border-4 border-white bg-slate-100">
              <img src="/klopp1.jpg" alt="Outdoor Klopp" className="w-full h-full object-cover" />
            </div>
            <div className="img-zoom-hover rounded-3xl h-64 shadow-md border-4 border-white bg-slate-100">
              <img src="/klopp2.jpg" alt="Momen Live Music" className="w-full h-full object-cover" />
            </div>
            <div className="img-zoom-hover rounded-3xl h-64 shadow-md border-4 border-white bg-slate-100">
              <img src="/klopp3.jpg" alt="Momen Nongkrong" className="w-full h-full object-cover" />
            </div>
            <div className="img-zoom-hover rounded-3xl h-64 md:col-span-2 shadow-md border-4 border-white bg-slate-100">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&h=600&fit=crop" alt="Area Bar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="location" className="bg-white/50 backdrop-blur-md border-t border-orange-100/50 py-16 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/klopp.jpg" 
                alt="Logo Klopp" 
                className="w-12 h-12 rounded-xl object-contain border-2 border-orange-500 shadow-sm bg-white" 
              />
              <span className="font-black text-2xl tracking-tighter text-slate-950">KLOPP<span className="text-orange-500">.tb</span></span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
              #TempatBercerita. Menghadirkan kopi premium, kudapan nikmat, serta atmosfir yang penuh kebahagiaan untuk hari-harimu.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/klopp.tb/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white border border-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:scale-110 transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Work Hours */}
          <div>
            <h4 className="text-lg font-extrabold mb-5 text-slate-950 flex items-center gap-1.5"><Clock className="text-orange-500 w-5 h-5" /> Lokasi & Waktu</h4>
            <address className="text-slate-600 text-sm not-italic leading-relaxed font-semibold mb-4 space-y-1">
              <p className="text-slate-900 font-extrabold">Tebet, Jakarta Selatan</p>
              <p className="font-medium text-slate-500">DKI Jakarta, Indonesia</p>
              <br />
              <p className="font-extrabold text-orange-600">Jam Operasional:</p>
              <p className="font-bold text-slate-800">Senin - Minggu (08:00 - 22:00 WIB)</p>
            </address>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-lg font-extrabold mb-5 text-slate-950 flex items-center gap-1.5"><Calendar className="text-orange-500 w-5 h-5" /> Navigasi Cepat</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-bold">
              <li>
                <a href="#home" className="hover:text-orange-500 transition-colors inline-flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" /> Home
                </a>
              </li>
              <li>
                <a href="#vibe" className="hover:text-orange-500 transition-colors inline-flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" /> Vibe & Info
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-500 transition-colors inline-flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500" /> Menu Kopi
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-orange-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-medium">
          <p>&copy; {new Date().getFullYear()} Klopp.tb #TempatBercerita. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Made with 🧡 in Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
