((window, document) => {
  if (window.screen.width < 992) {
    return;
  }

  const zoomList = document.querySelectorAll('.zoom');
  zoomList.forEach(enableClickAfterLoading);

  function enableClickAfterLoading(zoomElement) {
    const preloadImage = new Image();
    preloadImage.src = zoomElement.getAttribute('data-zoom-src');

    preloadImage.onload = () => {
      zoomElement.addEventListener('click', () => zoom(preloadImage));
    };
  }

  function zoom(preloadImage) {
    const zoomContainer = document.createElement('div');
    const overlay = document.createElement('div');

    zoomContainer.className = 'zoom-container';
    overlay.className = 'overlay';

    zoomContainer.appendChild(overlay);
    zoomContainer.appendChild(preloadImage);
    document.body.appendChild(zoomContainer);

    // window.getComputedStyle(overlay).opacity;
    overlay.classList.add('fade');

    document.querySelector('.zoom-container').addEventListener('click', unzoom);
    window.addEventListener('scroll', unzoom);
    window.addEventListener('keyup', unzoom);
  }

  function unzoom(event) {
    if (event.type === 'keyup' && event.keyCode !== 27) {
      return;
    }

    const zoomContainer = document.querySelector('.zoom-container');
    zoomContainer.parentNode.removeChild(zoomContainer);

    window.removeEventListener('scroll', unzoom);
    window.removeEventListener('keyup', unzoom);
  }
})(window, document);
