// Abstract.
import { AdapterData } from '@typescript-package/data';
// Interface.
import { CollectionAdapter, CollectionShape, CollectionAdapterConstructor } from '@typedly/collection';
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
  R extends boolean = false,
  A extends CollectionAdapter<E, T, R> = CollectionAdapter<E, T, R>
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
    adapter: CollectionAdapterConstructor<E, T, R, A>,
    ...elements: E[]
  ) {
    super(
      async,
      adapter,
      ...elements
    );
    super.adapter?.setAsync?.(async);
  }
  public add(...element: E[]): AsyncReturn<R, this> {
    return super.returnThis(this.adapter.add(...element));
  }
  public delete(...element: E[]): AsyncReturn<R, boolean> {
    return this.adapter.delete(...element);
  }
  public forEach(callbackfn: (element: E, element2: E, collection: CollectionShape<E, T, R>) => void, thisArg?: any): AsyncReturn<R, this> {
    return super.returnThis(this.adapter.forEach(callbackfn as any, thisArg));
  }
  public has(...element: E[]): AsyncReturn<R, boolean> {
    return this.adapter.has(...element);
  }
  public override lock(): this {
    return this.adapter.lock?.(), this;
  }
  public toArray(): AsyncReturn<R, E[]> {
    return this.adapter.toArray!();
  }
  protected isIterable(val: unknown): val is Iterable<E> {
    return val != null && typeof (val as any)[Symbol.iterator] === 'function';
  }
  override *[Symbol.iterator](): IterableIterator<E extends IterValue<T> ? E : IterValue<T>> {
    yield* this.adapter[Symbol.iterator]?.() as any;
  }
}
