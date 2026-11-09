const menu = document.querySelector('.menu');
const nav = document.querySelector('.navlinks');
function closeMenu() {
  if (!menu || !nav) return;
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

const stages = {
  primary: {
    tag: 'THE FOUNDATION YEARS',
    title: 'Big discoveries begin\nwith little questions.',
    description: 'Activity-based learning helps children find their voice, understand the world, and build a strong foundation for the years ahead.',
    subjects: ['English', 'Mathematics', 'Environmental studies', 'Creative learning']
  },
  upper: {
    tag: 'THE YEARS OF POSSIBILITY',
    title: 'Deeper understanding.\nGreater independence.',
    description: 'Classes 6 and 7 build on strong foundations with more advanced concepts, thoughtful discussion, and hands-on discovery.',
    subjects: ['English', 'Mathematics', 'Science', 'Social studies']
  }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectStage(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  const stage = stages[tab.dataset.stage];
  if (!stage) return;
  const tag = document.getElementById('stage-tag');
  const title = document.getElementById('stage-title');
  const description = document.getElementById('stage-description');
  const subjects = document.getElementById('stage-subjects');
  if (tag) tag.textContent = stage.tag;
  if (title) {
    title.replaceChildren();
    stage.title.split('\n').forEach((line, index) => {
      if (index) title.append(document.createElement('br'));
      title.append(document.createTextNode(line));
    });
  }
  if (description) description.textContent = stage.description;
  if (subjects) subjects.replaceChildren(...stage.subjects.map(subject => {
    const span = document.createElement('span');
    span.textContent = subject;
    return span;
  }));
  document.getElementById('learning-panel')?.setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStage(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      tabs[next].focus();
      selectStage(tabs[next]);
    }
  });
});

// Original vector artwork generated for this site, using the school's red-and-navy uniform palette.
const photos = [
  {
    src: 'assets/physics-practical.svg',
    alt: 'Illustration of students in red checked uniform shirts and navy trousers exploring a physics practical.',
    category: 'LEARNING IN ACTION',
    title: 'Physics practical lab.',
    detail: 'Experiment, observe, and discover how the world works.'
  },
  {
    src: 'assets/geography-practical.svg',
    alt: 'Illustration of students in red checked uniform shirts and navy trousers studying maps and a globe in geography class.',
    category: 'EXPLORE OUR WORLD',
    title: 'Geography practical lab.',
    detail: 'Maps, globes, and hands-on activities bring geography to life.'
  },
  {
    src: 'assets/sports-activity.svg',
    alt: 'Illustration of students in red checked uniform shirts and navy trousers taking part in a school sports activity.',
    category: 'GROWING TOGETHER',
    title: 'Sports activity.',
    detail: 'Building confidence, teamwork, and a love of being active.'
  }
];
let photoIndex = 0;
const gallery = document.querySelector('.gallery-main');
const galleryImage = gallery?.querySelector('img');
const galleryCaption = document.querySelector('.gallery-caption');
const lifeCards = [...document.querySelectorAll('.life-card')];
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  const photo = photos[photoIndex];
  if (galleryImage) {
    galleryImage.src = photo.src;
    galleryImage.alt = photo.alt;
  }
  if (galleryCaption) {
    const category = galleryCaption.querySelector('.eyebrow, small, [data-gallery-category]');
    const title = galleryCaption.querySelector('h3, h4, strong, [data-gallery-title]');
    const detail = galleryCaption.querySelector('p, [data-gallery-detail]');
    if (category) category.textContent = photo.category;
    if (title) title.textContent = photo.title;
    if (detail) detail.textContent = photo.detail;
  }
  lifeCards.forEach((card, index) => {
    card.classList.toggle('is-current', index === photoIndex);
    card.setAttribute('aria-pressed', String(index === photoIndex));
    const title = card.querySelector('.life-card-copy strong');
    const description = card.querySelector('.life-card-copy>span');
    if (title) title.textContent = photo.title;
    if (description) description.textContent = photo.detail;
    card.dataset.photo = String(index);
  });
  const dialogImage = document.getElementById('dialog-image');
  const dialogCaption = document.getElementById('dialog-caption');
  if (dialogImage && document.getElementById('photo-dialog')?.open) {
    dialogImage.src = photo.src;
    dialogImage.alt = photo.alt;
    if (dialogCaption) dialogCaption.textContent = photo.title;
  }
}
const previous = document.getElementById('gallery-prev');
const next = document.getElementById('gallery-next');
previous?.addEventListener('click', () => showPhoto(photoIndex - 1));
next?.addEventListener('click', () => showPhoto(photoIndex + 1));
lifeCards.forEach((card, index) => {
  card.addEventListener('click', () => showPhoto(index));
  card.addEventListener('focus', () => showPhoto(index));
});
const dialog = document.getElementById('photo-dialog');
document.getElementById('gallery-open')?.addEventListener('click', () => {
  if (!dialog) return;
  const photo = photos[photoIndex];
  const image = document.getElementById('dialog-image');
  if (image) { image.src = photo.src; image.alt = photo.alt; }
  const caption = document.getElementById('dialog-caption');
  if (caption) caption.textContent = photo.title;
  dialog.showModal();
});
document.getElementById('close-dialog')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
showPhoto(0);

