import React from 'react';
import map from '../../js/map';

class PokemonGo extends React.Component {

  componentDidMount() {
    map(window, document);

    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDpE5w-i9GioIey5bQy5bmcZpdV964O_9c&callback=PokemonGoMap.init';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div id="pokemon-go">
        <h2>Pokestops and Gyms in Stockholm</h2>
        <div className="map" />
        <div className="controls">
          <label htmlFor="pokestops">
            <input id="pokestops" type="checkbox" defaultChecked />
            Pokestops
          </label>
          <label htmlFor="gyms">
            <input id="gyms" type="checkbox" />
            Gyms
          </label>
        </div>
      </div>
    );
  }
}

export default PokemonGo;
