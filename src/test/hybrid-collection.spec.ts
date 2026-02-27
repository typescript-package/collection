import { HybridCollection } from "../lib";
import { HybridSetAdapter } from "./hybrid-set.adapter";

const hybridCollection = new HybridCollection(
  false as boolean,
  HybridSetAdapter,
  1, 2, '3' as string | number
);


console.log(hybridCollection.async, hybridCollection.adapter.async);

// Adds.
hybridCollection.add(27, 29, 31);
// Deletes.
hybridCollection.delete(29, 31, 22);

for (const element of hybridCollection) {
  console.log(`element: `, element);
}

// For proper hybrid collection, we can switch to async mode and perform async operations.
const asyncCollection = hybridCollection.with(true);
asyncCollection.add(42, 43, 44);

describe("Synchronous HybridCollection with HybridSetAdapter", () => {
  let hybridCollection = new HybridCollection(
    false,
    HybridSetAdapter,
    1, 2, '3' as string | number
  );
  beforeEach(() => {
    hybridCollection.clear();
  });
  test("has method works correctly", () => {
    expect(hybridCollection.async).toEqual(false);
    expect(hybridCollection.async).toBe(hybridCollection.adapter.async);
  });

  test("clear method works correctly", () => {
    hybridCollection.clear();
    expect(hybridCollection.size).toBe(0);
  });
});

describe("Asynchronous HybridCollection with HybridSetAdapter", () => {
  let hybridCollection = new HybridCollection(
    true,
    HybridSetAdapter,
    1, 2, '3' as string | number
  );
  beforeEach(() => {
    hybridCollection.clear();
  });
  test("has method works correctly", () => {
    expect(hybridCollection.async).toEqual(true);
    expect(hybridCollection.async).toBe(hybridCollection.adapter.async);
  });

  test("clear method works correctly", () => {
    hybridCollection.clear();
    expect(hybridCollection.size).toBe(0);
  });
});
