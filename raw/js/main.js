/* ============================================================
   RAW Agency — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile hamburger menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Header scroll state ── */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Intersection Observer: fade-in-up ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ── Proyectos filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-full');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ── Contact form validation ── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

      // Validate nombre
      const nombre = contactForm.querySelector('#nombre');
      if (nombre && !nombre.value.trim()) {
        setError(nombre, 'Por favor, introduce tu nombre.');
        valid = false;
      }

      // Validate email
      const email = contactForm.querySelector('#email');
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
          setError(email, 'Por favor, introduce tu email.');
          valid = false;
        } else if (!emailRegex.test(email.value.trim())) {
          setError(email, 'Por favor, introduce un email válido.');
          valid = false;
        }
      }

      // Validate mensaje
      const mensaje = contactForm.querySelector('#mensaje');
      if (mensaje && !mensaje.value.trim()) {
        setError(mensaje, 'Por favor, escribe tu mensaje.');
        valid = false;
      }

      if (valid) {
        // Show success message
        const successEl = document.querySelector('#form-success');
        if (successEl) {
          successEl.style.display = 'block';
          contactForm.reset();
          successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });

    function setError(input, message) {
      const group = input.closest('.form-group');
      if (group) {
        group.classList.add('has-error');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) errorEl.textContent = message;
      }
    }

    // Clear errors on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
        const successEl = document.querySelector('#form-success');
        if (successEl) successEl.style.display = 'none';
      });
    });
  }

  /* ── Active nav link highlight ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPath) {
      link.classList.add('active');
    }
  });

});
