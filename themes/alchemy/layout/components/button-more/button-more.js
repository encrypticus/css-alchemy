import './button-more.scss';

const btnBack = document.querySelector('.button-more_type_back');

if (btnBack !== null) {
  btnBack.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });
}
