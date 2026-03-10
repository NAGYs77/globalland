import type { ReactNode } from "react";
import { useMemo, useState, useEffect } from "react";
import { Search, Mail, Phone, MapPin, X, ArrowRight } from 'lucide-react';

// --- ASSETS LOGO & SOCIAUX ---
import ter from './assets/ter.jpg';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import linkedin from './assets/linkedin.png';

// --- IMPORT DES IMAGES TERRAINS ---
import img1 from './assets/1.png';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.png';
import img6 from './assets/6.png';
import img7 from './assets/7.jpg';
import img17 from './assets/17.png';
import img19 from './assets/19.png';
import img20 from './assets/20.png';

const ITEMS_PER_PAGE = 6; 

const translations = {
  fr: {
    navTerrains: "Terrains", navMethode: "Méthode", navContact: "Contact",
    heroTitle: "Trouvez le terrain et maison idéal,", heroSub: "sans perdre de temps.",
    heroDesc: "Accompagnement clé en main pour l'acquisition de terrains sécurisés à Nosy Be. Pour investisseurs, hôteliers et particuliers.",
    heroBtn: "Voir les opportunités", stats1: "Terrains à Nosy Be", stats2: "Volume traité", stats3: "Satisfaction",
    listingsTitle: "Opportunités à la une", listingsSub: "Terrains vérifiés et prêts pour signature",
    sortAsc: "Prix croissant", sortDesc: "Prix décroissant", cardBtn: "Détails & Fiche",
    contactTitle: "Parlons de votre projet.", contactDesc: "Échangez avec un expert basé à Nosy Be pour obtenir des pistes concrètes en 24h.",
    formName: "Nom complet", formEmail: "Email", formTel: "Téléphone / WhatsApp", formMsg: "Votre projet...", formBtn: "Envoyer ma demande",
    howItWorksTitle: "Une expérience pensée pour Nosy Be.", howItWorksDesc: "Tout est centralisé avec une équipe locale qui connaît parfaitement les spécificités de Madagascar.",
    step1Title: "Stratégie foncière", step1Desc: "Budget, localisation et usage (villa, hôtel, resort).",
    step2Title: "Sélection ciblée", step2Desc: "Pré-qualification juridique et analyse du potentiel.",
    step3Title: "Acquisition", step3Desc: "Accompagnement notarial et sécurisation de l'acte.",
    cookieTitle: "Un petit cookie pour la route ?", cookieDesc: "Ce site enregistre des cookies pour vous offrir la meilleure expérience de navigation possible.",
    cookieChoice: "Je choisis", cookieDecline: "Non merci", cookieAccept: "OK pour moi",
    noResult: "Aucun terrain ne correspond à votre recherche.",
    prev: "Précédent", next: "Suivant", page: "Page",
    searchPlaceholder: "Rechercher...",
    searchResult: "Résultats pour",
    clearSearch: "Effacer la recherche",
    sending: "ENVOI EN COURS...",
    success: "Message envoyé !",
    advisorAvailable: "Conseiller disponible",
    expertise: "Expertise Immobilière",
    footerCredit: "NAGY Consulting",
    close: "Fermer",
    desc1: "La plus belle vue d'Andilana, accessible de Cap doré et Royal Andilana, accès plage. Terrain titré et borné avec livre foncier.",
    desc2: "Bâtiment commercial au bord de route, situé à côté de Jovena.",
    desc3: "Titré et borné sur Nosy Faly, 2 plages privées. Idéal pour éco-resort ou résidences de prestige.",
    desc4: "Belle opportunité à Torolava Darsalama, idéal pour stationner 5 bateaux, bord de mer. Papiers en règle.",
    desc5: "Vue mer imprenable, 2 plages de sable blanc. Terrain titré et sécurisé – Prêt à investir.",
    desc6: "Terrain résidentiel, commercial et touristique.",
    desc7: "Maison 4 chambres, suite parentale, grand living, piscine à débordement et vue mer.",
    desc8: "Terrain exceptionnel à Nosy Faly.",
    desc9: "Titré et borné sur Nosy Faly, cadre naturel exceptionnel pour complexe hôtelier.",
    desc10: "05 ha exploitables – Vue mer imprenable, plage de sable blanc et eaux turquoise."
  },
  en: {
    navTerrains: "Plots", navMethode: "Method", navContact: "Contact",
    heroTitle: "Find the perfect plot and house,", heroSub: "without wasting time.",
    heroDesc: "Turnkey support for the acquisition of secured land in Nosy Be. For investors, hoteliers and individuals.",
    heroBtn: "View opportunities", stats1: "Plots in Nosy Be", stats2: "Processed volume", stats3: "Satisfaction",
    listingsTitle: "Featured opportunities", listingsSub: "Verified plots ready for signature",
    sortAsc: "Lowest price", sortDesc: "Highest price", cardBtn: "Details & File",
    contactTitle: "Let's talk about your project.", contactDesc: "Talk with an expert based in Nosy Be to get concrete ideas within 24 hours.",
    formName: "Full name", formEmail: "Email", formTel: "Phone / WhatsApp", formMsg: "Your project...", formBtn: "Send Inquiry",
    howItWorksTitle: "An experience designed for Nosy Be.", howItWorksDesc: "Everything is centralized with a local team that knows the specificities of Madagascar.",
    step1Title: "Land Strategy", step1Desc: "Budget, location and usage (villa, hotel, resort).",
    step2Title: "Targeted selection", step2Desc: "Legal pre-qualification and potential analysis.",
    step3Title: "Acquisition", step3Desc: "Notary support and securing the deed.",
    cookieTitle: "A little cookie for the road?", cookieDesc: "This site uses cookies to offer you the best possible browsing experience.",
    cookieChoice: "I choose", cookieDecline: "No thanks", cookieAccept: "OK for me",
    noResult: "No plots match your search.",
    prev: "Previous", next: "Next", page: "Page",
    searchPlaceholder: "Search...",
    searchResult: "Results for",
    clearSearch: "Clear search",
    sending: "SENDING...",
    success: "Message sent!",
    advisorAvailable: "Advisor available",
    expertise: "Real Estate Expertise",
    footerCredit: "NAGY Consulting",
    close: "Close",
    desc1: "The most beautiful view of Andilana, beach access. Titled and bounded plot with land book.",
    desc2: "Commercial building on the roadside, located next to Jovena.",
    desc3: "Titled and bounded on Nosy Faly, 2 private beaches. Ideal for eco-resort or prestige residences.",
    desc4: "Great opportunity in Torolava Darsalama, ideal for 5 boats, seaside. Papers in order.",
    desc5: "Breathtaking sea view, 2 white sand beaches. Titled and secured land – Ready to invest.",
    desc6: "Residential, commercial and tourist land.",
    desc7: "4 bedroom house, master suite, large living room, infinity pool and sea view.",
    desc8: "Exceptional land in Nosy Faly.",
    desc9: "Titled and bounded on Nosy Faly, exceptional natural setting for hotel complex.",
    desc10: "05 ha exploitable – Breathtaking sea view, white sand beach and turquoise waters."
  },
  it: {
    navTerrains: "Terreni", navMethode: "Metodo", navContact: "Contatto",
    heroTitle: "Trova il terreno e la casa ideale,", heroSub: "senza perdere tempo.",
    heroDesc: "Supporto chiavi in mano per l'acquisto di terreni sicuri a Nosy Be. Per investitori, albergatori e privati.",
    heroBtn: "Vedi le opportunità", stats1: "Terreni a Nosy Be", stats2: "Volume trattato", stats3: "Soddisfazione",
    listingsTitle: "Opportunità in primo piano", listingsSub: "Terreni verificati e pronti per la firma",
    sortAsc: "Prezzo crescente", sortDesc: "Prezzo decrescente", cardBtn: "Détails & Scheda",
    contactTitle: "Parliamo del tuo progetto.", contactDesc: "Parla con un esperto a Nosy Be pour ottenere piste concrete in 24 ore.",
    formName: "Nome completo", formEmail: "Email", formTel: "Telefono / WhatsApp", formMsg: "Il tuo progetto...", formBtn: "Invia la mia richiesta",
    howItWorksTitle: "Un'esperienza pensata per Nosy Be.", howItWorksDesc: "Tutto è centralizzato con un team locale che conosce perfettamente le specificità del Madagascar.",
    step1Title: "Strategia fondiaria", step1Desc: "Budget, ubicazione e utilizzo (villa, hotel, resort).",
    step2Title: "Selezione mirata", step2Desc: "Pre-qualificazione legale e analisi del potenziale.",
    step3Title: "Acquisizione", step3Desc: "Supporto notarile e messa in sicurezza dell'atto.",
    cookieTitle: "Un piccolo cookie per la strada?", cookieDesc: "Questo sito utilizza i cookie per offrirti la migliore esperienza di navigazione possibile.",
    cookieChoice: "Scelgo", cookieDecline: "No grazie", cookieAccept: "OK per me",
    noResult: "Nessun terreno corrisponde alla tua ricerca.",
    prev: "Precedente", next: "Successivo", page: "Pagina",
    searchPlaceholder: "Cerca...",
    searchResult: "Risultati per",
    clearSearch: "Cancella la ricerca",
    sending: "INVIO IN CORSO...",
    success: "Messaggio inviato!",
    advisorAvailable: "Consulente disponible",
    expertise: "Expertise Immobiliare",
    footerCredit: "NAGY Consulting",
    close: "Chiudi",
    desc1: "La vista più bella di Andilana, accesso alla spiaggia. Terreno titolato e delimitato.",
    desc2: "Edificio commerciale a bordo strada, situato vicino a Jovena.",
    desc3: "Titolato e delimitato su Nosy Faly, 2 spiagge private. Idale per eco-resort.",
    desc4: "Bella opportunità a Torolava Darsalama, ideale per 5 barche, fronte mare. Documenti in regola.",
    desc5: "Vista mare mozzafiato, 2 spiagge di sabbia bianca. Terreno titolato e sicuro.",
    desc6: "Terreno residenziale, commerciale e turistico.",
    desc7: "Casa con 4 camere da letto, suite padronale, piscina a sfioro e vista mare.",
    desc8: "Terreno eccezionale a Nosy Faly.",
    desc9: "Titolato e delimitato su Nosy Faly, scenario naturale eccezionale.",
    desc10: "05 ha sfruttabili – Vista mare mozzafiato, spiaggia di sabbia bianca e acque turchesi."
  }
};

