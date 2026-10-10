/**
 * MERCHERA STUDIO — INTERACTIVE MOTION ENGINE
 * Powers: Scroll Progress Bar, Site-Wide Auto-Reveals, 3D Card Tilt & Glare,
 *         Magnetic Buttons, Live Counters, and Interactive FAQ Accordions
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* --------------------------------------------------------------------------
     0. Top Scroll Progress Bar (.mc-scroll-progress)
     -------------------------------------------------------------------------- */
  function initScrollProgress() {
    if (document.querySelector('.mc-scroll-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'mc-scroll-progress';
    document.body.prepend(bar);

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      bar.style.width = `${pct.toFixed(2)}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* --------------------------------------------------------------------------
     0.5. Auto-Tag Site-Wide Elements Across All Store Pages
     -------------------------------------------------------------------------- */
  function autoTagSiteElements(root = document) {
    // 1. Cards that should get both Scroll Reveal AND 3D Tilt
    const tiltSelectors = [
      '.xo-product-card',
      '.xo-collection-card',
      '.msg-product-card',
      '.msg-info-card',
      '.msg-step',
      '.contact-v1',
      '.contact-v2'
    ];

    const tiltElements = root.querySelectorAll(tiltSelectors.join(', '));
    tiltElements.forEach((el, idx) => {
      if (!el.hasAttribute('data-mc-reveal')) {
        el.setAttribute('data-mc-reveal', 'fade-up');
        const stagger = (idx % 4) * 70;
        el.style.setProperty('--mc-delay', `${stagger}ms`);
      }
      if (!el.hasAttribute('data-mc-tilt')) {
        el.setAttribute('data-mc-tilt', '');
        el.setAttribute('data-mc-tilt-max', '4.5');
      }
    });

    // 2. Structural blocks that should get Smooth Scroll Reveal
    const revealSelectors = [
      '.customization-box',
      '.msg-header',
      '.msg-how-to-measure',
      '.msg-chart-section',
      '.msg-fit-tips',
      '.collection-title-v1',
      '.main-product__info',
      '.product-info-media'
    ];

    const revealElements = root.querySelectorAll(revealSelectors.join(', '));
    revealElements.forEach((el) => {
      if (!el.hasAttribute('data-mc-reveal')) {
        el.setAttribute('data-mc-reveal', 'fade-up');
      }
    });
  }

  /* --------------------------------------------------------------------------
     1. Scroll Reveal Observer ([data-mc-reveal])
     -------------------------------------------------------------------------- */
  function initScrollReveals(root = document) {
    const elements = root.querySelectorAll('[data-mc-reveal]:not(.is-revealed)');
    if (!elements.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     2. 3D Card Tilt & Radial Spotlight ([data-mc-tilt])
     -------------------------------------------------------------------------- */
  function initTiltCards(root = document) {
    if (prefersReducedMotion || isTouchDevice) return;

    const cards = root.querySelectorAll('[data-mc-tilt]:not([data-mc-tilt-bound])');
    cards.forEach((card) => {
      card.setAttribute('data-mc-tilt-bound', 'true');
      const maxTilt = parseFloat(card.getAttribute('data-mc-tilt-max')) || 6.0;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Magnetic Buttons ([data-mc-magnetic])
     -------------------------------------------------------------------------- */
  function initMagneticButtons(root = document) {
    if (prefersReducedMotion || isTouchDevice) return;

    const buttons = root.querySelectorAll('[data-mc-magnetic]:not([data-mc-magnetic-bound])');
    buttons.forEach((btn) => {
      btn.setAttribute('data-mc-magnetic-bound', 'true');
      const strength = parseFloat(btn.getAttribute('data-mc-magnetic')) || 0.22;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const deltaX = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) * strength;
        btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0px, 0px, 0)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Animated Number Counters ([data-mc-counter])
     -------------------------------------------------------------------------- */
  function initCounters(root = document) {
    const counters = root.querySelectorAll('[data-mc-counter]:not([data-mc-counted])');
    if (!counters.length) return;

    const animateCounter = (el) => {
      el.setAttribute('data-mc-counted', 'true');
      const target = parseFloat(el.getAttribute('data-mc-counter')) || 0;
      const decimals = parseInt(el.getAttribute('data-mc-decimals') || '0', 10);
      const prefix = el.getAttribute('data-mc-prefix') || '';
      const suffix = el.getAttribute('data-mc-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = target * eased;

        const formatted =
          decimals > 0
            ? current.toFixed(decimals)
            : Math.round(current).toLocaleString();

        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     5. Interactive FAQ Accordion (.mc-faq-item)
     -------------------------------------------------------------------------- */
  function initFaqAccordions() {
    if (document.body.hasAttribute('data-mc-faq-bound')) return;
    document.body.setAttribute('data-mc-faq-bound', 'true');

    document.addEventListener('click', (e) => {
      const item = e.target.closest('.mc-faq-item');
      if (!item) return;
      item.classList.toggle('is-active');
    });
  }

  /* --------------------------------------------------------------------------
     6. Permanent Sticky Floating Header Engine
     -------------------------------------------------------------------------- */
  function initStickyHeader() {
    const header = document.querySelector('header.header-v3');
    if (!header) return;

    // Preserve height so the content never jumps when header floats
    const updateHeaderHeight = () => {
      const h = header.offsetHeight;
      if (h > 0) {
        header.style.minHeight = `${h}px`;
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight, { passive: true });

    // Ensure xo-sticky never hides the header on downward scroll
    const xoSticky = header.querySelector('xo-sticky');
    if (xoSticky) {
      xoSticky.setAttribute('xo-direction', 'down');
      xoSticky.removeAttribute('xo-disabled');
    }

    const onScroll = () => {
      const scrolled = window.scrollY > 30;
      document.body.classList.toggle('mc-header-scrolled', scrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Highlight current active page link in the header navigation dock
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const navLinks = header.querySelectorAll('.xo-menu-horizontal__item > a.xo-menu-horizontal__link');
    navLinks.forEach((a) => {
      const href = (a.getAttribute('href') || '').split('?')[0].replace(/\/$/, '') || '/';
      if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
        a.classList.add('mc-active-nav');
      } else {
        a.classList.remove('mc-active-nav');
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. Dynamic Free Shipping Progress Bar Engine
     -------------------------------------------------------------------------- */
  function initFreeShippingBar(root = document) {
    const boxes = root.querySelectorAll('.mc-free-shipping-box');
    if (!boxes.length) return;

    const thresholdCents = 6000; // £60.00

    function updateBox(box, totalCents) {
      const remaining = Math.max(0, thresholdCents - totalCents);
      const pct = Math.min(100, Math.max(0, (totalCents / thresholdCents) * 100));
      const fill = box.querySelector('.mc-free-shipping-fill');
      const msg = box.querySelector('.mc-free-shipping-msg');

      if (fill) fill.style.width = `${pct}%`;

      if (remaining <= 0) {
        box.classList.add('is-unlocked');
        if (msg) {
          msg.innerHTML = '🎉 <strong>Complimentary Tracked UK Delivery Unlocked!</strong>';
        }
      } else {
        box.classList.remove('is-unlocked');
        const remPounds = (remaining / 100).toFixed(2);
        if (msg) {
          msg.innerHTML = `Add <strong>£${remPounds}</strong> more for <strong>Complimentary Tracked UK Delivery</strong>`;
        }
      }
    }

    fetch('/cart.js')
      .then((res) => (res.ok ? res.json() : null))
      .then((cart) => {
        if (cart) {
          boxes.forEach((b) => updateBox(b, cart.total_price || 0));
        }
      })
      .catch(() => {});

    const cartContainers = document.querySelectorAll('xo-cart-will-change, .xo-cart-mini-content__successfully');
    cartContainers.forEach((c) => {
      const obs = new MutationObserver(() => {
        fetch('/cart.js')
          .then((res) => (res.ok ? res.json() : null))
          .then((cart) => {
            if (cart) {
              boxes.forEach((b) => updateBox(b, cart.total_price || 0));
            }
          })
          .catch(() => {});
      });
      obs.observe(c, { childList: true, subtree: true });
    });
  }

  /* --------------------------------------------------------------------------
     8. Floating Sticky Quick-Customise / Add to Cart Bar (Product Pages)
     -------------------------------------------------------------------------- */
  function initStickyProductBar() {
    const isProductPage =
      window.location.pathname.includes('/products/') ||
      document.querySelector('.main-product__info') ||
      document.body.classList.contains('template-product');

    if (!isProductPage) return;
    if (document.querySelector('.mc-sticky-product-bar')) return;

    const titleEl =
      document.querySelector('.xo-product-info-content__title') ||
      document.querySelector('h1');
    const title = titleEl ? titleEl.textContent.trim() : 'Custom Blank Apparel';

    const priceEl =
      document.querySelector('.price__regular .price-item--regular') ||
      document.querySelector('.price-item') ||
      document.querySelector('.mc-price-val');
    const priceText = priceEl ? priceEl.textContent.trim() : '£28.00';

    const imgEl =
      document.querySelector('.preview-product-image') ||
      document.querySelector('.product-media img') ||
      document.querySelector('.xo-product-media img') ||
      document.querySelector('img[src*="cdn.shopify.com"]');
    const imgSrc = imgEl ? imgEl.src : '';

    const bar = document.createElement('div');
    bar.className = 'mc-sticky-product-bar';
    bar.innerHTML = `
      <div class="mc-sticky-product-info">
        ${imgSrc ? `<img src="${imgSrc}" alt="${title}" class="mc-sticky-product-img">` : ''}
        <div class="mc-sticky-product-meta">
          <h4 class="mc-sticky-product-title">${title}</h4>
          <div class="mc-sticky-product-pricing">
            <span class="mc-sticky-product-price">${priceText}</span>
            <span class="mc-sticky-product-tier-badge">Bulk Tiers Available</span>
          </div>
        </div>
      </div>
      <div class="mc-sticky-product-actions">
        <button type="button" class="mc-sticky-product-btn">
          <span>Customise & Order</span>
          <span class="mc-btn-arrow">→</span>
        </button>
      </div>
    `;

    document.body.appendChild(bar);

    const targetBuyBox =
      document.querySelector('.buy-button') ||
      document.querySelector('.customization-box') ||
      document.querySelector('form[action*="/cart/add"]');

    const updateVisibility = () => {
      if (!targetBuyBox) {
        bar.classList.toggle('is-visible', window.scrollY > 450);
        return;
      }
      const rect = targetBuyBox.getBoundingClientRect();
      const passedBuyBox = rect.bottom < 80;
      bar.classList.toggle('is-visible', passedBuyBox);
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    const btn = bar.querySelector('.mc-sticky-product-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const customBox = document.querySelector('.customization-box');
        const textarea = document.querySelector('.customization-textarea');
        const atcBtn =
          document.querySelector('form[action*="/cart/add"] button[type="submit"]') ||
          document.querySelector('.buy-button button');

        if (customBox && (!textarea || !textarea.value.trim())) {
          customBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (textarea) {
            setTimeout(() => textarea.focus(), 600);
          }
        } else if (atcBtn) {
          atcBtn.click();
        } else if (customBox) {
          customBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     Initialize & Hook into Shopify Theme Editor Events
     -------------------------------------------------------------------------- */
  function initAll(root = document) {
    initScrollProgress();
    autoTagSiteElements(root);
    initScrollReveals(root);
    initTiltCards(root);
    initMagneticButtons(root);
    initCounters(root);
    initFaqAccordions();
    initStickyHeader();
    initFreeShippingBar(root);
    initStickyProductBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(document));
  } else {
    initAll(document);
  }

  document.addEventListener('shopify:section:load', (e) => {
    initAll(e.target || document);
  });
})();
