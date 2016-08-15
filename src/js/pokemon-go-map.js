var map;

function initMap() {

    var stockholmCenter = {lat: 59.3253129, lng: 18.07083};

    map = new google.maps.Map(document.querySelector('.pokemon-go .map'), {
        zoom: 13,
        center: stockholmCenter
    });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/pokemon-go/map-objects');
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            placePokestops(JSON.parse(xhr.responseText));
        }
    }

}

function placePokestops(mapObjects) {

    mapObjects.pokestops.forEach(function(mapObject) {

        marker = new google.maps.Marker({
            position: {
                lat: mapObject.latitude,
                lng: mapObject.longitude
            },
            map: map,
            icon: '/img/pokestop.png'
        });

    });

    mapObjects.gyms.forEach(function(mapObject) {

        marker = new google.maps.Marker({
            position: {
                lat: mapObject.latitude,
                lng: mapObject.longitude
            },
            map: map,
            icon: '/img/gym.png'
        });

    });

}