type Language = "fr" | "en" | "it";
type TranslationType = typeof translations.fr;
type LandCategory = "Résidentiel" | "Commercial" | "Touristique";
type LandListing = { id: number; titleKey: keyof TranslationType; country: string; city: string; price: string; size: string; category: LandCategory; tag?: string; imageUrl: string; };

const MOCK_LISTINGS: LandListing[] = [
  { id: 1, titleKey: "desc1", country: "Madagascar", city: "Nosy Be – Andilana", price: "60€/m²", size: "3 200 m²", category: "Résidentiel", tag: "Face à la mer", imageUrl: img1 },
  { id: 2, titleKey: "desc2", country: "Madagascar", city: "Nosy Be – Ambatoloaka", price: "500 000€", size: "5 800 m²", category: "Touristique", tag: "Idéal projet hôtelier", imageUrl: img2 },
  { id: 3, titleKey: "desc3", country: "Madagascar", city: "Nosy Be – Nosy Faly", price: "10€ / m²", size: "60 hectares ", category: "Touristique", tag: "Vue panoramique", imageUrl: img3 },
  { id: 4, titleKey: "desc4", country: "Madagascar", city: "Nosy Be – torolava Darsalama", price: "45 000€", size: "1700m²", category: "Résidentiel", imageUrl: img4 },
  { id: 5, titleKey: "desc5", country: "Madagascar", city: "Hell-Ville", price: "10€ / m²", size: "60 hectares ", category: "Commercial", imageUrl: img5 },
  { id: 6, titleKey: "desc6", country: "Madagascar", city: "Nosy Be – Nosy Faly", price: "3 200 €", size: "5 hectares ", category: "Résidentiel", imageUrl: img6 },
  { id: 7, titleKey: "desc7", country: "Madagascar", city: "Nosy Be – Ambaro", price: "800 000€", size: "4 000 m²", category: "Touristique", imageUrl: img7 },
  { id: 8, titleKey: "desc8", country: "Madagascar", city: "Nosy Be – Nosy Faly", price: "8 200 €", size: "5 hectares ", category: "Résidentiel", imageUrl: img17 },
  { id: 9, titleKey: "desc9", country: "Madagascar", city: "Nosy Be – Nosy Faly", price: "10€ / m²", size: "05 hectares ", category: "Touristique", imageUrl: img19 },
  { id: 10, titleKey: "desc10", country: "Madagascar", city: "Nosy Be – Nosy Faly", price: "10€ / m²", size: "05 hectares ", category: "Résidentiel", imageUrl: img20 }
];

