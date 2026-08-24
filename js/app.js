"use strict";

/* ==================== state ==================== */
const S = {
  screen:"home", group:null, rerolls:0,
  me:{name:"", age:"", av:AVATARS[0], bio:"", tags:[], broth:"tomyum", gender:"f", pref:"all"},
  deck:[],
  deckIdx:0, partner:null,
  room:null, members:[], scriptSet:0, scriptIdx:0, swiping:false,
  timers:[], secs:24, confirmed:false, result:null
};

const $ = id => document.getElementById(id);
const rand = n => Math.floor(Math.random() * n);
const pick = a => a[rand(a.length)];
const luckBonus = () => Math.min(S.rerolls * 0.03, 0.18);

function clearTimers(){ S.timers.forEach(clearTimeout); S.timers = []; }
function later(fn, ms){ const t = setTimeout(fn, ms); S.timers.push(t); return t; }

function code(prefix){
  const A = "ACDEFHJKLMNPRTUVWXY349";
  let s = "";
  for (let i = 0; i < 4; i++) s += A[rand(A.length)];
  return prefix + "-" + s;
}

/* ==================== navigation ==================== */
const TB = {home:"tb_home", bio:"tb_bio", duo:"tb_duo", chat:"tb_chat", confirm:"tb_confirm", win:"tb_win", lose:"tb_lose"};
const BACK_TO = {bio:"home", duo:"bio", chat:null, confirm:null, win:null, lose:null};

function setTopbar(id){
  $("tbv").textContent = T(TB[id] || "tb_home");
  const b = BACK_TO[id];
  $("back").hidden = !b;
}

function go(id){
  S.screen = id;
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("on"));
  $("sc-" + id).classList.add("on");
  setTopbar(id);
}

$("back").addEventListener("click", () => {
  const b = BACK_TO[S.screen];
  if (b) go(b);
});

function updateLuck(){
  $("luckbar").style.width = Math.round((0.12 + luckBonus() * 4.4) * 100) + "%";
}

/* ==================== language toggle ==================== */
$("lang").addEventListener("click", () => {
  lang = lang === "th" ? "en" : "th";
  store.set("mml.lang", lang);
  applyLang();
});

/* ==================== bio form ==================== */
function renderAvatars(){
  const wrap = $("f-av");
  wrap.innerHTML = "";
  AVATARS.forEach(a => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "av"; b.textContent = a;
    b.setAttribute("aria-pressed", String(a === S.me.av));
    b.addEventListener("click", () => {
      S.me.av = a;
      wrap.querySelectorAll(".av").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    });
    wrap.appendChild(b);
  });
}

function renderTags(){
  const wrap = $("f-tags");
  if (!wrap) return;
  wrap.innerHTML = "";
  TAGS.forEach(t => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = t[lang];
    b.setAttribute("aria-pressed", String(S.me.tags.includes(t.id)));
    b.addEventListener("click", () => {
      const i = S.me.tags.indexOf(t.id);
      if (i > -1) S.me.tags.splice(i, 1); else S.me.tags.push(t.id);
      b.setAttribute("aria-pressed", String(S.me.tags.includes(t.id)));
    });
    wrap.appendChild(b);
  });
}

function renderPicker(elId, opts, key, label, after){
  const wrap = $(elId);
  if (!wrap) return;
  wrap.innerHTML = "";
  opts.forEach(t => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = label(t);
    b.setAttribute("aria-pressed", String(S.me[key] === t.id));
    b.addEventListener("click", () => {
      S.me[key] = t.id;
      wrap.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      if (after) after();
    });
    wrap.appendChild(b);
  });
}

// how many people the current preference actually leaves to swipe
function updatePrefCount(){
  const n = matchPool().length;
  const el = $("pref-count");
  el.textContent = n ? T("pref_count", {n: n}) : T("pref_none");
  el.style.color = n ? "var(--ink-2)" : "var(--chili)";
}

