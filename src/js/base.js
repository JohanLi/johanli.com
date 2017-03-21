((window, document) => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navbarContainer = document.querySelector('.navbar-container');

  hamburgerMenu.addEventListener('click', () => {
    navbarContainer.classList.toggle('active');
  });
})(window, document);
