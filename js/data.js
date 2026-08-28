"use strict";

/* ==================== data ==================== */
const AVATARS = [
  {skin:"#F6D3B0", hair:"#2B1A12", style:"long",     bg:"#F6DCC8", shirt:"#C21F26"},
  {skin:"#EFC098", hair:"#1C1C22", style:"short",    bg:"#EFD8C4", shirt:"#8C6106"},
  {skin:"#E0A87C", hair:"#4A2B18", style:"bun",      bg:"#F3DBC6", shirt:"#7A2E2E"},
  {skin:"#C98A5F", hair:"#2B1A12", style:"curly",    bg:"#EEDAC6", shirt:"#A8541C"},
  {skin:"#F6D3B0", hair:"#7A4A24", style:"bob",      bg:"#F7E0CE", shirt:"#5B4A8C"},
  {skin:"#A76E48", hair:"#1C1C22", style:"buzz",     bg:"#EBD6C2", shirt:"#1F6B57"},
  {skin:"#EFC098", hair:"#8C5A2B", style:"ponytail", bg:"#F5DFCB", shirt:"#C21F26"},
  {skin:"#E0A87C", hair:"#2B1A12", style:"beard",    bg:"#F1DAC5", shirt:"#2E4E8C"},
  {skin:"#F6D3B0", hair:"#5B3A2A", style:"wavy",     bg:"#F7E2D2", shirt:"#B8477A"},
  {skin:"#C98A5F", hair:"#4A2B18", style:"chef",     bg:"#EFDAC7", shirt:"#8C6106"}
];

const TAGS = [
  {id:"cafe",  th:"คาเฟ่ฮอปปิ้ง", en:"café hopping"},
  {id:"film",  th:"ดูหนัง",       en:"films"},
  {id:"gym",   th:"ออกกำลังกาย",  en:"working out"},
  {id:"music", th:"ฟังเพลงสด",    en:"live music"},
  {id:"cat",   th:"ทาสแมว",       en:"cat person"},
  {id:"game",  th:"บอร์ดเกม",     en:"board games"},
  {id:"travel",th:"เที่ยวต่างจังหวัด", en:"weekend trips"},
  {id:"cook",  th:"ทำอาหาร",      en:"cooking"},
  {id:"photo", th:"ถ่ายรูป",      en:"photography"},
  {id:"night", th:"สายกินดึก",    en:"late-night eater"}
];

const BROTHS = [
  {id:"tomyum", th:"ต้มยำ",   en:"tom yum"},
  {id:"clear",  th:"น้ำใส",   en:"clear"},
  {id:"tonkotsu",th:"ทงคตสึ", en:"tonkotsu"},
  {id:"miso",   th:"มิโซะ",   en:"miso"}
];

const GENDERS = [
  {id:"f", sym:"♀", th:"หญิง",   en:"Woman"},
  {id:"m", sym:"♂", th:"ชาย",   en:"Man"},
  {id:"x", sym:"⚧", th:"LGBTQ+", en:"LGBTQ+"}
];

const DATE_PREFS = [
  {id:"f",   th:"ผู้หญิง", en:"Women"},
  {id:"m",   th:"ผู้ชาย",  en:"Men"},
  {id:"all", th:"ทุกเพศ",   en:"Everyone"}
];

