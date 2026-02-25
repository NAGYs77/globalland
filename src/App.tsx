import type { ReactNode } from "react";
import { useMemo, useState, useEffect} from "react";
import ter from './assets/ter.jpg';
import facebook from'./assets/facebook.png';
import instagram from'./assets/instagram.png';
import linkedin from './assets/linkedin.png';



//  TRADUCTIONS 
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
    step1Title: "Stratégie foncière", step1Desc: "Budget, localisation et usage (villa, hôtel, resort).",
    step2Title: "Sélection ciblée", step2Desc: "Pré-qualification juridique et analyse du potentiel.",
    step3Title: "Acquisition", step3Desc: "Accompagnement notarial et sécurisation de l'acte.",
    cookieTitle: "Un petit cookie pour la route ?", cookieDesc: "Ce site enregistre des cookies pour vous offrir la meilleure expérience de navigation possible.",
    cookieChoice: "Je choisis", cookieDecline: "Non merci", cookieAccept: "OK pour moi",
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
  },
  it: {
    navTerrains: "Terreni", navMethode: "Metodo", navContact: "Contatto",
    heroTitle: "Trova il terreno ideale,", heroSub: "senza perdere tempo.",
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
    cookieTitle: "Un piccolo cookie per la strada?", cookieDesc: "Questo sito registra i cookie per offrirti la migliore esperienza di navigazione possible.",
    cookieChoice: "Scelgo", cookieDecline: "No grazie", cookieAccept: "OK per me",
  }
};

type Language = "fr" | "en" | "it";
type TranslationType = typeof translations.fr;
type LandCategory = "Résidentiel" | "Commercial" | "Touristique";
type Country = "Madagascar";
type LandListing = { id: number; title: string; country: Country; city: string; price: string; size: string; category: LandCategory; tag?: string; imageUrl: string; };

const MOCK_LISTINGS: LandListing[] = [
  { id: 1, title: "Terrain pied dans l’eau à Nosy Be", country: "Madagascar", city: "Nosy Be – Andilana", price: "2500 €", size: "3 200 m²", category: "Résidentiel", tag: "Face à la mer", imageUrl: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 2, title: "Terrain touristique pour écolodge", country: "Madagascar", city: "Nosy Be – Ambatoloaka", price: "5 000 €", size: "5 800 m²", category: "Touristique", tag: "Idéal projet hôtelier", imageUrl: "https://images.pexels.com/photos/325944/pexels-photo-325944.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 3, title: "Terrain pour complexe hôtelier vue 180°", country: "Madagascar", city: "Nosy Be – Mont Passot", price: "6 000 €", size: "1,8 ha", category: "Touristique", tag: "Vue panoramique", imageUrl: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 4, title: "Terrain résidentiel proche plage", country: "Madagascar", city: "Nosy Be – Madirokely", price: "4 000 €", size: "1 050 m²", category: "Résidentiel", imageUrl: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 5, title: "Terrain résidentiel proche plage", country: "Madagascar", city: "Nosy Be – Madirokely", price: "5 500 €", size: "1 050 m²", category: "Résidentiel", imageUrl: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { id: 6, title: "Terrain résidentiel proche plage", country: "Madagascar", city: "Nosy Be – Madirokely", price: "6 500 €", size: "1 050 m²", category: "Résidentiel", imageUrl: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

const ADMIN_CONTACT = { name: "Santoni Folio", phone: "+261 32 29 587 15", email: "globallandimmo@gmail.com", };

export default function App() {
  const [lang, setLang] = useState<Language>("fr");
  const t: TranslationType = translations[lang];

  return (
    <div className="min-h-screen bg-white text-slate-900 ">
      <GradientBackground />
      <Header t={t} currentLang={lang} setLang={setLang} />
      <Layout>
        <main className="relative z-10 space-y-16 pb-20 pt-10 lg:pt-14">
          <HeroSection t={t} />
          <StatsSection t={t} />
          <ListingsSection t={t} />
          <HowItWorksSection t={t} />
          <ContactSection t={t} />
        </main>
        <SiteFooter />
      </Layout>
      <CookieBanner t={t} />
    </div>
  );
}

function CookieBanner({ t }: { t: TranslationType }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const consent = localStorage.getItem("cookie-consent"); if (!consent) setIsVisible(true); }, []);
  const handleConsent = () => { localStorage.setItem("cookie-consent", "accepted"); setIsVisible(false); };
  const handleDecline = () => { localStorage.setItem("cookie-consent", "declined"); setIsVisible(false); };
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="absolute -right-10 -top-10 h-32 w-32 rotate-12 bg-amber-100/50 rounded-full blur-2xl" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><span className="text-2xl">🍪</span><h2 className="text-xl font-bold text-slate-900">{t.cookieTitle}</h2></div>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>{t.cookieDesc}</p>
            <p>Laissez-vous nos cookies vous accompagner... <br /><span className="text-[10px] text-slate-400 italic">Vous pouvez modifier vos choix à tout moment.</span></p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button onClick={handleDecline} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition">{t.cookieChoice}</button>
            <div className="flex gap-2">
              <button onClick={handleDecline} className="flex-1 rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 transition sm:flex-none">{t.cookieDecline}</button>
              <button onClick={handleConsent} className="flex-1 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-200 hover:bg-amber-500 transition sm:flex-none">{t.cookieAccept}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: { children: ReactNode }) { return <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">{children}</div>; }
function GradientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden ">
      <div className="absolute -left-32 top-[-10%] h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute right-[-10%] top-1/4 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0)_0,_rgba(255,255,255,0.9)_55%,_rgba(248,250,252,1)_100%)]" />
    </div>
  );
}

