import { useState, useEffect } from 'react';
import bgPatternSand from './assets/abstract_pattern_sand.png';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';

function PrivacyPolicy({ setCurrentPage }) {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-8 py-24 md:py-32 fade-in">
      <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 reveal-up">
        <h1 className="font-serif text-4xl md:text-5xl mb-14 drop-shadow-sm text-[#4E4E4A]">Privacy Policy</h1>
        <div className="space-y-12 text-[#665E57] leading-relaxed text-lg">
          <p className="reveal-fade">
            Denna integritetspolicy tydliggör hur vi på Ekerheim Interiors samlar in, använder och skyddar 
            dina personuppgifter när du interagerar med våra digitala och fysiska tjänster.
          </p>
          
          <div className="reveal-up">
            <h2 className="text-[#4E4E4A] font-serif text-2xl mb-4">Insamling av data</h2>
            <p>
              Vi samlar in information som du frivilligt delger oss via kontaktformuläret på vår startsida, 
              såsom namn, e-postadress, telefonnummer samt information om ditt projekt. Denna data används 
              enbart för att kunna återkoppla till dig med relevanta rekommendationer och prisförslag.
            </p>
          </div>

          <div className="reveal-up">
            <h2 className="text-[#4E4E4A] font-serif text-2xl mb-4">Lagring och skydd</h2>
            <p>
              Dina uppgifter krypteras och lagras på säkra servrar. Vi säljer eller hyr aldrig ut din 
              personliga information med obehöriga tredje parter. Det är endast våra dedikerade medarbetare 
              och designspecialister som behöver informationen för att utföra ett uppdrag som får tillgång 
              till dina angivna personuppgifter.
            </p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/40 reveal-fade">
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
            className="w-full sm:w-auto rounded-full bg-[#4E4E4A] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#F7F3EE] transition hover:opacity-90 shadow-lg"
          >
            Gå tillbaka till startsidan
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activePopup, setActivePopup] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then(res => res.json())
      .then(data => {
        const processedData = data.map(proj => {
          if (!proj.images) return proj;
          const newImages = proj.images.map(img => {
             if (img.includes('http://localhost:3001/uploads/')) {
                 return img.replace('http://localhost:3001/uploads/', import.meta.env.BASE_URL + 'uploads/');
             }
             if (img.startsWith('/uploads/')) {
                 return import.meta.env.BASE_URL + img.slice(1);
             }
             return img;
          });
          return { ...proj, images: newImages };
        });
        setProjects(processedData);
      })
      .catch(err => console.error("Error fetching projects", err));
  }, [currentPage]); 

  // Global Animation Observer Effect
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          intersectionObserver.unobserve(entry.target); // Perf: stop observing once revealed
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const observeElements = () => {
      document.querySelectorAll('.reveal-up:not(.is-visible), .reveal-fade:not(.is-visible), .reveal-scale:not(.is-visible)')
        .forEach(el => intersectionObserver.observe(el));
    };

    observeElements();

    // Use MutationObserver to catch UI components that render asynchronously 
    // (e.g. Admin dashboard items appearing post-login without triggering App.jsx rerenders)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const attributes = [
    { id: 'kansla', title: 'Känsla', content: 'Lugn & balans', description: 'Vi skapar miljöer där sinnet får ro. Genom noga avvägda proportioner, naturligt ljusinsläpp och en dämpad färgskala blir varje rum en harmonisk tillflyktsort.' },
    { id: 'material', title: 'Material', content: 'Linne, trä, sten', description: 'Autentiska och gedigna naturmaterial åldras med värdighet. Vi väljer material med stor omsorg för att de ska kännas lika relevanta och vackra om tjugo år som de gör idag.' },
    { id: 'uttryck', title: 'Uttryck', content: 'Avskalat premium', description: 'Det är i det subtila som sann lyx vilar. Vi reducerar det onödiga för att lyfta fram de genomtänkta formerna – en estetik som vilar på diskretion, precision och finess.' },
    { id: 'palett', title: 'Palett', content: 'Sand, taupe, grafit', description: 'Våra paletter hämtar inspiration från skandinavisk natur. Mjuka sandtoner möter djup grafit och nyanserad taupe för att bygga en inbjudande och sofistikerad svit.' }
  ];

  const handleNav = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'portfolio': return <Portfolio setCurrentPage={setCurrentPage} setSelectedProject={setSelectedProject} projects={projects} />;
      case 'project_detail': return <ProjectDetail setCurrentPage={setCurrentPage} project={selectedProject} />;
      case 'privacy': return <PrivacyPolicy setCurrentPage={setCurrentPage} />;
      case 'admin': return <Admin setCurrentPage={setCurrentPage} />;
      case 'home':
      default: return <Home activePopup={activePopup} setActivePopup={setActivePopup} attributes={attributes} setCurrentPage={setCurrentPage} projects={projects} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F2ECE4] text-[#4E4E4A] font-sans flex flex-col overflow-hidden">
      
      {/* Background texture layer */}
      <img src={bgPatternSand} className="fixed inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-multiply pointer-events-none" alt="" />
      
      {/* Global Attribute Popup Modal */}
      {activePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 fade-in">
          <div 
            className="absolute inset-0 bg-[#E8DED1]/50 backdrop-blur-md transition-opacity"
            onClick={() => setActivePopup(null)}
          />
          <div className="relative w-full max-w-lg glass-panel rounded-[2.5rem] p-10 md:p-14 shadow-2xl reveal-scale is-visible">
            <button 
              onClick={() => setActivePopup(null)}
              className="absolute top-8 right-8 text-[#9D8C79] hover:text-[#4E4E4A] transition-colors bg-white/50 rounded-full p-2 hover:bg-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">{activePopup.title}</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl text-[#4E4E4A]">{activePopup.content}</h3>
            <p className="mt-6 text-lg leading-relaxed text-[#665E57]">
              {activePopup.description}
            </p>
          </div>
        </div>
      )}

      {/* Main Header */}
      {currentPage !== 'admin' && (
      <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 bg-white/40 transition-all py-6">
        <div className="mx-auto max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <button onClick={(e) => handleNav(e, 'home')} className="font-serif text-3xl tracking-[0.18em] text-[#4E4E4A] hover:opacity-70 transition drop-shadow-sm">
            EKERHEIM
          </button>
          
          <nav className="flex items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7E746A]">
            <a href="#" onClick={(e) => handleNav(e, 'home')} className={`transition hover:text-[#4E4E4A] hover:-translate-y-0.5 inline-block px-2 py-1 ${currentPage==='home' ? 'text-[#4E4E4A] font-semibold border-b border-[#4E4E4A]' : ''}`}>Hem</a>
            <a href="#" onClick={(e) => handleNav(e, 'about')} className={`transition hover:text-[#4E4E4A] hover:-translate-y-0.5 inline-block px-2 py-1 ${currentPage==='about' ? 'text-[#4E4E4A] font-semibold border-b border-[#4E4E4A]' : ''}`}>Om oss</a>
            <a href="#" onClick={(e) => handleNav(e, 'services')} className={`transition hover:text-[#4E4E4A] hover:-translate-y-0.5 inline-block px-2 py-1 ${currentPage==='services' ? 'text-[#4E4E4A] font-semibold border-b border-[#4E4E4A]' : ''}`}>Tjänster</a>
            <a href="#" onClick={(e) => handleNav(e, 'portfolio')} className={`transition hover:text-[#4E4E4A] hover:-translate-y-0.5 inline-block px-2 py-1 ${(currentPage==='portfolio' || currentPage==='project_detail') ? 'text-[#4E4E4A] font-semibold border-b border-[#4E4E4A]' : ''}`}>Portfolio</a>
          </nav>
        </div>
      </header>
      )}

      {/* Page Content area router */}
      <div className="flex-grow">
        {renderPage()}
      </div>

      {currentPage !== 'admin' && (
      <footer className="relative z-50 glass-panel border-x-0 border-b-0 bg-white/30 mt-auto">
        <div className="mx-auto max-w-7xl px-8 py-20 text-center reveal-up">
          <div className="font-serif text-4xl tracking-[0.16em] text-[#4E4E4A] md:text-5xl drop-shadow-sm">EKERHEIM</div>
          <div className="mx-auto mt-6 h-px w-64 bg-gradient-to-r from-transparent via-[#B8A792] to-transparent opacity-80" />
          <div className="mt-8 text-[11px] uppercase tracking-[0.8em] text-[#A99884] opacity-90 drop-shadow-sm">INTERIORS</div>
          <p className="mt-10 text-[11px] uppercase tracking-[0.35em] text-[#7E746A]">
            Timeless interiors, thoughtfully curated
          </p>
          <div className="mt-14 flex justify-center items-center gap-6 text-[10px] sm:text-xs text-[#9D8C79] uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} Ekerheim</span>
            <span className="opacity-50">|</span>
            <button onClick={() => { setCurrentPage('privacy'); window.scrollTo(0, 0); }} className="hover:text-[#4E4E4A] transition border-b border-transparent hover:border-[#4E4E4A] pb-1 uppercase">Privacy Policy</button>
            <span className="opacity-50">|</span>
            <button onClick={() => { setCurrentPage('admin'); window.scrollTo(0, 0); }} className="hover:text-[#4E4E4A] transition border-b border-transparent hover:border-[#4E4E4A] pb-1 uppercase">Admin</button>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}