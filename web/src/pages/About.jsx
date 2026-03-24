import bgPatternStone from '../assets/abstract_pattern_stone.png';

export default function About() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-8 py-20 md:py-32 fade-in">
      
      <div className="text-center mb-24 max-w-3xl mx-auto reveal-up">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#9D8C79] drop-shadow-sm mb-4">Om oss</p>
        <h1 className="font-serif text-5xl md:text-7xl text-[#4E4E4A] leading-tight mb-8">Vi designar platser för livet</h1>
        <p className="text-xl text-[#665E57] leading-relaxed">
          Ekerheim Interiors föddes ur en längtan efter att skapa hem som inte bara är vackra att se på, utan som väcker en känsla av lugn inombords.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 shadow-lg overflow-hidden relative group reveal-scale">
          <img src={bgPatternStone} className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-color-burn group-hover:scale-105 transition-transform duration-[15s]" alt="" />
          <div className="relative z-10">
            <h2 className="font-serif text-4xl text-[#4E4E4A] mb-8">Vår historia</h2>
            <div className="space-y-6 text-[#665E57] text-lg leading-relaxed">
              <p>
                Studio Ekerheim grundades med övertygelsen att varje rum berättar en historia. Efter år av arbete inom skandinavisk och internationell design, insåg vi att det ofta saknades en fundamental pusselbit: balansen mellan det strama estetiska och det varma, inbjudande.
              </p>
              <p>
                Det handlar om att förstå hur ljuset faller under årets olika årstider. Hur en linnetextur känns under fingertopparna, och hur rätt proportioner kan förändra stämningen i ett helt rum.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 reveal-up" style={{ transitionDelay: '200ms' }}>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#9D8C79] mb-3">Vår vision</p>
            <h3 className="font-serif text-3xl text-[#4E4E4A] mb-4">Tidlöshet över trender</h3>
            <p className="text-[#665E57] text-lg leading-relaxed">
              Vi undviker tillfälliga trender för att istället bygga på en stark, varaktig grund. Det innebär att vi alltid prioriterar kvalitet – från arkitektoniska linjer ner till det minsta snickeriet. 
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#9D8C79] mb-3">Vårt löfte</p>
            <h3 className="font-serif text-3xl text-[#4E4E4A] mb-4">Personlig närvaro</h3>
            <p className="text-[#665E57] text-lg leading-relaxed">
              För oss är ett projekt en tätt vävd dialog. Vi erbjuder en högst personlig tjänst där vi guidar dig genom varje beslut, alltid med din livsstil och dina unika behov i absolut fokus.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
