import { useState } from "react";
import { Phone, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

// --- IMPORT DES LOGOS ---
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';

const ADMIN_CONTACT = { 
  name: "Santoni Folio", 
  phone: "+261 32 29 587 15", 
  email: "globallandimmo@gmail.com",
  facebook: "https://www.facebook.com/globallandimmo",
  instagram: "https://www.instagram.com/globallandimmo/",
  linkedin: "https://www.linkedin.com/company/Santoni FOLIO"
};

export function ContactPage({ t }: any) {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);

    // Préparation de l'objet pour Static Forms
    const data = {
      ...formProps,
      subject: "Nouveau message de Global Land Immo",
      replyTo: "@", // Recommandé par Static Forms pour la validation
      accessKey: "sf_ce56fa3d4f4b90e4238d1e73" 
    };

    try {
      const response = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      const result = await response.json();

      if (result.success) { 
        setStatus("SUCCESS"); 
        (e.target as HTMLFormElement).reset(); 
        setTimeout(() => setStatus("IDLE"), 5000);
      } else { 
        console.error("Static Forms Error:", result.message);
        setStatus("ERROR"); 
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus("ERROR");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white shadow-2xl my-10 border border-white/5">
      <div className="relative z-10 grid gap-0 lg:grid-cols-2">
        
        {/* FORMULAIRE */}
        <div className="p-8 lg:p-16 space-y-8 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">{t.contactTitle}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{t.contactDesc}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" type="text" placeholder={t.formName} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-emerald-500 transition-all" />
              <input name="phone" type="tel" placeholder={t.formTel} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-emerald-500 transition-all" />
            </div>

            <input name="email" type="email" placeholder={t.formEmail} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-emerald-500 transition-all" />
            <textarea name="message" placeholder={t.formMsg} rows={4} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm outline-none resize-none focus:border-emerald-500 transition-all" />
            
            <button 
              disabled={status === "SENDING" || status === "SUCCESS"} 
              className={`flex items-center justify-center gap-3 w-full rounded-2xl py-5 font-black uppercase tracking-widest text-xs transition-all duration-300 ${
                status === "SUCCESS" ? "bg-emerald-500 text-slate-900" : "bg-white text-slate-900 hover:bg-emerald-500"
              } disabled:opacity-70`}
            >
              {status === "SENDING" ? t.sending : status === "SUCCESS" ? t.success : t.formBtn} 
              {status === "SUCCESS" ? <CheckCircle2 size={18} /> : <ArrowRight size={16} />}
            </button>

            {status === "ERROR" && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold justify-center bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                <AlertCircle size={14} /> Une erreur est survenue. Vérifie ta clé ou ta connexion.
              </div>
            )}
          </form>
        </div>
        
        {/* INFOS CONTACT */}
        <div className="bg-white/5 border-l border-white/10 p-8 lg:p-16 flex flex-col justify-between backdrop-blur-sm">
          <div className="space-y-12">
            <div>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{t.advisorAvailable}</p>
              <h3 className="text-4xl font-black">{ADMIN_CONTACT.name}</h3>
            </div>

            <div className="space-y-6">
              <a href={`tel:${ADMIN_CONTACT.phone}`} className="flex items-center gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-500 transition-all">
                  <Phone size={20} className="text-emerald-500 group-hover:text-slate-900" />
                </div>
                <p className="font-bold text-lg group-hover:text-emerald-500 transition-colors">{ADMIN_CONTACT.phone}</p>
              </a>
              <a href={`mailto:${ADMIN_CONTACT.email}`} className="flex items-center gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-500 transition-all">
                  <Mail size={20} className="text-emerald-500 group-hover:text-slate-900" />
                </div>
                <p className="font-bold text-lg break-all group-hover:text-emerald-500 transition-colors">{ADMIN_CONTACT.email}</p>
              </a>
            </div>

            {/* RESEAUX */}
            <div className="pt-12 border-t border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Suivez-nous</p>
              <div className="flex gap-6">
                <a href={ADMIN_CONTACT.facebook} target="_blank" rel="noreferrer"><img src={facebook} className="h-10 w-10 hover:scale-110 transition-transform" alt="FB" /></a>
                <a href={ADMIN_CONTACT.instagram} target="_blank" rel="noreferrer"><img src={instagram} className="h-10 w-10 hover:scale-110 transition-transform" alt="IG" /></a>
                <a href={ADMIN_CONTACT.linkedin} target="_blank" rel="noreferrer"><img src={linkedin} className="h-10 w-10 hover:scale-110 transition-transform" alt="IN" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}