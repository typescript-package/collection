import { CollectionAdapter } from "@typedly/collection";
import { AsyncReturn, IterValue } from "@typedly/data";

export class HybridSetAdapter<
  E,
  T extends Set<E> = Set<E>,
  R extends boolean = false
> implements CollectionAdapter<E, T, R> {
  public version: string = '1.0.0';
  get [Symbol.toStringTag](): string {
    return 'HybridSetAdapter';
  }
  * [Symbol.iterator](): IterableIterator<IterValue<T>> {
    yield* this.#collection as unknown as IterableIterator<IterValue<T>>;
  }
  public get async(): R {
    return this.#async;
  }
  public get size(): number {
    return this.collection.size;
  }
  public get value() {
    return this.collection;
  }
  protected get collection() {
    return this.#collection;
  }
  #async: R = false as R;
  #collection: T;
  constructor(...elements: E[]) {
    this.#collection = new Set(elements) as T;
    console.log(`HybridSetAdapter initialized with elements: `, elements, this.async);
  }
  public add(...element: E[]): AsyncReturn<R, this> {
    return element.forEach(e => this.collection.add(e)), 
      (this.async ? Promise.resolve(this) : this) as AsyncReturn<R, this>;
  }
  public clear(): AsyncReturn<R, this> {
    return this.collection.clear(), (this.async ? Promise.resolve(this) : this) as AsyncReturn<R, this>;
  }
  public destroy(): AsyncReturn<R, this> {
    return this.clear(), (this.#collection = null as any), (this.async ? Promise.resolve(this) : this) as AsyncReturn<R, this>;
  }
  public delete(...element: E[]): AsyncReturn<R, boolean> {
    return element.every(e => this.collection.delete(e)) as AsyncReturn<R, boolean>;
  }
  public forEach(callbackfn: (element: E, nextElement: E, collection: CollectionAdapter<E, T, R>) => void, thisArg?: any): AsyncReturn<R, this> {
    return this.collection.forEach((element, nextElement) => callbackfn.call(thisArg, element, nextElement, this as any)),
      (this.async ? Promise.resolve(this) : this) as AsyncReturn<R, this>;
  }
  public getValue(): AsyncReturn<R, T> {
    if (this.async) {
      return Promise.resolve(this.collection) as unknown as AsyncReturn<R, T>;
    }
    return this.collection as AsyncReturn<R, T>;
  }
  public has(...element: E[]): AsyncReturn<R, boolean> {
    if (this.async) {
      return Promise.resolve(element.every(e => this.collection.has(e))) as AsyncReturn<R, boolean>;
    }
    return element.every(e => this.collection.has(e)) as AsyncReturn<R, boolean>;
  }
  public lock(): this {
    return Object.freeze(this.collection), this;
  }
  public setAsync(async: R): this {
    this.#async = async as R;
    return this;
  }
  public setValue(value: T): AsyncReturn<R, this> {
    return (this.#collection = value),
      (this.async ? Promise.resolve(this) : this) as AsyncReturn<R, this>;
  }
}
