import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from 'lucide-react'; 
import logo from '../assets/ter.jpg';

export function Navbar({ t, currentLang, setLang, onSearch }: any) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
    if (value.length > 0) {
      navigate('/terrains');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      {/* --- BARRE PRINCIPALE --- */}
      <div className="flex items-center justify-between py-2 px-4 md:px-8 h-20">
        
        {/* LOGO & TITRE */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto object-contain rounded-lg" />
          <div className="hidden sm:block">
            <p className="text-sm font-black leading-none text-slate-900">NosyBe Lands</p>
            <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1 tracking-wider">{t.expertise}</p>
          </div>
        </Link>
        
        {/* BARRE DE RECHERCHE (Adaptée pour mobile) */}
        <div className="flex-1 flex justify-center px-2 md:px-6">
          <div className="relative w-full max-w-[400px] group">
            <input
              type="text"
              onChange={handleInputChange}
              placeholder={t.searchPlaceholder}
              className="bg-slate-100 border-2 border-transparent rounded-2xl py-2.5 pl-9 md:pl-11 pr-4 w-full focus:bg-white focus:border-emerald-400 transition-all outline-none text-[10px] md:text-xs font-medium text-slate-700"
            />
            <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 absolute left-3 md:left-4 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
          </div>
        </div>

        {/* NAVIGATION DESKTOP (Cachée sur mobile) */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500 mr-8">
          <Link to="/terrains" className="hover:text-emerald-600 transition-all underline-offset-8 hover:underline decoration-2">
            {t.navTerrains}
          </Link>
          <Link to="/methode" className="hover:text-emerald-600 transition-all underline-offset-8 hover:underline decoration-2">
            {t.navMethode}
          </Link>
          <Link to="/contact" className="hover:text-emerald-600 transition-all underline-offset-8 hover:underline decoration-2">
            {t.navContact}
          </Link>
        </nav>

        {/* ACTIONS : LANGUES + BURGER */}
        <div className="flex items-center gap-2">
          {/* SÉLECTEUR DE LANGUE */}
          <div className="flex gap-0.5 bg-slate-100 p-1 rounded-xl shrink-0">
            {(['fr', 'en', 'it'] as const).map((l) => (
              <button 
                key={l} 
                onClick={() => setLang(l)} 
                className={`px-2 md:px-3 py-1.5 text-[9px] md:text-[10px] font-black rounded-lg transition-all ${
                  currentLang === l ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* BOUTON BURGER (Visible uniquement sur mobile < 1024px) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-emerald-500 transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MENU MOBILE DÉROULANT --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-2">
            <Link 
              to="/terrains" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-6 py-5 rounded-2xl bg-slate-50 text-sm font-black uppercase tracking-widest text-slate-700 active:bg-emerald-50 active:text-emerald-600"
            >
              {t.navTerrains}
            </Link>
            <Link 
              to="/methode" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-6 py-5 rounded-2xl bg-slate-50 text-sm font-black uppercase tracking-widest text-slate-700 active:bg-emerald-50 active:text-emerald-600"
            >
              {t.navMethode}
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-6 py-5 rounded-2xl bg-emerald-500 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20"
            >
              {t.navContact}
            </Link>
          </nav>
          
          <div className="p-6 bg-slate-50/50">
            <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
              © 2026 NosyBe Lands — Expertise Immobilière
            </p>
          </div>
        </div>
      )}
    </header>
  );
}