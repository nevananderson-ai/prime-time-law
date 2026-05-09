/* components.js — Shared header, footer, and sticky call bar.
   Call mountComponents({ active, prefix }) on every inner page.
   active: nav key to highlight ('services','service-area','gallery','reviews','about','contact')
   prefix: path back to root ('' for root pages, '../' for services/ subpages) */

function mountComponents({ active = '', prefix = '' } = {}) {
  _mountHeader(active, prefix);
  _mountFooter(prefix);
  _mountCallBar(prefix);
}

function _mountHeader(active, p) {
  const nav = [
    { href: p + 'services.html',      label: 'Services',      key: 'services' },
    { href: p + 'service-area.html',  label: 'Service Area',  key: 'service-area' },
    { href: p + 'gallery.html',       label: 'Gallery',       key: 'gallery' },
    { href: p + 'reviews.html',       label: 'Reviews',       key: 'reviews' },
    { href: p + 'about.html',         label: 'About',         key: 'about' },
  ];

  const desktopLinks = nav.map(n =>
    `<a href="${n.href}"${active === n.key ? ' class="active"' : ''}>${n.label}</a>`
  ).join('');

  const mobileLinks = [...nav, { href: p + 'quote.html', label: 'Get a Free Quote', key: 'quote' }].map(n =>
    `<a href="${n.href}"${active === n.key ? ' class="active"' : ''}>${n.label}</a>`
  ).join('');

  const phoneIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.78a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;

  const html = `<header class="site-header" role="banner">
  <div class="container">
    <div class="header-inner">
      <a href="${p}index.html" class="header-logo" aria-label="Prime Time Lawn Care — Home">Prime Time<span>.</span></a>
      <nav class="header-nav" aria-label="Main navigation">${desktopLinks}</nav>
      <div class="header-actions">
        <div class="header-phone">
          <a href="tel:8632057840" data-site-phone-link data-site-phone>(863) 205-7840</a>
        </div>
        <a href="${p}quote.html" class="btn btn-primary header-quote-btn" style="display:none">Get a Quote</a>
        <a href="tel:8632057840" class="mobile-phone-link" data-site-phone-link aria-label="Call us">
          ${phoneIcon}<span data-site-phone>(863) 205-7840</span>
        </a>
        <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">${mobileLinks}</nav>
  </div>
</header>`;

  const mount = document.getElementById('header-mount');
  if (mount) mount.outerHTML = html;
}

function _mountFooter(p) {
  const shieldIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

  const html = `<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-main">
      <div class="footer-brand">
        <a href="${p}index.html" class="footer-logo">Prime Time Lawn Care &amp; Landscaping LLC</a>
        <p class="footer-tagline">A lawn you're proud of — without lifting a finger.</p>
        <div class="footer-contact">
          <a href="tel:8632057840" data-site-phone-link><span data-site-phone>(863) 205-7840</span></a>
          <span>Central Florida</span>
        </div>
        <div class="footer-badge">${shieldIcon} Licensed &amp; Insured</div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul class="footer-links">
          <li><a href="${p}services/mowing.html">Weekly Mowing &amp; Edging</a></li>
          <li><a href="${p}services/fertilization.html">Fertilization &amp; Weed Control</a></li>
          <li><a href="${p}services/aeration.html">Aeration &amp; Overseeding</a></li>
          <li><a href="${p}services/hedge-trimming.html">Hedge &amp; Shrub Trimming</a></li>
          <li><a href="${p}services/seasonal-cleanups.html">Seasonal Cleanups</a></li>
          <li><a href="${p}services/mulching.html">Mulching &amp; Bed Maintenance</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Service Area</h4>
        <ul class="footer-links">
          <li><a href="${p}service-area.html#citrus-ridge">Citrus Ridge</a></li>
          <li><a href="${p}service-area.html#davenport">Davenport</a></li>
          <li><a href="${p}service-area.html#haines-city">Haines City</a></li>
          <li><a href="${p}service-area.html#four-corners">Four Corners</a></li>
          <li><a href="${p}service-area.html#championsgate">ChampionsGate</a></li>
        </ul>
        <h4 style="margin-top:1.75rem">Company</h4>
        <ul class="footer-links">
          <li><a href="${p}about.html">About</a></li>
          <li><a href="${p}gallery.html">Gallery</a></li>
          <li><a href="${p}reviews.html">Reviews</a></li>
          <li><a href="${p}contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2025 Prime Time Lawn Care &amp; Landscaping LLC. All rights reserved.</span>
      <div style="display:flex;gap:1.5rem">
        <a href="${p}privacy.html">Privacy Policy</a>
        <a href="${p}terms.html">Terms</a>
      </div>
    </div>
  </div>
</footer>`;

  const mount = document.getElementById('footer-mount');
  if (mount) mount.innerHTML = html;
}

function _mountCallBar(p) {
  const html = `<div class="sticky-call-bar" role="complementary" aria-label="Quick contact">
  <a href="tel:8632057840" class="call-btn" data-site-phone-link>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.78a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    Call Now
  </a>
  <a href="${p}quote.html" class="quote-btn">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    Get Quote
  </a>
</div>`;

  const bar = document.createElement('div');
  bar.innerHTML = html;
  document.body.appendChild(bar.firstElementChild);
}
