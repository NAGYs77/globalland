import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, Maximize } from 'lucide-react';

// --- IMPORT DES PHOTOS RÉELLES ---
import img1 from '../assets/1.png';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.jpg';
import img17 from '../assets/17.png';
import img19 from '../assets/19.png';


// Données basées sur tes informations réelles
const MOCK_LISTINGS = [
  { id: 1, titleKey: "desc1", price: "60€/m²", area: "3 200", location: "Andilana", image: img1, tag: "Face à la mer" },
  { id: 2, titleKey: "desc2", price: "500 000€", area: "5 800", location: "Ambatoloaka", image: img2, tag: "Projet hôtelier" },
  { id: 3, titleKey: "desc3", price: "10€/m²", area: "60 ha", location: "Nosy Faly", image: img3, tag: "Vue panoramique" },
  { id: 4, titleKey: "desc4", price: "45 000€", area: "1 700", location: "Darsalama", image: img4, tag: "Bord de mer" },
  { id: 5, titleKey: "desc5", price: "10€/m²", area: "60 ha", location: "Hell-Ville", image: img5, tag: "Investissement" },
  { id: 6, titleKey: "desc6", price: "3 200€", area: "5 ha", location: "Nosy Faly", image: img6, tag: "Résidentiel" },
  { id: 7, titleKey: "desc7", price: "800 000€", area: "4 000", location: "Ambaro", image: img7, tag: "Villa Luxe" },
  { id: 8, titleKey: "desc8", price: "8 200€", area: "5 ha", location: "Nosy Faly", image: img17, tag: "Exclusif" },
  { id: 9, titleKey: "desc9", price: "10€/m²", area: "05 ha", location: "Nosy Faly", image: img19, tag: "Hôtelier" },
  { id: 10, titleKey: "desc10", price: "10€/m²", area: "05 ha", location: "Nosy Faly", image: img19, tag: "Vue Mer" },
];

export function ListingsSection({ t, searchQuery, onClear }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fonction pour ouvrir Google Maps sur Nosy Be
  const openGoogleMaps = (location: string) => {
    const query = encodeURIComponent(`${location}, Nosy Be, Madagascar`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  // Filtrage intelligent (Description + Ville)
  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return MOCK_LISTINGS.filter(l => {
      const description = t[l.titleKey] || "";
      return description.toLowerCase().includes(query) || 
             l.location.toLowerCase().includes(query);
    });
  }, [searchQuery, t]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900">{t.listingsTitle}</h2>
          <p className="text-slate-500 mt-2">{t.listingsSub}</p>
        </div>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-3">
            {currentData.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt="Terrain" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-emerald-600 shadow-sm">
                    {item.tag}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col space-y-4">
                  <h3 className="font-bold text-sm text-slate-800 leading-snug h-12 line-clamp-3">
                    {t[item.titleKey]}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold">
                    <button 
                      onClick={() => openGoogleMaps(item.location)} 
                      className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
                    >
                      <MapPin size={14} className="text-emerald-500" /> 
                      <span className="underline underline-offset-2">{item.location}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <Maximize size={14} className="text-emerald-500" /> {item.area} m²
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-50 mt-auto flex items-center justify-between">
                    <p className="text-xl font-black text-emerald-600">{item.price}</p>
                    <button className="p-3 bg-slate-900 text-white rounded-xl group-hover:bg-emerald-500 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-10">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                disabled={currentPage === 1} 
                className="p-4 rounded-2xl bg-slate-100 disabled:opacity-30 hover:bg-slate-900 hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {t.page} {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                disabled={currentPage === totalPages} 
                className="p-4 rounded-2xl bg-slate-100 disabled:opacity-30 hover:bg-slate-900 hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Utilisation de onClear ici pour éviter l'erreur TypeScript */
        <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            {t.noResult}
          </p>
          <button 
            onClick={onClear} 
            className="mt-4 text-emerald-600 text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-4"
          >
            {t.clearSearch}
          </button>
        </div>
      )}
    </section>
  );
}