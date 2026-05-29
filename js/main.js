// ── BeOcean Main JS ──

// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.nav__mobile');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// Fade-up on scroll
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// Contact form
const form = document.querySelector('.contact__form form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '¡Mensaje enviado!';
    btn.disabled = true;
    btn.style.background = '#1a7a4a';
    setTimeout(() => {
      btn.textContent = 'Enviar mensaje';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}
