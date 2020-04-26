const hamburgers = document.querySelectorAll('.post .hamburger');

Array.prototype.forEach.call(hamburgers, (hamburger) => {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
  });
});