function Header({ t, currentLang, setLang }: { t: TranslationType, currentLang: Language, setLang: (l: Language) => void }) {
  return (
    <header className="relative z-20 flex items-center justify-between border-b border-slate-200/80 bg-white/60 py-4 backdrop-blur sm:py-5">
      <div className="flex items-center gap-3">
        <img src={ter} alt="Logo" className="h-20 w-auto object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300" />
        <div><p className="text-sm font-semibold text-slate-900">NosyBe Lands</p><p className="text-xs text-slate-400">Madagascar</p></div>
      </div>
      <nav className="hidden gap-8 text-sm text-slate-600 md:flex font-medium">
        <button onClick={() => scrollToSection('section-terrains')} className="hover:text-emerald-500 transition">{t.navTerrains}</button>
        <button onClick={() => scrollToSection('section-methode')} className="hover:text-emerald-500 transition">{t.navMethode}</button>
        <button onClick={() => scrollToSection('section-contact')} className="hover:text-emerald-500 transition">{t.navContact}</button>
      </nav>
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
        {(['fr', 'en', 'it'] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 text-[10px] font-bold rounded-full transition ${currentLang === l ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>{l.toUpperCase()}</button>
        ))}
      </div>
    </header>
  );
}

function scrollToSection(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

function HeroSection({ t }: { t: TranslationType }) {
  return (
    <section className="text-center space-y-7 py-6">
      <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
        {t.heroTitle} <br/><span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">{t.heroSub}</span>
      </h1>
      <p className="mx-auto max-w-2xl text-slate-600 sm:text-lg">{t.heroDesc}</p>
      <div className="flex justify-center gap-4 pt-4">
        <button onClick={() => scrollToSection('section-terrains')} className="rounded-full bg-emerald-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition">{t.heroBtn}</button>
      </div>
    </section>
  );
}

function StatsSection({ t }: { t: TranslationType }) {
  const stats = [ { label: t.stats1, value: "120+", helper: "Nosy Be" }, { label: t.stats2, value: "3 Mds Ar", helper: "Transactions" }, { label: t.stats3, value: "4.9/5", helper: "Reviews" }, ];
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white/50 p-6 text-center shadow-sm backdrop-blur-sm">
          <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{stat.label}</p>
        </article>
      ))}
    </section>
  );
}

