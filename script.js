/* ═══════════════════════════════════════
   PORTFOLIO — script.js
═══════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  emailjs.init('pGAHu7meCgDAWWyI7');
});

/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // Trigger hero animations after load
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }, 1900);
});

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, fx = 0, fy = 0;

if (cursor && follower) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
  // Smooth follower
  function animateFollower() {
    fx += (mouseX - fx) * 0.12;
    fy += (mouseY - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const interactables = 'a, button, .project-card, .ach-card, input, textarea';
  document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('active'));
    el.addEventListener('mouseleave', () => follower.classList.remove('active'));
  });
}

/* ── Navbar scroll behavior ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) link.classList.add('active');
      });
    }
  });
}

/* ── Mobile menu ── */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/* ── Typed text ── */
const roles = [
  'Web Developer',
  'IT Student',
  'Problem Solver',
  'Frontend Developer',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      pauseTimer = setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 100);
}
setTimeout(typeEffect, 2200); // start after loader

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => {
  // Skip hero elements — handled by loader
  if (!el.closest('.hero')) observer.observe(el);
});

/* ── Skill bars animate on scroll ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.level-fill').forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => { bar.style.width = level + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

/* ── Project filters ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('filtered');
        card.style.display = '';
      } else {
        card.classList.add('filtered');
        card.style.display = 'none';
      }
    });
  });
});

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    // Name validation
    const nameInput = contactForm.querySelector('#fname');
    const nameError = document.getElementById('nameError');
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      nameInput.classList.add('error');
      valid = false;
    } else {
      nameError.textContent = '';
      nameInput.classList.remove('error');
    }

    // Email validation
    const emailInput = contactForm.querySelector('#femail');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('error');
      valid = false;
    } else {
      emailError.textContent = '';
      emailInput.classList.remove('error');
    }

    // Message validation
    const msgInput = contactForm.querySelector('#fmessage');
    const msgError = document.getElementById('msgError');
    if (!msgInput.value.trim() || msgInput.value.trim().length < 10) {
      msgError.textContent = 'Please enter a message (at least 10 characters).';
      msgInput.classList.add('error');
      valid = false;
    } else {
      msgError.textContent = '';
      msgInput.classList.remove('error');
    }

    if (!valid) return;

    // Simulate send (replace with actual email service like EmailJS or Formspree)
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.fa-paper-plane');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    btnIcon.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    // Simulate API call — replace this with EmailJS / Formspree
    //await new Promise(resolve => setTimeout(resolve, 1800));
      try {
     await emailjs.send(
       'service_p7v18fj',
       'template_wipo9od',
       {
         from_name: nameInput.value,
         from_email: emailInput.value,
         message: msgInput.value,
       }
        );

     // Success
     submitBtn.classList.add('hidden');
     formSuccess.classList.remove('hidden');
     contactForm.reset();

     // Reset after 5s
     setTimeout(() => {
       submitBtn.disabled = false;
       submitBtn.classList.remove('hidden');
       formSuccess.classList.add('hidden');

       btnText.textContent = 'Send Message';
       btnIcon.classList.remove('hidden');
       btnLoader.classList.add('hidden');
     }, 5000);

   } catch (error) {
     console.error('EmailJS Error:', error);
     alert(error.text || 'Failed to send message.');

     submitBtn.disabled = false;
     btnText.textContent = 'Send Message';
     btnIcon.classList.remove('hidden');
     btnLoader.classList.add('hidden');
   }
  });
}

/* ── Back to top ── */
const backTop = document.getElementById('backTop');
if (backTop) {
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Subtle parallax on hero glow ── */
document.addEventListener('mousemove', (e) => {
  const glows = document.querySelectorAll('.hero-glow');
  const rx = (e.clientX / window.innerWidth - 0.5) * 20;
  const ry = (e.clientY / window.innerHeight - 0.5) * 20;
  glows.forEach((g, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    g.style.transform = `translate(${rx * dir}px, ${ry * dir}px)`;
  });
});
