import { SetAdapter } from "../adapter";
import { Collection } from "../lib";

const collection = new Collection(SetAdapter, 1, 2, 3);

// Adds.
collection.add(27, 29, 31, 33);
// Deletes.
collection.delete(29, 31);

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
