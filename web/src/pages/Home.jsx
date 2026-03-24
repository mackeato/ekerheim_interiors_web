import bgPatternStone from '../assets/abstract_pattern_stone.png';
import bgPatternSand from '../assets/abstract_pattern_sand.png';
import imgOstermalm from '../assets/project_ostermalm.png'; // Fallback

export default function Home({ activePopup, setActivePopup, attributes, setCurrentPage, projects }) {
  const previewImage = projects && projects.length > 0 && projects[0].images.length > 0 ? projects[0].images[0] : imgOstermalm;

  return (
    <main id="home" className="relative z-10 fade-in">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-8 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center reveal-up">
          <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm">Exklusiv Svensk Design</p>
          <h1 className="font-serif text-5xl leading-[1.15] tracking-tight text-[#4E4E4A] md:text-7xl lg:text-8xl drop-shadow-sm">
            Tidlös estetik &<br />
            <span className="italic opacity-90 text-[#6D655D]">skandinaviskt</span> lugn
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-[#665E57] md:text-xl">
            Ekerheim Interiors skapar harmoniska miljöer där avskalad minimalism 
            möter exklusiva materialval. En modern klassiker som varar.
          </p>
          <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button 
              onClick={() => {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto rounded-full bg-[#4E4E4A] px-10 py-5 text-xs uppercase tracking-[0.3em] text-[#F7F3EE] transition hover:bg-[#3d3d3a] shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              Boka konsultation
            </button>
            <button 
              onClick={() => {
                setCurrentPage('portfolio');
                window.scrollTo(0, 0);
              }}
              className="w-full sm:w-auto rounded-full border border-[#B8A792] bg-white/20 backdrop-blur-md px-10 py-5 text-xs uppercase tracking-[0.3em] text-[#4E4E4A] transition hover:bg-white/40 shadow-sm hover:shadow"
            >
              Se portfolio
            </button>
          </div>
        </div>

        {/* Staggered Interactive Cards Layout */}
        <div className="mt-28 md:mt-40 grid lg:grid-cols-3 gap-16 items-start reveal-up">
          <div className="lg:col-span-1 lg:sticky lg:top-32 relative z-20 pointer-events-none">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm mb-4">Vår metodik</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#4E4E4A] mb-8 leading-tight drop-shadow-sm">Mästerverk i<br/>fyra element</h2>
            <p className="text-[#665E57] text-lg leading-relaxed mb-6">
              Varje rum bär på en tyst potential. Genom att noggrant kurera fyra bärande element väcker vi denna potential till liv.
            </p>
            <p className="text-[#9D8C79] text-xs uppercase tracking-widest bg-white/40 inline-block px-4 py-2 rounded-full border border-white/50 backdrop-blur-sm">
              Tryck på korten
            </p>
          </div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 relative z-10 w-full">
            {/* Diffuse backglow spread over grid */}
            <div className="absolute -inset-10 -z-10 rounded-[4rem] bg-gradient-to-br from-[#E8DED1]/60 to-[#F2ECE4]/80 backdrop-blur-3xl filter blur-[50px] opacity-70" />
            
            {/* Left Column (Short -> Tall) */}
            <div className="flex flex-col gap-6">
              {[ { attr: attributes[0], isTall: false, idx: 0 }, { attr: attributes[2], isTall: true, idx: 2 } ].map(prop => (
                <div 
                  key={prop.attr.id}
                  onClick={() => setActivePopup(prop.attr)}
                  className={`group relative glass-panel rounded-[2rem] p-8 md:p-10 cursor-pointer overflow-hidden transition-all duration-[600ms] ease-out hover:shadow-2xl hover:-translate-y-2 hover:border-white/70 flex flex-col justify-between ${prop.isTall ? 'h-[440px]' : 'h-[320px]'}`}
                  style={{ transitionDelay: `${prop.idx * 50}ms` }}
                >
                  <img src={prop.idx % 2 === 0 ? bgPatternStone : bgPatternSand} className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-color-burn group-hover:scale-105 group-hover:opacity-30 transition-all duration-[2s] pointer-events-none" alt="" />
                  
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D8C79] font-medium">{`0${prop.idx + 1}`}</span>
                    <span className="w-8 h-8 rounded-full border border-[#B8A792]/50 flex items-center justify-center text-[#9D8C79] opacity-40 group-hover:opacity-100 group-hover:bg-[#4E4E4A] group-hover:text-white group-hover:border-[#4E4E4A] transition-all duration-500 shadow-sm shrink-0">
                      <svg className="w-3 h-3 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-serif text-2xl text-[#4E4E4A] mb-3 group-hover:translate-x-1 transition-transform">{prop.attr.title}</h3>
                    <p className="text-sm text-[#7E746A] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      {prop.attr.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column (Tall -> Short) */}
            <div className="flex flex-col gap-6">
              {[ { attr: attributes[1], isTall: true, idx: 1 }, { attr: attributes[3], isTall: false, idx: 3 } ].map(prop => (
                <div 
                  key={prop.attr.id}
                  onClick={() => setActivePopup(prop.attr)}
                  className={`group relative glass-panel rounded-[2rem] p-8 md:p-10 cursor-pointer overflow-hidden transition-all duration-[600ms] ease-out hover:shadow-2xl hover:-translate-y-2 hover:border-white/70 flex flex-col justify-between ${prop.isTall ? 'h-[440px]' : 'h-[320px]'}`}
                  style={{ transitionDelay: `${prop.idx * 50}ms` }}
                >
                  <img src={prop.idx % 2 === 0 ? bgPatternStone : bgPatternSand} className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-color-burn group-hover:scale-105 group-hover:opacity-30 transition-all duration-[2s] pointer-events-none" alt="" />
                  
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D8C79] font-medium">{`0${prop.idx + 1}`}</span>
                    <span className="w-8 h-8 rounded-full border border-[#B8A792]/50 flex items-center justify-center text-[#9D8C79] opacity-40 group-hover:opacity-100 group-hover:bg-[#4E4E4A] group-hover:text-white group-hover:border-[#4E4E4A] transition-all duration-500 shadow-sm shrink-0">
                      <svg className="w-3 h-3 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-serif text-2xl text-[#4E4E4A] mb-3 group-hover:translate-x-1 transition-transform">{prop.attr.title}</h3>
                    <p className="text-sm text-[#7E746A] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      {prop.attr.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="details" className="relative mt-8 py-20 md:py-28 reveal-up">
        {/* Glass banner background spanning full width */}
        <div className="absolute inset-0 glass-panel border-x-0" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-8 md:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm">Vår filosofi</p>
            <h2 className="mt-4 font-serif text-3xl text-[#4E4E4A]">Balans mellan form<br/>och funktion</h2>
          </div>
          <div className="md:col-span-2 text-lg leading-relaxed text-[#665E57]">
            <p className="mb-6">
              Vi drivs av övertygelsen att de rum vi lever i formar vilka vi är. En noga kurerad miljö är inte bara en fråga om estetik; det är plattformen för ett harmoniskt liv. Vi balanserar strama linjer med mjuka texturer, och det klassiska med det moderna.
            </p>
            <p>
              I våra projekt utgår vi alltid från ljusets spel och materialens beskaffenhet. Vi skalar bort det överflödiga för att ge utrymme åt det som verkligen betyder något: genuina naturmaterial, skräddarsydda detaljer och en känsla som varar.
            </p>
          </div>
        </div>
      </section>

      {/* Homepage Portfolio Preview */}
      <section className="relative mx-auto max-w-7xl px-8 py-20 md:py-32 reveal-scale">
        <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 overflow-hidden group">
          <img src={bgPatternSand} className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-color-burn group-hover:scale-105 transition-transform duration-[15s] pointer-events-none" alt="" />
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm mb-4">Portfolio</p>
              <h2 className="font-serif text-4xl text-[#4E4E4A] md:text-5xl mb-8 leading-tight">Upplev våra skapelser</h2>
              <p className="text-[#665E57] text-lg leading-relaxed mb-12 max-w-md">
                Se hur vår filosofi översätts i praktiken. Från exklusiva vindsvåningar till harmoniska sovrum. Låt dig inspireras av vårt tidigare arbete och se vad vi kan göra för dig.
              </p>
              <button 
                onClick={() => {
                  setCurrentPage('portfolio');
                  window.scrollTo(0, 0);
                }}
                className="group/btn flex items-center gap-4 text-xs uppercase tracking-widest text-[#4E4E4A]"
              >
                Till Portfolio 
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-[#4E4E4A] transition-colors group-hover/btn:bg-[#4E4E4A] group-hover/btn:text-[#F7F3EE]">
                  &rarr;
                </span>
              </button>
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(78,78,74,0.15)] border border-white/40 transform rotate-1 group-hover:rotate-0 transition-transform duration-700">
              <img src={previewImage} alt="Project Preview" className="w-full h-[350px] md:h-[450px] object-cover mix-blend-normal group-hover:scale-105 transition-transform duration-[10s]" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-7xl px-8 py-20 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Info Card */}
          <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group/info reveal-up">
            <img src={bgPatternSand} className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-color-burn group-hover/info:scale-105 transition-transform duration-[15s]" alt="" />
            
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm">Kontakt</p>
              <h2 className="mt-6 font-serif text-4xl text-[#4E4E4A] md:text-5xl drop-shadow-sm">Välkommen att höra av dig</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#665E57]">
                Intresserad av ett kommande projekt? Vi tar oss gärna an tidiga skeden såväl som specifika rum och totalrenoveringar.
              </p>
              
              <div className="mt-14 space-y-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm">Studio</p>
                  <p className="mt-2 font-serif text-xl text-[#4E4E4A]">Nybrogatan 48</p>
                  <p className="mt-1 text-sm text-[#665E57]">114 40 Stockholm</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm">Mail & Telefon</p>
                  <a href="mailto:hello@ekerheiminteriors.se" className="mt-2 block font-serif text-xl text-[#4E4E4A] hover:opacity-70 transition">hello@ekerheiminteriors.se</a>
                  <a href="tel:+46701234567" className="mt-1 block text-sm text-[#665E57] hover:opacity-70 transition">+46 70 123 45 67</a>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm">Socialt</p>
                  <div className="mt-4 flex gap-8 text-sm uppercase tracking-[0.24em] text-[#6D655D]">
                    <a href="https://www.instagram.com/veronikaekerheim/" className="transition hover:text-[#4E4E4A] border-b border-transparent hover:border-[#4E4E4A] pb-1">Instagram</a>
                    <a href="https://www.pinterest.com/" className="transition hover:text-[#4E4E4A] border-b border-transparent hover:border-[#4E4E4A] pb-1">Pinterest</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Layer */}
          <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group/form reveal-up" style={{ transitionDelay: '100ms' }}>
            <img src={bgPatternStone} className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-color-burn group-hover/form:scale-105 transition-transform duration-[15s]" alt="" />
            
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79] drop-shadow-sm">Starta ditt projekt</p>
              <h2 className="mt-6 font-serif text-4xl text-[#4E4E4A] md:text-5xl drop-shadow-sm">Berätta om din vision</h2>
              
              <form className="mt-10 grid gap-6" onSubmit={(e) => { e.preventDefault(); alert('Tack för din förfrågan! Ekerheim Interiors återkommer inom kort.'); }}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <input type="text" placeholder="Förnamn" className="w-full rounded-full border border-white/50 bg-white/40 px-6 py-4 outline-none transition focus:bg-white/70 focus:ring-1 focus:ring-[#9D8C79]" />
                  <input type="text" placeholder="Efternamn" className="w-full rounded-full border border-white/50 bg-white/40 px-6 py-4 outline-none transition focus:bg-white/70 focus:ring-1 focus:ring-[#9D8C79]" />
                </div>
                <input type="email" placeholder="E-postadress" className="w-full rounded-full border border-white/50 bg-white/40 px-6 py-4 outline-none transition focus:bg-white/70 focus:ring-1 focus:ring-[#9D8C79]" />
                <select className="w-full rounded-full border border-white/50 bg-white/40 px-6 py-4 outline-none transition focus:bg-white/70 focus:ring-1 focus:ring-[#9D8C79] text-[#665E57] appearance-none cursor-pointer">
                  <option value="">Typ av projekt...</option>
                  <option value="total">Totalrenovering</option>
                  <option value="rum">Specifikt rum (t.ex. Kök / Badrum)</option>
                  <option value="styling">Styling och Inredning</option>
                  <option value="annan">Annat / Konsultation</option>
                </select>
                <textarea rows="4" placeholder="Kort beskrivning av dina tankar..." className="w-full rounded-[2rem] border border-white/50 bg-white/40 px-6 py-4 outline-none transition focus:bg-white/70 focus:ring-1 focus:ring-[#9D8C79] resize-none"></textarea>
                
                <button className="mt-4 w-full rounded-full bg-[#4E4E4A] py-5 text-xs uppercase tracking-[0.3em] text-[#F7F3EE] transition hover:bg-[#3d3d3a] shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0">
                  Skicka förfrågan
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
