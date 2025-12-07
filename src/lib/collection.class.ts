// Abstract.
import { CollectionBase } from "../core";
// Interface.
import { CollectionAdapter } from "@typedly/collection";
/**
 * @description The collection concrete class with adapter support.
 * @export
 * @class Collection
 * @template E The type of elements in the collection.
 * @template {new (...args: any[]) => CollectionAdapter<E, any>} A The type of the adapter.
 * @extends {CollectionBase<E, any, InstanceType<A>>}
 */
export class Collection<
  E,
  A extends new (...args: any[]) => CollectionAdapter<E, any>
> extends CollectionBase<E, any, InstanceType<A>> {
  constructor(adapter: A, ...elements: E[]) {
    super(adapter as any, ...elements);
  }
}
