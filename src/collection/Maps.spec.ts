import Maps from './Maps';

describe('Maps', () => {
  test('of', () => {
    const map = Maps.of('k1', 1, 'k2', 2, 'k3', 3, 'k4', 4);
    expect(Array.from(map.keys())).toStrictEqual(['k1', 'k2', 'k3', 'k4']);
    expect(Array.from(map.values())).toStrictEqual([1, 2, 3, 4]);
  });

  test('ofEntries', () => {
    const map = Maps.ofEntries(['k1', 1], ['k2', 2], ['k3', 3], ['k4', 4]);
    expect(Array.from(map.keys())).toStrictEqual(['k1', 'k2', 'k3', 'k4']);
    expect(Array.from(map.values())).toStrictEqual([1, 2, 3, 4]);
  });

  test('map', () => {
    const map = Maps.ofEntries(['k1', 1], ['k2', 2], ['k3', 3], ['k4', 4]);
    const mapped = Maps.map(map, (key, value) => `${key}-${value}`);
    expect(mapped).toStrictEqual(['k1-1', 'k2-2', 'k3-3', 'k4-4']);
  });
});
