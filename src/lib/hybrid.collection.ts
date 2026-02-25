// Abstract.
import { CollectionBase } from '../core';
// Interface.
import { CollectionAdapter, CollectionAdapterConstructor } from '@typedly/collection';
/**
 * @description The hybrid collection concrete class adapter support for switchable asynchronous state.
 * @export
 * @class HybridCollection
 * @template {CollectionAdapter<E, T, R>} [A=CollectionAdapter<any, any, any>] The type of the adapter.
 * @template [E=A extends CollectionAdapter<infer E, any, any> ? E : unknown] The type of elements in the collection captured via adapter.
 * @template [T=A extends CollectionAdapter<E, infer T, any> ? T : unknown] The type of the collection's value captured via adapter.
 * @template {boolean} [R=A extends CollectionAdapter<E, any, infer R> ? R : false] The `boolean` type to determine async methods captured via adapter.
 * @extends {CollectionBase<E, T, R, A>}
 */
export class HybridCollection<
  A extends CollectionAdapter<E, T, R> = CollectionAdapter<any, any, any>,
  E = A extends CollectionAdapter<infer E, any, any> ? E : unknown,
  T = A extends CollectionAdapter<E, infer T, any> ? T : unknown,
  R extends boolean = A extends CollectionAdapter<E, any, infer R> ? R : false,
> extends CollectionBase<E, T, R, A> {
  override get [Symbol.toStringTag](): string {
    return 'HybridCollection';
  }
  #adapterCtor: CollectionAdapterConstructor<E, T, R, A>;
  constructor(
    async: R,
    adapter: CollectionAdapterConstructor<E, T, R, A>,
    ...elements: E[]
  ) {
    super(async, adapter, ...elements);
    this.#adapterCtor = adapter;
  }

  /**
   * @description
   * @public
   * @param {R} async 
   * @returns {HybridCollection<A, E, T, R>} 
   */
  public with(async: R): HybridCollection<A, E, T, R> {
    return new HybridCollection(async, this.#adapterCtor, ...Array.from(this.adapter.value as any) as E[]);
  }
}