function renderBroth(){
  renderPicker("f-broth", BROTHS, "broth", t => t[lang]);
  renderPicker("f-gender", GENDERS, "gender", t => t.sym + "  " + t[lang]);
  renderPicker("f-pref", DATE_PREFS, "pref", t => t[lang], updatePrefCount);
  updatePrefCount();
}

function loadMe(){
  const raw = store.get("mml.me");
  if (!raw) return;
  try {
    const m = JSON.parse(raw);
    if (m && typeof m === "object") {
      S.me.name = m.name || ""; S.me.age = m.age || "";
      S.me.av = AVATARS.includes(m.av) ? m.av : AVATARS[0];
      S.me.bio = m.bio || "";
      S.me.tags = Array.isArray(m.tags) ? m.tags.filter(t => TAGS.some(x => x.id === t)) : [];
      S.me.broth = BROTHS.some(b => b.id === m.broth) ? m.broth : "tomyum";
      S.me.gender = GENDERS.some(g => g.id === m.gender) ? m.gender : "f";
      S.me.pref = DATE_PREFS.some(d => d.id === m.pref) ? m.pref : "all";
    }
  } catch(e){}
  $("f-name").value = S.me.name;
  $("f-age").value = S.me.age;
  $("f-bio").value = S.me.bio;
}

$("bio-go").addEventListener("click", () => {
  const name = $("f-name").value.trim();
  if (!name) { $("f-name").focus(); $("f-name").placeholder = T("need_name"); return; }
  S.me.name = name;
  S.me.age = $("f-age").value.trim();
  S.me.bio = $("f-bio").value.trim();
  store.set("mml.me", JSON.stringify(S.me));
  if (S.group === "duo") startDuo(); else startGang();
});

document.querySelectorAll(".gcard").forEach(c => {
  c.addEventListener("click", () => { S.group = c.dataset.group; go("bio"); });
});

/* ==================== duo: swipe deck ==================== */
function renderDeck(){
  const deck = $("deck");
  deck.querySelectorAll(".card").forEach(c => c.remove());
  const remaining = S.deck.slice(S.deckIdx);
  $("deck-empty").hidden = remaining.length > 0;
  // render at most 3, topmost last so it sits on top
  remaining.slice(0, 3).reverse().forEach((p, i, arr) => {
    const depth = arr.length - 1 - i;   // 0 = top
    const L = p[lang];
    const el = document.createElement("div");
    el.className = "card";
    el.style.transform = "translateY(" + (depth * 7) + "px) scale(" + (1 - depth * 0.03) + ")";
    el.style.zIndex = String(10 - depth);
    const gd = GENDERS.find(g => g.id === p.g) || GENDERS[0];
    el.innerHTML =
      '<div class="face"><span class="face-ring"></span></div>' +
      '<div class="meat">' +
        '<div class="job"></div>' +
        '<div class="who"><b></b><span></span><i class="gchip"></i></div>' +
        '<div class="bio"></div>' +
        '<div class="tg">' + L.tg.map(() => "<em></em>").join("") + '</div>' +
      '</div>' +
      '<div class="stamp like">LIKE</div><div class="stamp pass">PASS</div>';
    el.querySelector(".face-ring").textContent = p.av;
    el.querySelector(".job").textContent = L.job;
    el.querySelector(".who b").textContent = L.n;
    el.querySelector(".who span").textContent = p.age;
    el.querySelector(".gchip").textContent = gd.sym + " " + gd[lang];
    el.querySelector(".bio").textContent = L.bio;
    el.querySelectorAll(".tg em").forEach((em, k) => { em.textContent = L.tg[k]; });
    if (depth === 0){ el.classList.add("top"); makeDraggable(el); }
    deck.appendChild(el);
  });
}

