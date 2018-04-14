/* eslint-disable */

import { MarkerClusterer } from './markerclusterer';

export default (window, document) => {
  const mapElement = document.querySelector('#pokemon-go .map');

  if (!mapElement) {
    return;
  }

  window.PokemonGoMap = {
    mapElement,
    checkboxGyms: document.getElementById('gyms'),
    checkboxPokestops: document.getElementById('pokestops'),

    gymMarkers: [],
    pokestopMarkers: [],
    markerClusterer: {},

    init() {
      this.initMap();

      fetch('/api/pokemon-go/map-objects')
        .then(response => response.json())
        .then((mapObjects) => {
          this.createPokestopMarkers(mapObjects.pokestops);
          this.createGymMarkers(mapObjects.gyms);

          this.pokestopMarkers.forEach(marker => marker.setMap(this.map));

          this.checkboxPokestops.addEventListener('change', () => {
            if (this.checkboxPokestops.checked) {
              this.pokestopMarkers.forEach(marker => marker.setMap(this.map));
            } else {
              this.pokestopMarkers.forEach(marker => marker.setMap(null));
            }
          });

          this.checkboxGyms.addEventListener('change', () => {
            if (this.checkboxGyms.checked) {
              this.markerClusterer.addMarkers(this.gymMarkers);
            } else {
              this.markerClusterer.clearMarkers();
            }
          });
        });
    },

    initMap() {
      const stockholmCenter = { lat: 59.3253129, lng: 18.07083 };

      this.map = new google.maps.Map(this.mapElement, {
        zoom: 13,
        center: stockholmCenter,
        disableDefaultUI: true,
        clickableIcons: false,
      });
    },

    createPokestopMarkers(pokestops) {
      pokestops.forEach((mapObject) => {
        const marker = new google.maps.Marker({
          position: { lat: parseFloat(mapObject.latitude), lng: parseFloat(mapObject.longitude) },
          icon: '/img/pokestop.png',
        });

        this.pokestopMarkers.push(marker);
      });
    },

    createGymMarkers(gyms) {
      const clusterStyles = [
        {
          textColor: '#fff',
          textSize: 14,
          url: `data:image/svg+xml;base64,${btoa('<svg height="40" width="40" xmlns="http://www.w3.org/2000/svg"><circle cx="50%" cy="50%" r="50%" fill="#fff" fill-opacity=".9"/><circle cx="50%" cy="50%" r="42%" fill="#ab0809"/></svg>')}`,
          height: 40,
          width: 40,
        },
        {
          textColor: '#fff',
          textSize: 16,
          url: `data:image/svg+xml;base64,${btoa('<svg height="60" width="60" xmlns="http://www.w3.org/2000/svg"><circle cx="50%" cy="50%" r="50%" fill="#fff" fill-opacity=".9"/><circle cx="50%" cy="50%" r="42%" fill="#ab0809"/></svg>')}`,
          height: 60,
          width: 60,
        },
      ];

      const clusterOptions = {
        styles: clusterStyles,
        minimumClusterSize: 10,
        averageCenter: true,
        gridSize: 200,
      };

      gyms.forEach((mapObject) => {
        const marker = new google.maps.Marker({
          position: { lat: parseFloat(mapObject.latitude), lng: parseFloat(mapObject.longitude) },
          icon: '/img/gym.png',
        });

        this.gymMarkers.push(marker);
      });

      this.markerClusterer = new MarkerClusterer(this.map, [], clusterOptions);
    },

  };
};
