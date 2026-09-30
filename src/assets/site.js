(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const smallScreen = window.matchMedia('(max-width: 1100px)');
  function closeMenu(returnFocus = false) {
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) toggle.querySelector('span').textContent = 'Menu';
    if (returnFocus) toggle?.focus();
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (smallScreen.matches && !event.target.closest('.site-header')) closeMenu();
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  smallScreen.addEventListener('change', () => closeMenu());
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        reveal.unobserve(entry.target);
      }
    }), {threshold: 0.12});
    document.querySelectorAll('.service-card, .case-card, .delivery-grid article').forEach(el => reveal.observe(el));
  }

  const form = document.querySelector('#enquiry-form');
  if (!form) return;
  const review = document.querySelector('#email-review');
  const errorSummary = document.querySelector('#form-errors');
  const preview = document.querySelector('#email-preview');
  const status = document.querySelector('#copy-status');
  const fields = ['name', 'organization', 'email', 'phone', 'requirement', 'timeframe', 'description', 'procurement', 'security'];
  const labels = { name: 'Name', organization: 'Organization', email: 'Work email', phone: 'Phone', requirement: 'Type of requirement', timeframe: 'Desired start timeframe', description: 'Short description', procurement: 'Procurement / contracting vehicle', security: 'Security requirement' };
  const query = new URLSearchParams(window.location.search).get('requirement');
  if (query) {
    const value = query.trim().replace(/[\r\n\u0000-\u001f]/g, '').slice(0, 120);
    const select = form.elements.requirement;
    if (value) {
      if (!Array.from(select.options).some(option => option.value === value)) select.add(new Option(value, value));
      select.value = value;
    }
  }
  function errorFor(id) {
    const field = form.elements[id];
    const value = field.value.trim();
    if (field.required && !value) return `Enter ${labels[id].toLowerCase()}.`;
    if (id === 'email' && value && field.validity.typeMismatch) return 'Enter a valid email address.';
    if (id === 'description' && value.length < 20) return 'Describe your requirement in at least 20 characters.';
    if (field.maxLength > 0 && value.length > field.maxLength) return `Use no more than ${field.maxLength} characters.`;
    return '';
  }
  function setError(id, message) {
    const element = form.elements[id];
    const error = document.getElementById(`${id}-error`);
    if (error) error.textContent = message;
    if (message) element.setAttribute('aria-invalid', 'true');
    else element.removeAttribute('aria-invalid');
  }
  fields.forEach(id => form.elements[id].addEventListener('input', () => {
    if (form.elements[id].hasAttribute('aria-invalid')) setError(id, errorFor(id));
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const errors = fields.map(id => [id, errorFor(id)]).filter(([,message]) => message);
    fields.forEach(id => setError(id, errorFor(id)));
    errorSummary.replaceChildren();
    if (errors.length) {
      const title = document.createElement('strong');
      title.textContent = 'Please check the following details:';
      const list = document.createElement('ul');
      errors.forEach(([id, message]) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = `${labels[id]}: ${message}`;
        link.addEventListener('click', event => { event.preventDefault(); form.elements[id].focus(); });
        item.append(link); list.append(item);
      });
      errorSummary.append(title, list);
      errorSummary.hidden = false;
      errorSummary.focus();
      return;
    }
    errorSummary.hidden = true;
    const values = Object.fromEntries(fields.map(id => [id, form.elements[id].value.trim()]));
    const subject = `Innovizion enquiry: ${values.requirement.replace(/[\r\n]/g, ' ')}`;
    const body = ['Hello Innovizion,', '', ...fields.filter(id => values[id]).map(id => `${labels[id]}: ${values[id]}`), '', 'Please contact me to discuss this requirement.'].join('\n');
    preview.value = `To: ${form.dataset.recipient}\nSubject: ${subject}\n\n${body}`;
    document.querySelector('#open-email').href = `mailto:${form.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = '';
    form.hidden = true;
    review.hidden = false;
    review.focus();
  });
  document.querySelector('#edit-enquiry').addEventListener('click', () => {
    review.hidden = true; form.hidden = false; form.elements.name.focus();
  });
  document.querySelector('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview.value);
      status.textContent = 'Email text copied. Paste it into your email service, review it and send when ready.';
    } catch {
      preview.focus(); preview.select();
      status.textContent = 'The message is selected. Use your device’s Copy command, then paste it into your email service.';
    }
  });
})();