function makeDraggable(el){
  let sx = 0, dx = 0, dragging = false;
  const like = el.querySelector(".stamp.like"), pass = el.querySelector(".stamp.pass");

  el.addEventListener("pointerdown", e => {
    dragging = true; sx = e.clientX; el.setPointerCapture(e.pointerId);
    el.style.transition = "none";
  });
  el.addEventListener("pointermove", e => {
    if (!dragging) return;
    dx = e.clientX - sx;
    el.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 22) + "deg)";
    like.style.opacity = dx > 30 ? Math.min(1, (dx - 30) / 70) : 0;
    pass.style.opacity = dx < -30 ? Math.min(1, (-dx - 30) / 70) : 0;
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    el.style.transition = "transform .3s ease, opacity .3s ease";
    if (Math.abs(dx) > 95) { swipe(dx > 0); }
    else { el.style.transform = "translateX(0) rotate(0)"; like.style.opacity = 0; pass.style.opacity = 0; }
    dx = 0;
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
}

function swipe(liked){
  if (S.swiping) return;                 // ignore taps while a card is flying out
  const p = S.deck[S.deckIdx];
  if (!p) return;
  S.swiping = true;
  const top = $("deck").querySelector(".card.top");
  if (top) top.classList.remove("top");
  if (top){
    top.style.transition = "transform .32s ease, opacity .32s ease";
    top.style.transform = "translateX(" + (liked ? 520 : -520) + "px) rotate(" + (liked ? 24 : -24) + "deg)";
    top.style.opacity = "0";
  }
  S.deckIdx++;
  const matched = liked && Math.random() < Math.min(0.92, p.chance + luckBonus());
  setTimeout(() => {
    S.swiping = false;
    if (matched){ S.partner = p; showBurst(p); }
    else renderDeck();
  }, 330);
}

$("d-like").addEventListener("click", () => swipe(true));
$("d-pass").addEventListener("click", () => swipe(false));

function showBurst(p){
  const b = $("burst");
  $("burst-sub").textContent = T("burst_sub", {n: p[lang].n});
  b.classList.add("on");
  setTimeout(() => { b.classList.remove("on"); openDuoChat(p); }, 1500);
}

/* ==================== chat (duo + gang) ==================== */
function roomSub(){
  if (S.group === "duo") return T("tonight");
  return T("seatN", {n: S.members.length});
}

function refreshLeaveBtn(){
  const duo = S.group === "duo";
  // gang steers the room; duo decides on one person
  $("leave").hidden   = duo;
  $("tovote").hidden  = duo;
  $("duo-no").hidden  = !duo;
  $("duo-yes").hidden = !duo;
  $("clock").hidden   = duo;
  $("facebtn").hidden = !duo;
  $("seats").hidden   = duo;   // the face icon already is the other person
  if (duo && S.partner) $("fb-av").textContent = S.partner.av;
}

/* The face icon opens the full profile of whoever you are talking to, so the
   match decision is made looking at them rather than at a name in a bar. */
function openSheet(){
  const p = S.partner;
  if (!p) return;
  const L = p[lang];
  $("sh-face").textContent = p.av;
  $("sh-name").textContent = L.n;
  $("sh-age").textContent  = p.age;
  const gd = GENDERS.find(g => g.id === p.g) || GENDERS[0];
  $("sh-job").textContent  = L.job + " · " + gd.sym + " " + gd[lang];
  $("sh-bio").textContent  = L.bio;
  $("sh-tags").innerHTML   = L.tg.map(() => "<em></em>").join("");
  $("sh-tags").querySelectorAll("em").forEach((em, i) => { em.textContent = L.tg[i]; });
  $("sheet").hidden = false;
}
function closeSheet(){ $("sheet").hidden = true; }

function duoMatch(){ closeSheet(); openConfirm(); }

function duoPass(){
  closeSheet();
  clearTimers();
  const name = S.partner ? S.partner[lang].n : "";
  bubble(null, T("sys_passed", {n: name}), "sys");
  S.partner = null;
  setTimeout(() => {
    if (S.deckIdx < S.deck.length) { renderDeck(); go("duo"); }
    else finish(false);              // nobody left to meet today
  }, 1100);
}

$("facebtn").addEventListener("click", openSheet);
$("sheet-x").addEventListener("click", closeSheet);
$("sheet").addEventListener("click", e => { if (e.target === $("sheet")) closeSheet(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });
$("duo-yes").addEventListener("click", duoMatch);
$("sh-yes").addEventListener("click", duoMatch);
$("duo-no").addEventListener("click", duoPass);
$("sh-no").addEventListener("click", duoPass);

function renderSeats(){
  const wrap = $("seats");
  wrap.innerHTML = "";
  S.members.forEach(m => {
    const d = document.createElement("div");
    d.className = "seat" + (m.me ? " me" : "");
    d.textContent = m.av;
    d.title = m.name;
    wrap.appendChild(d);
  });
}

function bubble(who, text, cls){
  const thread = $("thread");
  const el = document.createElement("div");
  el.className = "msg " + (cls || "");
  if (cls === "sys"){
    el.innerHTML = '<div class="body"><div class="bub"></div></div>';
    el.querySelector(".bub").textContent = text;
  } else {
    el.innerHTML = '<div class="ava"></div><div class="body"><div class="nm"></div><div class="bub"></div></div>';
    el.querySelector(".ava").textContent = who.av;
    el.querySelector(".nm").textContent = who.name;
    el.querySelector(".bub").textContent = text;
  }
  thread.appendChild(el);
  thread.scrollTop = thread.scrollHeight;
  return el;
}

function typingThen(who, text, delay){
  const thread = $("thread");
  const t = document.createElement("div");
  t.className = "msg typing";
  t.innerHTML = '<div class="ava"></div><div class="body"><div class="bub"><i></i><i></i><i></i></div></div>';
  t.querySelector(".ava").textContent = who.av;
  thread.appendChild(t);
  thread.scrollTop = thread.scrollHeight;
  later(() => { t.remove(); bubble(who, text); }, delay);
}

function openDuoChat(p){
  clearTimers();
  S.group = "duo";
  S.partner = p;
  S.scriptIdx = 0;
  const L = p[lang];
  S.members = [
    {av: S.me.av, name: S.me.name, me: true},
    {av: p.av, name: L.n}
  ];
  $("thread").innerHTML = "";
  $("room-name").textContent = L.n;
  $("room-sub").textContent = roomSub();
  renderSeats(); refreshLeaveBtn();
  go("chat");
  bubble(null, T("sys_tapface"), "sys");
  // two opening lines land on their own; scriptIdx resumes from line 2 when you reply
  const who = S.members[1];
  const duoLine = i => DUO_SCRIPT[lang][Math.min(i, DUO_SCRIPT[lang].length - 1)];
  typingThen(who, duoLine(0), 900);
  later(() => typingThen(who, duoLine(1), 1100), 2600);
  S.scriptIdx = 2;
}

function matchPool(){
  return S.me.pref === "all" ? PROFILES : PROFILES.filter(p => p.g === S.me.pref);
}

function startDuo(){
  const pool = matchPool();
  S.deck = pool.slice();
  for (let i = S.deck.length - 1; i > 0; i--){          // shuffle so runs differ
    const j = rand(i + 1);
    [S.deck[i], S.deck[j]] = [S.deck[j], S.deck[i]];
  }
  S.deckIdx = 0;
  if (!S.deck.length) { finish(false); return; }        // preference left nobody
  renderDeck();
  go("duo");
}

/* ==================== gang room ==================== */
function startGang(){
  S.group = "gang";
  newRoom(false);
}

function newRoom(isReroll){
  clearTimers();
  S.room = pick(ROOMS);
  // store the SET index, not the lines — lines are resolved in the active
  // language at the moment each one fires
  S.scriptSet = rand(GANG_SCRIPTS[lang].length);
  S.scriptIdx = 0;
  S.secs = 24;
  S.confirmed = false;

  const pool = GANG_PEOPLE.slice();
  const three = [];
  for (let i = 0; i < 3; i++) three.push(pool.splice(rand(pool.length), 1)[0]);
  S.members = [{av: S.me.av, name: S.me.name, me: true}]
    .concat(three.map(p => ({av: p.av, name: p[lang], vote: null})));

  $("thread").innerHTML = "";
  $("room-name").textContent = S.room[lang];
  $("room-sub").textContent = roomSub();
  renderSeats(); refreshLeaveBtn();
  go("chat");

  bubble(null, isReroll ? T("sys_reroll", {n: S.rerolls}) : T("sys_join"), "sys");
  tickClock();
  scheduleGangChat();
}

const gangLines = () => GANG_SCRIPTS[lang][S.scriptSet] || [];
const gangLine  = i => { const L = gangLines(); return L[Math.min(i, L.length - 1)]; };

function scheduleGangChat(){
  const others = S.members.filter(m => !m.me);
  let t = 1200;
  gangLines().forEach((_, i) => {
    const who = others[i % others.length];
    later(() => typingThen(who, gangLine(i), 800), t);
    t += 2600 + rand(900);
  });
}

function tickClock(){
  const c = $("clock");
  c.textContent = "0:" + String(S.secs).padStart(2, "0");
  c.classList.toggle("urgent", S.secs <= 8);
  if (S.secs <= 0){
    bubble(null, T("sys_time"), "sys");
    later(openConfirm, 900);
    return;
  }
  S.secs--;
  later(tickClock, 1000);
}

$("leave").addEventListener("click", () => {
  clearTimers();
  bubble(null, T("sys_left"), "sys");
  S.rerolls++;
  updateLuck();
  setTimeout(() => newRoom(true), 700);
});

$("tovote").addEventListener("click", () => { clearTimers(); openConfirm(); });

$("composer").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("msg");
  const text = input.value.trim();
  if (!text) return;
  bubble(S.members[0], text, "me");
  input.value = "";
  if (S.group === "duo"){
    const line = DUO_SCRIPT[lang][Math.min(S.scriptIdx, DUO_SCRIPT[lang].length - 1)];
    S.scriptIdx++;
    typingThen(S.members[1], line, 800 + rand(500));
  } else {
    const others = S.members.filter(m => !m.me);
    if (others.length){
      const line = gangLine(S.scriptIdx++);
      if (line) typingThen(pick(others), line, 700 + rand(600));
    }
  }
});

