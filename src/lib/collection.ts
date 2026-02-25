// Abstract.
import { CollectionBase } from '../core';
// Interface.
import { CollectionAdapter, CollectionAdapterConstructor } from '@typedly/collection';
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
  A extends CollectionAdapter<E, T, R> = CollectionAdapter<any, any, any>,
  E = A extends CollectionAdapter<infer E, any, any> ? E : unknown,
  T = A extends CollectionAdapter<E, infer T, any> ? T : unknown,
  R extends boolean = A extends CollectionAdapter<E, any, infer R> ? R : false,
> extends CollectionBase<E, T, R, A> {
  constructor(
    adapter: CollectionAdapterConstructor<E, T, R, A>,
    ...elements: E[]
  ) {
    super(false as R, adapter, ...elements);
  }
}
