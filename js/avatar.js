"use strict";

/* ==================== cartoon avatars ====================
   Drawn as inline SVG rather than emoji: emoji are font glyphs, so they
   change shape per device and ZWJ sequences (👩‍🦱) fall apart or vanish
   where the font lacks them. These render identically everywhere. */

const SKINS = ["#F6D3B0","#EFC098","#E0A87C","#C98A5F","#A76E48"];
const HAIRS = ["#2B1A12","#4A2B18","#7A4A24","#1C1C22","#8C5A2B","#5B3A2A"];

function hairPath(style, hair){
  const cap = '<path d="M28 44c0-15 9-24 22-24s22 9 22 24c0-9-7-13-22-13S28 35 28 44z" fill="'+hair+'"/>';
  switch(style){
    case "long":
      return '<path d="M26 42c0-16 10-24 24-24s24 8 24 24v34c0 3-4 4-6 1V48H32v29c0 3-6 2-6-1z" fill="'+hair+'"/>' + cap;
    case "bob":
      return '<path d="M26 44c0-16 10-24 24-24s24 8 24 24v16c0 3-5 3-6 0V48H32v12c0 3-6 3-6 0z" fill="'+hair+'"/>' + cap;
    case "wavy":
      return '<path d="M26 42c0-16 10-24 24-24s24 8 24 24v28q0 6-4 8-3-4 0-8V48H32v22q3 4 0 8-4-2-4-8z" fill="'+hair+'"/>' + cap;
    case "curly":
      return '<g fill="'+hair+'"><circle cx="34" cy="34" r="9"/><circle cx="46" cy="28" r="10"/>'
           + '<circle cx="58" cy="29" r="9"/><circle cx="67" cy="36" r="8"/></g>' + cap;
    case "bun":
      return '<circle cx="50" cy="15" r="8" fill="'+hair+'"/>' + cap;
    case "ponytail":
      return cap + '<path d="M71 36q10 4 9 16t-8 14q5-9 2-16t-6-10z" fill="'+hair+'"/>';
    case "buzz":
      return '<path d="M30 43c0-13 8-21 20-21s20 8 20 21c0-7-7-10-20-10s-20 3-20 10z" fill="'+hair+'"/>';
    case "beard":
      return cap + '<path d="M29 45q1 26 21 26t21-26q2 16-4 25-6 8-17 8t-17-8q-6-9-4-25z" fill="'+hair+'" opacity=".92"/>';
    case "chef":
      return cap + '<path d="M32 22q-7-1-7-7t7-6q1-6 8-6t10 4q3-4 10-4t8 6q7 0 7 6t-7 7z" fill="#FFF8EE"/>'
                 + '<rect x="31" y="20" width="38" height="6" rx="3" fill="#F1E3D0"/>';
    default: // "short"
      return cap;
  }
}

// one cartoon portrait; square, meant to sit inside a round container
function avatarSVG(a){
  if (!a) a = AVATARS[0];
  const skin = a.skin, hair = a.hair;
  return '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'
    + '<rect width="100" height="100" fill="' + a.bg + '"/>'
    + '<path d="M10 100c0-20 18-30 40-30s40 10 40 30z" fill="' + a.shirt + '"/>'
    + '<path d="M43 58h14v15a7 7 0 0 1-14 0z" fill="' + skin + '" opacity=".82"/>'
    + '<circle cx="28" cy="48" r="4.6" fill="' + skin + '"/><circle cx="72" cy="48" r="4.6" fill="' + skin + '"/>'
    + '<path d="M50 21c-13 0-21 9-21 22s9 25 21 25 21-12 21-25-8-22-21-22z" fill="' + skin + '"/>'
    + hairPath(a.style, hair)
    + '<ellipse cx="41.5" cy="46" rx="2.4" ry="3" fill="#3B2A22"/>'
    + '<ellipse cx="58.5" cy="46" rx="2.4" ry="3" fill="#3B2A22"/>'
    + '<circle cx="42.4" cy="45" r=".9" fill="#FFF" opacity=".9"/>'
    + '<circle cx="59.4" cy="45" r=".9" fill="#FFF" opacity=".9"/>'
    + '<path d="M37.5 39.5q4-2.5 8-.6" stroke="' + hair + '" stroke-width="1.7" fill="none" stroke-linecap="round"/>'
    + '<path d="M54.5 38.9q4-1.9 8 .6" stroke="' + hair + '" stroke-width="1.7" fill="none" stroke-linecap="round"/>'
    + '<ellipse cx="35.5" cy="53" rx="4" ry="2.3" fill="#E2726E" opacity=".4"/>'
    + '<ellipse cx="64.5" cy="53" rx="4" ry="2.3" fill="#E2726E" opacity=".4"/>'
    + '<path d="M45 55.5q5 4.6 10 0" stroke="#8E4436" stroke-width="1.9" fill="none" stroke-linecap="round"/>'
    + '</svg>';
}

// paint a cartoon into any round container
function setAvatar(el, spec){ if (el) el.innerHTML = avatarSVG(spec); }
