(function(window, document, undefined) {

    var self = window.PokemonGoMap = {};

    self.mapElement = document.querySelector('.pokemon-go .map');
    self.checkboxGyms = document.querySelector('.pokemon-go input[type=checkbox].gyms');
    self.checkboxPokestops = document.querySelector('.pokemon-go input[type=checkbox].pokestops');

    self.gymMarkers = [];
    self.pokestopMarkers = [];

    self.markerClusterer = {};

    self.init = function() {

        self.initMap();
        self.getMapObjects(function() {
            self.pokestopMarkers.map(function(marker) {
                marker.setMap(self.map)
            });
        });
    };

    self.initMap = function() {

        var stockholmCenter = {lat: 59.3253129, lng: 18.07083};

        self.map = new google.maps.Map(self.mapElement, {
            zoom: 13,
            center: stockholmCenter,
            disableDefaultUI: true
        });

    };

    self.getMapObjects = function(callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/pokemon-go/map-objects');
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var mapObjects = JSON.parse(xhr.responseText);
                self.createPokestopMarkers(mapObjects.pokestops);
                self.createGymMarkers(mapObjects.gyms);
                callback();
            }
        }

    };

    self.createGymMarkers = function(gyms) {

        var clusterStyles = [
            {
                textColor: '#fff',
                textSize: 14,
                url: 'data:image/svg+xml;base64,' + window.btoa('<svg height="40" width="40" xmlns="http://www.w3.org/2000/svg"><circle cx="50%" cy="50%" r="50%" fill="#fff" fill-opacity=".9"/><circle cx="50%" cy="50%" r="42%" fill="#ab0809"/></svg>'),
                height: 40,
                width: 40
            },
            {
                textColor: '#fff',
                textSize: 16,
                url: 'data:image/svg+xml;base64,' + window.btoa('<svg height="60" width="60" xmlns="http://www.w3.org/2000/svg"><circle cx="50%" cy="50%" r="50%" fill="#fff" fill-opacity=".9"/><circle cx="50%" cy="50%" r="42%" fill="#ab0809"/></svg>'),
                height: 60,
                width: 60
            }
        ];

        var clusterOptions = {
            styles: clusterStyles,
            minimumClusterSize: 10,
            averageCenter: true,
            gridSize: 200
        };

        gyms.forEach(function(mapObject) {

            var marker = new google.maps.Marker({
                position: {
                    lat: mapObject.latitude,
                    lng: mapObject.longitude
                },
                icon: '/img/gym.png'
            });

            self.gymMarkers.push(marker);

        });

        self.markerClusterer = new MarkerClusterer(self.map, [], clusterOptions);

    };


    self.createPokestopMarkers = function(pokestops) {

        pokestops.forEach(function(mapObject) {

            var marker = new google.maps.Marker({
                position: {
                    lat: mapObject.latitude,
                    lng: mapObject.longitude
                },
                icon: '/img/pokestop.png'
            });

            self.pokestopMarkers.push(marker);

        });
    };

    self.checkboxGyms.addEventListener('change', function() {
        if (self.checkboxGyms.checked) {
            self.markerClusterer.addMarkers(self.gymMarkers);
        } else {
            self.markerClusterer.clearMarkers();
        }
    });

    self.checkboxPokestops.addEventListener('change', function() {
        if (self.checkboxPokestops.checked) {
            self.pokestopMarkers.map(function(marker) {
                marker.setMap(self.map)
            });
        } else {
            self.pokestopMarkers.map(function(marker) {
                marker.setMap(null)
            });
        }
    });

})(window, document);