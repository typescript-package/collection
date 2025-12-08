// Interface.
import { CollectionAdapter, CollectionShape } from '@typedly/collection';
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
export abstract class CollectionCore<
  E,
  T,
  A extends CollectionAdapter<E, T>
> implements CollectionShape<E, T> {
  get [Symbol.toStringTag](): string {
    return 'Collection';
  }

  [Symbol.iterator](): Iterator<E> {
    return this.adapter[Symbol.iterator]();
  }

  protected abstract get adapter(): A

  public get size(): number {
    return this.adapter.size;
  }
  public get value(): T {
    return this.adapter.value;
  }
  public add(...element: E[]): this {
    return this.adapter.add(...element), this;
  }
  public clear(): this {
    return this.adapter.clear(), this;
  }
  public delete(...element: E[]): boolean {
    return this.adapter.delete(...element);
  }
  public destroy(): this {
    return this.adapter.destroy?.(), this;
  }
  public forEach(callbackfn: (element: E, element2: E, collection: CollectionShape<E, T>) => void, thisArg?: any): void {
    return this.adapter.forEach(callbackfn as any, thisArg);
  }
  public has(...element: E[]): boolean {
    return this.adapter.has(...element);
  }
  public lock(): this {
    return this.adapter.lock?.(), this;
  }
  public set(value: T): this {
    return this.adapter.set(value), this;
  }
}
