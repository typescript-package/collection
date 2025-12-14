// Abstract.
import { CollectionBase } from '../core';
// Interface.
import { CollectionAdapter } from '@typedly/collection';
/**
 * @description The collection concrete class with adapter support.
 * @export
 * @class Collection
 * @template E The type of elements in the collection.
 * @template {boolean} R The `boolean` type to determine async methods.
 * @template {new (...elements: E[]) => CollectionAdapter<E, any, R>} A The type of the adapter.
 * @extends {CollectionBase<E, A extends new (...args: E[]) => CollectionAdapter<E, infer T, R> ? T : never, R, InstanceType<A>>}
 */
export class Collection<
  E,
  R extends boolean,
  A extends new (...elements: E[]) => CollectionAdapter<E, any, R>
> extends CollectionBase<
  E,
  A extends new (...args: E[]) => CollectionAdapter<E, infer T, R> ? T : never,
  R,
  InstanceType<A>
> {
  constructor(async: R, adapter: A, ...elements: E[]) {
    super(async, adapter as any, ...elements);
  }
}
