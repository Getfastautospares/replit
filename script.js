// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if (toggle && menu){
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

function setActive(id){
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      setActive(entry.target.id);
    }
  });
}, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

sections.forEach(s => io.observe(s));

// (Optional) very light form demo – prevent submission until wired to backend
['demoForm'].forEach(id => {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const required = [...form.querySelectorAll('[required]')];
    const missing = required.find(el => !el.value.trim());
    if (missing){
      e.preventDefault();
      missing.focus();
      alert('Please fill all required fields.');
    } else {
      e.preventDefault();
      alert('Demo form captured locally. Hook this up to your CRM or webhook.');
    }
  });
  // Scroll reveal for anything marked with [data-reveal]
(function(){
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
});
