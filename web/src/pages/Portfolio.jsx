import { useState } from 'react';
import bgPatternSand from '../assets/abstract_pattern_sand.png';

function ProjectCarousel({ images, name, onOpenProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImg = (e) => {
    e.stopPropagation();
    if(images.length > 0) setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImg = (e) => {
    e.stopPropagation();
    if(images.length > 0) setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if(!images || images.length === 0) return <div className="w-full h-[400px] md:h-[600px] bg-gray-200 animate-pulse rounded-[2.5rem]"></div>;

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden group cursor-pointer rounded-[2.5rem]" onClick={onOpenProject}>
      
      {/* Sliding Image Container */}
      <div 
        className="flex w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgSrc, i) => (
          <div key={i} className="w-full h-full flex-shrink-0 relative pointer-events-none">
            <img src={imgSrc} alt={`${name} ${i}`} className="w-full h-full object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-105" />
          </div>
        ))}
      </div>
      
      {/* Interaction layer */}
      {images.length > 1 && (
        <div className="absolute inset-0 pointer-events-none hover-glass-layer transition-opacity">
          <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); prevImg(e); }}
              className="glass-panel border-none text-[#4E4E4A] p-4 rounded-full shadow-lg transition-transform hover:scale-110 pointer-events-auto"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImg(e); }}
              className="glass-panel border-none text-[#4E4E4A] p-4 rounded-full shadow-lg transition-transform hover:scale-110 pointer-events-auto"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {images.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-700 shadow-sm ${i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Portfolio({ setCurrentPage, setSelectedProject, projects }) {
  const handleOpenProject = (proj) => {
    setSelectedProject(proj);
    setCurrentPage('project_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const portfolioProjects = projects.filter(p => !p.status || p.status === 'completed');

  return (
    <div className="relative z-10 mx-auto w-full px-8 py-20 md:py-28 max-w-7xl fade-in">
      <div className="text-center mb-16 md:mb-24 reveal-up">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#9D8C79] drop-shadow-sm mb-4">Utvalda verk</p>
        <h1 className="font-serif text-5xl md:text-6xl text-[#4E4E4A] drop-shadow-sm">Vår Portfolio</h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#665E57]">
          Ett axplock av interiörer vi haft äran att skapa och förädla. Utforska balansen mellan rymd, ljus, textur och genuina material i sin vackraste form.
        </p>
      </div>

      <div className="space-y-24 md:space-y-40">
        {portfolioProjects.length === 0 && <p className="text-center text-[#9D8C79] italic mt-20 text-lg reveal-fade">Inga färdigställda projekt i databasen ännu.</p>}
        {portfolioProjects.map((proj, idx) => (
          <div key={proj.id} className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''} reveal-up`}>
            <div className="flex-1 w-full glass-panel rounded-[2.5rem] p-[10px] shadow-[0_30px_70px_rgba(78,78,74,0.12)]">
              <ProjectCarousel images={proj.images} name={proj.name} onOpenProject={() => handleOpenProject(proj)} />
            </div>
            <div className="flex-1 w-full relative z-10">
              <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 hover:-translate-y-2 transition-transform duration-500 reveal-scale" style={{ transitionDelay: '200ms' }}>
                <h2 className="font-serif text-4xl leading-tight text-[#4E4E4A] mb-6">{proj.name}</h2>
                <p className="text-[#665E57] text-lg leading-relaxed">{proj.description}</p>
                <button 
                  onClick={() => handleOpenProject(proj)}
                  className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-[#7E746A] hover:text-[#4E4E4A] transition-colors group/btn"
                >
                  Se hela projektet 
                  <span className="transform transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 md:mt-40 glass-panel rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden reveal-up">
        <img src={bgPatternSand} className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-color-burn pointer-events-none" alt="" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#9D8C79] drop-shadow-sm mb-10">Omdömen från våra kunder</p>
          <div className="flex flex-col gap-16">
            <blockquote className="text-[#4E4E4A] italic text-2xl md:text-3xl leading-relaxed font-serif">
              "Ekerheim Interiors fångade vår vision direkt och förädlade den till något vi aldrig kunnat föreställa oss själva. 
              Vårt hem är nu en oas för avkoppling som andas subtil exklusivitet."
              <footer className="text-xs font-sans not-italic mt-6 text-[#7E746A] uppercase tracking-widest">— Familjen Andersson</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
