import beach from '../assets/beach.png'; // Utilisation de ta photo 20.jpg

function StepItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-6 group">
      <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 leading-none">{num}</span>
      <div>
        <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

export function MethodePage({ t }: any) {
  return (
    <section className="rounded-[3rem] bg-slate-50 border border-slate-100 p-10 lg:p-16 grid lg:grid-cols-2 gap-16 items-center my-10">
      <div className="space-y-8">
        <h2 className="text-4xl font-black tracking-tight">{t.howItWorksTitle}</h2>
        <div className="space-y-6">
          <StepItem num="01" title={t.step1Title} desc={t.step1Desc} />
          <StepItem num="02" title={t.step2Title} desc={t.step2Desc} />
          <StepItem num="03" title={t.step3Title} desc={t.step3Desc} />
        </div>
      </div>
      <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2">
        <img src={beach} alt="Nosy Be" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}