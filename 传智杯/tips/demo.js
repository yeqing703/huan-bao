ham.addEventListener('click', () => {
  nav.classList.toggle('active');
  document.body.classList.toggle('lock');
  if (ham.classList.contains('icon-menu')) {
    ham.classList.remove('icon-menu');
    ham.classList.add('icon-close');
  } else {
    ham.classList.remove('icon-close');
    ham.classList.add('icon-menu');
  }
})