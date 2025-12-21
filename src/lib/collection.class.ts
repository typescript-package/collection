// Abstract.
import { CollectionBase } from '../core';
// Interface.
import { CollectionAdapter } from '@typedly/collection';
/**
 * @description The collection concrete class with adapter support.
 * @export
 * @class Collection
 * @template T 
 * @template [E=unknown] The type of elements in the collection.
 * @template {boolean} [R=false] The `boolean` type to determine async methods.
 * @template {CollectionAdapter<E, T, R>} [A=CollectionAdapter<E, T, R>] The type of the adapter.
 * @extends {CollectionBase<E, T, R, A>}
 */
export class Collection<
  T,
  E,
  R extends boolean = false,
  A extends CollectionAdapter<E, T, R> = CollectionAdapter<E, T, R>
> extends CollectionBase<E, T, R, A> {
  constructor(
    {async, value}: {
      async?: R,
      value?: T,
    },
    adapter: {new (...elements: E[]): A},
    ...elements: E[]
  ) {
    super(async || false as R, adapter, ...elements);
  }
}
