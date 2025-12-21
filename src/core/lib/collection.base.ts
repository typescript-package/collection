// Abstract.
import { AdapterData } from '@typescript-package/data';
// Interface.
import { CollectionAdapter, CollectionShape } from '@typedly/collection';
// Type.
import { AsyncReturn, IterValue } from '@typedly/data';
/**
 * @description The core abstract class for `Type` collections of elements `Element` type.
 * @export
 * @abstract
 * @class CollectionBase
 * @template E type in collection.
 * @template T of the collection.
 * @template {boolean} R boolean indicating async (true) or sync (false) behavior.
 * @template {CollectionAdapter<E, T, R>} A Adapter type.
 * @implements {CollectionShape<E, T, R>}
 */
export abstract class CollectionBase<
  E,
  T,
  R extends boolean,
  A extends CollectionAdapter<E, T, R>
> extends AdapterData<T, E[], R, A>
  implements CollectionShape<E, T, R> {
  override get [Symbol.toStringTag](): string {
    return 'Collection';
  }
  override get adapter(): A {
    return super.adapter as A;
  }
  public get size(): number {
    return this.adapter.size;
  }
  constructor(
    async: R,
    adapter: {new (...elements: E[]): A},
    ...elements: E[]
  ) {
    super(
      async,
      adapter,
      ...elements
    );
  }
  public add(...element: E[]): AsyncReturn<R, this> {
    const result = this.adapter.add(...element);
    return (result instanceof Promise
      ? result.then(() => this)
      : this) as AsyncReturn<R, this>;
  }
  public delete(...element: E[]): AsyncReturn<R, boolean> {
    return this.adapter.delete(...element);
  }
  public forEach(callbackfn: (element: E, element2: E, collection: CollectionShape<E, T, R>) => void, thisArg?: any): AsyncReturn<R, this> {
    const result = this.adapter.forEach(callbackfn as any, thisArg);
    return (result instanceof Promise
      ? result.then(() => this)
      : this) as AsyncReturn<R, this>;
  }
  public has(...element: E[]): AsyncReturn<R, boolean> {
    return this.adapter.has(...element);
  }
  public override lock(): this {
    return this.adapter.lock?.(), this;
  }
  override *[Symbol.iterator](): IterableIterator<E extends IterValue<T> ? E : IterValue<T>> {
    yield* this.adapter[Symbol.iterator]?.() as any;
  }
}
