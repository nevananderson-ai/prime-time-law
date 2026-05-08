/* main.js — Global interactions */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initStickyCallBar();
  initScrollReveal();
  initFaq();
  initBeforeAfter();
  initZipChecker();
  populateFromConfig();
});

/* --- Config population ---
   Fills elements with data-site-* attributes from window.SITE */
function populateFromConfig() {
  if (typeof window.SITE === 'undefined') return;
  const S = window.SITE;

  document.querySelectorAll('[data-site-phone]').forEach(el => {
    el.textContent = S.business.phone;
  });
  document.querySelectorAll('[data-site-phone-link]').forEach(el => {
    el.href = `tel:${S.business.phoneRaw}`;
  });
  document.querySelectorAll('[data-site-name]').forEach(el => {
    el.textContent = S.business.name;
  });
  document.querySelectorAll('[data-site-city]').forEach(el => {
    el.textContent = S.serviceArea.primaryCity;
  });
  document.querySelectorAll('[data-site-years]').forEach(el => {
    el.textContent = S.business.yearsInBusiness;
  });
  document.querySelectorAll('[data-site-rating]').forEach(el => {
    el.textContent = S.business.googleRating;
  });
  document.querySelectorAll('[data-site-review-count]').forEach(el => {
    el.textContent = S.business.googleReviewCount;
  });
  document.querySelectorAll('[data-site-license]').forEach(el => {
    el.textContent = S.business.licenseNumber;
  });
}

/* --- Sticky header --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile nav --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --- Sticky call bar (mobile) --- */
function initStickyCallBar() {
  const bar = document.querySelector('.sticky-call-bar');
  const hero = document.querySelector('.hero');
  if (!bar) return;

  const onScroll = () => {
    if (hero) {
      const threshold = hero.offsetTop + hero.offsetHeight;
      bar.classList.toggle('visible', window.scrollY > threshold - 100);
    } else {
      bar.classList.toggle('visible', window.scrollY > 300);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Scroll reveal --- */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* --- FAQ accordion --- */
function initFaq() {
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --- Before / After slider --- */
function initBeforeAfter() {
  document.querySelectorAll('.ba-featured').forEach(slider => {
    const range = slider.querySelector('.ba-range');
    const after  = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    if (!range || !after || !handle) return;

    const update = (val) => {
      after.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      handle.style.left = `${val}%`;
    };

    range.addEventListener('input', () => update(range.value));

    // Touch support
    let dragging = false;
    slider.addEventListener('pointerdown', () => { dragging = true; });
    window.addEventListener('pointerup',   () => { dragging = false; });
    slider.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const rect = slider.getBoundingClientRect();
      const val = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      range.value = val;
      update(val);
    });

    update(50);
  });

  // Thumbnail switching
  document.querySelectorAll('.ba-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const container = thumb.closest('.gallery-section') || document.body;
      container.querySelectorAll('.ba-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      // In real build: swap the featured slider images from data attributes
    });
  });
}

/* --- ZIP checker --- */
function initZipChecker() {
  const form = document.querySelector('.zip-form');
  const result = document.querySelector('.zip-result');
  if (!form || !result) return;

  const SITE = window.SITE;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const zip = form.querySelector('.zip-input').value.trim().slice(0, 5);

    result.className = 'zip-result';
    result.textContent = '';

    if (!zip || !/^\d{5}$/.test(zip)) {
      result.classList.add('partial');
      result.textContent = 'Please enter a valid 5-digit ZIP code.';
      return;
    }

    if (SITE && SITE.serviceArea.zips.includes(zip)) {
      const city = SITE.serviceArea.cities.find(c => matchZipToCity(zip, c)) || SITE.serviceArea.primaryCity;
      result.classList.add('success');
      result.innerHTML = `✓ Yes — we service that area! <a href="#quote" style="color:inherit;font-weight:700;text-decoration:underline;">Get your free quote →</a>`;
    } else {
      result.classList.add('error');
      result.innerHTML = `We don't service that ZIP yet — but tell us where you are and we'll let you know when we expand. <a href="mailto:${SITE?.business?.email || ''}" style="color:inherit;font-weight:700;text-decoration:underline;">Email us →</a>`;
    }
  });
}

function matchZipToCity(zip, city) {
  const map = {
    'Citrus Ridge':   ['33868'],
    'Davenport':      ['33837','33896','33897'],
    'Haines City':    ['33844'],
    'Four Corners':   ['34714','34747'],
    'ChampionsGate':  ['33896'],
  };
  return map[city]?.includes(zip);
}

/* --- Form handling --- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.quote-form').forEach(form => {
    const phoneInput = form.querySelector('input[name="phone"]');
    const detailsToggle = form.querySelector('.form-details-toggle');
    const detailsField = form.querySelector('.form-details-field');
    const submitBtn = form.querySelector('.btn-submit');

    // Phone auto-format
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        const digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);
        if (digits.length >= 7) {
          phoneInput.value = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
        } else if (digits.length >= 4) {
          phoneInput.value = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
        } else if (digits.length > 0) {
          phoneInput.value = `(${digits}`;
        }
      });
    }

    // Optional details toggle
    if (detailsToggle && detailsField) {
      detailsToggle.addEventListener('click', () => {
        const isOpen = detailsField.classList.toggle('open');
        detailsToggle.textContent = isOpen ? '− Hide details' : '+ Add details (optional)';
      });
    }

    // Validation
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
    });

    // Submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check honeypot
      const honey = form.querySelector('.form-honeypot');
      if (honey && honey.value) return;

      // Validate all
      let valid = true;
      form.querySelectorAll('input[required], textarea[required]').forEach(field => {
        if (!validateField(field)) valid = false;
      });
      if (!valid) return;

      const webhookUrl = window.SITE?.webhook?.formUrl || '';
      const data = Object.fromEntries(new FormData(form).entries());

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      try {
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        }
        window.location.href = '/thanks.html';
      } catch {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        alert('Something went wrong — please call us directly or try again.');
      }
    });
  });
});

function validateField(field) {
  const wrapper = field.closest('.form-field');
  const errorEl = wrapper?.querySelector('.field-error');
  let error = '';

  if (!field.value.trim()) {
    error = `${field.labels?.[0]?.textContent || 'This field'} is required.`;
  } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    error = 'Please enter a valid email address.';
  } else if (field.name === 'phone') {
    const digits = field.value.replace(/\D/g, '');
    if (digits.length < 10) error = 'Please enter a 10-digit phone number.';
  }

  field.classList.toggle('error', !!error);
  if (errorEl) {
    errorEl.textContent = error;
    errorEl.classList.toggle('visible', !!error);
  }
  return !error;
}
