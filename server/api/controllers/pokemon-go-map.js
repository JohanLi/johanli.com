import pokemonGoMap from '../models/pokemon-go-map';

export default {
  async getMapObjects(req, res) {
    const gyms = await pokemonGoMap.gyms();
    const pokestops = await pokemonGoMap.pokestops();

    res.json({ gyms, pokestops });
  },
};
