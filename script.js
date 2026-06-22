document.getElementById('footYear') && (document.getElementById('footYear').textContent = new Date().getFullYear());

/* ==========================================
   PRELOADER
   ========================================== */
(function(){
  const pre    = document.getElementById('preloader');
  const fill   = document.getElementById('preFill');
  const status = document.getElementById('preStatus');
  if(!pre) return;

  const msgs = [
    '> initializing system...',
    '> loading security modules...',
    '> decrypting profile data...',
    '> access granted ✓'
  ];
  let prog = 0, mi = 0;

  const t = setInterval(()=>{
    prog += Math.random()*14 + 4;
    if(prog > 100) prog = 100;
    fill.style.width = prog + '%';
    const idx = Math.min(Math.floor(prog/26), msgs.length-1);
    if(idx > mi){ mi = idx; if(status) status.textContent = msgs[mi]; }
    if(prog >= 100){
      clearInterval(t);
      if(status) status.textContent = msgs[3];
      setTimeout(()=>{ pre.classList.add('gone'); }, 650);
    }
  }, 65);
})();

/* ==========================================
   MATRIX RAIN
   ========================================== */
(function(){
  const canvas = document.getElementById('matrix');
  if(!canvas) return;
  const ctx  = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF><{}[]//\\|';
  const fs = 13;
  let cols, drops;

  function resize(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / fs);
    drops = Array(cols).fill(1);
  }

  function draw(){
    ctx.fillStyle = 'rgba(5,10,15,0.055)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    drops.forEach((y,i)=>{
      const bright = Math.random() > 0.95;
      ctx.fillStyle = bright ? '#ffffff' : '#00ff41';
      ctx.font = fs + 'px monospace';
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*fs, y*fs);
      if(y*fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 48);
})();

/* ==========================================
   TEXT SCRAMBLE
   ========================================== */
function scrambleText(el, finalText, duration){
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$<>/\\|{}~';
  let frame = 0;
  const total = Math.ceil((duration || 900) / 25);
  const t = setInterval(()=>{
    let out = '';
    for(let i = 0; i < finalText.length; i++){
      if(finalText[i] === ' '){ out += ' '; continue; }
      if(frame / total > i / finalText.length){
        out += finalText[i];
      } else {
        out += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = out;
    if(++frame > total){ el.textContent = finalText; clearInterval(t); }
  }, 25);
}

/* Scramble hero name on page load */
window.addEventListener('load', ()=>{
  const el = document.getElementById('heroName');
  if(!el) return;
  const txt = el.textContent.trim();
  el.textContent = '';
  setTimeout(()=> scrambleText(el, txt, 1100), 900);
});

/* ==========================================
   HERO NAME GLITCH (random)
   ========================================== */
function scheduleGlitch(){
  const el = document.getElementById('heroName');
  if(!el) return;
  el.classList.add('glitching');
  setTimeout(()=> el.classList.remove('glitching'), 300);
  setTimeout(scheduleGlitch, Math.random() * 5000 + 4000);
}
setTimeout(scheduleGlitch, 3500);

/* ==========================================
   SCROLL PROGRESS
   ========================================== */
const scrollProg = document.getElementById('scrollProg');
window.addEventListener('scroll', ()=>{
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  if(scrollProg) scrollProg.style.width = pct + '%';
}, {passive:true});

/* ==========================================
   NAVBAR
   ========================================== */
const nav   = document.getElementById('nav');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', ()=>{
  if(!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 50);
  if(toTop) toTop.classList.toggle('show', window.scrollY > 400);
}, {passive:true});

if(toTop) toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ==========================================
   HAMBURGER MENU
   ========================================== */
const burger  = document.getElementById('burger');
const navList = document.getElementById('navList');

if(burger && navList){
  burger.addEventListener('click', ()=>{
    burger.classList.toggle('open');
    navList.classList.toggle('open');
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    burger.classList.remove('open');
    navList.classList.remove('open');
  }));
}

/* ==========================================
   ACTIVE NAV LINK
   ========================================== */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('#navList a');

new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navAs.forEach(a=> a.classList.remove('act'));
      const m = document.querySelector(`#navList a[href="#${e.target.id}"]`);
      if(m) m.classList.add('act');
    }
  });
}, { threshold: 0.35 }).observe && sections.forEach(s=>{
  new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        navAs.forEach(a=> a.classList.remove('act'));
        const m = document.querySelector(`#navList a[href="#${e.target.id}"]`);
        if(m) m.classList.add('act');
      }
    });
  }, { threshold: 0.35 }).observe(s);
});

/* ==========================================
   HERO ROLE TYPING EFFECT
   ========================================== */
