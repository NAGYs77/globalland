import { useState, useEffect } from "react";

export function CookieBanner({ t }: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { 
    if (!localStorage.getItem("cookie-consent")) setIsVisible(true); 
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:w-96">
      <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl text-white">
        <h3 className="font-bold mb-2">🍪 {t.cookieTitle}</h3>
        <p className="text-[10px] text-slate-400 mb-6">{t.cookieDesc}</p>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsVisible(false)} 
            className="flex-1 text-[10px] font-bold text-slate-500 hover:text-slate-300"
          >
            {t.cookieDecline.toUpperCase()}
          </button>
          <button 
            onClick={() => { 
              localStorage.setItem("cookie-consent", "accepted"); 
              setIsVisible(false); 
            }} 
            className="flex-1 bg-emerald-500 py-2 rounded-lg text-slate-900 text-[10px] font-bold hover:bg-emerald-400 transition-all"
          >
            {t.cookieAccept.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}