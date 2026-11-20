// =====================================================================
//  OBSAH APPKY – všechny texty na jednom místě.
//  Texty v [hranatých závorkách] doplní Vendy. HTML je povolené (<br>, <em>).
// =====================================================================

window.CONTENT = {
  // GA4 Measurement ID (tvar G-XXXXXXXXXX). Prázdné = měření vypnuté.
  ga4: '',

  // Číslo nebo jméno, které se nabídne při sdílení (jen do textu zprávy).
  vendy: 'Vendy',

  intro: {
    eyebrow: 'Úloha pro zeměměřiče',
    title: 'Kde se směry protnuly?',
    text: 'Zadej souřadnice bodu, který jsi spočítal. Jen tak se dozvíš, kam vede další cesta.',
    hint: 'Stačí číslice, mezery se doplní samy.',
    button: 'Ověřit měření'
  },

  // Výsledky kontroly souřadnic (vzdálenost v km se doplní místo {km})
  check: {
    neptun: { title: 'Samá voda', text: 'Odchylka {km} km. Nepletou se ti body?' },
    uran:   { title: 'Voda',      text: 'Odchylka {km} km. Ještě to nebude ono.' },
    venuse: { title: 'Přihořívá', text: 'Odchylka {km} km. Jsi blízko, zkontroluj odečtení bodů.' },
    swapped: 'Nemáš náhodou prohozené Y a X?',
    retry: 'Zkusit znovu'
  },

  hot: {
    title: 'Hoří!',
    text: 'Souřadnice sedí. Co na tom místě je, se dozvíš, až odpovíš na osm otázek.',
    button: 'Začít kvíz'
  },

  // ---------------------------------------------------------------
  //  KVÍZ – 8 otázek. První odpověď v poli je SPRÁVNÁ (pořadí se míchá).
  //  image: 'byk' zobrazí obrázek souhvězdí Býka.
  // ---------------------------------------------------------------
  quiz: [
    { round: 'Kolo 1 · Výpravy',
      q: 'Kde jsme poprvé spali pod širákem?',
      a: ['Pod Králickým Sněžníkem', 'Ve Velké Fatře', 'V Javorníkách', 'Na Pradědu'],
      ok: 'Přesně tak. A ráno pramen Moravy.' },
    { round: 'Kolo 1 · Výpravy',
      q: 'Jak se jmenuje pivovar, kde jsme byli o Velikonocích v Javorníkách?',
      a: ['Pod pralesem', 'U Bačkárky', 'Razula', 'Karlovický ležák'],
      ok: 'Správně! Razula je ten prales.' },
    { round: 'Kolo 1 · Výpravy',
      q: 'Kterou řeku jsme na Kraličáku viděli úplně na začátku?',
      a: ['Moravu', 'Odru', 'Bečvu', 'Labe'],
      ok: 'Jo, pramen Moravy.' },
    { round: 'Kolo 2 · Tma',
      q: 'Jak dlouho si oči zvykají na tmu, než uvidíme nejslabší hvězdy?',
      a: ['asi půl hodiny', 'asi 30 sekund', 'asi 5 minut', 'celou noc'],
      ok: 'Proto se na pozorování nesvítí do mobilu.' },
    { round: 'Kolo 2 · Tma',
      q: 'Jakým světlem si na pozorování svítit, aby si oči tmu udržely?',
      a: ['červeným', 'modrým', 'bílým, ale slabým', 'zeleným'],
      ok: 'Červené světlo oči z adaptace na tmu skoro nevytrhne.' },
    { round: 'Kolo 3 · Hvězdy',
      q: 'Co je ve skutečnosti červený trpaslík?',
      a: ['malá chladná hvězda', 'loď s Listerem a Koczkou', 'vyhaslá planeta', 'typ komety'],
      ok: 'Malá chladná hvězda. Ale loď je taky dobrá odpověď.' },
    { round: 'Kolo 3 · Hvězdy',
      q: 'Které souhvězdí zvěrokruhu je na obrázku? V prosinci večer ho uvidíš vysoko na obloze.',
      image: 'byk',
      grid: true,
      a: ['Býk', 'Blíženci', 'Lev', 'Štír'],
      ok: 'Býk. Ta jasná oranžová hvězda je Aldebaran.' },
    { round: 'Kolo 3 · Hvězdy',
      q: 'Co v místě s opravdu tmavou oblohou uvidíš pouhým okem, ale z Brna ne?',
      a: ['Mléčnou dráhu', 'Měsíc', 'Polárku', 'Venuši'],
      ok: 'Mléčnou dráhu. Jedeme se na ni podívat.' }
  ],

  wrong: ['Skoro…', 'Vedle jak ta jedle.', 'Tohle by na pub kvízu neprošlo.', 'Zkus to ještě jednou.'],
  nextButton: 'Další otázka',
  lastButton: 'Ukaž mi to místo',
  retryButton: 'Zkusit znovu',

  finale: {
    eyebrow: 'Tvůj bod',
    title: 'Gruň',
    subtitle: 'Beskydská oblast tmavé oblohy',
    text: '[Krátce, co je oblast tmavé oblohy.] [Vzkaz od Vendy.]',
    button: 'Pokračovat'
  },

  envelope2: {
    eyebrow: 'Obálka 2',
    title: 'Teď otevři obálku č. 2',
    text: 'Až ji otevřeš, klikni na tlačítko.',
    button: 'Otevřeno'
  },

  concept: {
    eyebrow: 'Skutečný dárek',
    title: 'Rébus byl jen začátek',
    text: '[Vendin text: vánoční dárek byl tenhle rébus, ale skutečný dárek je společná cesta do Beskyd. Pozorování noční oblohy s průvodcem a pak noc venku nebo na chatě.]',
    question: 'Kdy pojedeme? Vyber si:',
    options: [
      { id: 'jaro', title: 'Jaro', text: 'víkend s ubytováním na chatě' },
      { id: 'leto', title: 'Léto', text: 'po pozorování spaní pod širákem' }
    ],
    button: 'Potvrdit volbu'
  },

  envelope3: {
    eyebrow: 'Obálka 3',
    title: 'Abys byl připravený, otevři obálku č. 3',
    text: '[Krátký text ke knize, např. co v ní najde před výletem.]',
    button: 'Otevřeno'
  },

  end: {
    eyebrow: 'Konec rébusu',
    title: 'Vyluštěno!',
    text: '[Závěrečné přání od Vendy.]',
    selfieTitle: 'Chceš se vyfotit s mapou?',
    selfieText: 'Dobrovolné. Fotku pošleš jen Vendě.',
    selfieButton: 'Vyfotit se',
    sendButton: 'Poslat Vendě',
    retake: 'Vyfotit znovu',
    skip: 'Teď ne, jen napíšu',
    // {volba} se nahradí vybraným termínem
    message: 'Vyluštěno! 🌌 Do Beskyd chci jet {volba}.',
    done: 'Díky! Teď už jen počkat na jasnou noc.'
  }
};