(function(){
  const el = document.getElementById('roleText');
  if(!el) return;
  const roles = [
    'Bug Bounty Hunter',
    'Penetration Tester',
    'Cybersecurity Researcher',
    'Ethical Hacker',
    'Vulnerability Analyst'
  ];
  let ri = 0, ci = 0, deleting = false;

  function tick(){
    const word = roles[ri];
    if(!deleting){
      el.textContent = '> ' + word.slice(0, ++ci) + '_';
      if(ci === word.length){ deleting = true; setTimeout(tick, 1900); return; }
    } else {
      el.textContent = '> ' + word.slice(0, --ci) + '_';
      if(ci === 0){ deleting = false; ri = (ri+1) % roles.length; setTimeout(tick, 400); return; }
    }
    setTimeout(tick, deleting ? 42 : 88);
  }
  setTimeout(tick, 1400);
})();

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
function animCount(el){
  const target = +el.dataset.target;
  const dur = 1800, step = target / (dur/16);
  let cur = 0;
  const t = setInterval(()=>{
    cur += step;
    if(cur >= target){ el.textContent = target; clearInterval(t); return; }
    el.textContent = Math.floor(cur);
  }, 16);
}

new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ animCount(e.target); e.target.io?.disconnect(); } });
}, { threshold: 0.6 });

document.querySelectorAll('.hs-num[data-target]').forEach(el=>{
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ animCount(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  obs.observe(el);
});

/* ==========================================
   SKILL BAR ANIMATION + GLOW PULSE
   ========================================== */
document.querySelectorAll('.sk-fill[data-w]').forEach(el=>{
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.width = (e.target.dataset.w||'0') + '%';
        setTimeout(()=> e.target.classList.add('done'), 1350);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  obs.observe(el);
});

/* ==========================================
   SECTION HEAD LINE + SCRAMBLE
   ========================================== */
document.querySelectorAll('.sec-head').forEach(el=>{
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('line-on');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});

/* ==========================================
   REVEAL ON SCROLL
   ========================================== */
const revObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('vis'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.07 });

document.querySelectorAll(
  '.hof-card, .letter, .acc-card, .cert-sm, .cert-big, .terminal-card, .tool-tag'
).forEach(el=>{ el.classList.add('revel'); revObs.observe(el); });

/* ==========================================
   CONTACT FORM
   ========================================== */
function sendMsg(e){
  e.preventDefault();
  const f = e.target;
  const name    = f.querySelector('[name=name]')?.value.trim()    || '';
  const email   = f.querySelector('[name=email]')?.value.trim()   || '';
  const subject = f.querySelector('[name=subject]')?.value        || 'Message from website';
  const message = f.querySelector('[name=message]')?.value.trim() || '';
  const btn = f.querySelector('button[type=submit]');
  if(btn){ btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; }
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:nnb66n@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setTimeout(()=>{
    showToast('✓ Mail app opened — send from there');
    if(btn){ btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; }
    f.reset();
  }, 1200);
  return false;
}

/* ==========================================
   LANGUAGE SWITCHER
   ========================================== */
