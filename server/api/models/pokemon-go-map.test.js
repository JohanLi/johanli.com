import pokemonGoMap from './pokemon-go-map';

pokemonGoMap.gyms = jest.fn();
pokemonGoMap.pokestops = jest.fn();

const mapObjects = [
  {
    latitude: 11.123456,
    longitude: 22.234567,
  },
  {
    latitude: 33.345678,
    longitude: 44.456789,
  },
];

const mapObjects2 = [
  {
    latitude: 12.123456,
    longitude: 23.234567,
  },
];

describe('pokemon go map', () => {
  it('returns gyms and pokestops', () => {
    pokemonGoMap.gyms.mockResolvedValue(mapObjects);
    pokemonGoMap.pokestops.mockResolvedValue(mapObjects2);

    expect.assertions(1);
    return expect(pokemonGoMap.getMapObjects()).resolves.toEqual({
      gyms: mapObjects,
      pokestops: mapObjects2,
    });
  });
});
