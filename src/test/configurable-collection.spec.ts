import { CollectionSettings } from "@typedly/collection";
import { SetAdapter } from '@typescript-package/collection-adapter';

import { ConfigurableCollection } from "../public-api";

export class ConfigurableSetAdapter<
  const C extends CollectionSettings<E, T, false>,
  E,
  T extends Set<E>,
  R
> extends SetAdapter<E, T> {
  configuration: C;
  constructor(settings: C, ...elements: E[]) {
    super(...elements);
    this.configuration = settings;
  }
}

const collection = new ConfigurableCollection(
  {async: false, capacity: 10 as number},
  ConfigurableSetAdapter,
  1, 2, '3' as string | number
);

// Adds.
collection.add(27, 29, 31);
// Deletes.
collection.delete(29, 31, 22);

for (const element of collection) {
  console.log(`element: `, element);
}

console.log(`size: `, collection.size); // Output: 4

const capacityCollection = collection.with({async: false, capacity: 20});

console.log(`capacityCollection.configuration: `, capacityCollection.configuration); // Output: { async: false, capacity: 20 }
console.log(`collection.configuration: `, collection.configuration); // Output: { async: false, capacity: 10 }

describe("HybridCollection SetAdapter", () => {
  test("has method works correctly", () => {
    expect(collection.has(27)).toBe(true);
    expect(collection.has(29)).toBe(false);
  });

  test("clear method works correctly", () => {
    collection.clear();
    expect(collection.size).toBe(0);
  });
});
