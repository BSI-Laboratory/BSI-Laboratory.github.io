/* ============================================================
   BSI Lab — script.js
   Navbar scroll, hamburger menu, active nav, reveal animation
   ============================================================ */

(function () {
  'use strict';

  /* ===== ELEMENTS ===== */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');
  const allNavAnchors = navLinks.querySelectorAll('a');
  const NAV_H = 64;

  /* ===== NAVBAR — shadow on scroll ===== */
  function onScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== HAMBURGER — mobile menu ===== */
  hamburger.addEventListener('click', function () {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  /* Close mobile menu when a link is clicked */
  allNavAnchors.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      const target   = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_H;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ===== ACTIVE NAV LINK on scroll ===== */
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function highlightActiveSection() {
    const scrollMid = window.scrollY + NAV_H + 60;
    let active = null;

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollMid) {
        active = sec.getAttribute('id');
      }
    });

    allNavAnchors.forEach(function (a) {
      const matches = active && a.getAttribute('href') === '#' + active;
      a.classList.toggle('active', matches);
    });
  }

  /* ===== REVEAL ON SCROLL (IntersectionObserver) ===== */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          /* Stagger siblings in the same grid/list */
          const delay = (i % 5) * 80;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -36px 0px'
    });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show all immediately */
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ===== INIT ===== */
  onScroll(); /* Set correct state on load (e.g. page refresh mid-scroll) */

})();
