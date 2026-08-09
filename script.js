const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
}

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
    if (menuButton) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

const inquiryForm = document.getElementById('inquiry-form');
if (inquiryForm) {
  const params = new URLSearchParams(window.location.search);
  const hall = params.get('hall');
  const hallSelect = document.getElementById('hall-select');
  if (hall === 'intimate') hallSelect.value = 'Intimate Hall (up to 75)';
  if (hall === 'grand') hallSelect.value = 'Grand Hall (up to 400)';

  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    const data = new FormData(inquiryForm);
    const lines = [
      'Hi Tara Event Center! I would like to inquire about an event.',
      '',
      `Name: ${data.get('name') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Event date: ${data.get('date') || 'Not selected'}`,
      `Estimated guests: ${data.get('guests') || 'Not sure yet'}`,
      `Hall: ${data.get('hall') || 'Not sure yet'}`,
      `Event type: ${data.get('eventType') || ''}`,
      '',
      `Details: ${data.get('message') || 'No additional details yet.'}`
    ];

    const body = encodeURIComponent(lines.join('\n'));
    const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
    const separator = isApple ? '&' : '?';
    window.location.href = `sms:+17708558445${separator}body=${body}`;
  });
}