/* ==================== confirm ==================== */
function openConfirm(){
  clearTimers();
  closeSheet();
  S.confirmed = false;
  $("cf-p").textContent = T(S.group === "duo" ? "cf_duo" : "cf_gang");
  $("cf-status").textContent = T("cf_wait");
  $("cf-yes").disabled = false;
  $("cf-no").hidden = false;
  renderVotes();
  go("confirm");
}

function renderVotes(){
  const wrap = $("votes");
  wrap.innerHTML = "";
  S.members.forEach(m => {
    const d = document.createElement("div");
    d.className = "vote";
    d.innerHTML = '<div class="face"></div><div class="nm"></div><div class="st"></div>';
    d.querySelector(".face").textContent = m.av;
    d.querySelector(".nm").textContent = m.name;
    wrap.appendChild(d);
    m.el = d;
  });
}

$("cf-no").addEventListener("click", () => {
  if (S.group === "duo") go("chat");
  else { S.secs = 12; go("chat"); tickClock(); scheduleGangChat(); }
});

$("cf-yes").addEventListener("click", () => {
  if (S.confirmed) return;
  S.confirmed = true;
  $("cf-yes").disabled = true;
  $("cf-no").hidden = true;
  $("cf-status").textContent = T("cf_counting");

  const me = S.members[0];
  me.el.classList.add("yes");
  me.el.querySelector(".st").textContent = "✅";

  const others = S.members.filter(m => !m.me);
  const base = S.group === "duo" ? 0.62 : 0.62;
  let yes = 1;

  others.forEach((m, i) => {
    later(() => {
      const ok = Math.random() < Math.min(0.95, base + luckBonus());
      if (ok) yes++;
      m.el.classList.add(ok ? "yes" : "no");
      m.el.querySelector(".st").textContent = ok ? "✅" : "❎";
      if (i === others.length - 1) later(() => resolveVote(yes), 900);
    }, 800 + i * 750);
  });
});

