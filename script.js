// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Highlight active nav as you scroll
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-link')];

function setActive(id) {
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
}

if (sections.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

  sections.forEach(s => io.observe(s));
}

// (Optional) very light form demo – prevent submission until wired to backend
const homepageForm = document.getElementById('demoForm');
if (homepageForm) {
  homepageForm.addEventListener('submit', (e) => {
    const required = [...homepageForm.querySelectorAll('[required]')];
    const missing = required.find(el => !el.value.trim());
    if (missing) {
      e.preventDefault();
      missing.focus();
      alert('Please fill all required fields.');
    } else {
      e.preventDefault();
      alert('Thanks! Hook this up to your CRM/Webhook for real submissions.');
    }
  });
}

// Scroll reveal (run once, global)
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const io2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-in');
        io2.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.2 });

  els.forEach(el => io2.observe(el));
})();
// Dark mode toggle with persistence
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.classList.add('dark');
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const syncIcon = () => btn.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
  syncIcon();
  btn.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    syncIcon();
  });
})();
// Back-to-top show/hide + smooth scroll
(function(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
})();
// KPI counters animation
(function(){
  const counters = document.querySelectorAll('.kpi-num');
  if(!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target;
      const txt = el.textContent.trim();                      // e.g., "100K+"
      const num = parseFloat(txt.replace(/[^\d.]/g,'')) || 0; // 100
      const suffix = txt.replace(/[\d.\s]/g,'');              // "K+"
      let start = null, dur = 1200;
      function step(ts){
        if(!start) start = ts;
        const p = Math.min(1, (ts - start)/dur);
        const val = Math.round(num * p);
        el.textContent = val + suffix;
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, {threshold:0.6});
  counters.forEach(c => io.observe(c));
})();
// FAQs: allow only one open
(function(){
  const items = document.querySelectorAll('#faqs details.acc');
  if(!items.length) return;
  items.forEach(d => d.addEventListener('toggle', () => {
    if(d.open) items.forEach(o => { if(o!==d) o.open = false; });
  }));
})();



