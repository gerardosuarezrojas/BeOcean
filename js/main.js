// ── BeOcean v2 — Main JS ──

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
if (cursor && cursorRing && window.matchMedia('(pointer:fine)').matches) {
  let cx = 0, cy = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
  const animateCursor = () => {
    cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
    rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12;
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();
  document.querySelectorAll('a, button, .service-row, .case, .why-card, .pillar').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });
}

// Nav scroll
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
}

// Mobile menu
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.nav__mobile');
const closeBtn = document.querySelector('.nav__mobile-close');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeBtn?.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
if (reveals.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));
}

// Counter animation
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

// Contact form
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '¡Enviado! Te contactamos pronto.';
    btn.disabled = true;
    btn.style.background = '#1a6e3e';
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; form.reset(); }, 4000);
  });
}

// Hero parallax
const heroContent = document.querySelector('.hero__content');
const heroOrb1 = document.querySelector('.hero__orb--1');
if (heroContent && heroOrb1) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroContent.style.transform = `translateY(${y * 0.3}px)`;
    heroContent.style.opacity = 1 - y / 500;
    heroOrb1.style.transform = `translate(${y * 0.05}px, ${-y * 0.1}px) scale(1)`;
  }, { passive: true });
}
