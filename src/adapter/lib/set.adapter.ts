// Interface.
import { CollectionAdapter } from '@typedly/collection';
/**
 * @description The Set collection adapter.
 * @export
 * @class SetAdapter
 * @template E The type of the elements in the Set.
 * @template [T=Set<E>] The type of the underlying Set collection.
 * @implements {CollectionAdapter<E, T>}
 */
export class SetAdapter<
  E,
  T extends Set<E> = Set<E>
> implements CollectionAdapter<E, T> {
  public version: string = '1.0.0';
  get [Symbol.toStringTag](): string {
    return 'SetAdapter';
  }
  [Symbol.iterator](): Iterator<E> {
    return this.#collection[Symbol.iterator]();
  }
  protected get collection(): T {
    return this.#collection;
  }
  public get size(): number {
    return this.collection.size;
  }
  public get value(): T {
    return this.collection as unknown as T;
  }
  #collection: T;
  constructor(...collection: E[]) {
    this.#collection = new Set(collection) as T;
  }
  public add(...element: E[]): this {
    return element.forEach(e => this.collection.add(e)), this;
  }
  public clear(): this {
    return this.collection.clear(), this;
  }
  public destroy(): this {
    return this.clear(), (this.#collection = null as any), this;
  }
  public delete(...element: E[]): boolean {
    return element.every(e => this.collection.delete(e));
  }
  public forEach(callbackfn: (element: E, element2: E, collection: CollectionAdapter<E, T>) => void, thisArg?: any): this {
    return this.collection.forEach((value, value2) => callbackfn.call(thisArg, value, value2, this as any)), this;
  }
  public has(...element: E[]): boolean {
    return element.every(e => this.collection.has(e));
  }
  public lock(): this {
    return Object.freeze(this.collection), this;
  }
  public set(value: T): this {
    return (this.#collection = value), this;
  }
}
