import { HybridCollection } from "../lib";
import { SetAdapter } from '@typescript-package/collection-adapter';

const collection = new HybridCollection(
  false as boolean,
  SetAdapter,
  1, 2, '3' as string | number
);

// Adds.
collection.add(27, 29, 31);
// Deletes.
collection.delete(29, 31, 22);

for (const element of collection) {
  console.log(`element: `, element);
}

// For proper hybrid collection, we can switch to async mode and perform async operations.
const asyncCollection = collection.with(true);
asyncCollection.add(42, 43, 44);

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
