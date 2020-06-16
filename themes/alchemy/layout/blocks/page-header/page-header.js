const link = document.querySelector('.page-header__link-wrapper');
const mmenu = document.querySelector('.mmenu');

link.addEventListener('click', () => {
  mmenu.classList.remove('mmenu_hidden');
}, false);
