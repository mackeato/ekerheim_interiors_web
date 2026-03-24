export default function EkerheimInteriorsContactPage() {
    return (
        <div className="min-h-screen bg-[#F2ECE4] text-[#4E4E4A]">
            <header className="border-b border-[#DCCFC0]">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <nav className="flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.3em] text-[#7E746A] md:justify-end">
                        <a href="#home" className="transition hover:opacity-70">Hem</a>
                        <a href="#about" className="transition hover:opacity-70">Om oss</a>
                        <a href="#services" className="transition hover:opacity-70">Tjänster</a>
                        <a href="#portfolio" className="transition hover:opacity-70">Portfolio</a>
                        <a href="#contact" className="transition hover:opacity-70">Kontakt</a>
                    </nav>
                </div>

                <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-14 pt-8 text-center md:pb-20 md:pt-10">
                    <div className="w-full max-w-3xl">
                        <div className="font-serif text-5xl tracking-[0.18em] text-[#4E4E4A] md:text-7xl">
                            EKERHEIM
                        </div>
                        <div className="mx-auto mt-4 h-px w-full bg-[#B8A792]" />
                        <div className="mt-5 text-sm uppercase tracking-[0.8em] text-[#A99884] md:text-base">
                            INTERIORS
                        </div>
                    </div>
                </div>
            </header>

            <main id="home">
                <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                    <div className="grid gap-14 md:grid-cols-2 md:items-center">
                        <div className="max-w-xl">
                            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">
                                Modern skandinavisk design
                            </p>
                            <h1 className="font-serif text-4xl leading-tight text-[#4E4E4A] md:text-6xl">
                                Let’s create something timeless
                            </h1>
                            <p className="mt-6 max-w-lg text-base leading-8 text-[#665E57] md:text-lg">
                                Vi hjälper dig skapa harmoniska, personliga och tidlösa interiörer med en varm,
                                modern skandinavisk känsla. Hör av dig så tar vi nästa steg tillsammans.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="#contact"
                                    className="rounded-full bg-[#4E4E4A] px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#F7F3EE] transition hover:opacity-90"
                                >
                                    Boka konsultation
                                </a>
                                <a
                                    href="#details"
                                    className="rounded-full border border-[#CDBDAB] px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#6D655D] transition hover:bg-[#EEE6DC]"
                                >
                                    Läs mer
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-[#E8DED1]" />
                            <div className="relative rounded-[2rem] border border-[#DED2C4] bg-[#F7F3EE] p-8 shadow-[0_20px_60px_rgba(78,78,74,0.08)] md:p-10">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="rounded-[1.5rem] bg-[#EFE7DD] p-6">
                                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9D8C79]">Känsla</p>
                                        <p className="mt-3 font-serif text-2xl">Lugn & balans</p>
                                    </div>
                                    <div className="rounded-[1.5rem] bg-[#F3ECE3] p-6">
                                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9D8C79]">Material</p>
                                        <p className="mt-3 font-serif text-2xl">Linne, trä, sten</p>
                                    </div>
                                    <div className="rounded-[1.5rem] bg-[#F3ECE3] p-6">
                                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9D8C79]">Uttryck</p>
                                        <p className="mt-3 font-serif text-2xl">Avskalat premium</p>
                                    </div>
                                    <div className="rounded-[1.5rem] bg-[#EFE7DD] p-6">
                                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9D8C79]">Palett</p>
                                        <p className="mt-3 font-serif text-2xl">Sand, taupe, grafit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="details" className="border-y border-[#E0D5C8] bg-[#F7F3EE]">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">Vår filosofi</p>
                            <h2 className="mt-4 font-serif text-3xl">Rum som känns, inte bara syns</h2>
                        </div>
                        <div className="text-[#665E57] leading-8">
                            Vi tror på inredning som kombinerar mjuk estetik med genomtänkt funktion. Varje
                            projekt formas med naturliga material, lugna kontraster och detaljer som håller över tid.
                        </div>
                        <div className="text-[#665E57] leading-8">
                            Resultatet är interiörer med stillsam självsäkerhet — personliga hem och miljöer där
                            helheten känns lika viktig som de små, välvalda detaljerna.
                        </div>
                    </div>
                </section>

                <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-[2rem] border border-[#DED2C4] bg-[#F7F3EE] p-8 shadow-[0_20px_50px_rgba(78,78,74,0.06)] md:p-10">
                            <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">Kontakt</p>
                            <h2 className="mt-4 font-serif text-3xl text-[#4E4E4A] md:text-4xl">Välkommen att höra av dig</h2>

                            <div className="mt-10 space-y-8 text-[#665E57]">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">Studio</p>
                                    <p className="mt-3 leading-8">
                                        Ekerheim Interiors<br />
                                        Möten enligt bokning<br />
                                        Stockholm, Sverige
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">Kontaktuppgifter</p>
                                    <p className="mt-3 leading-8">
                                        hello@ekerheiminteriors.se<br />
                                        +46 70 123 45 67
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">Öppettider</p>
                                    <p className="mt-3 leading-8">
                                        Måndag–fredag: 09.00–17.00<br />
                                        Kvällar och helger enligt bokning
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">Socialt</p>
                                    <div className="mt-3 flex gap-6 text-sm uppercase tracking-[0.24em] text-[#6D655D]">
                                        <a href="#" className="transition hover:opacity-70">Instagram</a>
                                        <a href="#" className="transition hover:opacity-70">Pinterest</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-[#DED2C4] bg-[#F7F3EE] p-8 shadow-[0_20px_50px_rgba(78,78,74,0.06)] md:p-10">
                            <p className="text-[11px] uppercase tracking-[0.35em] text-[#9D8C79]">Starta ditt projekt</p>
                            <h2 className="mt-4 font-serif text-3xl text-[#4E4E4A] md:text-4xl">Berätta om din vision</h2>
                            <p className="mt-4 max-w-xl text-[#665E57] leading-8">
                                Fyll i formuläret så återkommer vi med nästa steg, upplägg och ett första förslag på hur vi kan arbeta tillsammans.
                            </p>

                            <form className="mt-10 grid gap-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <label className="grid gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E7E6C]">Namn</span>
                                        <input
                                            type="text"
                                            placeholder="Ditt namn"
                                            className="rounded-2xl border border-[#D8CBBB] bg-[#FCFAF7] px-5 py-4 outline-none transition placeholder:text-[#B9AB9B] focus:border-[#B8A792]"
                                        />
                                    </label>
                                    <label className="grid gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E7E6C]">E-post</span>
                                        <input
                                            type="email"
                                            placeholder="din@email.se"
                                            className="rounded-2xl border border-[#D8CBBB] bg-[#FCFAF7] px-5 py-4 outline-none transition placeholder:text-[#B9AB9B] focus:border-[#B8A792]"
                                        />
                                    </label>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <label className="grid gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E7E6C]">Telefon</span>
                                        <input
                                            type="tel"
                                            placeholder="Valfritt"
                                            className="rounded-2xl border border-[#D8CBBB] bg-[#FCFAF7] px-5 py-4 outline-none transition placeholder:text-[#B9AB9B] focus:border-[#B8A792]"
                                        />
                                    </label>
                                    <label className="grid gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E7E6C]">Typ av projekt</span>
                                        <select className="rounded-2xl border border-[#D8CBBB] bg-[#FCFAF7] px-5 py-4 outline-none transition focus:border-[#B8A792]">
                                            <option>Privat bostad</option>
                                            <option>Företag / kontor</option>
                                            <option>Styling</option>
                                            <option>Rådgivning</option>
                                        </select>
                                    </label>
                                </div>

                                <label className="grid gap-2">
                                    <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E7E6C]">Meddelande</span>
                                    <textarea
                                        rows={6}
                                        placeholder="Berätta kort om ditt projekt, stil och önskemål"
                                        className="rounded-[1.5rem] border border-[#D8CBBB] bg-[#FCFAF7] px-5 py-4 outline-none transition placeholder:text-[#B9AB9B] focus:border-[#B8A792]"
                                    />
                                </label>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="rounded-full bg-[#4E4E4A] px-8 py-4 text-xs uppercase tracking-[0.3em] text-[#F7F3EE] transition hover:opacity-90"
                                    >
                                        Skicka förfrågan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-[#DCCFC0] bg-[#EAE1D6]">
                <div className="mx-auto max-w-7xl px-6 py-12 text-center">
                    <div className="font-serif text-3xl tracking-[0.16em] text-[#4E4E4A] md:text-4xl">EKERHEIM</div>
                    <div className="mx-auto mt-3 h-px w-52 bg-[#B8A792]" />
                    <div className="mt-4 text-[11px] uppercase tracking-[0.7em] text-[#A99884]">INTERIORS</div>
                    <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[#7E746A]">
                        Timeless interiors, thoughtfully curated
                    </p>
                </div>
            </footer>
        </div>
    );
}