const PROFILES = [
  {av:{skin:"#F6D3B0", hair:"#2B1A12", style:"long",     bg:"#F7DCC9", shirt:"#C21F26"}, age:24, g:"f", chance:.62,
   th:{n:"ใบเฟิร์น",job:"ครีเอทีฟเอเจนซี่",bio:"เลิกงานสามทุ่มแต่ยังไหวถ้าเป็นหม้อไฟ ขอจองหน้าที่ตักลูกชิ้นให้",tg:["คาเฟ่ฮอปปิ้ง","ดูหนังผี","ต้มยำเผ็ดสุด"]},
   en:{n:"Baifern",job:"creative agency",bio:"Off work at nine and still up for hot pot. I'm calling dibs on ladling the meatballs.",tg:["café hopping","horror films","extra-spicy tom yum"]}},
  {av:{skin:"#EFC098", hair:"#1C1C22", style:"short",    bg:"#EAD6C2", shirt:"#2E4E8C"}, age:27, g:"m", chance:.55,
   th:{n:"ตะวัน",job:"โปรดิวเซอร์เพลง",bio:"มีเพลย์ลิสต์สำหรับทุกอารมณ์ รวมถึงอารมณ์รอน้ำซุปเดือด",tg:["อินดี้","วิ่งสวนลุม","ซุปกระดูกหมู"]},
   en:{n:"Tawan",job:"music producer",bio:"I have a playlist for every mood, including waiting-for-the-broth-to-boil.",tg:["indie","running","pork bone broth"]}},
  {av:{skin:"#E0A87C", hair:"#4A2B18", style:"curly",    bg:"#F2DAC6", shirt:"#1F6B57"}, age:23, g:"f", chance:.6,
   th:{n:"มะปราง",job:"นักเรียนสัตวแพทย์",bio:"เลี้ยงแมวสามตัว กินผักมากกว่าเนื้อ แต่ไม่เคยพลาดเต้าหู้ไข่",tg:["ทาสแมว","ปลูกต้นไม้","น้ำใส"]},
   en:{n:"Maprang",job:"vet student",bio:"Three cats, more veggies than meat, but I never skip the egg tofu.",tg:["cat person","plants","clear broth"]}},
  {av:{skin:"#C98A5F", hair:"#2B1A12", style:"beard",    bg:"#EAD5C0", shirt:"#8C6106"}, age:29, g:"m", chance:.5,
   th:{n:"กันต์",job:"วิศวกร",bio:"เถียงเรื่องจิ้มจุ่มกับสุกี้ได้ยาวสองชั่วโมง เตรียมตัวมาดีๆ",tg:["บาส","บอร์ดเกม","น้ำจิ้มสูตรลับ"]},
   en:{n:"Kan",job:"engineer",bio:"I can argue jim jum versus suki for two hours straight. Come prepared.",tg:["basketball","board games","secret dipping sauce"]}},
  {av:{skin:"#F6D3B0", hair:"#8C5A2B", style:"ponytail", bg:"#F7E1D0", shirt:"#B8477A"}, age:26, g:"f", chance:.58,
   th:{n:"ปูเป้",job:"ช่างภาพอิสระ",bio:"ถ่ายรูปอาหารก่อนกินทุกครั้ง ขอเวลา 15 วิ สัญญาว่าไม่นาน",tg:["ฟิล์ม","เชียงใหม่","หมูสไลด์"]},
   en:{n:"Poupée",job:"freelance photographer",bio:"I photograph every dish before eating. Fifteen seconds, I promise.",tg:["film cameras","Chiang Mai","sliced pork"]}},
  {av:{skin:"#E0A87C", hair:"#2B1A12", style:"chef",     bg:"#F0DAC6", shirt:"#A8541C"}, age:25, g:"m", chance:.65,
   th:{n:"อาร์ม",job:"ผู้ช่วยเชฟ",bio:"ทำอาหารให้คนอื่นทั้งวัน วันหยุดเลยอยากให้ใครสักคนตักให้บ้าง",tg:["ทำขนม","วิ่งเทรล","มิโซะ"]},
   en:{n:"Arm",job:"line cook",bio:"I cook for people all day. On my day off I'd like someone to serve me for once.",tg:["baking","trail running","miso"]}},
  {av:{skin:"#EFC098", hair:"#7A4A24", style:"wavy",     bg:"#F5DFCC", shirt:"#5B4A8C"}, age:28, g:"f", chance:.6,
   th:{n:"แพรว",job:"ครูสอนโยคะ",bio:"ตื่นตีห้าทุกวัน แต่ยอมอดนอนเพื่อหม้อไฟรอบดึกได้เสมอ",tg:["โยคะ","ตลาดนัด","เต้าหู้อ่อน"]},
   en:{n:"Praew",job:"yoga teacher",bio:"Up at five every day, but I'll always lose sleep for a late-night pot.",tg:["yoga","farmers markets","silken tofu"]}},
  {av:{skin:"#A76E48", hair:"#1C1C22", style:"buzz",     bg:"#E9D4C0", shirt:"#C21F26"}, age:26, g:"m", chance:.57,
   th:{n:"โต้ง",job:"บาริสต้า",bio:"จำสูตรกาแฟลูกค้าได้ทุกคน แต่จำชื่อตัวเองไม่ค่อยได้",tg:["กาแฟ","แผ่นเสียง","ซุปต้มยำ"]},
   en:{n:"Tong",job:"barista",bio:"I remember every regular's order but not always my own name.",tg:["coffee","vinyl","tom yum broth"]}},
  {av:{skin:"#F6D3B0", hair:"#5B3A2A", style:"bob",      bg:"#F6E0CE", shirt:"#1F6B57"}, age:25, g:"x", chance:.63,
   th:{n:"มินท์",job:"กราฟิกดีไซเนอร์",bio:"เลือกสีนานกว่าเลือกเมนู ขอโทษล่วงหน้า",tg:["งานคราฟต์","สะสมสติกเกอร์","เห็ดหอม"]},
   en:{n:"Mint",job:"graphic designer",bio:"I take longer picking a colour than picking a dish. Apologising in advance.",tg:["craft fairs","stickers","shiitake"]}},
  {av:{skin:"#C98A5F", hair:"#4A2B18", style:"bun",      bg:"#EFD9C5", shirt:"#8C6106"}, age:27, g:"x", chance:.6,
   th:{n:"เรน",job:"นักเขียนอิสระ",bio:"เขียนงานตอนตีสอง กินข้าวตอนตีสาม หาคนนอนดึกเหมือนกัน",tg:["หนังสือ","ร้านเหล้าเล็กๆ","วุ้นเส้น"]},
   en:{n:"Rain",job:"freelance writer",bio:"I write at 2am and eat at 3am. Looking for someone on the same schedule.",tg:["books","tiny bars","glass noodles"]}}
];

