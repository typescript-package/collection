import { Collection } from "../lib";
import { SetAdapter } from '@typescript-package/collection-adapter';

const collection = new Collection({
  async: false,
  value: new Set([3,'a']),
}, SetAdapter, 1, 2, 'a', 'b' as string | number);

// Adds.
collection.add(27, 29, 31);
// Deletes.
collection.delete(29, 31, 22);

for (const element of collection) {
  console.log(`element: `, element);
}

console.log(`size: `, collection.size); // Output: 5

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
