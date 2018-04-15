import React from 'react';
import DocumentTitle from 'react-document-title';

import { MarkerClusterer } from './js/markerclusterer';

import styles from './pokemonGo.scss';

class PokemonGo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokestops: true,
      gyms: false,
    };

    this.mapElement = React.createRef();
  }

  componentDidMount() {
    const callback = 'PokemonGoMapInit';

    if (window[callback]) {
      this.init();
    } else {
      window[callback] = () => this.init();

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDpE5w-i9GioIey5bQy5bmcZpdV964O_9c&callback=${callback}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pokestops !== this.state.pokestops) {
      if (this.state.pokestops) {
        this.pokestopMarkers.forEach(marker => marker.setMap(this.map));
      } else {
        this.pokestopMarkers.forEach(marker => marker.setMap(null));
      }
    }

    if (prevState.gyms !== this.state.gyms) {
      if (this.state.gyms) {
        this.markerClusterer.addMarkers(this.gymMarkers);
      } else {
        this.markerClusterer.clearMarkers();
      }
    }
  }

  handleInputChange(event) {
    const { id, checked } = event.target;

    this.setState({
      [id]: checked,
    });
  }

  async init() {
    this.initMap();
    this.initMarkerClusterer();

    const response = await fetch('/api/pokemon-go/map-objects');
    const { pokestops, gyms } = await response.json();
    this.createPokestopMarkers(pokestops);
    this.createGymMarkers(gyms);

    this.componentDidUpdate({}, {
      pokestops: false,
      gyms: false,
    });
  }

  initMap() {
    const stockholmCenter = {
      lat: 59.3253129,
      lng: 18.07083,
    };

    this.map = new window.google.maps.Map(this.mapElement.current, {
      zoom: 13,
      center: stockholmCenter,
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: 'greedy',
    });
  }

  initMarkerClusterer() {
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

    this.markerClusterer = new MarkerClusterer(this.map, [], clusterOptions);
  }

  createPokestopMarkers(pokestops) {
    this.pokestopMarkers = pokestops.map(mapObject => new window.google.maps.Marker({
      position: {
        lat: parseFloat(mapObject.latitude),
        lng: parseFloat(mapObject.longitude),
      },
      icon: '/img/pokestop.png',
    }));
  }

  createGymMarkers(gyms) {
    this.gymMarkers = gyms.map(mapObject => new window.google.maps.Marker({
      position: {
        lat: parseFloat(mapObject.latitude),
        lng: parseFloat(mapObject.longitude),
      },
      icon: '/img/gym.png',
    }));
  }

  render() {
    return (
      <DocumentTitle title="Pokestops and Gyms in Stockholm - Johan Li">
        <div className={styles.pokemonGo}>
          <h2>Pokestops and Gyms in Stockholm</h2>
          <div className={styles.map} ref={this.mapElement} />
          <div className={styles.controls}>
            <label htmlFor="pokestops">
              <input
                id="pokestops"
                type="checkbox"
                checked={this.state.pokestops}
                onChange={event => this.handleInputChange(event)}
              />
              Pokestops
            </label>
            <label htmlFor="gyms">
              <input
                id="gyms"
                type="checkbox"
                checked={this.state.gyms}
                onChange={event => this.handleInputChange(event)}
              />
              Gyms
            </label>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default PokemonGo;
