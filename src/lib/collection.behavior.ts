// Type.
import { IterableElement } from "@typedly/data";
/**
 * @description The `CollectionBehavior` type defines a set of methods that represent the behavior of a collection data structure.
 * It is a generic type that takes two type parameters: `T`, which extends `Iterable<E>`, representing the type of the collection, and `E`, which defaults to `IterableElement<T>`, representing the type of elements in the collection.
 * @export
 * @template {Iterable<E>} T 
 * @template [E=IterableElement<T>] 
 */
export type CollectionBehavior<T extends Iterable<E>, E = IterableElement<T>> = {
  create(...elements: E[]): T;
  add(store: T, ...elements: E[]): void;
  clear(store: T): void;
  delete(store: T, ...elements: E[]): boolean;
  has(store: T, ...elements: E[]): boolean;
  size(store: T): number;
  toArray(store: T): E[];
};
