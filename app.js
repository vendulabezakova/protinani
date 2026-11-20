(function () {
  'use strict';
  var C = window.CONTENT;
  var app = document.getElementById('app');
  var KEY = 'protinani_v1';

  // ---------------------------------------------------------------
  //  Nastavení z URL: ?test=1 (bez měření, pamatuje si), ?test=0, ?reset=1, ?debug=1
  // ---------------------------------------------------------------
  var params = new URLSearchParams(location.search);
  function store(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  if (params.get('test') === '1') store('protinani_test', '1');
  if (params.get('test') === '0') store('protinani_test', null);
  if (params.has('reset')) store(KEY, null);
  var TEST = load('protinani_test') === '1';
  var DEBUG = params.get('debug') === '1';
  if (params.has('test') || params.has('reset') || params.has('debug')) {
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
  }

  // ---------------------------------------------------------------
  //  Měření GA4
  // ---------------------------------------------------------------
  var gaOn = !!C.ga4 && !TEST;
  if (gaOn) {
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + C.ga4;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', C.ga4, DEBUG ? { debug_mode: true } : {});
  }
  function track(name, data) {
    if (TEST) { if (window.console) console.log('[test] ' + name, data || ''); return; }
    if (gaOn) window.gtag('event', name, Object.assign({}, data || {}, DEBUG ? { debug_mode: true } : {}));
  }

  // ---------------------------------------------------------------
  //  Stav (pokračuje po znovuotevření)
  // ---------------------------------------------------------------
  var state = { step: 'intro', qi: 0, choice: null, attempts: 0 };
  try { var saved = JSON.parse(load(KEY) || 'null'); if (saved && saved.step) state = Object.assign(state, saved); } catch (e) {}
  function save() { store(KEY, JSON.stringify(state)); }
  function go(step) { state.step = step; save(); render(); window.scrollTo(0, 0); }

  // ---------------------------------------------------------------
  //  Pomocné
  // ---------------------------------------------------------------
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function rnd(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function shuffle(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmtKm(m) { var km = m / 1000; return (km < 10 ? km.toFixed(1) : Math.round(km).toString()).replace('.', ','); }

  // Hvězdná obloha na pozadí
  (function sky() {
    var r = rnd(7), out = '';
    for (var i = 0; i < 90; i++) {
      var big = r() > 0.86, x = (r() * 100).toFixed(2), y = (r() * 100).toFixed(2);
      var rad = big ? 1.3 : (0.4 + r() * 0.55).toFixed(2), tw = big || r() > 0.7;
      out += '<circle cx="' + x + '%" cy="' + y + '%" r="' + rad + '" fill="#f4f1e6"' + (tw ? ' class="tw" style="animation-delay:' + (r() * 3).toFixed(2) + 's"' : ' opacity="0.7"') + '/>';
    }
    document.getElementById('sky').innerHTML = '<svg><rect width="100%" height="100%" fill="#0b1222"/>' + out + '</svg>';
  })();

  var RIDGES =
    '<path d="M0 288 L26 280 L54 266 L80 254 L100 240 L118 230 L132 233 L146 244 L168 258 L194 266 L220 262 L240 252 L258 256 L290 272 L326 281 L358 272 L390 264 V400 H0Z" fill="#18213d"/>' +
    '<path d="M0 322 L34 314 L72 306 L108 311 L146 302 L172 294 L192 297 L228 311 L266 317 L296 305 L318 291 L336 285 L354 292 L390 309 V400 H0Z" fill="#121a33"/>' +
    '<path d="M0 360 L44 352 L92 355 L138 346 L176 349 L226 361 L276 357 L318 347 L356 352 L390 349 V400 H0Z" fill="#0b1222"/>';

  function hero() {
    return '<div class="hero" aria-hidden="true"><svg viewBox="0 130 390 200" preserveAspectRatio="xMidYMax slice">' +
      '<defs><linearGradient id="hsky" x1="0" y1="130" x2="0" y2="330" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0b1222" stop-opacity="0"/><stop offset="0.55" stop-color="#101a3a"/><stop offset="1" stop-color="#0b1222"/></linearGradient>' +
      '<linearGradient id="hfade" x1="0" y1="285" x2="0" y2="330" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0b1222" stop-opacity="0"/><stop offset="1" stop-color="#0b1222"/></linearGradient></defs>' +
      '<rect y="130" width="390" height="200" fill="url(#hsky)"/>' +
      '<mask id="moon"><rect x="290" y="140" width="60" height="60" fill="#fff"/><circle cx="324" cy="163" r="13" fill="#000"/></mask><circle cx="318" cy="168" r="14" fill="#f3e9cf" mask="url(#moon)"/>' +
      RIDGES + '<rect y="285" width="390" height="45" fill="url(#hfade)"/></svg></div>';
  }
  function footRidges() {
    return '<div aria-hidden="true" style="position:fixed;left:0;right:0;bottom:0;height:150px;z-index:-1;pointer-events:none">' +
      '<svg viewBox="0 220 390 180" preserveAspectRatio="none" style="width:100%;height:100%">' + RIDGES + '</svg></div>';
  }

  // Planety
  var PLANETS = [
    { n: 'Merkur', r: 5, c: '#b5aea4' },
    { n: 'Venuše', r: 8, c: '#e8bf78' },
    { n: 'Země', r: 8.5, c: '#4f8fd8', band: 'M14 18 Q18 15 22 19 T27 21', bc: '#5fb37a' },
    { n: 'Mars', r: 6.5, c: '#d2663f' },
    { n: 'Jupiter', r: 13, c: '#d9a46a', band: 'M8 17 H32 M8.5 23 H31.5', bc: '#a8754a' },
    { n: 'Saturn', r: 10, c: '#e6cc8f', ring: 1 },
    { n: 'Uran', r: 9, c: '#8fd5e2' },
    { n: 'Neptun', r: 8.8, c: '#4d6fd9' }
  ];
  function planet(p, on, cls) {
    return '<svg viewBox="0 0 40 40" class="' + (cls || '') + '" aria-hidden="true">' +
      '<circle cx="20" cy="20" r="' + p.r + '" fill="' + (on ? p.c : 'none') + '" stroke="' + (on ? p.c : '#3b4766') + '" stroke-width="1.4"/>' +
      (on && p.band ? '<path d="' + p.band + '" stroke="' + p.bc + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>' : '') +
      (p.ring ? '<ellipse cx="20" cy="20" rx="17" ry="4.6" fill="none" stroke="' + (on ? '#f0dcae' : '#3b4766') + '" stroke-width="1.6" transform="rotate(-18 20 20)"/>' : '') +
      '</svg>';
  }
  function progress(lit, justLit) {
    var h = '<div class="planets" role="img" aria-label="Rozsvíceno ' + lit + ' z 8 planet">';
    PLANETS.forEach(function (p, i) { h += planet(p, i < lit, i === justLit ? 'lit' : ''); });
    return h + '</div><div class="planet-labels"><span>Merkur</span><span>Neptun</span></div>';
  }

  function bigPlanet(kind) {
    var g = {
      neptun: ['#7ea2ff', '#4d6fd9', '#1d2f7a'],
      uran: ['#c8f1f7', '#8fd5e2', '#3f8796'],
      venuse: ['#ffe2a8', '#f2b25a', '#b5602a']
    }[kind];
    return '<svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true"><defs><radialGradient id="g' + kind + '" cx="35%" cy="32%" r="75%"><stop offset="0" stop-color="' + g[0] + '"/><stop offset=".55" stop-color="' + g[1] + '"/><stop offset="1" stop-color="' + g[2] + '"/></radialGradient></defs>' +
      '<circle cx="36" cy="36" r="30" fill="url(#g' + kind + ')"/>' +
      (kind === 'uran' ? '<ellipse cx="36" cy="36" rx="8" ry="34" fill="none" stroke="#d9f6fa" stroke-opacity=".5" stroke-width="1.5"/>' : '') +
      (kind === 'neptun' ? '<path d="M14 30 Q36 24 58 32" stroke="#a9c2ff" stroke-opacity=".5" stroke-width="2" fill="none"/>' : '') +
      '</svg>';
  }

  // ---------------------------------------------------------------
  //  Souřadnice (cíl je zamaskovaný, v decimetrech)
  // ---------------------------------------------------------------
  var K = 0x2F5A3C, TY = (6910271 ^ K) / 10, TX = (8483889 ^ K) / 10;
  function parseCoord(v) {
    var t = String(v).replace(/[\s  -]/g, '').replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(t)) return null;
    return parseFloat(t);
  }
  function formatCoord(v) {
    var t = String(v).replace(/[^\d,.]/g, '').replace('.', ',');
    var parts = t.split(',');
    var intp = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.length > 1 ? intp + ',' + parts.slice(1).join('').slice(0, 3) : intp;
  }

  // ---------------------------------------------------------------
  //  Obrazovky
  // ---------------------------------------------------------------
  var screens = {};

  screens.intro = function () {
    var I = C.intro;
    app.innerHTML = '<section class="screen">' + hero() +
      '<div class="stack" style="margin-top:4px"><span class="eyebrow">' + I.eyebrow + '</span><h1>' + I.title + '</h1><p class="lead">' + I.text + '</p></div>' +
      '<form id="f" novalidate><div class="fields">' +
      '<label><span class="lab"><b>Y</b> S-JTSK, m</span><input class="coord" id="y" inputmode="decimal" autocomplete="off" placeholder="000 000"></label>' +
      '<label><span class="lab"><b>X</b> S-JTSK, m</span><input class="coord" id="x" inputmode="decimal" autocomplete="off" placeholder="0 000 000"></label>' +
      '</div><p class="small hint">' + I.hint + '</p><div id="res"></div>' +
      '<div class="spacer"></div><div class="actions"><button class="btn" type="submit">' + I.button + '</button></div></form></section>';
    var y = document.getElementById('y'), x = document.getElementById('x');
    [y, x].forEach(function (el) {
      el.addEventListener('input', function () { el.value = formatCoord(el.value); el.classList.remove('err'); });
    });
    document.getElementById('f').addEventListener('submit', function (e) {
      e.preventDefault();
      var Y = parseCoord(y.value), X = parseCoord(x.value);
      y.classList.toggle('err', Y === null); x.classList.toggle('err', X === null);
      if (Y === null || X === null) return;
      var d = Math.sqrt((Y - TY) * (Y - TY) + (X - TX) * (X - TX));
      var swapped = Y > 900000 && X < 900000;
      state.attempts++; save();
      var level = d <= 1000 ? 'hori' : d <= 5000 ? 'prihoriva' : d <= 20000 ? 'voda' : 'sama_voda';
      track('souradnice_pokus', { vysledek: level, odchylka_km: Math.round(d / 100) / 10, pokus: state.attempts });
      if (level === 'hori') { go('hot'); return; }
      var kind = level === 'prihoriva' ? 'venuse' : level === 'voda' ? 'uran' : 'neptun';
      var R = C.check[kind];
      document.getElementById('res').innerHTML = '<div class="result">' + bigPlanet(kind) +
        '<div><h2>' + R.title + '</h2><p>' + (swapped ? C.check.swapped : R.text.replace('{km}', fmtKm(d))) + '</p></div></div>';
    });
  };

  var SUN = "<svg viewBox=\"0 0 200 200\" aria-hidden=\"true\"> <defs> <radialGradient id=\"body\" cx=\"50%\" cy=\"50%\" r=\"50%\"> <stop offset=\"0\" stop-color=\"#ffb347\"/> <stop offset=\".6\" stop-color=\"#f7741c\"/> <stop offset=\".9\" stop-color=\"#d9420c\"/> <stop offset=\"1\" stop-color=\"#a82406\"/> </radialGradient> <radialGradient id=\"limb\" cx=\"50%\" cy=\"50%\" r=\"50%\"> <stop offset=\".55\" stop-color=\"#000\" stop-opacity=\"0\"/> <stop offset=\".92\" stop-color=\"#4a0b00\" stop-opacity=\".4\"/> <stop offset=\"1\" stop-color=\"#2a0500\" stop-opacity=\".7\"/> </radialGradient> <radialGradient id=\"corona\" cx=\"50%\" cy=\"50%\" r=\"50%\"> <stop offset=\".6\" stop-color=\"#ff6a12\" stop-opacity=\".95\"/> <stop offset=\".75\" stop-color=\"#ff4d0a\" stop-opacity=\".4\"/> <stop offset=\"1\" stop-color=\"#ff3a00\" stop-opacity=\"0\"/> </radialGradient> <filter id=\"gran\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"> <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.22\" numOctaves=\"3\" seed=\"3\" result=\"n\"/> <feColorMatrix in=\"n\" type=\"matrix\" values=\"0 0 0 0 1  0 0 0 0 0.8  0 0 0 0 0.4  0 0 0 2.6 -1.2\"/> <feComposite in2=\"SourceGraphic\" operator=\"in\"/> </filter> <filter id=\"fil\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"> <feTurbulence type=\"turbulence\" baseFrequency=\"0.035\" numOctaves=\"4\" seed=\"11\" result=\"n\"/> <feColorMatrix in=\"n\" type=\"matrix\" values=\"0 0 0 0 1  0 0 0 0 0.88  0 0 0 0 0.45  0 0 0 -5 1.15\"/> <feGaussianBlur stdDeviation=\".6\"/> <feComposite in2=\"SourceGraphic\" operator=\"in\"/> </filter> <filter id=\"flame\" x=\"-30%\" y=\"-30%\" width=\"160%\" height=\"160%\"> <feTurbulence type=\"turbulence\" baseFrequency=\"0.045\" numOctaves=\"4\" seed=\"5\" result=\"n\"/> <feDisplacementMap in=\"SourceGraphic\" in2=\"n\" scale=\"26\" xChannelSelector=\"R\" yChannelSelector=\"G\"/> <feGaussianBlur stdDeviation=\".9\"/> </filter> <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\"><feGaussianBlur stdDeviation=\"8\"/></filter> <clipPath id=\"disc\"><circle cx=\"100\" cy=\"100\" r=\"64\"/></clipPath> </defs> <circle class=\"halo\" cx=\"100\" cy=\"100\" r=\"80\" fill=\"#ff5a0a\" opacity=\".55\" filter=\"url(#glow)\"/> <circle class=\"cor\" cx=\"100\" cy=\"100\" r=\"90\" fill=\"url(#corona)\" filter=\"url(#flame)\"/> <circle cx=\"100\" cy=\"100\" r=\"64\" fill=\"url(#body)\"/> <g clip-path=\"url(#disc)\"> <rect x=\"36\" y=\"36\" width=\"128\" height=\"128\" fill=\"#fff\" filter=\"url(#gran)\" opacity=\".45\"/> <rect x=\"36\" y=\"36\" width=\"128\" height=\"128\" fill=\"#fff\" filter=\"url(#fil)\" opacity=\".65\"/> </g> <circle cx=\"100\" cy=\"100\" r=\"64\" fill=\"url(#limb)\"/> </svg>";

  screens.hot = function () {
    var H = C.hot;
    app.innerHTML = '<section class="screen"><span class="eyebrow">Měření sedí</span>' +
      '<div class="sun">' + SUN + '</div>' +
      '<div class="stack"><h1 class="big">' + H.title + '</h1><p class="lead">' + H.text + '</p><p class="lead">' + H.rounds + '</p></div>' +
      '<div class="rounds">' + [['1', 'Výpravy', '3 otázky'], ['2', 'Tma', '2 otázky'], ['3', 'Hvězdy', '3 otázky']].map(function (r) {
        return '<div><small>Kolo ' + r[0] + '</small><b>' + r[1] + '</b><span>' + r[2] + '</span></div>';
      }).join('') + '</div>' +
      '<div class="spacer"></div><div class="actions"><button class="btn" id="go">' + H.button + '</button></div></section>';
    document.getElementById('go').onclick = function () { state.qi = 0; go('quiz'); };
  };

  var BYK = (function () {
    // souhvězdí Býka – zjednodušené schéma
    var S = { ald: [196, 150], g: [168, 140], d: [178, 126], e: [210, 122], th: [184, 148], l: [150, 168], nath: [262, 52], zeta: [292, 112], pl: [96, 92] };
    function ln(a, b) { return '<line x1="' + S[a][0] + '" y1="' + S[a][1] + '" x2="' + S[b][0] + '" y2="' + S[b][1] + '"/>'; }
    var r = rnd(19), bg = '';
    for (var i = 0; i < 70; i++) bg += '<circle cx="' + (r() * 360).toFixed(1) + '" cy="' + (r() * 220).toFixed(1) + '" r="' + (0.3 + r() * 0.6).toFixed(2) + '" fill="#cfd6ea" opacity="' + (0.3 + r() * 0.5).toFixed(2) + '"/>';
    var pl = [[0, 0], [8, -5], [14, 2], [5, 8], [-6, 5], [11, 10], [2, -9]].map(function (o) { return '<circle cx="' + (S.pl[0] + o[0]) + '" cy="' + (S.pl[1] + o[1]) + '" r="1.8" fill="#cfe0ff"/>'; }).join('');
    return '<svg viewBox="0 0 360 220" role="img" aria-label="Schéma souhvězdí na noční obloze">' + bg +
      '<g stroke="#8ea3d6" stroke-opacity=".55" stroke-width="1.2">' + ln('l', 'g') + ln('g', 'd') + ln('g', 'th') + ln('th', 'ald') + ln('d', 'e') + ln('e', 'nath') + ln('ald', 'zeta') + '</g>' +
      ['g', 'd', 'e', 'th', 'l'].map(function (k) { return '<circle cx="' + S[k][0] + '" cy="' + S[k][1] + '" r="2.4" fill="#f4f1e6"/>'; }).join('') +
      '<circle cx="' + S.nath[0] + '" cy="' + S.nath[1] + '" r="3" fill="#f4f1e6"/><circle cx="' + S.zeta[0] + '" cy="' + S.zeta[1] + '" r="2.6" fill="#f4f1e6"/>' +
      '<circle cx="' + S.ald[0] + '" cy="' + S.ald[1] + '" r="4.4" fill="#ffb366"/><circle cx="' + S.ald[0] + '" cy="' + S.ald[1] + '" r="9" fill="#ffb366" opacity=".18"/>' + pl + '</svg>';
  })();

  screens.quiz = function () {
    var qi = state.qi, Q = C.quiz[qi];
    if (!Q) { go('finale'); return; }
    var order = shuffle(Q.a.map(function (t, i) { return { t: t, ok: i === 0 }; }));
    app.innerHTML = '<section class="screen">' +
      '<div class="topbar"><span class="eyebrow">' + Q.round + '</span><span class="count">' + (qi + 1) + ' / ' + C.quiz.length + '</span></div>' +
      '<div id="prog">' + progress(qi) + '</div>' +
      '<div class="question"><h1 class="q">' + Q.q + '</h1></div>' +
      (Q.image === 'byk' ? '<div class="figure">' + BYK + '</div>' : '') +
      '<div class="answers' + (Q.grid ? ' grid' : '') + '">' +
      order.map(function (o, i) { return '<button class="answer" type="button" data-i="' + i + '"><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o.t) + '</span></button>'; }).join('') +
      '</div><div id="fb"></div><div class="spacer"></div><div id="act" class="actions"></div></section>' + footRidges();
    var btns = app.querySelectorAll('.answer');
    var tries = 0;
    Array.prototype.forEach.call(btns, function (b) {
      b.onclick = function () {
        var o = order[+b.dataset.i]; tries++;
        track('kviz_odpoved', { otazka: qi + 1, spravne: o.ok ? 'ano' : 'ne', pokus: tries });
        if (o.ok) {
          Array.prototype.forEach.call(btns, function (x) { x.disabled = true; if (x !== b) x.classList.add('dim'); x.classList.remove('wrong'); });
          b.classList.add('correct');
          document.getElementById('prog').innerHTML = progress(qi + 1, qi);
          document.getElementById('fb').innerHTML = '<div class="feedback good"><h2>Správně!</h2><p>' + Q.ok + '</p></div>';
          var last = qi === C.quiz.length - 1;
          document.getElementById('act').innerHTML = '<button class="btn" id="next">' + (last ? C.lastButton : C.nextButton) + '</button>';
          state.qi = qi + 1; save();
          document.getElementById('next').onclick = function () {
            if (last) { track('kviz_hotovo'); go('finale'); } else render();
          };
        } else {
          b.classList.add('wrong'); b.disabled = true;
          var w = C.wrong[(tries - 1) % C.wrong.length];
          document.getElementById('fb').innerHTML = '<div class="feedback bad"><h2>' + w + '</h2><p>Planeta se rozsvítí, až trefíš správnou odpověď.</p></div>';
        }
      };
    });
  };

  screens.finale = function () {
    var F = C.finale;
    app.innerHTML = '<section class="screen">' +
      '<div class="topbar"><span class="eyebrow">Všech 8 planet</span><span class="count">8 / 8</span></div>' +
      progress(8) +
      '<div class="map-card">' + window.MAP_SVG + '</div>' +
      '<div class="reveal stack"><span class="eyebrow">' + F.eyebrow + '</span><h1 class="big">' + F.title + '</h1><span class="sub">' + F.subtitle + '</span><p class="lead">' + F.text + '</p></div>' +
      '<div class="spacer"></div><div class="actions reveal"><button class="btn" id="go">' + F.button + '</button></div></section>';
    document.getElementById('go').onclick = function () { go('env2'); };
  };

  function envelopeSvg(n) {
    return '<svg viewBox="0 0 220 150" aria-hidden="true"><rect x="4" y="4" width="212" height="142" rx="10" fill="#efe7d4"/>' +
      '<path d="M4 14 L110 86 L216 14" fill="none" stroke="#cdbf9f" stroke-width="2"/>' +
      '<path d="M4 146 L86 74 M216 146 L134 74" stroke="#ddd1b6" stroke-width="2"/>' +
      '<circle cx="110" cy="86" r="22" fill="#c4572e"/><text x="110" y="95" text-anchor="middle" font-family="Fraunces, serif" font-weight="600" font-size="26" fill="#fbe9d8">' + n + '</text></svg>';
  }

  function envelopeScreen(E, n, next) {
    app.innerHTML = '<section class="screen"><span class="eyebrow">' + E.eyebrow + '</span>' +
      '<div class="envelope">' + envelopeSvg(n) + '</div>' +
      '<div class="stack"><h1>' + E.title + '</h1><p class="lead">' + E.text + '</p></div>' +
      '<div class="spacer"></div><div class="actions"><button class="btn" id="go">' + E.button + '</button></div></section>' + footRidges();
    document.getElementById('go').onclick = function () { track('obalka_otevrena', { obalka: n }); go(next); };
  }
  screens.env2 = function () { envelopeScreen(C.envelope2, 2, 'concept'); };
  screens.env3 = function () { envelopeScreen(C.envelope3, 3, 'end'); };

  var ICONS = {
    jaro: '<svg viewBox="0 0 64 64"><rect x="29" y="34" width="6" height="22" rx="2" fill="#8a6a4a"/><circle cx="32" cy="26" r="16" fill="#f3c6d8"/><circle cx="22" cy="30" r="9" fill="#efb3cb"/><circle cx="42" cy="30" r="9" fill="#efb3cb"/><g fill="#fff">' +
      '<circle cx="26" cy="20" r="2"/><circle cx="38" cy="24" r="2"/><circle cx="31" cy="31" r="2"/></g></svg>',
    leto: '<svg viewBox="0 0 64 64"><g fill="#f4f1e6"><circle cx="12" cy="12" r="1.6"/><circle cx="50" cy="9" r="1.2"/><circle cx="34" cy="16" r="1.4"/><circle cx="56" cy="22" r="1"/></g><path d="M8 54 L32 24 L56 54Z" fill="#f29a4a"/><path d="M32 24 L26 54 H38Z" fill="#7a3f15"/><line x1="4" y1="54" x2="60" y2="54" stroke="#4a5677" stroke-width="2"/></svg>'
  };

  screens.concept = function () {
    var K2 = C.concept;
    app.innerHTML = '<section class="screen"><span class="eyebrow">' + K2.eyebrow + '</span>' +
      '<div class="stack" style="margin-top:12px"><h1>' + K2.title + '</h1><p class="lead">' + K2.text + '</p></div>' +
      '<p style="margin-top:26px;font-weight:600">' + K2.question + '</p>' +
      '<div class="options">' + K2.options.map(function (o) {
        return '<button type="button" class="option" data-id="' + o.id + '" aria-pressed="' + (state.choice === o.id) + '">' + ICONS[o.id] + '<b>' + o.title + '</b><span>' + o.text + '</span></button>';
      }).join('') + '</div>' +
      '<div class="spacer"></div><div class="actions"><button class="btn" id="go"' + (state.choice ? '' : ' disabled') + '>' + K2.button + '</button></div></section>' + footRidges();
    var go2 = document.getElementById('go');
    Array.prototype.forEach.call(app.querySelectorAll('.option'), function (b) {
      b.onclick = function () {
        state.choice = b.dataset.id; save();
        Array.prototype.forEach.call(app.querySelectorAll('.option'), function (x) { x.setAttribute('aria-pressed', x === b); });
        go2.disabled = false;
      };
    });
    go2.onclick = function () { track('volba_terminu', { termin: state.choice }); go('env3'); };
  };

  screens.end = function () {
    var E = C.end;
    var opt = C.concept.options.filter(function (o) { return o.id === state.choice; })[0];
    var msg = E.message.replace('{volba}', opt ? opt.title.toLowerCase() + ' (' + opt.text + ')' : '');
    app.innerHTML = '<section class="screen"><span class="eyebrow">' + E.eyebrow + '</span>' +
      '<div class="stack" style="margin-top:12px"><h1 class="big">' + E.title + '</h1><p class="lead">' + E.text + '</p></div>' +
      '<div class="box" id="box"><h2>' + E.selfieTitle + '</h2><p class="small">' + E.selfieText + '</p>' +
      '<div id="photo"></div>' +
      '<label class="btn" style="margin-top:16px" id="shoot">' + E.selfieButton +
      '<input type="file" accept="image/*" capture="user" id="cam" class="sr"></label>' +
      '<button class="btn ghost" id="send" type="button" style="margin-top:12px">' + E.skip + '</button></div>' +
      '<p class="small" id="note" style="margin-top:14px"></p>' +
      '<div class="spacer"></div><div class="actions"><button class="btn ghost" id="home" type="button">Zpět na úvodní stránku</button></div></section>' + footRidges();
    track('konec');
    document.getElementById('home').onclick = function () { state.qi = 0; state.choice = null; state.attempts = 0; go('intro'); };
    var file = null;
    var cam = document.getElementById('cam'), send = document.getElementById('send');
    cam.onchange = function () {
      file = cam.files && cam.files[0];
      if (!file) return;
      var url = URL.createObjectURL(file);
      document.getElementById('photo').innerHTML = '<div class="photo"><img src="' + url + '" alt="Tvoje fotka"></div>';
      document.getElementById('shoot').firstChild.nodeValue = E.retake;
      document.getElementById('shoot').classList.add('ghost');
      send.textContent = E.sendButton; send.classList.remove('ghost');
      track('selfie_vyfoceno');
    };
    send.onclick = function () {
      var data = { text: msg };
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) data.files = [file];
      if (navigator.share && (!file || data.files)) {
        navigator.share(data).then(function () {
          track('zprava_odeslana', { s_fotkou: data.files ? 'ano' : 'ne' });
          document.getElementById('note').textContent = E.done;
        }).catch(function () {});
      } else {
        // záloha: stáhnout fotku a otevřít WhatsApp se zprávou
        var h = '';
        if (file) h += '<a class="btn ghost" download="protinani.jpg" href="' + URL.createObjectURL(file) + '">Uložit fotku</a>';
        h += '<a class="btn" href="https://wa.me/?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">Napsat přes WhatsApp</a>';
        document.getElementById('note').innerHTML = h;
        track('zprava_odeslana', { s_fotkou: file ? 'zaloha' : 'ne' });
      }
    };
  };

  function render() {
    var f = screens[state.step] || screens.intro;
    track('krok', { krok: state.step === 'quiz' ? 'otazka_' + (state.qi + 1) : state.step });
    f();
  }
  render();
})();
