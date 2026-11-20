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
      ok: 'Přesně tak. Naše první noc pod širákem.' },
    { round: 'Kolo 1 · Výpravy',
      q: 'Jak se jmenuje pivovar, kde jsme byli o Velikonocích v Javorníkách?',
      a: ['Pod pralesem', 'U Bačkárky', 'Razula', 'Karlovický ležák'],
      ok: 'Správně! Razula je ten prales.' },
    { round: 'Kolo 1 · Výpravy',
      q: 'Pramen které řeky jsme na Kraličáku navštívili?',
      a: ['Moravy', 'Odry', 'Bečvy', 'Labe'],
      ok: 'Jo, pramen Moravy. Hned pod Kraličákem.' },
    { round: 'Kolo 2 · Tma',
      q: 'Jak dlouho si oči zvykají na tmu, než uvidíme nejslabší hvězdy?',
      a: ['asi půl hodiny', 'asi 30 sekund', 'asi 5 minut', 'celou noc'],
      ok: 'Oči si zvykají zhruba půl hodiny. Jeden pohled do rozsvíceného mobilu a začínají skoro od nuly.' },
    { round: 'Kolo 2 · Tma',
      q: 'Jakým světlem si na pozorování svítit, aby si oči tmu udržely?',
      a: ['červeným', 'modrým', 'bílým, ale slabým', 'zeleným'],
      ok: 'Červené světlo oči z adaptace na tmu skoro nevytrhne.' },
    { round: 'Kolo 3 · Hvězdy',
      q: 'Co je ve skutečnosti červený trpaslík?',
      a: ['malá chladná hvězda', 'loď s Listerem a Kocourem', 'vyhaslá planeta', 'typ komety'],
      ok: 'Malá chladná hvězda. Ale loď je taky dobrá odpověď.' },
    { round: 'Kolo 3 · Hvězdy',
      q: 'Které souhvězdí zvěrokruhu je na obrázku? V prosinci večer ho uvidíš vysoko na obloze.',
      image: 'byk',
      grid: true,
      a: ['Býk', 'Blíženci', 'Lev', 'Štír'],
      ok: 'Býk. Ta jasná oranžová hvězda je Aldebaran.' },
    { round: 'Kolo 3 · Hvězdy',
      q: 'V Česku jsou tři oblasti tmavé oblohy. Která je nám nejblíž?',
      a: ['Beskydská', 'Jizerská', 'Manětínská', 'Pálavská'],
      ok: 'Beskydská. A teď se podívej, kde leží tvůj bod…' }
  ],

  wrong: ['Skoro…', 'Vedle jak ta jedle.', 'Tohle by na pub kvízu neprošlo.', 'Zkus to ještě jednou.'],
  nextButton: 'Další otázka',
  lastButton: 'Ukaž mi to místo',
  retryButton: 'Zkusit znovu',

  finale: {
    eyebrow: 'Tvůj bod',
    title: 'Gruň',
    subtitle: 'Beskydská oblast tmavé oblohy',
    text: 'Na tomto místě v Beskydech se skoro nesvítí a je odtud krásně vidět Mléčná dráha. Proč by tě to mělo zajímat, říkáš si? Pokračuj dál.',
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
    text: 'Doufám, že sis luštění užil. Vymyslela jsem ho, protože skutečný dárek není nic, co rozbalíš hned. Je to společný zážitek, na který si pár měsíců počkáme: výlet do Beskyd a večer s průvodcem u dalekohledu.<br><br>A neboj, žádná noční turistika. Budeme stát u dalekohledu a průvodce nám bude ukazovat, co na obloze vidíme. 😄',
    question: 'Kdy pojedeme? Vyber si:',
    options: [
      { id: 'jaro', title: 'Jaro', when: 'na jaře', text: 'dřív, přespíme na chatě v okolí Gruně a spojíme to s turistikou' },
      { id: 'leto', title: 'Léto', when: 'v létě', text: 'až noci nebudou pod\u00a010\u00a0°C, abych ve spacáku nezmrzla, a přespíme pod širákem' }
    ],
    button: 'Potvrdit volbu'
  },

  envelope3: {
    eyebrow: 'Obálka 3',
    title: 'Abys byl připravený i na invazi z vesmíru, otevři obálku č. 3',
    text: 'Na zimní večery, než vyrazíme. Ať se na tu oblohu těšíme oba.',
    button: 'Otevřeno'
  },

  end: {
    eyebrow: 'Konec rébusu',
    title: 'Vyluštěno!',
    text: 'Krásné Vánoce! Ať ti v novém roce všechny body vycházejí, a hlavně ten náš na Gruni.',
    selfieTitle: 'Dostal ses až sem?',
    selfieText: 'Pošli jako důkaz fotku, abych věděla, že jsi dárky neotevřel bez zodpovězení otázek! 😄😘',
    selfieButton: 'Vyfotit se',
    sendButton: 'Poslat Vendě',
    retake: 'Vyfotit znovu',
    skip: 'Teď ne, jen napíšu',
    // {volba} se nahradí vybraným termínem
    message: 'Vyluštěno! 🌌 Do Beskyd chci jet {volba}.',
    done: 'Díky! Teď už jen počkat na jasnou noc.'
  }
};