const DUO_SCRIPT = {
  th:["สวัสดี! เห็นในโปรไฟล์ว่าชอบกินดึกเหมือนกัน 👀","ปกติสั่งน้ำซุปอะไรอะ เราต้มยำตลอด",
      "เผ็ดได้แค่ไหน ถามไว้ก่อนจะได้ไม่ต้องแย่งหม้อกัน 😆","ถ้ามีเวลาว่างศุกร์นี้ ไปลองร้านนี้กันไหม",
      "โอเคเลย งั้นเจอกันนะ 🍲"],
  en:["Hi! Your profile says late-night eater too 👀","What broth do you usually order? I'm tom yum, always.",
      "How spicy can you go? Asking so we don't fight over the pot 😆","If Friday's free, want to try this place?",
      "Perfect — see you there 🍲"]
};

const GANG_PEOPLE = [
  {av:{skin:"#EFC098", hair:"#8C5A2B", style:"short",    bg:"#EFD9C5", shirt:"#C21F26"}, th:"โดโด้", en:"Dodo"}, {av:{skin:"#F6D3B0", hair:"#7A4A24", style:"long",     bg:"#F7E0CE", shirt:"#B8477A"}, th:"น้ำผึ้ง", en:"Peung"},
  {av:{skin:"#C98A5F", hair:"#1C1C22", style:"curly",    bg:"#EBD6C1", shirt:"#1F6B57"}, th:"ปลาหมึก", en:"Muek"}, {av:{skin:"#E0A87C", hair:"#2B1A12", style:"bun",      bg:"#F1DAC6", shirt:"#8C6106"}, th:"อุ๋ย", en:"Ou"},
  {av:{skin:"#A76E48", hair:"#2B1A12", style:"beard",    bg:"#E8D3BF", shirt:"#2E4E8C"}, th:"หมีพู", en:"Poo"}, {av:{skin:"#F6D3B0", hair:"#5B3A2A", style:"buzz",     bg:"#F6E1D0", shirt:"#A8541C"}, th:"เพนกวิน", en:"Pen"},
  {av:{skin:"#EFC098", hair:"#4A2B18", style:"ponytail", bg:"#F2DCC8", shirt:"#5B4A8C"}, th:"พริก", en:"Prik"}, {av:{skin:"#C98A5F", hair:"#2B1A12", style:"bob",      bg:"#EEDAC6", shirt:"#C21F26"}, th:"เส้นใหญ่", en:"Yai"},
  {av:{skin:"#F6D3B0", hair:"#1C1C22", style:"wavy",     bg:"#F7E2D2", shirt:"#1F6B57"}, th:"ฟ็อกซ์", en:"Fox"}, {av:{skin:"#E0A87C", hair:"#8C5A2B", style:"short",    bg:"#F0DBC7", shirt:"#8C6106"}, th:"วาฬ", en:"Wan"}
];