/* Gang: 3-4 confirmations seal the match. Exactly 2 is a near miss — the room
   dissolves and you are dropped straight into a new one (your luck carries over).
   Only a lone vote ends the run, and that is where the Lucky Dessert comes in. */
function resolveVote(yes){
  if (S.group === "duo") { finish(yes >= 2); return; }
  if (yes >= 3) { finish(true); return; }
  if (yes === 2) { nearMiss(yes); return; }
  finish(false);
}

function nearMiss(yes){
  clearTimers();
  $("cf-status").textContent = T("cf_near", {n: yes});
  S.rerolls++;
  updateLuck();
  setTimeout(() => newRoom(true), 2100);
}

/* ==================== results ==================== */
// Codes are generated once per result; the language-dependent copy around them
// re-renders whenever the language changes.
function renderResult(){
  const r = S.result;
  if (!r) return;
  if (r.won){
    $("win-sub").textContent = r.group === "duo" ? T("win_duo", {n: r.partner}) : T("win_gang");
    $("w-when").textContent = T("when_val");
    $("w-table").textContent = r.group === "duo" ? "A-04" : "B-11";
    $("w-who").textContent = T("people", {n: r.group === "duo" ? 2 : 4});
    $("w-code").textContent = r.code;
    $("w-vcode").textContent = r.vcode;
  } else {
    $("l-code").textContent = r.code;
  }
}

