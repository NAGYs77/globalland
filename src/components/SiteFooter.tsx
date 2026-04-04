import { Phone, Mail } from 'lucide-react';

// --- IMPORT DES LOGOS RÉSEAUX (Même noms que dans ContactPage) ---
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';

export function SiteFooter({ t }: any) {
  const ADMIN_CONTACT = {
    phone: "+261 32 29 587 15",
    email: "globallandimmo@gmail.com",
    facebook: "https://www.facebook.com/globallandimmo",
    instagram: "https://www.instagram.com/globallandimmo/",
    linkedin: "https://www.linkedin.com/company/Santoni FOLIO"
  };

  return (
    <footer className="bg-[#0a192f] text-white py-12 border-t border-white/10 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-8">
        
        {/* Section Contact Rapide */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          <a 
            href={`tel:${ADMIN_CONTACT.phone}`} 
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
          >
            <Phone size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold tracking-wider">{ADMIN_CONTACT.phone}</span>
          </a>
          <a 
            href={`mailto:${ADMIN_CONTACT.email}`} 
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
          >
            <Mail size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold tracking-wider break-all">{ADMIN_CONTACT.email}</span>
          </a>
        </div>

        {/* Logos des Réseaux Sociaux */}
        <div className="flex gap-8 items-center">
          <a 
            href={ADMIN_CONTACT.facebook} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:scale-110 transition-transform duration-300"
          >
            <img src={facebook} alt="Facebook" className="h-8 w-8 object-contain" />
          </a>
          <a 
            href={ADMIN_CONTACT.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:scale-110 transition-transform duration-300"
          >
            <img src={instagram} alt="Instagram" className="h-8 w-8 object-contain" />
          </a>
          <a 
            href={ADMIN_CONTACT.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:scale-110 transition-transform duration-300"
          >
            <img src={linkedin} alt="LinkedIn" className="h-8 w-8 object-contain" />
          </a>
        </div>

        {/* Ligne de Copyright et Crédit */}
        <div className="pt-8 border-t border-white/5 w-full text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} NosyBe Global Land Immo. Tous droit reserver. It Consulting Nosy-be{t.footerCredit}
          </p>
        </div>
      </div>
    </footer>
  );
}