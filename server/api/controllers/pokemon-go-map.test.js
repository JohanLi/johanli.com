import pokemonGoMap from './pokemon-go-map';
import model from '../models/pokemon-go-map';

model.gyms = jest.fn();
model.pokestops = jest.fn();

const res = {
  json: jest.fn(),
};

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
  it('returns gyms and pokestops', async () => {
    model.gyms.mockResolvedValue(mapObjects);
    model.pokestops.mockResolvedValue(mapObjects2);
    await pokemonGoMap.getMapObjects({}, res);

    expect(res.json).toHaveBeenCalledWith({
      gyms: mapObjects,
      pokestops: mapObjects2,
    });
  });
});
