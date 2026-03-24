import { useEffect, useState } from 'react';

export default function ProjectDetail({ setCurrentPage, project }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return null;

  const validImages = project.images || [];

  return (
    <div className="relative z-10 mx-auto w-full px-8 py-20 md:py-32 max-w-7xl fade-in">
      <button 
        onClick={() => setCurrentPage('portfolio')}
        className="text-[11px] uppercase tracking-[0.25em] text-[#7E746A] hover:text-[#4E4E4A] transition mb-12 flex items-center gap-2 reveal-fade"
      >
        &larr; Tillbaka till Portfolio
      </button>

      <div className="grid lg:grid-cols-2 gap-16 item-start">
        
        {/* Detail Info Panel */}
        <div className="space-y-12">
          <div className="reveal-up">
            <h1 className="font-serif text-5xl md:text-6xl text-[#4E4E4A] leading-tight mb-6">{project.name}</h1>
            <p className="text-xl text-[#665E57] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-10 reveal-scale">
            <h3 className="font-serif text-2xl text-[#4E4E4A] mb-8 border-b border-white/40 pb-4">Projektfakta</h3>
            
            <dl className="grid grid-cols-2 gap-y-8 gap-x-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-[#9D8C79] mb-1">Plats</dt>
                <dd className="text-[#4E4E4A] font-medium text-base">{project.location}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-[#9D8C79] mb-1">Yta</dt>
                <dd className="text-[#4E4E4A] font-medium text-base">{project.area} kvm</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-[#9D8C79] mb-1">Omfattning</dt>
                <dd className="text-[#4E4E4A] font-medium text-base">{project.scope}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-[#9D8C79] mb-1">Färdigställt</dt>
                <dd className="text-[#4E4E4A] font-medium text-base">{project.year}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="w-full">
          {validImages.length > 0 ? (
            <div className="space-y-6 reveal-up" style={{ transitionDelay: '200ms' }}>
              <div className="glass-panel p-2 rounded-[2.5rem]">
                <img 
                  src={validImages[activeImage]} 
                  alt={project.name} 
                  className="w-full h-[500px] md:h-[700px] object-cover rounded-[2rem] shadow-sm transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
              </div>

              {validImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {validImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative rounded-[1.5rem] overflow-hidden h-24 sm:h-32 transition-all p-1 glass-panel duration-500 hover:-translate-y-1 ${activeImage === idx ? 'ring-2 ring-white/60 shadow-lg' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover rounded-xl" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-[500px] glass-panel rounded-[2.5rem] flex items-center justify-center reveal-up">
              <p className="text-[#9D8C79] uppercase text-xs tracking-widest">Inga bilder tillgängliga</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