function ListingsSection({ t }: { t: TranslationType }) {
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");
  const sortedListings = useMemo(() => {
    return [...MOCK_LISTINGS].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\s|€/g, ""));
      const priceB = parseInt(b.price.replace(/\s|€/g, ""));
      return sort === "price-asc" ? priceA - priceB : priceB - priceA;
    });
  }, [sort]);
  return (
    <section id="section-terrains" className="space-y-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-100 pb-6">
        <div><h2 className="text-xl font-bold text-slate-900">{t.listingsTitle}</h2><p className="text-sm text-slate-500 text-center md:text-left">{t.listingsSub}</p></div>
        <div className="flex gap-2">
          <button onClick={() => setSort("price-asc")} className={`px-4 py-2 text-xs rounded-full font-bold transition ${sort === "price-asc" ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{t.sortAsc}</button>
          <button onClick={() => setSort("price-desc")} className={`px-4 py-2 text-xs rounded-full font-bold transition ${sort === "price-desc" ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{t.sortDesc}</button>
        </div>
      </div>
      <div className="flex justify-center"><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-4xl">{sortedListings.map((listing) => (<PropertyCard key={listing.id} listing={listing} btnText={t.cardBtn} />))}</div></div>
    </section>
  );
}

function PropertyCard({ listing, btnText }: { listing: LandListing, btnText: string }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-1.5">
      <div className="relative h-56 w-full overflow-hidden">
        <img src={listing.imageUrl} alt={listing.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">{listing.city}</div>
      </div>
      <div className="flex flex-col p-5 space-y-4">
        <div className="flex justify-between items-center"><span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded">{listing.category}</span><span className="text-base font-black text-slate-900">{listing.price}</span></div>
        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{listing.title}</h3>
        <button onClick={() => scrollToSection('section-contact')} className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-all hover:bg-emerald-600 active:scale-95 shadow-lg shadow-slate-200">{btnText}</button>
      </div>
    </article>
  );
}

function HowItWorksSection({ t }: { t: TranslationType }) {
  return (
    <section id="section-methode" className="grid gap-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl lg:grid-cols-2">
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900">{t.howItWorksTitle}</h2>
        <p className="text-slate-600">{t.howItWorksDesc}</p>
        <ol className="space-y-3"><StepItem step="1" title={t.step1Title} description={t.step1Desc} /><StepItem step="2" title={t.step2Title} description={t.step2Desc} /><StepItem step="3" title={t.step3Title} description={t.step3Desc} /></ol>
      </div>
      <div className="space-y-4 rounded-2xl bg-slate-50 p-5">
        <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
          <p className="italic text-slate-700 text-sm">“Sécuriser un terrain en première ligne mer à Nosy Be en moins de 4 mois a été possible grâce à leur expertise locale.”</p>
          <p className="mt-4 text-xs font-bold">S. Martin — <span className="text-slate-500 font-normal">Investisseur</span></p>
        </div>
      </div>
    </section>
  );
}

// --- TON COMPOSANT CONTACT CORRIGÉ AVEC FORMSPREE ---
function ContactSection({ t }: { t: TranslationType }) {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // REMPLACE "TON_ID_FORMSPREE" PAR TON CODE FORMSPREE
    const response = await fetch("https://formspree.io/f/xykdlgvp ", {
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
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{t.contactTitle}</h2>
          <p className="text-slate-400">{t.contactDesc}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" type="text" placeholder={t.formName} required className="rounded-xl bg-white/10 border border-white/20 p-3 text-sm outline-none focus:border-emerald-400" />
              <input name="email" type="email" placeholder={t.formEmail} required className="rounded-xl bg-white/10 border border-white/20 p-3 text-sm outline-none focus:border-emerald-400" />
            </div>
            <input name="phone" type="tel" placeholder={t.formTel} required className="w-full rounded-xl bg-white/10 border border-white/20 p-3 text-sm outline-none focus:border-emerald-400" />
            <textarea name="message" placeholder={t.formMsg} rows={3} required className="w-full rounded-xl bg-white/10 border border-white/20 p-3 text-sm outline-none focus:border-emerald-400" />
            <button disabled={status === "SENDING"} className="w-full rounded-xl bg-emerald-500 py-3 font-bold hover:bg-emerald-400 transition-all disabled:opacity-50">
              {status === "SENDING" ? "ENVOI..." : t.formBtn}
            </button>
            {status === "SUCCESS" && <p className="text-center text-emerald-400 text-xs font-bold mt-2">✅ Message envoyé avec succès !</p>}
            {status === "ERROR" && <p className="text-center text-red-400 text-xs font-bold mt-2">❌ Erreur technique. Réessayez.</p>}
          </form>
        </div>
        <div className="flex flex-col justify-center space-y-6 rounded-2xl bg-white/5 p-6 border border-white/10">
           <div><p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Contact</p><h3 className="text-xl font-bold mt-1">{ADMIN_CONTACT.name}</h3><p className="text-sm text-slate-400">Expert foncier Madagascar</p></div>
           <p className="text-sm">📱 {ADMIN_CONTACT.phone}<br/>📧 {ADMIN_CONTACT.email}</p>

            <img src={facebook} alt="Logo" className="h-15 w-auto object-contain  group-hover:scale-105 transition-transform duration-300" />
             <img src={instagram} alt="Logo" className="h-15 w-auto object-contain  group-hover:scale-105 transition-transform duration-300" />
              <img src={linkedin} alt="Logo" className="h-15 w-auto object-contain  group-hover:scale-105 transition-transform duration-300"/>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">{step}</div>
      <div><p className="font-bold text-slate-900">{title}</p><p className="text-xs text-slate-500">{description}</p></div>
    </div>
  );
}

function SiteFooter() { return <footer className=" py-10 border-t border-slate-100 text-center text-dark">© {new Date().getFullYear()} NosyBe Lands — Global Land IMMO</footer>; }