const ROOMS = [
  {th:"โต๊ะ 7 · หม้อต้มยำ", en:"Table 7 · Tom Yum Pot"},
  {th:"โต๊ะ 12 · หม้อน้ำใส", en:"Table 12 · Clear Pot"},
  {th:"โต๊ะ 3 · หม้อคู่", en:"Table 3 · Split Pot"},
  {th:"โต๊ะ 21 · หม้อมิโซะ", en:"Table 21 · Miso Pot"},
  {th:"โต๊ะ 9 · หม้อเผ็ดสุด", en:"Table 9 · Devil Pot"}
];

const GANG_SCRIPTS = {
  th:[
    ["ห้องนี้เงียบจัง ทักก่อนละกัน 👋","ใครสั่งเผ็ดได้บ้าง ยกมือ 🙋","เราเผ็ดน้อยแต่กินเยอะ ชดเชยกันได้ปะ 😂",
     "เอาจริงๆ สุกี้ต้องมีวุ้นเส้น ไม่มีไม่ได้","งั้นนัดกันจริงจังเลยไหม","โอเค เราว่าห้องนี้ใช้ได้นะ 🍲"],
    ["มาแล้วครับ มาจากอ่อนนุช 🚇","เราเพิ่งเลิกงาน หิวมาก","ใครกินเนื้อ ใครกินหมู แบ่งฝั่งหม้อกันเลย",
     "ขอโหวตน้ำจิ้มสูตรร้านนะ อย่ามาผสมเอง 😤","แก๊งนี้ดูจะกินได้จริง","เอาด้วย นัดวันเลย"],
    ["ใครมาจากฝั่งธนบ้าง ✋","เราเป็นสายของหวานก่อนกินข้าว ผิดไหม","ไม่ผิด แต่ต้องแบ่ง 😆",
     "งั้นเรารับหน้าที่จองโต๊ะละกัน","ห้องนี้พลังงานดีมาก","อยู่ต่อดีกว่า ไม่สุ่มแล้ว"]
  ],
  en:[
    ["Quiet room — I'll go first 👋","Who can handle spicy? Hands up 🙋","Low spice, high volume. Balances out, right? 😂",
     "Honestly, suki without glass noodles isn't suki","Should we actually plan this?","Okay, this room works for me 🍲"],
    ["Here! Coming from On Nut 🚇","Just got off work, starving","Beef people, pork people — split the pot",
     "Voting for the house sauce. No custom mixing 😤","This gang can actually eat","I'm in. Let's pick a day"],
    ["Anyone from Thonburi side? ✋","I'm a dessert-before-dinner person. Wrong?","Not wrong, but you're sharing 😆",
     "I'll take booking duty then","Good energy in this room","Staying. No more rerolls."]
  ]
};
