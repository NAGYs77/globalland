import { Link, useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
import logo from '../assets/ter.jpg';

export function Navbar({ t, currentLang, setLang, onSearch }: any) {
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value); // Met à jour le texte de recherche global
    
    // Optionnel : Rediriger automatiquement vers la page terrains si l'utilisateur commence à taper
    if (value.length > 0) {
      navigate('/terrains');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center border-b border-slate-200/60 bg-white/80 py-2 backdrop-blur-md px-4 sm:px-8">
      <Link to="/" className="flex items-center gap-3 shrink-0">
        <img src={logo} alt="Logo" className="h-12 w-auto object-contain rounded-lg" />
        <div className="hidden sm:block">
          <p className="text-sm font-black leading-none text-slate-900">NosyBe Lands</p>
          <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1 tracking-wider">{t.expertise}</p>
        </div>
      </Link>
      
      {/* Barre de recherche centrale */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-[450px] group">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder={t.searchPlaceholder}
            className="bg-slate-100 border-2 border-transparent rounded-2xl py-2.5 pl-11 pr-4 w-full focus:bg-white focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-500/10 transition-all outline-none text-xs font-medium text-slate-700"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500 mr-8">
        <Link to="/terrains" className="hover:text-emerald-600 transition-colors">{t.navTerrains}</Link>
        <Link to="/methode" className="hover:text-emerald-600 transition-colors">{t.navMethode}</Link>
        <Link to="/contact" className="hover:text-emerald-600 transition-colors">{t.navContact}</Link>
      </nav>

      {/* Sélecteur de langue */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
        {(['fr', 'en', 'it'] as const).map((l) => (
          <button 
            key={l} 
            onClick={() => setLang(l)} 
            className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${currentLang === l ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}