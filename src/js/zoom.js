(function (window, document, undefined) {

    'use strict';

    var zoomList = document.querySelectorAll('.zoom');
    var i;

    for (i = 0; i < zoomList.length; ++i) {

        (function(zoomElement) {

            var preloadImage = new Image();
            preloadImage.src = zoomList[i].getAttribute('data-zoom-src');

            preloadImage.onload = function() {
                zoomElement.addEventListener('click', zoom.bind(null, preloadImage));
            };

        })(zoomList[i]);

    }

    var zoom = function(preloadImage)  {

        var zoomContainer = document.createElement('div');
        var overlay = document.createElement('div');

        zoomContainer.className = 'zoom-container';
        overlay.className = 'overlay';

        zoomContainer.appendChild(overlay);
        zoomContainer.appendChild(preloadImage);
        document.body.appendChild(zoomContainer);

        window.getComputedStyle(overlay).opacity;
        overlay.classList.add('fade');

        document.querySelector('.zoom-container').addEventListener('click', unzoom);
        window.addEventListener('scroll', unzoom);
        window.addEventListener('keyup', unzoom);

    };

    var unzoom = function(e) {

        var zoomContainer;

        if (e.type === 'keyup' && e.keyCode !== 27)
            return false;

        zoomContainer = document.querySelector('.zoom-container');
        zoomContainer.parentNode.removeChild(zoomContainer);

        window.removeEventListener('scroll', unzoom);
        window.removeEventListener('keyup', unzoom);

    };

})(window, document);