/**
 * Header component - Sticky, mobile menu, dropdown
 */
(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const dropdownItems = document.querySelectorAll('.nav__item--dropdown');

  if (!header || !nav) return;

  // ----- Mobile menu toggle -----
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ----- Mobile: dropdown toggle (tap to expand) -----
  function initMobileDropdowns() {
    dropdownItems.forEach(function (item) {
      const link = item.querySelector('.nav__link');
      if (!link) return;

      link.addEventListener('click', function (e) {
        if (window.innerWidth > 768) return; // desktop: use CSS hover
        e.preventDefault();
        item.classList.toggle('is-open');
      });
    });
  }

  initMobileDropdowns();

  // ----- Close mobile menu when resize to desktop -----
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768) {
        nav.classList.remove('is-open');
        dropdownItems.forEach(function (item) {
          item.classList.remove('is-open');
        });
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Mở menu');
        }
        document.body.style.overflow = '';
      }
    }, 150);
  });

  // ----- Optional: add class when header is scrolled (e.g. for shadow) -----
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
