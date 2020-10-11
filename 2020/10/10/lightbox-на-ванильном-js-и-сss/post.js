const images = document.querySelectorAll('.lightbox__img');
const modalWindow = document.querySelector('.modal-window');
const modalContent = document.querySelector('.modal-window__content');
const modalImg = modalContent.querySelector('.modal-window__img');
const modalTitle = modalContent.querySelector('.modal-window__title');
const modalBtn = modalContent.querySelector('.modal-window__btn');

images.forEach((image) => {
  image.addEventListener('click', (event) => {
    setTimeout(() => {
      modalWindow.classList.add('modal-window_show');
    });

    modalWindow.classList.add('modal-window_display_block');
    modalContent.classList.remove('modal-window__content_hide');
    modalContent.classList.add('modal-window__content_show');

    const { target: { src, alt } } = event;
    modalImg.src = src;
    modalImg.alt = alt;
    modalTitle.innerText = alt;
  });
});

const hideModalWindow = () => {
  modalWindow.classList.remove('modal-window_show');
  modalContent.classList.remove('modal-window__content_show');
  modalContent.classList.add('modal-window__content_hide');
};

modalWindow.addEventListener('click', () => {
  hideModalWindow();
});

modalWindow.addEventListener('transitionend', (event) => {
  if (!event.target.classList.contains('modal-window_show')) {
    modalWindow.classList.remove('modal-window_display_block');
  }
});

modalContent.addEventListener('click', (event) => {
  event.stopPropagation();
});

modalBtn.addEventListener('click', () => {
  hideModalWindow();
});
