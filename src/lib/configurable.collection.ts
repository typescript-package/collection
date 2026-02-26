// Abstract.
import { ConfigurableCollectionBase } from '../core/lib';
// Interface.
import {
  CollectionAdapter,
  CollectionSettings,
  ConfigurableCollectionAdapterConstructor
} from '@typedly/collection';
/**
 * @description The configurable collection concrete class with adapter support.
 * @export
 * @class ConfigurableCollection
 * @template {CollectionAdapter<E, T, R>} A The type of the adapter.
 * @template {CollectionSettings<E, T, any>} C The type of settings.
 * @template [E=A extends CollectionAdapter<infer E, any, any> ? E : unknown] The type of elements in the collection, captured via adapter.
 * @template [T=C['value'] extends undefined | unknown ? A extends CollectionAdapter<any, infer T, any> ? T : unknown : C['value']] The type of the collection's value captured via adapter.
 * @template {boolean} [R=C['async'] extends boolean ? C['async'] : A extends CollectionAdapter<E, any, infer R> ? R : false] The `boolean` type to determine async methods.
 * @extends {ConfigurableCollectionBase<E, T, R, C, A>}
 */
export class ConfigurableCollection<
  A extends CollectionAdapter<E, T, R>,
  const C extends CollectionSettings<E, T, any>,
  E = A extends CollectionAdapter<infer E, any, any> ? E : unknown,
  T = C['value'] extends undefined | unknown ? A extends CollectionAdapter<any, infer T, any> ? T : unknown : C['value'],
  R extends boolean = C['async'] extends boolean ? C['async'] : A extends CollectionAdapter<E, any, infer R> ? R : false,
> extends ConfigurableCollectionBase<E, T, R, C, A> {
  /**
   * @inheritdoc Override the `Symbol.toStringTag` to return 'ConfigurableCollection' for better debugging and identification of instances of this class.
   * @readonly
   * @type {string}
   */
  override get [Symbol.toStringTag](): string {
    return 'ConfigurableCollection';
  }

  /**
   * @description Private field to store the adapter constructor. This is used to create new instances of the adapter when changing the async state in the `with` method. The type of this field is a constructor function that can create an adapter with the appropriate types for elements, value, settings, and async state.
   * @type {ConfigurableCollectionAdapterConstructor<E, T, any, any>}
   */
  #adapterCtor: ConfigurableCollectionAdapterConstructor<E, T, any, any>;
  
  /**
   * Creates an instance of `ConfigurableCollection`.
   * @constructor
   * @param {C} [settings={} as C] Settings for the collection, including async state and value type.
   * @param {ConfigurableCollectionAdapterConstructor<E, T, C, A>} adapter The adapter constructor to create the collection's adapter.
   * @param {...E[]} elements Initial elements to add to the collection.
   */
  constructor(
    settings: C = {} as C,
    adapter: ConfigurableCollectionAdapterConstructor<E, T, C, A>,
    ...elements: E[]
  ) {
    super(settings, adapter, ...elements);
    this.#adapterCtor = adapter;
  }

  /**
   * @description Creates a new instance of `HybridCollection` with the same elements but different async state. The new instance is created using the same adapter constructor and elements as the current instance, but with the async state determined by the `async` parameter.
   * @public
   * @param {R} settings The async state for the new `HybridCollection` instance. If `true`, the new instance will have asynchronous methods; if `false`, it will have synchronous methods.
   * @template {CollectionAdapter<E, T, S>} A 
   * @param {S} settings 
   * @returns {HybridCollection<A, E, T, S>} A new `HybridCollection` instance with the specified async state.
   */
  public with<
    const S extends C,
    A extends CollectionAdapter<E, T, any>,
    R extends boolean = S['async'] extends boolean ? S['async'] : A extends CollectionAdapter<E, any, infer R> ? R : false,
  >(settings: S): ConfigurableCollection<A, S, E, T, R> {
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
    return new ConfigurableCollection(settings, this.#getAdapterCtor(settings), ...elements);
  }

  /**
   * @description Helper method to retrieve the adapter constructor with the correct async type. This method is used internally in the `with` method to create a new instance of the adapter with the specified async state.
   * @template {R} S 
   * @template {CollectionAdapter<E, T, S>} A 
   * @param {S} settings 
   * @returns {CollectionAdapterConstructor<E, T, S, A>} 
   */
  #getAdapterCtor<
    S extends C,
    A extends CollectionAdapter<E, T, any>
  >(settings: S): ConfigurableCollectionAdapterConstructor<E, T, S, A> {
    return this.#adapterCtor;
  }
}
