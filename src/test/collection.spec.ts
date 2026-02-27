import { Collection } from "../lib";
import { SetAdapter } from '@typescript-package/collection-adapter';
import { AsyncSetAdapter } from "./async-set.adapter";

export class CustomSetAdapter<
  E,
  T extends Set<E> = Set<E>,
> extends SetAdapter<E, T> {
  constructor(...elements: E[]) {
    super(...elements);

    console.log(`CustomSetAdapter initialized with elements: `, elements, this.async);
  }
}

const collection = new Collection(
  CustomSetAdapter,
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


// Asynchronous operations.
const asyncCollection = new Collection(
  AsyncSetAdapter,
  1, 2, '3' as string | number
);

// Adds.
asyncCollection.add(27, 29, 31);
// Deletes.
asyncCollection.delete(29, 31, 22);

for (const element of asyncCollection) {
  console.log(`element: `, element);
}

console.log(`size: `, asyncCollection.size); // Output: 4


describe("Collection SetAdapter", () => {
  test("has method works correctly", () => {
    expect(collection.has(27)).toBe(true);
    expect(collection.has(29)).toBe(false);
  });

  test("clear method works correctly", () => {
    collection.clear();
    expect(collection.size).toBe(0);
  });
});
