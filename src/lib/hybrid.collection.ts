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
  /**
   * @inheritdoc Override the `Symbol.toStringTag` to return 'HybridCollection' for better debugging and identification of instances of this class.
   * @readonly
   * @type {string}
   */
  override get [Symbol.toStringTag](): string {
    return 'HybridCollection';
  }

  /**
   * @description Privately stored adapter constructor of type `CollectionAdapterConstructor<E, T, any, any>`, used for creating new instances of the adapter with different async states in the `with` method.
   * @type {CollectionAdapterConstructor<E, T, any, any>}
   */
  #adapterCtor: CollectionAdapterConstructor<E, T, any, any>;

  /**
   * Creates an instance of `HybridCollection`.
   * @constructor
   * @param {R} async 
   * @param {CollectionAdapterConstructor<E, T, R, A>} adapter 
   * @param {...E[]} elements 
   */
  constructor(
    async: R,
    adapter: CollectionAdapterConstructor<E, T, R, A>,
    ...elements: E[]
  ) {
    super(async, adapter, ...elements);
    this.#adapterCtor = adapter;
  }

  /**
   * @description Creates a new instance of `HybridCollection` with the same elements but different async state. The new instance is created using the same adapter constructor and elements as the current instance, but with the async state determined by the `async` parameter.
   * @public
   * @param {R} async The async state for the new `HybridCollection` instance. If `true`, the new instance will have asynchronous methods; if `false`, it will have synchronous methods.
   * @template {CollectionAdapter<E, T, S>} A 
   * @param {S} async 
   * @returns {HybridCollection<A, E, T, S>} A new `HybridCollection` instance with the specified async state.
   */
  public with<
    S extends R,
    A extends CollectionAdapter<E, T, S>
  >(async: S): HybridCollection<A, E, T, S> {
    const val = this.adapter.value;
    let elements: E[] = [];
    if (Array.isArray(val)) {
      elements = val as E[];
    } else if (val == null) {
      elements = [];
    } else if (super.isIterable(val)) {
      elements = Array.from(val);
    } else {
      elements = [val as E];
    }
    return new HybridCollection(async, this.#getAdapterCtor(async), ...elements);
  }

  /**
   * @description Helper method to retrieve the adapter constructor with the correct async type. This method is used internally in the `with` method to create a new instance of the adapter with the specified async state.
   * @template {R} S 
   * @template {CollectionAdapter<E, T, S>} A 
   * @param {S} async 
   * @returns {CollectionAdapterConstructor<E, T, S, A>} 
   */
  #getAdapterCtor<
    S extends R,
    A extends CollectionAdapter<E, T, S>
  >(async: S): CollectionAdapterConstructor<E, T, S, A> {
    return this.#adapterCtor;
  }
}
