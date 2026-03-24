import bgPatternSand from '../assets/abstract_pattern_sand.png';

export default function Services() {
  const servicesList = [
    {
      title: "Totalrenovering",
      desc: "Vi ansvarar för hela processen. Från planlösning och rumsdisposition till materialval, platsbyggd förvaring och slutgiltig inredning. Vi tar ett helhetsgrepp för att säkerställa att konceptet håller från skiss till inflytt.",
    },
    {
      title: "Koncept & Inredning",
      desc: "Ett skräddarsytt inredningsförslag för hela ditt hem. Vi tar fram en sammanhängande röd tråd med material, färger, möbelval, textilier och belysning. Ett detaljerat koncept som du kan implementera själv eller med vår hjälp.",
    },
    {
      title: "Kök & Badrum",
      desc: "Oftast hemmets viktigaste (och dyraste) rum att tillverka. Vi ritar och optimerar platsbyggda lösningar, skräddarsyr funktioner och väljer sten, trä och beslag med omsorg för att skapa en hållbar, vacker bruksmiljö.",
    },
    {
      title: "Konsultation",
      desc: "Ibland räcker det med en kreativ knuff i rätt riktning. Vi erbjuder timbaserad rådgivning på plats eller digitalt för att hjälpa dig lösa specifika problem gällande möblering, färgval eller belysning.",
    }
  ];

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:py-32 fade-in">
      <div className="text-center mb-24 max-w-3xl mx-auto reveal-up">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#9D8C79] drop-shadow-sm mb-4">Våra Tjänster</p>
        <h1 className="font-serif text-5xl md:text-7xl text-[#4E4E4A] leading-tight mb-8">Vad kan vi göra för dig?</h1>
        <p className="text-xl text-[#665E57] leading-relaxed">
          Vi erbjuder skräddarsydda lösningar för varje beställare. Oavsett om det handlar om en komplett ombyggnation eller estetisk rådgivning, arbetar vi alltid med samma höga grad av precision och hängivenhet.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {servicesList.map((service, idx) => (
          <div 
            key={idx} 
            className="glass-panel rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 reveal-scale"
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#9D8C79] mb-4">
              Tjänst — 0{idx + 1}
            </div>
            <h2 className="font-serif text-3xl text-[#4E4E4A] mb-6">{service.title}</h2>
            <p className="text-[#665E57] text-lg leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="mt-20 md:mt-32 glass-panel rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group reveal-up">
        <img src={bgPatternSand} className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-color-burn group-hover:scale-105 transition-transform duration-[15s]" alt="" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl text-[#4E4E4A] mb-6 tracking-tight">Redo att ta nästa steg?</h2>
          <p className="text-[#665E57] text-lg mb-10">
            Skicka in din förfrågan idag så bokar vi ett inledande möte för att diskutera ditt projekt.
          </p>
          <button 
            onClick={() => {
              window.scrollTo(0, 0);
              // In App.jsx routing context we would want to switch page. 
              // We'll just let the user use the header/footer to navigate back for now, 
              // or trigger an event if we drilled down. 
            }}
            className="rounded-full bg-[#4E4E4A] px-10 py-5 text-xs uppercase tracking-[0.3em] text-[#F7F3EE] transition hover:bg-[#3d3d3a] shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Kontakta Oss
          </button>
        </div>
      </div>

    </div>
  );
}
