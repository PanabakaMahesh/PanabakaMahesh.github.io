// ===== STICKY HEADER =====
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

// ===== MOBILE MENU =====
function toggleMenu() {
  const menu = document.getElementById('menu');
  const toggle = document.getElementById('toggle');
  menu.classList.toggle('active');
  toggle.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const menu = document.getElementById('menu');
  const toggle = document.getElementById('toggle');
  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.remove('active');
    toggle.classList.remove('active');
  }
});

// ===== TYPED TEXT ANIMATION =====
const roles = [
  'AI / ML Developer',
  'Full Stack Developer',
  'DevOps Engineer',
];

let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const el = document.getElementById('typed');
  if (!el) return;

  const current = roles[roleIdx];

  if (!deleting) {
    el.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}

type();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.achievement-card, .skill-category, .project-card, .timeline-card, .cert-card, .info-item, .contact-box'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
  e.target.reset();
  setTimeout(() => { msg.textContent = ''; }, 4000);
}

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.menu a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--primary)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// ===== PHOTO FALLBACK =====
// Show fallback initials if photo.jpg fails to load
document.addEventListener('DOMContentLoaded', function() {
  const img = document.querySelector('.hero-photo');
  if (img) {
    img.addEventListener('error', function() {
      img.style.display = 'none';
      const fallback = document.querySelector('.photo-fallback');
      if (fallback) fallback.style.display = 'flex';
    });
    // Trigger error check if already broken
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  }
});
