


import type { ReactNode } from "react";
import { useMemo, useState, useEffect } from "react";
import { Search, User, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

// Assets
import ter from './assets/ter.jpg';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import linkedin from './assets/linkedin.png';

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 6; // Tu peux changer ce nombre pour afficher 4, 6, 8... terrains par page

// --- TRADUCTIONS ---
const translations = {
  fr: {
    navTerrains: "Terrains", navMethode: "Méthode", navContact: "Contact",
    heroTitle: "Trouvez le terrain et maison idéal,", heroSub: "sans perdre de temps.",
    heroDesc: "Accompagnement clé en main pour l'acquisition de terrains sécurisés à Nosy Be. Pour investisseurs, hôteliers et particuliers.",
    heroBtn: "Voir les opportunités", stats1: "Terrains à Nosy Be", stats2: "Volume traité", stats3: "Satisfaction",
    listingsTitle: "Opportunités à la une", listingsSub: "Terrains vérifiés et prêts pour signature",
    sortAsc: "Prix croissant", sortDesc: "Prix décroissant", cardBtn: "Demander la fiche détaillée",
    contactTitle: "Parlons de votre projet.", contactDesc: "Échangez avec un expert basé à Nosy Be pour obtenir des pistes concrètes en 24h.",
    formName: "Nom complet", formEmail: "Email", formTel: "Téléphone / WhatsApp", formMsg: "Votre projet...", formBtn: "Envoyer ma demande",
    howItWorksTitle: "Une expérience pensée pour Nosy Be.", howItWorksDesc: "Tout est centralisé avec une équipe locale qui connaît parfaitement les spécificités de Madagascar.",
    step1Title: "Strategie foncière", step1Desc: "Budget, localisation et usage (villa, hôtel, resort).",
    step2Title: "Sélection ciblée", step2Desc: "Pré-qualification juridique et analyse du potentiel.",
    step3Title: "Acquisition", step3Desc: "Accompagnement notarial et sécurisation de l'acte.",
    cookieTitle: "Un petit cookie pour la route ?", cookieDesc: "Ce site enregistre des cookies pour vous offrir la meilleure expérience de navigation possible.",
    cookieChoice: "Je choisis", cookieDecline: "Non merci", cookieAccept: "OK pour moi",
    noResult: "Aucun terrain ne correspond à votre recherche.",
    prev: "Précédent", next: "Suivant", page: "Page"
  },
  en: {
    navTerrains: "Plots", navMethode: "Method", navContact: "Contact",
    heroTitle: "Find the perfect plot and house,", heroSub: "without wasting time.",
    heroDesc: "Turnkey support for the acquisition of secured land in Nosy Be. For investors, developers and individuals.",
    heroBtn: "View Opportunities", stats1: "Plots in Nosy Be", stats2: "Processed Volume", stats3: "Satisfaction",
    listingsTitle: "Featured Opportunities", listingsSub: "Verified plots ready for signature",
    sortAsc: "Lowest Price", sortDesc: "Highest Price", cardBtn: "Request detailed file",
    contactTitle: "Let's talk about your project.", contactDesc: "Talk with an expert based in Nosy Be to get concrete leads within 24 hours.",
    formName: "Full Name", formEmail: "Email", formTel: "Phone / WhatsApp", formMsg: "Your project details...", formBtn: "Send Inquiry",
    howItWorksTitle: "An experience designed for Nosy Be.", howItWorksDesc: "Everything is centralized with a local team that perfectly knows the specificities of Madagascar.",
    step1Title: "Land Strategy", step1Desc: "Budget, location, and usage (villa, hotel, resort).",
    step2Title: "Targeted Selection", step2Desc: "Legal pre-qualification and potential analysis.",
    step3Title: "Acquisition", step3Desc: "Notary support and securing the deed.",
    cookieTitle: "A little cookie for the road?", cookieDesc: "This site records cookies to offer you the best possible navigation experience.",
    cookieChoice: "I choose", cookieDecline: "No thanks", cookieAccept: "OK for me",
    noResult: "No results found for your search.",
    prev: "Previous", next: "Next", page: "Page"
  },
  it: {
    navTerrains: "Terreni", navMethode: "Metodo", navContact: "Contatto",
    heroTitle: "Trova il terreno ideale,", heroSub: "senza perdre tempo.",
    heroDesc: "Supporto chiavi in mano pour l'acquisto di terreni sicuri a Nosy Be. Per investitori, albergatori e privati.",
    heroBtn: "Vedi le opportunità", stats1: "Terreni a Nosy Be", stats2: "Volume gestito", stats3: "Soddisfazione",
    listingsTitle: "Opportunità in primo piano", listingsSub: "Terreni verificati e pronti per la firma",
    sortAsc: "Prezzo crescente", sortDesc: "Prezzo decrescente", cardBtn: "Richiedi scheda dettagliata",
    contactTitle: "Parliamo del tuo progetto.", contactDesc: "Parla con un esperto basato a Nosy Be per obtenir piste concrete in 24 ore.",
    formName: "Nome completo", formEmail: "Email", formTel: "Telefono / WhatsApp", formMsg: "Il tuo projetto...", formBtn: "Invia richiesta",
    howItWorksTitle: "Un'esperienza pensata per Nosy Be.", howItWorksDesc: "Tutto è centralizzato con un team locale qui conosce perfettamente le specificità del Madagascar.",
    step1Title: "Strategia fondiaria", step1Desc: "Budget, posizione e utilizzo (villa, hotel, resort).",
    step2Title: "Selezione mirata", step2Desc: "Pre-qualificazione legale e analisi del potenziale.",
    step3Title: "Acquisizione", step3Desc: "Supporto notarile e messa in sicurezza dell'atto.",
    cookieTitle: "Un piccolo cookie per la strada?", cookieDesc: "Questo sito registra i cookie per offrirti la meilleure esperienza di navigazione possible.",
    cookieChoice: "Scelgo", cookieDecline: "No grazie", cookieAccept: "OK per me",
    noResult: "Nessun risultato trovato.",
    prev: "Precedente", next: "Successivo", page: "Pagina"
  }
};

type Language = "fr" | "en" | "it";
type TranslationType = typeof translations.fr;
type LandCategory = "Résidentiel" | "Commercial" | "Touristique";
type LandListing = { id: number; title: string; country: string; city: string; price: string; size: string; category: LandCategory; tag?: string; imageUrl: string; };

const MOCK_LISTINGS: LandListing[] = [
  { id: 1, title: "Terrain pied dans l’eau à Nosy Be", country: "Madagascar", city: "Nosy Be – Andilana", price: "2500 €", size: "3 200 m²", category: "Résidentiel", tag: "Face à la mer", imageUrl: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 2, title: "Terrain touristique pour écolodge", country: "Madagascar", city: "Nosy Be – Ambatoloaka", price: "5 000 €", size: "5 800 m²", category: "Touristique", tag: "Idéal projet hôtelier", imageUrl: "https://images.pexels.com/photos/325944/pexels-photo-325944.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 3, title: "Terrain pour complexe hôtelier vue 180°", country: "Madagascar", city: "Nosy Be – Mont Passot", price: "6 000 €", size: "1,8 ha", category: "Touristique", tag: "Vue panoramique", imageUrl: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 4, title: "Terrain résidentiel proche plage", country: "Madagascar", city: "Nosy Be – Madirokely", price: "4 000 €", size: "1 050 m²", category: "Résidentiel", imageUrl: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 5, title: "Terrain commercial à nosy be", country: "Madagascar", city: "Antsirabe", price: "3 500 €", size: "2 100 m²", category: "Commercial", imageUrl: "https://images.pexels.com/photos/1427328/pexels-photo-1427328.jpeg?auto=compress&cs=tinysrgb&w=1300" },
  { id: 6, title: "Terrain résidentiel à madirokely", country: "Madagascar", city: "Mahajanga – Ambatondrazaka", price: "3 200 €", size: "1 500 m²", category: "Résidentiel", imageUrl: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { id: 7, title: "Exemple Terrain supplémentaire", country: "Madagascar", city: "Nosy Be – Ambaro", price: "7 500 €", size: "4 000 m²", category: "Touristique", imageUrl: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1500" },
    { id: 8, title: "Exemple Terrain supplémentaire", country: "Madagascar", city: "Nosy Be – Ambaro", price: "7 500 €", size: "4 000 m²", category: "Touristique", imageUrl: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1600" }  // Terrain ajouté pour tester la page 2
];

const ADMIN_CONTACT = { name: "Santoni Folio", phone: "+261 32 29 587 15", email: "globallandimmo@gmail.com", };

const scrollToSection = (id: string) => { 
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); 
};

export default function App() {
  const [lang, setLang] = useState<Language>("fr");
  const [searchQuery, setSearchQuery] = useState(""); 
  const t: TranslationType = translations[lang];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <GradientBackground />
      <Header t={t} currentLang={lang} setLang={setLang} setSearchQuery={setSearchQuery} />
      <Layout>
        <main className="relative z-10 space-y-20 pb-20 pt-10">
          <HeroSection t={t} />
          <StatsSection t={t} />
          <ListingsSection t={t} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <HowItWorksSection t={t} />
          <ContactSection t={t} />
        </main>
        <SiteFooter />
      </Layout>
      <CookieBanner t={t} />
    </div>
  );
}

function Header({ t, currentLang, setLang, setSearchQuery }: { 
  t: TranslationType, 
  currentLang: Language, 
  setLang: (l: Language) => void,
  setSearchQuery: (s: string) => void 
}) {
  return (
    <header className="sticky top-0 z-50 flex items-center border-b border-slate-200/60 bg-white/80 py-4 backdrop-blur-md px-4 sm:px-8">
      <div className="flex items-center gap-3 shrink-0">
        <img src={ter} alt="Logo" className="h-14 w-auto object-contain" />
        <div className="hidden sm:block">
          <p className="text-sm font-black text-slate-900 leading-none tracking-tight">NosyBe Lands</p>
          <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1">Expertise Immobilière</p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center px-4">
        <div className="relative w-full max-w-md group">
          <input
            type="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if(e.target.value.length > 0) scrollToSection('section-terrains');
            }}
            placeholder="Rechercher un terrain, une ville..."
            className="bg-gray-100 px-10 border-2 border-transparent rounded-full py-2.5 w-full 
             focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 
             transition-all duration-300 outline-none text-sm shadow-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3 
            group-focus-within:text-emerald-600 transition-colors" />
        </div>
      </div>

      <nav className="hidden md:flex ml-auto mr-8 gap-8 text-sm font-semibold text-slate-600">
        <button onClick={() => scrollToSection('section-terrains')} className="hover:text-emerald-600 transition">{t.navTerrains}</button>
        <button onClick={() => scrollToSection('section-methode')} className="hover:text-emerald-600 transition">{t.navMethode}</button>
        <button onClick={() => scrollToSection('section-contact')} className="hover:text-emerald-600 transition">{t.navContact}</button>
      </nav>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-full shrink-0">
        {(['fr', 'en', 'it'] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 text-[10px] font-black rounded-full transition-all ${currentLang === l ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-900'}`}>{l.toUpperCase()}</button>
        ))}
      </div>
    </header>
  );
}

function ListingsSection({ t, searchQuery, setSearchQuery }: { 
  t: TranslationType, 
  searchQuery: string, 
  setSearchQuery: (s: string) => void 
}) {
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Revenir à la première page quand on fait une recherche ou qu'on trie
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sort]);

  const filteredAndSortedListings = useMemo(() => {
    let result = [...MOCK_LISTINGS];
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.city.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    return result.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s|€/g, ""));
      const priceB = parseInt(b.price.replace(/\s|€/g, ""));
      return sort === "price-asc" ? priceA - priceB : priceB - priceA;
    });
  }, [sort, searchQuery]);

  // Logique de pagination
  const totalPages = Math.ceil(filteredAndSortedListings.length / ITEMS_PER_PAGE);
  const currentItems = filteredAndSortedListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section id="section-terrains" className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.listingsTitle}</h2>
          <p className="text-slate-500 mt-2">
            {searchQuery ? `Résultats pour "${searchQuery}"` : t.listingsSub}
          </p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button onClick={() => setSort("price-asc")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${sort === "price-asc" ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t.sortAsc.toUpperCase()}</button>
          <button onClick={() => setSort("price-desc")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${sort === "price-desc" ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t.sortDesc.toUpperCase()}</button>
        </div>
      </div>

      {filteredAndSortedListings.length > 0 ? (
        <>
          {/* L'interface reste identique pour la grille ! */}
          <div className="grid gap-8 md:grid-cols-2">
            {currentItems.map((listing) => (
              <article key={listing.id} className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="aspect-video overflow-hidden">
                  <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">{listing.category}</span>
                    <p className="text-xl font-black text-slate-900">{listing.price}</p>
                  </div>
                  <h3 className="text-lg font-bold leading-tight">{listing.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <MapPin size={14} /> {listing.city}
                  </div>
                  <button onClick={() => scrollToSection('section-contact')} className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-emerald-500 transition-colors uppercase tracking-widest">{t.cardBtn}</button>
                </div>
              </article>
            ))}
          </div>

          {/* Boutons de Pagination ajoutés ici */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-12 pt-6 border-t border-slate-100">
              <button 
                disabled={currentPage === 1}
                onClick={() => { setCurrentPage(prev => prev - 1); scrollToSection('section-terrains'); }}
                className="px-6 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 transition-all"
              >
                ← {t.prev}
              </button>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {t.page} {currentPage} / {totalPages}
              </span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => { setCurrentPage(prev => prev + 1); scrollToSection('section-terrains'); }}
                className="px-6 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent hover:bg-slate-50 transition-all"
              >
                {t.next} →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">{t.noResult || "Aucun résultat trouvé."}</p>
          <button onClick={() => setSearchQuery("")} className="mt-4 text-emerald-600 text-sm font-bold">Effacer la recherche</button>
        </div>
      )}
    </section>
  );
}

// --- AUTRES COMPOSANTS ---

function HeroSection({ t }: { t: TranslationType }) {
  return (
    <section className="text-center space-y-8 py-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest">
        <MapPin size={12} /> Nosy Be, Madagascar
      </div>
      <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tighter text-slate-900 sm:text-7xl">
        {t.heroTitle} <br/><span className="text-emerald-500">{t.heroSub}</span>
      </h1>
      <p className="mx-auto max-w-2xl text-slate-500 text-lg leading-relaxed">{t.heroDesc}</p>
      <button onClick={() => scrollToSection('section-terrains')} className="rounded-2xl bg-slate-900 px-10 py-4 text-sm font-bold text-white shadow-2xl hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95">{t.heroBtn}</button>
    </section>
  );
}

function StatsSection({ t }: { t: TranslationType }) {
  const stats = [ { label: t.stats1, value: "120+" }, { label: t.stats2, value: "3 Mds Ar" }, { label: t.stats3, value: "4.9/5" } ];
  return (
    <section className="grid gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center transition-hover hover:bg-white hover:shadow-xl group">
          <p className="text-3xl font-black text-slate-900 group-hover:text-emerald-500 transition-colors">{stat.value}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

function HowItWorksSection({ t }: { t: TranslationType }) {
  return (
    <section id="section-methode" className="rounded-[40px] bg-slate-50 border border-slate-100 p-10 lg:p-16 grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-black tracking-tight leading-none">{t.howItWorksTitle}</h2>
        <p className="text-slate-500 text-lg leading-relaxed">{t.howItWorksDesc}</p>
        <div className="space-y-6">
          <StepItem num="01" title={t.step1Title} desc={t.step1Desc} />
          <StepItem num="02" title={t.step2Title} desc={t.step2Desc} />
          <StepItem num="03" title={t.step3Title} desc={t.step3Desc} />
        </div>
      </div>
      <div className="relative">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-2">
          <img src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Nosy Be" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function ContactSection({ t }: { t: TranslationType }) {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("https://formspree.io/f/xykdlgvp", {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
      setTimeout(() => setStatus("IDLE"), 5000);
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <section id="section-contact" className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-2xl">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">{t.contactTitle}</h2>
          <p className="text-slate-400">{t.contactDesc}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative group">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input name="name" type="text" placeholder={t.formName} required className="w-full rounded-xl bg-white/5 border border-white/10 p-3 pl-10 text-sm outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all" />
              </div>
              <div className="relative group">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input name="email" type="email" placeholder={t.formEmail} required className="w-full rounded-xl bg-white/5 border border-white/10 p-3 pl-10 text-sm outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all" />
              </div>
            </div>
            <div className="relative group">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              <input name="phone" type="tel" placeholder={t.formTel} required className="w-full rounded-xl bg-white/5 border border-white/10 p-3 pl-10 text-sm outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all" />
            </div>
            <textarea name="message" placeholder={t.formMsg} rows={3} required className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all resize-none" />
            <button disabled={status === "SENDING"} className="w-full rounded-xl bg-emerald-500 py-4 font-bold text-slate-900 hover:bg-emerald-400 transition-all disabled:opacity-50 active:scale-[0.98]">
              {status === "SENDING" ? "ENVOI EN COURS..." : t.formBtn}
            </button>
            {status === "SUCCESS" && <p className="text-center text-emerald-400 text-xs font-bold mt-2 animate-pulse">✅ Envoyé !</p>}
          </form>
        </div>

        <div className="flex flex-col justify-between space-y-8 rounded-2xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <CheckCircle2 size={14} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Conseiller disponible</p>
            </div>
            <h3 className="text-2xl font-bold">{ADMIN_CONTACT.name}</h3>
            <p className="text-sm text-slate-400 mt-1">Global Land IMMO — Expertise Nosy Be</p>
          </div>
          <div className="space-y-4">
            <a href={`tel:${ADMIN_CONTACT.phone}`} className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all"><Phone size={20} /></div>
              <div><p className="text-[10px] text-slate-500 uppercase font-bold">WhatsApp / Tel</p><p className="text-sm font-medium">{ADMIN_CONTACT.phone}</p></div>
            </a>
            <a href={`mailto:${ADMIN_CONTACT.email}`} className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-900 transition-all"><Mail size={20} /></div>
              <div><p className="text-[10px] text-slate-500 uppercase font-bold">Email Pro</p><p className="text-sm font-medium">{ADMIN_CONTACT.email}</p></div>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/global.land.immo" target="_blank"><img src={facebook} alt="Facebook" className="h-9 w-auto" /></a>
            <a href="https://www.instagram.com/global.land.immo/" target="_blank"><img src={instagram} alt="Instagram" className="h-9 w-auto" /></a>
            <a href="https://www.linkedin.com/company/global-land-immo-madagascar/" target="_blank"><img src={linkedin} alt="LinkedIn" className="h-9 w-auto" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-6 group">
      <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors leading-none">{num}</span>
      <div><h4 className="font-bold text-slate-900 mb-1">{title}</h4><p className="text-sm text-slate-500">{desc}</p></div>
    </div>
  );
}

function Layout({ children }: { children: ReactNode }) { return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>; }

function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden opacity-50">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-sky-100 blur-[100px]" />
    </div>
  );
}

function SiteFooter() { return <footer className="py-12 border-t border-slate-100 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">© {new Date().getFullYear()} NosyBe Lands — Global Land Immo Madagascar</footer>; }

function CookieBanner({ t }: { t: TranslationType }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const consent = localStorage.getItem("cookie-consent"); if (!consent) setIsVisible(true); }, []);
  const handleConsent = () => { localStorage.setItem("cookie-consent", "accepted"); setIsVisible(false); };
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:w-96">
      <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-white/10 text-white">
        <h3 className="font-bold mb-2">🍪 {t.cookieTitle}</h3>
        <p className="text-[10px] text-slate-400 mb-6">{t.cookieDesc}</p>
        <div className="flex gap-3">
          <button onClick={() => setIsVisible(false)} className="flex-1 text-[10px] font-bold text-slate-500 hover:text-white transition">{t.cookieDecline.toUpperCase()}</button>
          <button onClick={handleConsent} className="flex-1 bg-emerald-500 py-2 rounded-lg text-slate-900 text-[10px] font-bold hover:bg-emerald-400 transition">{t.cookieAccept.toUpperCase()}</button>
        </div>
      </div>
    </div>
  );
}