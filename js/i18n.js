"use strict";

/* ==================== i18n ==================== */
const I18N = {
th:{
  eyebrow:"Lucky Suki × แคมเปญ", tagline:"จับคู่ให้ดวงพาไป แล้วมาเจอกันที่หม้อเดียวกัน",
  lede:"<b>Match me Lucky</b> คือระบบจับคู่ออนไลน์ของร้าน Lucky Suki แมชสำเร็จก็ได้เหตุผลที่จะมาเจอกันจริง แมชไม่สำเร็จก็ยังได้ของหวานกลับบ้าน — ไม่มีใครออกจากเกมมือเปล่า",
  s1t:"เลือกกลุ่มของคุณ", s1d:"Lucky Duo หาคู่เดต หรือ Lucky Gang หาเพื่อนใหม่แบบ 4 คน",
  s2t:"เขียนข้อมูลที่อยากให้เขารู้", s2d:"ไบโอ ความสนใจ และน้ำซุปที่คุณเลือกเสมอ",
  s3t:"แมชในระบบออนไลน์", s3d:"ปัดโปรไฟล์ หรือเข้าห้องอัตโนมัติ แล้วกดยืนยันตอนจบ",
  s4t:"เจอกันจริงที่ Lucky Suki", s4d:"ทุกคนได้ voucher กลับบ้าน ไม่ว่าผลจะออกทางไหน",
  pwb:"ส่วนลด ฿50", pww:"First Visit ที่ร้าน แล้วรับ voucher ไว้ใช้ครั้งถัดไป",
  plb:"Lucky Dessert -10%", plw:"ดวงยังไม่มา แต่ของหวานมาแล้ว รับส่วนลด 10% ไปเลย",
  tb_home:"เลือกกลุ่มที่ใช่ของคุณ", tb_bio:"โปรไฟล์ของคุณ", tb_duo:"ปัดหาคนที่ใช่",
  tb_chat:"ห้องแชท", tb_confirm:"ตอนจบแล้ว", tb_win:"แมชสำเร็จ", tb_lose:"ยังไม่แมช",
  home_h:"วันนี้ดวงพาคุณไปทางไหน", home_p:"เลือกหนึ่งกลุ่ม แล้วปล่อยให้ระบบจับคู่ทำงาน",
  p2:"2 คน", p4:"4 คน",
  duo_nm:"หาคู่เดตของคุณ", duo_ds:"ปัดโปรไฟล์ทีละคน ถูกใจตรงกันเมื่อไหร่ก็เริ่มคุยได้เลย",
  gang_nm:"หาเพื่อนใหม่", gang_ds:"ระบบสุ่มห้อง 4 คนให้อัตโนมัติ ไม่ถูกใจก็กดออกเพื่อสุ่มใหม่ได้เรื่อยๆ",
  home_f:"ทุกการเล่นได้ voucher กลับบ้านเสมอ",
  bio_h:"ข้อมูลเราที่อยากให้เขารู้", bio_p:"ยิ่งเป็นตัวเอง ยิ่งเจอคนที่ใช่",
  l_name:"ชื่อเล่น", l_age:"อายุ", l_av:"รูปแทนตัว", l_bio:"แนะนำตัวสั้นๆ",
  l_tags:"ความสนใจ", l_broth:"น้ำซุปประจำตัว",
  l_gender:"เพศของเรา", l_pref:"อยากเดทกับ",
  pref_count:"มี {n} คนให้ปัดในโหมด Lucky Duo", pref_none:"ยังไม่มีใครตรงเงื่อนไขนี้ ลองเลือกทุกเพศดู",
  ph_name:"เรียกเราว่า…", ph_bio:"เล่าอะไรก็ได้ที่ทำให้เราน่าคุยด้วย", ph_msg:"พิมพ์อะไรสักอย่าง…",
  bio_go:"เริ่มหาคู่แมช", need_name:"ใส่ชื่อเล่นก่อนนะ",
  deck_empty:"โปรไฟล์วันนี้หมดแล้ว พรุ่งนี้ดวงใหม่มาอีกรอบ", deck_hint:"ลากการ์ดซ้ายขวา หรือกดปุ่มก็ได้",
  leave:"ออกจากห้อง → สุ่มใหม่", tovote:"ข้ามไปโหวตเลย",
  invite:"ชวนไปกินสุกี้ 💓", stay:"อยู่ต่อจนจบ",
  duo_yes:"ขอแมช 💓", duo_no:"ไม่แมช",
  sys_passed:"คุณเลือกไม่แมชกับ {n} · กำลังหาคนใหม่ให้…",
  sys_tapface:"แตะรูปหน้าเพื่อดูโปรไฟล์เต็ม แล้วเลือกว่าจะแมชไหม",
  cf_h:"ยืนยันแมชไหม", cf_yes:"ยืนยันแมช 💓", cf_no:"ยังก่อน กลับไปคุยต่อ",
  cf_wait:"กดยืนยันแล้วรอผลจากอีกฝ่าย", cf_counting:"กำลังรอผลโหวต…",
  cf_duo:"ถ้าทั้งคู่กดยืนยัน ระบบจะจองโต๊ะแรกให้ทันที",
  cf_gang:"ได้ 3-4 เสียงคือแมชเลย · ได้แค่ 2 เสียงจะสุ่มห้องใหม่ให้ทันที",
  cf_near:"ได้ {n} เสียง ยังไม่ถึง 3 · กำลังพาไปห้องใหม่…",
  again:"เล่นอีกครั้ง", retry:"ลองแมชใหม่อีกรอบ",
  t_when:"วันเวลา", t_table:"โต๊ะ", t_who:"มากันกี่คน", t_show:"แสดงโค้ดนี้ที่หน้าร้านเพื่อรับโต๊ะ",
  t_val:"ส่วนลด", t_use:"ใช้ได้", t_today:"วันนี้ ที่ Lucky Suki", t_show2:"ยื่นโค้ดนี้ที่เคาน์เตอร์ของหวาน",
  v_win:"ส่วนลด 50 บาท ครั้งถัดไป", v_win_s:"ใช้ได้หลังจบมื้อแรก ภายใน 60 วัน",
  v_lose:"Lucky Dessert · ส่วนลด 10%", v_lose_s:"ดวงยังไม่มา แต่ยังมีโต๊ะรอคุณอยู่",
  l_ttl:"ของหวานประจำวันของคุณ",
  when_val:"ศุกร์นี้ · 19:30",
  win_duo:"คุณกับ {n} ถูกใจตรงกัน โต๊ะแรกถูกจองให้แล้ว",
  win_gang:"แก๊งนี้ไปต่อ เจอกันที่ Lucky Suki",
  sys_join:"คุณเข้าห้องแล้ว · อยู่ในห้องจนหมดเวลาเพื่อได้สิทธิ์โหวต",
  sys_left:"ออกจากห้องเดิม กำลังสุ่มห้องใหม่…",
  sys_reroll:"สุ่มห้องใหม่ครั้งที่ {n} · ดวงสะสมเพิ่มขึ้น",
  sys_time:"หมดเวลาคุยแล้ว ถึงเวลายืนยัน",
  seatN:"{n} คนในห้อง", tonight:"คืนนี้",
  people:"{n} คน",
  burst_sub:"เริ่มคุยกับ {n} ได้เลย"
},
en:{
  eyebrow:"Lucky Suki × Campaign", tagline:"Let luck do the matching — meet over one hot pot",
  lede:"<b>Match me Lucky</b> is Lucky Suki's online matching game. Match, and you get a reason to meet for real. Don't match, and dessert is still on us — nobody leaves empty-handed.",
  s1t:"Pick your group", s1d:"Lucky Duo for a date, or Lucky Gang for a table of four",
  s2t:"Write what you want them to know", s2d:"Your bio, your interests, and the broth you always order",
  s3t:"Match online", s3d:"Swipe profiles or drop into an auto room, then confirm at the end",
  s4t:"Meet for real at Lucky Suki", s4d:"Everyone walks away with a voucher, either way",
  pwb:"฿50 off", pww:"First Visit at the restaurant, plus a voucher for next time",
  plb:"Lucky Dessert -10%", plw:"Luck's late, dessert isn't — take 10% off today",
  tb_home:"Choose your group", tb_bio:"Your profile", tb_duo:"Swipe to find them",
  tb_chat:"Chat room", tb_confirm:"Final call", tb_win:"Matched", tb_lose:"No match",
  home_h:"Where is luck taking you today?", home_p:"Pick one group and let the matcher work",
  p2:"2 people", p4:"4 people",
  duo_nm:"Find your date", duo_ds:"Swipe one profile at a time — like each other and the chat opens",
  gang_nm:"Find new friends", gang_ds:"Auto-dropped into a room of 4. Don't like it? Leave and reroll as often as you want",
  home_f:"Every play ends with a voucher",
  bio_h:"What you want them to know", bio_p:"The more you, the better the match",
  l_name:"Nickname", l_age:"Age", l_av:"Avatar", l_bio:"Short intro",
  l_tags:"Interests", l_broth:"Your broth",
  l_gender:"I am", l_pref:"I want to date",
  pref_count:"{n} people to swipe in Lucky Duo", pref_none:"Nobody matches that yet — try Everyone",
  ph_name:"Call me…", ph_bio:"Anything that makes you worth talking to", ph_msg:"Say something…",
  bio_go:"Start matching", need_name:"Add a nickname first",
  deck_empty:"That's everyone for today. New luck tomorrow.", deck_hint:"Drag the card, or use the buttons",
  leave:"Leave room → reroll", tovote:"Skip to the vote",
  invite:"Ask them to suki 💓", stay:"Stay till the end",
  duo_yes:"Ask to match 💓", duo_no:"Pass",
  sys_passed:"You passed on {n} · finding someone new…",
  sys_tapface:"Tap their photo for the full profile, then decide",
  cf_h:"Confirm the match?", cf_yes:"Confirm match 💓", cf_no:"Not yet, keep chatting",
  cf_wait:"Confirm, then wait for their answer", cf_counting:"Counting votes…",
  cf_duo:"If you both confirm, we book your first table right away",
  cf_gang:"3-4 votes and you are matched · only 2 and we find you a new room",
  cf_near:"{n} votes, 3 needed · moving you to a new room…",
  again:"Play again", retry:"Try matching again",
  t_when:"When", t_table:"Table", t_who:"Party", t_show:"Show this code at the door for your table",
  t_val:"Discount", t_use:"Valid", t_today:"Today, at Lucky Suki", t_show2:"Hand this code to the dessert counter",
  v_win:"฿50 off next time", v_win_s:"Valid after your first meal, for 60 days",
  v_lose:"Lucky Dessert · 10% off", v_lose_s:"Luck's late, but a table is still waiting",
  l_ttl:"Your dessert of the day",
  when_val:"This Friday · 7:30 PM",
  win_duo:"You and {n} liked each other. First table is booked.",
  win_gang:"This gang is on. See you at Lucky Suki.",
  sys_join:"You joined · stay till the timer ends to earn a vote",
  sys_left:"Left the room. Finding a new one…",
  sys_reroll:"Reroll #{n} · your luck went up",
  sys_time:"Time's up. Final call.",
  seatN:"{n} in the room", tonight:"tonight",
  people:"{n} people",
  burst_sub:"Say hi to {n}"
}};

let lang = store.get("mml.lang") === "en" ? "en" : "th";
const T = (k, vars) => {
  let s = (I18N[lang] && I18N[lang][k]) || k;
  if (vars) for (const p in vars) s = s.replace("{" + p + "}", vars[p]);
  return s;
};

function applyLang(){
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = T(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = T(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = T(el.dataset.i18nPh); });
  document.getElementById("lang").textContent = lang === "th" ? "EN" : "TH";
  document.documentElement.lang = lang;
  renderTags(); renderBroth();
  if (S.screen) setTopbar(S.screen);
  if (S.screen === "duo") renderDeck();
  if (S.screen === "chat") { document.getElementById("room-sub").textContent = roomSub(); refreshLeaveBtn(); }
  if (S.screen === "confirm") document.getElementById("cf-p").textContent = T(S.group === "duo" ? "cf_duo" : "cf_gang");
  if (S.screen === "win" || S.screen === "lose") renderResult();
  if (!document.getElementById("sheet").hidden) openSheet();
}
