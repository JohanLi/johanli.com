(function (window, document, undefined) {

    'use strict';

    var hamburgerMenu = document.querySelector('.hamburger-menu');
    var navbarContainer = document.querySelector('.navbar-container');

    hamburgerMenu.addEventListener('click', function() {
        navbarContainer.classList.contains('active') ? navbarContainer.classList.remove('active') : navbarContainer.classList.add('active')
    });

})(window, document);