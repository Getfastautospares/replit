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

// Tabs
const tabEnquiry = document.getElementById('tab-enquiry');
const tabBook = document.getElementById('tab-book');
const panelEnquiry = document.getElementById('panel-enquiry');
const panelBook = document.getElementById('panel-book');
function activate(tab){
  const isEnquiry = tab === 'enquiry';
  tabEnquiry.classList.toggle('active', isEnquiry);
  tabBook.classList.toggle('active', !isEnquiry);
  tabEnquiry.setAttribute('aria-selected', String(isEnquiry));
  tabBook.setAttribute('aria-selected', String(!isEnquiry));
  panelEnquiry.classList.toggle('hidden', !isEnquiry);
  panelBook.classList.toggle('hidden', isEnquiry);
}
tabEnquiry?.addEventListener('click', () => activate('enquiry'));
tabBook?.addEventListener('click', () => activate('book'));

// UTM & GCLID capture
(function captureAttribution(){
  const p = new URLSearchParams(window.location.search);
  const keys = ['gclid','utm_source','utm_campaign','utm_medium','utm_term','utm_content'];
  keys.forEach(k => { const v = p.get(k); if (v) localStorage.setItem(k, v); });
  const get = k => localStorage.getItem(k) || '';
  const fill = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  fill('gclid', get('gclid'));  fill('gclid2', get('gclid'));
  fill('utm_source', get('utm_source'));  fill('utm_source2', get('utm_source'));
  fill('utm_campaign', get('utm_campaign'));  fill('utm_campaign2', get('utm_campaign'));
})();

// Light validation + demo redirect
function wireForm(id){
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const required = [...form.querySelectorAll('[required]')];
    const firstEmpty = required.find(el => !el.value.trim());
    if (firstEmpty){
      e.preventDefault(); firstEmpty.focus();
      alert('Please fill all required fields.');
      return;
    }
    // Demo only: redirect to a simple thank-you unless you set a real endpoint
    if (!form.getAttribute('action') || form.getAttribute('action') === '#'){
      e.preventDefault();
      window.location.href = 'thank-you.html';
    }
  });
}
wireForm('enquiryForm');
wireForm('bookForm');
// inside wireForm(...) just before the current thank-you redirect
e.preventDefault();
fetch('https://YOUR-WEBHOOK-ENDPOINT/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
})
.then(() => window.location.href = 'thank-you.html')
.catch(() => alert('Submission failed. Try again or call us.'));