const ADMIN_CONTACT = { name: "Santoni Folio", phone: "+261 32 29 587 15", email: "globallandimmo@gmail.com", };

const scrollToSection = (id: string) => { 
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); 
};

const openGoogleMaps = (city: string, country: string) => {
  const query = encodeURIComponent(`${city}, ${country}`);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  window.open(url, '_blank');
};

export default function App() {
  const [lang, setLang] = useState<Language>("fr");
  const [searchQuery, setSearchQuery] = useState(""); 
  const t: TranslationType = translations[lang];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <GradientBackground />
      <Header t={t} currentLang={lang} setLang={setLang} onSearch={setSearchQuery} />
      <Layout>
        <main className="relative z-10 space-y-20 pb-20 pt-10">
          <HeroSection t={t} />
          <StatsSection t={t} />
          <ListingsSection t={t} searchQuery={searchQuery} onClear={() => setSearchQuery("")} />
          <HowItWorksSection t={t} />
          <ContactSection t={t} />
        </main>
        <SiteFooter t={t} />
      </Layout>
      <CookieBanner t={t} />
    </div>
  );
}

// --- COMPONENTS ---

function DetailModal({ listing, t, onClose }: { listing: LandListing, t: TranslationType, onClose: () => void }) {
  return (
    <div 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
    >
      <div className="bg-white rounded-[2.5rem] overflow-hidden max-w-lg w-full shadow-2xl flex flex-col">
        <div className="relative h-64 sm:h-80">
          <img src={listing.imageUrl} alt="" className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-5 right-5 bg-white/20 backdrop-blur-xl text-white p-2.5 rounded-full border border-white/20 hover:bg-white/40"><X size={20} /></button>
          <div className="absolute bottom-5 left-5">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest">{listing.category}</span>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">{t[listing.titleKey] as string}</h3>
            <div onClick={() => openGoogleMaps(listing.city, listing.country)} className="flex items-center gap-2 text-emerald-600 font-bold cursor-pointer hover:underline">
              <MapPin size={16} /> <span className="text-sm">{listing.city}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
            <div><p className="text-[10px] text-slate-400 font-bold uppercase">Surface</p><p className="text-lg font-black">{listing.size}</p></div>
            <div className="text-right"><p className="text-[10px] text-slate-400 font-bold uppercase">Prix</p><p className="text-lg font-black text-emerald-600">{listing.price}</p></div>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl border text-slate-500 font-bold text-xs uppercase">{t.close}</button>
            <button onClick={() => { onClose(); scrollToSection('section-contact'); }} className="flex-[2] py-4 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase hover:bg-emerald-600">Réserver</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ t, currentLang, setLang, onSearch }: { 
  t: TranslationType, 
  currentLang: Language, 
  setLang: (l: Language) => void,
  onSearch: (s: string) => void 
}) {
  return (
    <header className="sticky top-0 z-50 flex items-center border-b border-slate-200/60 bg-white/80 py-1 backdrop-blur-md px-4 sm:px-8">
      <div className="flex items-center gap-3 shrink-0">
        <img src={ter} alt="Logo" className="h-14 w-auto object-contain" />
        <div className="hidden sm:block"><p className="text-sm font-black leading-none">NosyBe Lands</p><p className="text-[9px] text-emerald-600 font-bold uppercase mt-1">{t.expertise}</p></div>
      </div>
      <div className="hidden lg:flex flex-1 justify-center px-4">
        <div className="relative w-full max-w-[400px] group transition-all duration-300 focus-within:max-w-[400px]">
          <input
            type="text"
            onChange={(e) => { onSearch(e.target.value); if(e.target.value.length > 0) scrollToSection('section-terrains'); }}
            placeholder={t.searchPlaceholder}
            className="bg-gray-100 px-10 border-2 border-transparent rounded-full py-2 w-full focus:bg-white focus:border-emerald-400 transition-all outline-none text-[11px]"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-4 top-2.5" />
        </div>
      </div>
      <nav className="hidden md:flex ml-auto mr-8 gap-8 text-sm font-semibold text-slate-600">
        <button onClick={() => scrollToSection('section-terrains')} className="hover:text-emerald-600">{t.navTerrains}</button>
        <button onClick={() => scrollToSection('section-methode')} className="hover:text-emerald-600">{t.navMethode}</button>
        <button onClick={() => scrollToSection('section-contact')} className="hover:text-emerald-600">{t.navContact}</button>
      </nav>
      <div className="flex gap-1 bg-slate-100 p-1 rounded-full shrink-0">
        {(['fr', 'en', 'it'] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 text-[10px] font-black rounded-full ${currentLang === l ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}>{l.toUpperCase()}</button>
        ))}
      </div>
    </header>
  );
}