const translations = {
  en: {
    'nav.home':'Home','nav.about':'About','nav.hof':'Hall of Fame',
    'nav.certs':'Certs','nav.letters':'Letters','nav.accounts':'Accounts',
    'nav.arsenal':'Arsenal','nav.collaborate':'Collaborate','nav.contact':'Contact',
    'hero.tag':'Cybersecurity Researcher',
    'hero.stat1':'Hall of Fame','hero.stat2':'Vulnerabilities',
    'hero.stat3':'Years Exp','hero.stat4':'Certified',
    'hero.btn1':'Hall of Fame',
    'about.head':'About Me','about.skills':'Technical Skills','about.tools':'Tools',
    'hof.head':'Hall of Fame',
    'hof.sub':'Officially recognized by global institutions for discovering security vulnerabilities',
    'hof.cat1':'U.S. Government Agencies','hof.cat2':'Global Companies','hof.cat3':'Iraqi Institutions',
    'certs.head':'Certifications',
    'certs.desc':'Certified penetration tester covering Network Attacks, Web Application Attacks, Metasploit Framework, and Enumeration techniques.',
    'letters.head':'Appreciation Letters',
    'letters.sub':'Official letters from Iraqi institutions recognizing my cybersecurity contributions',
    'letter1.org':'Al-Mansour University College',
    'letter2.org':'Digital Information Center',
    'letter3.org':'Al-Abbasi Holy Shrine',
    'letter4.org':'Al-Mustansiriya University',
    'accounts.head':'My Accounts',
    'arsenal.head':'My Arsenal',
    'arsenal.sub':'Hardware & software setup used for security research and company testing',
    'ars1.name':'Primary Machine',       'ars1.spec':'Kali Linux · Custom Pentesting Build',
    'ars2.name':'Network Interceptor',   'ars2.spec':'WiFi Testing · Packet Analysis · MITM',
    'ars3.name':'Web Testing Suite',     'ars3.spec':'Burp Suite · Proxies · Fuzzing',
    'ars4.name':'Recon Platform',        'ars4.spec':'OSINT · Footprinting · Intelligence',
    'ars5.name':'Virtual Lab',           'ars5.spec':'Isolated Environments · Safe Testing',
    'ars6.name':'Cloud Infrastructure',  'ars6.spec':'VPS · Remote Testing · Payload Hosting',
    'collab.head':"Let's Collaborate",'collab.popular':'Most Popular',
    'collab.sub':'Available for security engagements, consultations, and responsible disclosure partnerships',
    'collab1.title':'Bug Bounty Hunting','collab2.title':'Penetration Testing',
    'collab3.title':'Security Consultation','collab4.title':'Security Training',
    'contact.head':'Get In Touch',
    'form.name':'Full Name','form.email':'Email Address',
    'form.subject':'Subject','form.msg':'Message',
    'form.namePh':'Your full name','form.msgPh':'Write your message here...',
    'form.send':'Send Message',
    'foot.name':'Mohammed Faris Musa Al-Hadhrawi',
  },
  ar: {
    'nav.home':'الرئيسية','nav.about':'عني','nav.hof':'قاعة الشرف',
    'nav.certs':'الشهادات','nav.letters':'كتب الشكر','nav.accounts':'حساباتي',
    'nav.arsenal':'ترسانتي','nav.collaborate':'تعاون','nav.contact':'تواصل',
    'hero.tag':'باحث في الأمن السيبراني',
    'hero.stat1':'قاعة الشرف','hero.stat2':'ثغرة مكتشفة',
    'hero.stat3':'سنة خبرة','hero.stat4':'شهادة معتمدة',
    'hero.btn1':'قاعة الشرف',
    'about.head':'عني','about.skills':'المهارات التقنية','about.tools':'الأدوات',
    'hof.head':'قاعة الشرف',
    'hof.sub':'معترف بي رسمياً من مؤسسات عالمية لاكتشاف ثغرات أمنية',
    'hof.cat1':'الجهات الحكومية الأمريكية','hof.cat2':'الشركات العالمية','hof.cat3':'المؤسسات العراقية',
    'certs.head':'الشهادات',
    'certs.desc':'شهادة معتمدة في اختبار الاختراق تغطي: هجمات الشبكات، هجمات تطبيقات الويب، Metasploit، والتعداد.',
    'letters.head':'كتب الشكر والتقدير',
    'letters.sub':'رسائل رسمية من مؤسسات عراقية تقديراً لجهودي في الأمن السيبراني',
    'letter1.org':'كلية المنصور الجامعية',
    'letter2.org':'مركز المعلومات الرقمية',
    'letter3.org':'العتبة العباسية المقدسة',
    'letter4.org':'جامعة المستنصرية',
    'accounts.head':'حساباتي',
    'arsenal.head':'ترسانتي',
    'arsenal.sub':'الأجهزة والبرامج المستخدمة في البحث الأمني وفحص الشركات',
    'ars1.name':'الجهاز الرئيسي',       'ars1.spec':'كالي لينكس · إعداد مخصص لاختبار الاختراق',
    'ars2.name':'محلل الشبكات',          'ars2.spec':'فحص WiFi · تحليل الحزم · هجوم الوسيط',
    'ars3.name':'أدوات فحص الويب',       'ars3.spec':'برب سويت · البروكسي · الاختبار التلقائي',
    'ars4.name':'منصة الاستطلاع',        'ars4.spec':'OSINT · جمع المعلومات · الاستخبارات',
    'ars5.name':'المختبر الافتراضي',     'ars5.spec':'بيئات معزولة · اختبار آمن',
    'ars6.name':'البنية التحتية السحابية','ars6.spec':'VPS · اختبار عن بعد · استضافة الأدوات',
    'collab.head':'تعاون معي','collab.popular':'الأكثر طلباً',
    'collab.sub':'متاح للعمل في مجالات الأمن والاستشارات والإفصاح المسؤول',
    'collab1.title':'صيد الثغرات','collab2.title':'اختبار الاختراق',
    'collab3.title':'الاستشارة الأمنية','collab4.title':'التدريب الأمني',
    'contact.head':'تواصل معي',
    'form.name':'الاسم الكامل','form.email':'البريد الإلكتروني',
    'form.subject':'الموضوع','form.msg':'الرسالة',
    'form.namePh':'اسمك الكريم','form.msgPh':'اكتب رسالتك هنا...',
    'form.send':'إرسال الرسالة',
    'foot.name':'محمد فارس موسى الحدراوي',
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang){
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = translations[lang];
  const isAr = lang === 'ar';

  // Direction + language
  document.documentElement.setAttribute('dir',  isAr ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', isAr ? 'ar'  : 'en');

  // Toggle button label
  const lbl = document.getElementById('langLabel');
  if(lbl) lbl.textContent = isAr ? 'EN' : 'AR';

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    if(t[key] !== undefined) el.textContent = t[key];
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const key = el.dataset.i18nPh;
    if(t[key] !== undefined) el.placeholder = t[key];
  });

  // Fix Arabic letter bodies — always RTL regardless of page dir
  document.querySelectorAll('.l-body,.l-subj,.l-sign').forEach(el=>{
    el.setAttribute('dir','rtl');
  });
}

function toggleLang(){
  setLang(currentLang === 'en' ? 'ar' : 'en');
}

// Apply saved language on load
document.addEventListener('DOMContentLoaded', ()=> setLang(currentLang));

/* ==========================================
   TOAST
   ========================================== */
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 4000);
}
