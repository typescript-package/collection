// Abstract.
import { BaseData } from '@typescript-package/data';
// Interface.
import { CollectionAdapter, CollectionShape } from '@typedly/collection';
// Type.
import { AsyncReturn } from '@typedly/data';
/**
 * @description The core abstract class for `Type` collections of elements `Element` type.
 * @export
 * @abstract
 * @class CollectionCore
 * @template E type in collection.
 * @template T of the collection.
 * @template {CollectionAdapter<E, T>} A Adapter type.
 * @implements {CollectionShape<E, T>}
 */
export abstract class CollectionBase<
  E,
  T,
  R extends boolean,
  A extends CollectionAdapter<E, T, R>
> extends BaseData<T, R, A>
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
    adapter: {new (...args: unknown[]): A},
    ...args: unknown[]
  ) {
    super(undefined as T, adapter, ...args);
  }
  public add(...element: E[]): AsyncReturn<R, this> {
    const result = this.adapter.add(...element);
    return (result instanceof Promise
      ? result.then(() => this)
      : this) as AsyncReturn<R, this>;
  }
  public delete(...element: E[]): AsyncReturn<R, boolean> {
    const result = this.adapter.delete(...element);
    return (result instanceof Promise
      ? result.then(res => res)
      : result) as AsyncReturn<R, boolean>;
  }
  public forEach(callbackfn: (element: E, element2: E, collection: CollectionShape<E, T, R>) => void, thisArg?: any): AsyncReturn<R, this> {
    const result = this.adapter.forEach(callbackfn as any, thisArg);
    return (result instanceof Promise
      ? result.then(() => this)
      : this) as AsyncReturn<R, this>;
  }
  public has(...element: E[]): AsyncReturn<R, boolean> {
    const result = this.adapter.has(...element);
    return (result instanceof Promise
      ? result.then(res => res)
      : result) as AsyncReturn<R, boolean>;
  }
  public override lock(): this {
    return this.adapter.lock?.(), this;
  }
}
