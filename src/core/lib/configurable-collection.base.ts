// Class.
import { DataCore } from '@typescript-package/data';
// Interface.
import { AsyncReturn, IterValue } from '@typedly/data';
import { CollectionAdapter, CollectionSettings, CollectionShape, ConfigurableCollectionAdapterConstructor } from '@typedly/collection';
/**
 * @description The core abstract class for configurable collections of elements `Element` type.
 * @export
 * @abstract
 * @class ConfigurableCollectionBase
 * @template E type in collection.
 * @template T of the collection.
 * @template {boolean} R boolean indicating async (true) or sync (false) behavior.
 * @template {CollectionSettings<E, T, R>} C settings type.
 * @template {CollectionAdapter<E, T, R>} A adapter type.
 * @extends {DataCore<T, R>} Base data class with value type `T` and async state `R`.
 * @implements {CollectionShape<E, T, R>} Interface defining collection methods and properties.
 */
export abstract class ConfigurableCollectionBase<
  E,
  T,
  R extends boolean,
  C extends CollectionSettings<E, T, R>,
  A extends CollectionAdapter<E, T, R>
> extends DataCore<T, R>
  implements CollectionShape<E, T, R> {
  /**
   * @description Returns the `string` tag representation of the `BaseData` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return ConfigurableCollectionBase.toStringTag;
  }
  public get adapter(): A {
    return this.#adapter;
  }
  public get async(): R {
    return this.#adapter?.async ?? false as R;
  }
  public get configuration(): C {
    return this.#adapter.configuration as C;
  }
  public get size(): number {
    return this.#adapter.size ?? 0;
  }
  public get value(): T {
    return this.#adapter.value;
  }

  /**
   * @description Optional privately stored adapter of type `A`.
   * @type {?A}
   */
  #adapter: A;

  /**
   * Creates an instance of `ConfigurableCollectionBase`.
   * @constructor
   * @param {C} settings The settings for the adapter data.
   * @param {ConfigurableCollectionAdapterConstructor<E, T, C, A>} adapter The adapter constructor.
   * @param {...E[]} args The arguments passed to the adapter constructor.
   */
  constructor(
    settings: C,
    adapter: ConfigurableCollectionAdapterConstructor<E, T, C, A>,
    ...args: E[]
  ) {
    super();
    this.#adapter = new adapter(settings, ...args);
  }
  public add(...element: E[]): AsyncReturn<R, this> {
    return this.returnThis(this.adapter.add(...element));
  }
  public clear(): AsyncReturn<R, this> {
    return this.returnThis(
      this.#adapter
        ? this.#adapter.clear() as AsyncReturn<R, A>
        : this
    );
  }
  public delete(...element: E[]): AsyncReturn<R, boolean> {
    return this.adapter.delete(...element);
  }
  public destroy(): AsyncReturn<R, this> {
    return this.returnThis(this.#adapter
        ? this.#adapter.destroy() as AsyncReturn<R, A>
        : this
      );
  }
  public forEach(callbackfn: (element: E, element2: E, collection: CollectionShape<E, T, R>) => void, thisArg?: any): AsyncReturn<R, this> {
    return this.returnThis(this.adapter.forEach(callbackfn as any, thisArg));
  }
  public getValue(): AsyncReturn<R, T> {
    return this.#adapter.getValue();
  }
  public has(...element: E[]): AsyncReturn<R, boolean> {
    return this.adapter.has(...element);
  }
  public override lock(): this {
    return this.adapter.lock?.(), this;
  }
  public setValue(value: T): AsyncReturn<R, this> {
    return super.validate(),
      this.returnThis(
        this.#adapter
          ? this.#adapter.setValue(value) as AsyncReturn<R, A>
          : this
      );
  }
  public toArray(): AsyncReturn<R, E[]> {
    return this.adapter.toArray!();
  }
  protected returnThis(result: AsyncReturn<R, A> | this): AsyncReturn<R, this> {
    return (result instanceof Promise
        ? result.then(() => this)
        : this.#adapter.async ? Promise.resolve(this) : this
      ) as AsyncReturn<R, this>;
  }
  override *[Symbol.iterator](): IterableIterator<E extends IterValue<T> ? E : IterValue<T>> {
    yield* this.adapter[Symbol.iterator]?.() as any;
  }
}
