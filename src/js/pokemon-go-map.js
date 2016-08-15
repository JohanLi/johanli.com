(function(window, document, undefined) {

    var self = window.PokemonGoMap = {};
    self.mapElement = document.querySelector('.pokemon-go .map');

    self.init = function() {

        self.initMap();
        self.getMapObjects();

    };

    self.initMap = function() {

        var stockholmCenter = {lat: 59.3253129, lng: 18.07083};

        self.map = new google.maps.Map(self.mapElement, {
            zoom: 13,
            center: stockholmCenter
        });

        self.setMapBounds();

    };

    self.setMapBounds = function() {

        var southwestCorner = new google.maps.LatLng(59.139737, 17.541863);
        var northeastCorner = new google.maps.LatLng(59.655298, 18.732458);

        var strictBounds = new google.maps.LatLngBounds(southwestCorner, northeastCorner);
        var lastValidCenter = self.map.getCenter();

        google.maps.event.addListener(self.map, 'center_changed', function() {

            if (strictBounds.contains(self.map.getCenter())) {
                lastValidCenter = self.map.getCenter();
                return;
            }

            self.map.panTo(lastValidCenter);
        });

    };

    self.getMapObjects = function() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/pokemon-go/map-objects');
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                self.placePokestops(JSON.parse(xhr.responseText));
            }
        }

    };

    self.placePokestops = function(mapObjects) {

        mapObjects.pokestops.forEach(function(mapObject) {

            marker = new google.maps.Marker({
                position: {
                    lat: mapObject.latitude,
                    lng: mapObject.longitude
                },
                map: self.map,
                icon: '/img/pokestop.png'
            });

        });

        mapObjects.gyms.forEach(function(mapObject) {

            marker = new google.maps.Marker({
                position: {
                    lat: mapObject.latitude,
                    lng: mapObject.longitude
                },
                map: self.map,
                icon: '/img/gym.png'
            });

        });

    }

})(window, document);