function finish(won){
  clearTimers();
  S.result = {
    won: won,
    group: S.group,
    partner: S.members[1] ? S.members[1].name : "",
    code: won ? code("FIRST") : code("DESSERT100"),
    vcode: won ? code("LUCKY10") : ""
  };
  store.set("mml.voucher", won ? "LUCKY10" : "DESSERT100");
  renderResult();
  go(won ? "win" : "lose");
}

document.querySelectorAll("[data-restart]").forEach(b => {
  b.addEventListener("click", () => {
    clearTimers();
    S.group = null; S.deckIdx = 0; S.deck = []; S.partner = null;
    S.members = []; S.scriptIdx = 0; S.confirmed = false; S.swiping = false;
    go("home");
  });
});

/* ==================== broth canvas ==================== */
(function broth(){
  const cv = $("broth");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, bubbles = [];

  function readColors(){
    const cs = getComputedStyle(document.documentElement);
    return {
      a: cs.getPropertyValue("--broth-a").trim(),
      b: cs.getPropertyValue("--broth-b").trim(),
      alpha: parseFloat(cs.getPropertyValue("--broth-alpha")) || .5
    };
  }
  let C = readColors();

  function resize(){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(14, Math.round(w * h / 26000));
    bubbles = Array.from({length: n}, () => spawn(true));
  }
  function spawn(anywhere){
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 30,
      r: 5 + Math.random() * 34,
      v: 0.12 + Math.random() * 0.42,
      drift: (Math.random() - 0.5) * 0.28,
      t: Math.random() * 6.28
    };
  }
  function frame(){
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < bubbles.length; i++){
      const b = bubbles[i];
      b.y -= b.v; b.t += 0.012;
      const x = b.x + Math.sin(b.t) * 14;
      const mix = Math.min(1, b.r / 34);
      const col = mix > .5 ? C.b : C.a;
      const g = ctx.createRadialGradient(x, b.y, 0, x, b.y, b.r);
      g.addColorStop(0, "rgba(" + col + "," + (C.alpha * 0.5) + ")");
      g.addColorStop(1, "rgba(" + col + ",0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, 6.2832); ctx.fill();
      if (b.y + b.r < -10) bubbles[i] = spawn(false);
    }
    requestAnimationFrame(frame);
  }
  window.addEventListener("resize", () => { resize(); C = readColors(); });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { C = readColors(); });
  resize();
  if (reduce){
    // one static frame, no motion
    ctx.clearRect(0, 0, w, h);
    bubbles.forEach(b => {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, "rgba(" + C.a + "," + (C.alpha * 0.4) + ")");
      g.addColorStop(1, "rgba(" + C.a + ",0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.2832); ctx.fill();
    });
  } else {
    frame();
  }
})();

/* ==================== boot ==================== */
renderAvatars();
loadMe();
applyLang();
updateLuck();
go("home");
