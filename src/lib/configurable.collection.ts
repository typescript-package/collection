// Abstract.
import { ConfigurableCollectionBase } from '../core/lib';
// Interface.
import { CollectionAdapter, CollectionSettings, ConfigurableCollectionAdapterConstructor } from '@typedly/collection';
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
  }
}
