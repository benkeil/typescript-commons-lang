export default class Maps {
  static of<K, V>(k1: K, v1: V): Map<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V): Map<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V): Map<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V): Map<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V): Map<K, V>;
  static of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V, k6: K, v6: V): Map<K, V>;
  static of<K, V>(k1: K, v1: V, k2?: K, v2?: V, k3?: K, v3?: V, k4?: K, v4?: V, k5?: K, v5?: V, k6?: K, v6?: V): Map<K, V> {
    const entries: readonly [K | undefined, V | undefined][] = [
      [k1, v1],
      [k2, v2],
      [k3, v3],
      [k4, v4],
      [k5, v5],
      [k6, v6],
    ];
    const notEmptyEntries = entries.filter((entry): entry is [K, V] => {
      const [k] = entry;
      return k !== undefined;
    });
    return this.ofEntries(...notEmptyEntries);
  }

  static ofEntries<K, V>(...entries: [K, V][]): Map<K, V> {
    return new Map<K, V>(entries);
  }

  static map<K, V, T>(map: Map<K, V>, mapFn: (key: K, value: V, map: Map<K, V>) => T, thisArg?: any): T[] {
    return Array.from(map.entries()).map<T>(([key, value]) => mapFn(key, value, map), thisArg);
  }
}