function ListingsSection({ t, searchQuery, onClear }: { t: TranslationType, searchQuery: string, onClear: () => void }) {
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedListing, setSelectedListing] = useState<LandListing | null>(null);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, sort]);

  const filteredAndSortedListings = useMemo(() => {
    let result = [...MOCK_LISTINGS];
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => (t[item.titleKey] as string).toLowerCase().includes(query) || item.city.toLowerCase().includes(query));
    }
    return result.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s|€/g, "")) || 0;
      const priceB = parseInt(b.price.replace(/\s|€/g, "")) || 0;
      return sort === "price-asc" ? priceA - priceB : priceB - priceA;
    });
  }, [sort, searchQuery, t]);

  const totalPages = Math.ceil(filteredAndSortedListings.length / ITEMS_PER_PAGE);
  const currentItems = filteredAndSortedListings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section id="section-terrains" className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div><h2 className="text-3xl font-black">{t.listingsTitle}</h2><p className="text-slate-500 mt-2">{searchQuery ? `${t.searchResult} "${searchQuery}"` : t.listingsSub}</p></div>
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button onClick={() => setSort("price-asc")} className={`px-4 py-2 text-[10px] font-bold rounded-lg ${sort === "price-asc" ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>{t.sortAsc.toUpperCase()}</button>
          <button onClick={() => setSort("price-desc")} className={`px-4 py-2 text-[10px] font-bold rounded-lg ${sort === "price-desc" ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>{t.sortDesc.toUpperCase()}</button>
        </div>
      </div>

      {filteredAndSortedListings.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((listing) => (
            <article key={listing.id} className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden"><img src={listing.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
              <div className="p-7 space-y-4">
                <div className="flex justify-between items-start"><span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{listing.category}</span><p className="text-lg font-black">{listing.price}</p></div>
                <h3 className="text-md font-bold leading-tight h-10 line-clamp-2">{t[listing.titleKey] as string}</h3>
                <div onClick={() => openGoogleMaps(listing.city, listing.country)} className="flex items-center gap-2 text-slate-400 text-xs font-semibold cursor-pointer hover:text-emerald-600"><MapPin size={14} className="text-emerald-500" /> {listing.city}</div>
                <button onClick={() => setSelectedListing(listing)} className="w-full py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase hover:bg-emerald-500 tracking-widest">{t.cardBtn}</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500">{t.noResult}</p>
          <button onClick={onClear} className="mt-4 text-emerald-600 font-bold text-sm uppercase">{t.clearSearch}</button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12 pt-6 border-t">
          <button disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => prev - 1); scrollToSection('section-terrains'); }} className="px-6 py-2 rounded-xl border text-sm font-bold disabled:opacity-30">← {t.prev}</button>
          <span className="text-xs font-black text-slate-400 uppercase">{t.page} {currentPage} / {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => { setCurrentPage(prev => prev + 1); scrollToSection('section-terrains'); }} className="px-6 py-2 rounded-xl border text-sm font-bold disabled:opacity-30">{t.next} →</button>
        </div>
      )}
      {selectedListing && <DetailModal listing={selectedListing} t={t} onClose={() => setSelectedListing(null)} />}
    </section>
  );
}

