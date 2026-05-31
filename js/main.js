// ── BeOcean v3 ──

// Nav scroll
const nav = document.querySelector('.nav');
if (nav) {
  const update = () => nav.classList.toggle('nav--solid', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Mobile menu
const burger = document.querySelector('.nav__burger');
const mobile = document.querySelector('.nav__mobile');
const close = document.querySelector('.nav__mobile-close');
if (burger && mobile) {
  burger.addEventListener('click', () => mobile.classList.add('open'));
  close?.addEventListener('click', () => mobile.classList.remove('open'));
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobile.classList.remove('open')));
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal, .reveal-left');
if (reveals.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 90);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => obs.observe(el));
}

// Counter animation
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const target = +el.dataset.count;
    const dur = 1600;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
    obs.unobserve(el);
  }, { threshold: 0.5 });
  obs.observe(el);
});

// Hero parallax
const heroContent = document.querySelector('.hero__inner');
if (heroContent) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.25}px)`;
      heroContent.style.opacity = 1 - y / 600;
    }
  }, { passive: true });
}

// Form
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '¡Enviado! Te contactamos pronto.';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); }, 4000);
  });
}
