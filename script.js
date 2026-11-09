const menu = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const stages = {
 primary: { tag: 'THE FOUNDATION YEARS', title: 'Big discoveries begin\nwith little questions.', description: 'Activity-based learning helps children find their voice, understand the world, and build a love for learning that stays with them.', subjects: ['Language & reading', 'Mathematics', 'Environmental studies', 'Creative expression'] },
 upper: { tag: 'THE YEARS OF POSSIBILITY', title: 'Deeper understanding.\nGreater independence.', description: 'Classes 6 and 7 build on strong foundations with more advanced concepts, thoughtful discussion, and opportunities to develop independent learning skills.', subjects: ['English & communication', 'Mathematics', 'Science', 'Social studies'] }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectStage(tab) {
 tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
 const stage = stages[tab.dataset.stage];
 document.getElementById('stage-tag').textContent = stage.tag;
 const title = document.getElementById('stage-title'); title.replaceChildren();
 stage.title.split('\n').forEach((line, i) => { if (i) title.append(document.createElement('br')); title.append(document.createTextNode(line)); });
 document.getElementById('stage-description').textContent = stage.description;
 document.getElementById('stage-subjects').replaceChildren(...stage.subjects.map(subject => { const span = document.createElement('span'); span.textContent = subject; return span; }));
 document.getElementById('learning-panel').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectStage(tab)); tab.addEventListener('keydown', event => { let next; if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % tabs.length; if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); selectStage(tabs[next]); tabs[next].focus(); } }); });
const photos = [
 { src: 'assets/school-xDOQa3nw46s.jpg', alt: 'Fire Department demonstration shared by New Vision School', category: 'LEARNING IN ACTION', title: 'Fire Department demonstration.' },
 { src: 'assets/school-5uNDGZXYhvU.jpg', alt: 'New Vision School students performing at Republic Day 2026', category: 'CELEBRATE TOGETHER', title: 'Republic Day 2026 celebrations.' },
 { src: 'assets/school-UjM1xZrvTbU.jpg', alt: 'A UKG student participating in New Vision School’s Republic Day 2026 programme', category: 'GROWING IN CONFIDENCE', title: 'A young voice. A proud moment.' }
];
let photoIndex = 0;
function showPhoto(direction) { photoIndex = (photoIndex + direction + photos.length) % photos.length;
 document.querySelectorAll('.life-card').forEach(card => card.classList.toggle('is-current', Number(card.dataset.photo) === photoIndex)); const photo = photos[photoIndex]; const img = document.getElementById('gallery-image'); img.src = photo.src; img.alt = photo.alt; document.getElementById('gallery-category').textContent = photo.category; document.getElementById('gallery-title').textContent = photo.title; document.getElementById('gallery-count').textContent = `0${photoIndex + 1} / 03`; document.getElementById('gallery-open').setAttribute('aria-label', `Enlarge photograph: ${photo.alt}`); }
document.getElementById('gallery-prev').addEventListener('click', () => showPhoto(-1));
document.getElementById('gallery-next').addEventListener('click', () => showPhoto(1));
const dialog = document.getElementById('photo-dialog');
document.getElementById('gallery-open').addEventListener('click', () => { const photo = photos[photoIndex]; const img = document.getElementById('dialog-image'); img.src = photo.src; img.alt = photo.alt; document.getElementById('dialog-caption').textContent = `${photo.title} Video still from New Vision School’s YouTube channel.`; dialog.showModal(); });
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
const form = document.querySelector('form');
form.addEventListener('submit', async event => {
 event.preventDefault();
 const button = form.querySelector('[type="submit"]'); const status = document.getElementById('form-status');
 button.disabled = true; button.textContent = 'Sending enquiry…'; status.textContent = ''; status.className = '';
 try { const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() }); if (!response.ok) throw new Error('Submission failed'); status.textContent = 'Thank you. Your enquiry has been sent to the school team.'; status.className = 'success'; form.reset(); }
 catch { status.textContent = 'Your enquiry could not be sent. Please try again, or call Rayees Ahmed on +91 9490357868.'; status.className = 'error'; }
 finally { button.disabled = false; button.innerHTML = 'Send enquiry <span>↗</span>'; }
});
document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { nav.querySelectorAll('a').forEach(link => { const active = link.hash === `#${entry.target.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
 document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}

// Motion is optional; all content remains visible without animation support.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
function entrance(element, keyframes, options = {}) {
 if (reducedMotion.matches || typeof element.animate !== 'function') return;
 element.getAnimations().forEach(animation => animation.cancel());
 element.animate(keyframes, { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', ...options });
}
document.querySelectorAll('.life-card').forEach(card => {
 function preview() {
  const next = Number(card.dataset.photo);
  if (next === photoIndex) return;
  showPhoto(next - photoIndex);
  entrance(document.querySelector('.gallery-caption'), [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350 });
 }
 card.addEventListener('click', preview);
 card.addEventListener('focus', preview);
 card.addEventListener('pointerenter', () => { if (finePointer.matches) preview(); });
});
showPhoto(0);
tabs.forEach(tab => tab.addEventListener('click', () => entrance(document.getElementById('learning-panel'), [{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350 })));
if ('IntersectionObserver' in window) {
 const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   entrance(entry.target, [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }]);
   reveal.unobserve(entry.target);
  });
 }, { threshold: .12 });
 document.querySelectorAll('.about > div, .section-heading, .academic-layout, .gallery, .admission, .faq > div, .contact-grid > div, .contact-grid > form').forEach(element => reveal.observe(element));
}
const heroVisual = document.querySelector('.hero-visual');
let pointerFrame = 0;
function resetHeroMotion() {
 cancelAnimationFrame(pointerFrame);
 heroVisual.style.removeProperty('--image-x');
 heroVisual.style.removeProperty('--image-y');
}
heroVisual.addEventListener('pointermove', event => {
 if (!finePointer.matches || reducedMotion.matches) return;
 cancelAnimationFrame(pointerFrame);
 pointerFrame = requestAnimationFrame(() => {
  const bounds = heroVisual.getBoundingClientRect();
  heroVisual.style.setProperty('--image-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 10}px`);
  heroVisual.style.setProperty('--image-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 10}px`);
 });
});
heroVisual.addEventListener('pointerleave', resetHeroMotion);
finePointer.addEventListener('change', resetHeroMotion);
reducedMotion.addEventListener('change', () => {
 resetHeroMotion();
 if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
});
(() => {
 const slides = [...document.querySelectorAll('.hero-slide')];
 const dots = [...document.querySelectorAll('.hero-dot')];
 if (slides.length < 2) return;
 let current = 0; let timer;
 function show(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => { slide.classList.toggle('is-active', i === current); if (i === current) slide.loading = 'eager'; });
  dots.forEach((dot, i) => { dot.classList.toggle('is-active', i === current); if (i === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
  slides[(current + 1) % slides.length].loading = 'eager';
 }
 function start() { clearInterval(timer); timer = setInterval(() => show(current + 1), 5000); }
 function stop() { clearInterval(timer); }
 dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
 const visual = slides[0].parentElement;
 visual.addEventListener('mouseenter', stop); visual.addEventListener('mouseleave', start);
 visual.addEventListener('focusin', stop); visual.addEventListener('focusout', start);
 document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
 start();
})();