// Rotate the activities automatically; pause while the visitor interacts or the page is hidden.
let slideshowTimer;
function stopSlideshow() { window.clearInterval(slideshowTimer); }
function startSlideshow() {
  stopSlideshow();
  if (!gallery || window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden) return;
  slideshowTimer = window.setInterval(() => showPhoto(photoIndex + 1), 6000);
}
gallery?.addEventListener('pointerenter', stopSlideshow);
gallery?.addEventListener('pointerleave', startSlideshow);
gallery?.addEventListener('focusin', stopSlideshow);
gallery?.addEventListener('focusout', event => { if (!gallery.contains(event.relatedTarget)) startSlideshow(); });
previous?.addEventListener('click', startSlideshow);
next?.addEventListener('click', startSlideshow);
document.addEventListener('visibilitychange', startSlideshow);
startSlideshow();

const form = document.querySelector('form');
form?.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('[type="submit"]');
  const status = document.getElementById('form-status');
  if (!button || !status) return;
  button.disabled = true;
  button.textContent = 'Sending enquiry…';
  status.textContent = '';
  status.className = '';
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!response.ok) throw new Error('Request failed');
    status.textContent = 'Thank you. Your enquiry has been sent.';
    status.className = 'success';
    form.reset();
  } catch {
    status.textContent = 'Your enquiry could not be sent. Please try again, or call Shaik Rayees Sir on +91 9490357868.';
    status.className = 'error';
  } finally {
    button.disabled = false;
    button.innerHTML = 'Send enquiry <span>↗</span>';
  }
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && nav) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
}

// Motion remains optional, with all content available to visitors who prefer reduced motion.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
function entrance(element, keyframes, options = {}) {
  if (!element || reducedMotion.matches || typeof element.animate !== 'function') return;
  element.getAnimations().forEach(animation => animation.cancel());
  element.animate(keyframes, { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', ...options });
}
tabs.forEach(tab => tab.addEventListener('click', () => entrance(document.getElementById('learning-panel'), [
  { opacity: .4, transform: 'translateY(8px)' },
  { opacity: 1, transform: 'translateY(0)' }
])));
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
  heroVisual?.style.removeProperty('--image-x');
  heroVisual?.style.removeProperty('--image-y');
}
heroVisual?.addEventListener('pointermove', event => {
  if (!finePointer.matches || reducedMotion.matches) return;
  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    const bounds = heroVisual.getBoundingClientRect();
    heroVisual.style.setProperty('--image-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 10}px`);
    heroVisual.style.setProperty('--image-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 10}px`);
  });
});
heroVisual?.addEventListener('pointerleave', resetHeroMotion);
finePointer.addEventListener('change', resetHeroMotion);
reducedMotion.addEventListener('change', () => {
  resetHeroMotion();
  if (reducedMotion.matches) {
    stopSlideshow();
    document.getAnimations().forEach(animation => animation.cancel());
  } else startSlideshow();
});