function HeroSection({ t }: { t: TranslationType }) {
  return (
    <section className="text-center space-y-8 py-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest"><MapPin size={12} /> Nosy Be, Madagascar</div>
      <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tighter sm:text-7xl">{t.heroTitle} <br/><span className="text-emerald-500">{t.heroSub}</span></h1>
      <p className="mx-auto max-w-2xl text-slate-500 text-lg leading-relaxed">{t.heroDesc}</p>
      <button onClick={() => scrollToSection('section-terrains')} className="rounded-2xl bg-slate-900 px-10 py-4 text-sm font-bold text-white shadow-2xl hover:bg-emerald-600 transition-all">{t.heroBtn}</button>
    </section>
  );
}

function StatsSection({ t }: { t: TranslationType }) {
  const stats = [ { label: t.stats1, value: "120+" }, { label: t.stats2, value: "3 Mds Ar" }, { label: t.stats3, value: "4.9/5" } ];
  return (
    <section className="grid gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center hover:bg-white transition-all"><p className="text-4xl font-black">{stat.value}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p></div>
      ))}
    </section>
  );
}

function HowItWorksSection({ t }: { t: TranslationType }) {
  return (
    <section id="section-methode" className="rounded-[3rem] bg-slate-50 border border-slate-100 p-10 lg:p-16 grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-black tracking-tight">{t.howItWorksTitle}</h2>
        <div className="space-y-6">
          <StepItem num="01" title={t.step1Title} desc={t.step1Desc} />
          <StepItem num="02" title={t.step2Title} desc={t.step2Desc} />
          <StepItem num="03" title={t.step3Title} desc={t.step3Desc} />
        </div>
      </div>
      <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2"><img src={img20} alt="" className="w-full h-full object-cover" /></div>
    </section>
  );
}

