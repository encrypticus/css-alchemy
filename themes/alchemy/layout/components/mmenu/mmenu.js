import '../../../../../webpack-boilerplate/node_modules/mmenu-js';
import './mmenu.scss';

const mmenu = new Mmenu('#mmenu', {
  extensions: ['position-right', 'theme-dark'],
  navbar: {
    title: '<a class="mmenu__logo" href="./">css alchemy</a>',
  },
  onClick: {
    close: true,
  },
});

const api = mmenu.API;
const hamburger = document.querySelector('.hamburger');

api.bind('open:before', () => {
  hamburger.classList.add('is-active');
});

api.bind('close:before', () => {
  hamburger.classList.remove('is-active');
});
