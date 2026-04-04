import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MapPin } from 'lucide-react';

// --- IMPORTS DES COMPOSANTS ---
import { Navbar } from "./components/Navbar";
import { TerrainsPage } from "./components/TerrainsPage";
import { MethodePage } from "./components/MethodePage";
import { ContactPage } from "./components/ContactPage";
import { SiteFooter } from "./components/SiteFooter";
import { CookieBanner } from "./components/CookieBanner";

// --- TYPES & TRANSLATIONS ---
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
    searchPlaceholder: "Rechercher...", searchResult: "Résultats pour", clearSearch: "Effacer la recherche",
    sending: "ENVOI EN COURS...", success: "Message envoyé !",
    advisorAvailable: "Conseiller disponible", expertise: "Expertise Immobilière",
    footerCredit: "NAGY Consulting", close: "Fermer",
    // Ajout des descriptions pour les listes
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
    searchPlaceholder: "Search...", searchResult: "Results for", clearSearch: "Clear search",
    sending: "SENDING...", success: "Message sent!",
    advisorAvailable: "Advisor available", expertise: "Real Estate Expertise",
    footerCredit: "NAGY Consulting", close: "Close",
    desc1: "The most beautiful view of Andilana, beach access. Titled and bounded plot with land book.",
    desc2: "Commercial building on the roadside, located next to Jovena.",
    desc3: "Titled and bounded on Nosy Faly, 2 private beaches. Ideal for eco-resort.",
    desc4: "Great opportunity in Torolava Darsalama, seaside. Papers in order.",
    desc5: "Breathtaking sea view, 2 white sand beaches. Titled and secured land.",
    desc6: "Residential, commercial and tourist land.",
    desc7: "4 bedroom house, master suite, infinity pool and sea view.",
    desc8: "Exceptional land in Nosy Faly.",
    desc9: "Titled and bounded on Nosy Faly, exceptional natural setting.",
    desc10: "05 ha exploitable – Breathtaking sea view and turquoise waters."
  },
  it: {
    navTerrains: "Terreni", navMethode: "Metodo", navContact: "Contatto",
    heroTitle: "Trova il terreno e la casa ideale,", heroSub: "senza perdere tempo.",
    heroDesc: "Supporto chiavi in mano per l'acquisto di terreni sicuri a Nosy Be.",
    heroBtn: "Vedi le opportunità", stats1: "Terreni a Nosy Be", stats2: "Volume trattato", stats3: "Soddisfazione",
    listingsTitle: "Opportunità in primo piano", listingsSub: "Terreni verificati e pronti per la firma",
    sortAsc: "Prezzo crescente", sortDesc: "Prezzo decrescente", cardBtn: "Détails & Scheda",
    contactTitle: "Parliamo del tuo progetto.", contactDesc: "Parla con un esperto a Nosy Be per piste concrete in 24 ore.",
    formName: "Nome completo", formEmail: "Email", formTel: "Telefono / WhatsApp", formMsg: "Il tuo progetto...", formBtn: "Invia la mia richiesta",
    howItWorksTitle: "Un'esperienza pensata per Nosy Be.", howItWorksDesc: "Team locale che conosce perfettamente le specificità del Madagascar.",
    step1Title: "Strategia fondiaria", step1Desc: "Budget, ubicazione e utilizzo.",
    step2Title: "Selezione mirata", step2Desc: "Pre-qualificazione legale e analisi.",
    step3Title: "Acquisizione", step3Desc: "Supporto notarile e sicurezza.",
    cookieTitle: "Un piccolo cookie ?", cookieDesc: "Questo sito utilizza i cookie per la migliore esperienza.",
    cookieChoice: "Scelgo", cookieDecline: "No grazie", cookieAccept: "OK per me",
    noResult: "Nessun terreno corrisponde.",
    prev: "Precedente", next: "Successivo", page: "Pagina",
    searchPlaceholder: "Cerca...", searchResult: "Risultati per", clearSearch: "Cancella la ricerca",
    sending: "INVIO...", success: "Inviato!",
    advisorAvailable: "Consulente disponible", expertise: "Expertise Immobiliare",
    footerCredit: "NAGY Consulting", close: "Chiudi",
    desc1: "La vista più bella di Andilana, accesso alla spiaggia. Terreno titolato.",
    desc2: "Edificio commerciale a bordo strada, vicino a Jovena.",
    desc3: "Titolato e delimitato su Nosy Faly, 2 spiagge private.",
    desc4: "Bella opportunità a Torolava Darsalama, fronte mare.",
    desc5: "Vista mare mozzafiato, 2 spiagge di sabbia bianca.",
    desc6: "Terreno residenziale, commerciale e turistico.",
    desc7: "Casa con 4 camere, suite padronale, piscina a sfioro.",
    desc8: "Terreno eccezionale a Nosy Faly.",
    desc9: "Titolato e delimitato su Nosy Faly, scenario naturale.",
    desc10: "05 ha sfruttabili – Vista mare mozzafiato e acque turchesi."
  }
};

export type Language = "fr" | "en" | "it";
export type TranslationType = typeof translations.fr;

// --- COMPOSANTS INTERNES ---

function HeroSection({ t }: { t: TranslationType }) {
  return (
    <section className="text-center space-y-8 py-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest">
        <MapPin size={12} /> Nosy Be, Madagascar
      </div>
      <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tighter sm:text-7xl">
        {t.heroTitle} <br/>
        <span className="text-emerald-500">{t.heroSub}</span>
      </h1>
      <p className="mx-auto max-w-2xl text-slate-500 text-lg leading-relaxed">
        {t.heroDesc}
      </p>
      <button className="rounded-2xl bg-slate-900 px-10 py-4 text-sm font-bold text-white shadow-2xl hover:bg-emerald-600 transition-all">
        {t.heroBtn}
      </button>
    </section>
  );
}

function StatsSection({ t }: { t: TranslationType }) {
  const stats = [ 
    { label: t.stats1, value: "120+" }, 
    { label: t.stats2, value: "3 Mds Ar" }, 
    { label: t.stats3, value: "4.9/5" } 
  ];
  return (
    <section className="grid gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center hover:bg-white transition-all">
          <p className="text-4xl font-black">{stat.value}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-50">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-sky-100 blur-[100px]" />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>("fr");
  const [searchQuery, setSearchQuery] = useState("");
  const t = translations[lang];

  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <GradientBackground />
        
        <Navbar t={t} currentLang={lang} setLang={setLang} onSearch={setSearchQuery} />
        
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-20 pb-20 pt-10">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection t={t} />
                <StatsSection t={t} />
              </>
            } />
            <Route path="/terrains" element={
              <TerrainsPage t={t} searchQuery={searchQuery} onClear={() => setSearchQuery("")} />
            } />
            <Route path="/methode" element={
              <MethodePage t={t} />
            } />
            <Route path="/contact" element={
              <ContactPage t={t} />
            } />
          </Routes>
        </main>

        <SiteFooter t={t} />
        <CookieBanner t={t} />
      </div>
    </Router>
  );
}