function ContactSection({ t }: { t: TranslationType }) {
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("SENDING");
      
      const formData = new FormData(e.currentTarget);
      const response = await fetch("https://formspree.io/f/xykdlgvp", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
  
      if (response.ok) {
        setStatus("SUCCESS");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("IDLE"), 5000);
      } else {
        setStatus("ERROR");
      }
    };
  
    return (
      <section id="section-contact" className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 grid gap-0 lg:grid-cols-2">
          {/* Form Side */}
          <div className="p-8 lg:p-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tight">{t.contactTitle}</h2>
              <p className="text-slate-400 text-lg leading-relaxed">{t.contactDesc}</p>
            </div>
  
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="name" type="text" placeholder={t.formName} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm focus:border-emerald-500 focus:bg-white/10 transition-all outline-none" />
                <input name="phone" type="tel" placeholder={t.formTel} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm focus:border-emerald-500 focus:bg-white/10 transition-all outline-none" />
              </div>
              <input name="email" type="email" placeholder={t.formEmail} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm focus:border-emerald-500 focus:bg-white/10 transition-all outline-none" />
              <textarea name="message" placeholder={t.formMsg} rows={4} required className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm focus:border-emerald-500 focus:bg-white/10 transition-all outline-none resize-none" />
              
              <button disabled={status === "SENDING"} className="group relative flex items-center justify-center gap-3 w-full rounded-2xl bg-emerald-500 py-5 font-black text-slate-900 uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all overflow-hidden">
                {status === "SENDING" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                    {t.sending}
                  </span>
                ) : (
                  <>
                    {t.formBtn}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
  
              {status === "SUCCESS" && <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center font-bold animate-pulse">✅ {t.success}</div>}
            </form>
          </div>
  
          {/* Contact Info Side */}
          <div className="bg-white/5 border-l border-white/10 p-8 lg:p-16 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                {t.advisorAvailable}
              </div>
              
              <div>
                <h3 className="text-4xl font-black">{ADMIN_CONTACT.name}</h3>
                <p className="text-emerald-500 font-bold mt-2 uppercase tracking-tighter">Expert Foncier & Immobilier</p>
              </div>
  
              <div className="space-y-6">
                <a href={`tel:${ADMIN_CONTACT.phone}`} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase">WhatsApp / Tel</p>
                    <p className="text-lg font-bold">{ADMIN_CONTACT.phone}</p>
                  </div>
                </a>
  
                <a href={`mailto:${ADMIN_CONTACT.email}`} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase">Email Pro</p>
                    <p className="text-lg font-bold">{ADMIN_CONTACT.email}</p>
                  </div>
                </a>
              </div>
            </div>
  
            <div className="pt-12 mt-12 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-4">
                <a href="#" className="hover:scale-110 transition-transform"><img src={facebook} alt="FB" className="h-8 " /></a>
                <a href="#" className="hover:scale-110 transition-transform"><img src={instagram} alt="IG" className="h-8 " /></a>
                <a href="#" className="hover:scale-110 transition-transform"><img src={linkedin} alt="IN" className="h-8 " /></a>
              </div>
              <img src={ter} alt="Logo" className="h-10 " />
            </div>
          </div>
        </div>
      </section>
    );
}

function StepItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-6 group">
      <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 leading-none">{num}</span>
      <div><h4 className="font-bold text-slate-900 mb-1">{title}</h4><p className="text-sm text-slate-500">{desc}</p></div>
    </div>
  );
}

function Layout({ children }: { children: ReactNode }) { return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>; }

function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-50">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-sky-100 blur-[100px]" />
    </div>
  );
}

function SiteFooter({ t }: { t: TranslationType }) { return <footer className="py-12 border-t text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">© {new Date().getFullYear()} NosyBe Global Land Immo | {t.footerCredit}</footer>; }

function CookieBanner({ t }: { t: TranslationType }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem("cookie-consent")) setIsVisible(true); }, []);
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:w-96">
      <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl text-white">
        <h3 className="font-bold mb-2">🍪 {t.cookieTitle}</h3>
        <p className="text-[10px] text-slate-400 mb-6">{t.cookieDesc}</p>
        <div className="flex gap-3">
          <button onClick={() => setIsVisible(false)} className="flex-1 text-[10px] font-bold text-slate-500">{t.cookieDecline.toUpperCase()}</button>
          <button onClick={() => { localStorage.setItem("cookie-consent", "accepted"); setIsVisible(false); }} className="flex-1 bg-emerald-500 py-2 rounded-lg text-slate-900 text-[10px] font-bold">{t.cookieAccept.toUpperCase()}</button>
        </div>
      </div>
    </div>
  );
}