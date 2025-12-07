// Abstract.
import { CollectionCore } from './collection.core';
// Interface.
import { CollectionAdapter } from '@typedly/collection';
/**
 * @description The base functionality abstraction for collections.
 * @export
 * @abstract
 * @class CollectionBase
 * @template E Element type in collection.
 * @template T Type of the collection.
 * @template {CollectionAdapter<E, T>} A Type of the adapter.
 * @extends {CollectionCore<E, T>}
 */
export abstract class CollectionBase<
  E,
  T,
  A extends CollectionAdapter<E, T>
> extends CollectionCore<E, T> {

  public get [Symbol.toStringTag](): string {
    return 'Collection';
  }

  public get [Symbol.iterator](): Iterator<E> {
    return (this.#adapter.value as unknown as any)[Symbol.iterator]();
  }

  /**
   * @description The protected getter and setter for the adapter.
   * @protected
   * @type {A}
   */
  public get adapter() {
    return this.#adapter;
  }

  public get size() {
    return this.#adapter.size;
  }

  public get value() {
    return this.#adapter.value;
  }

  #adapter: A;

  constructor(
    adapter: new (...args: any[]) => A,
    ...elements: E[]
  ) {
    super();
    this.#adapter = new adapter(...elements) as unknown as A;
  }

  public add(...element: E[]): this {
    return element.forEach(e => this.#adapter.add(e)), this;
  }
  public clear(): this {
    return this.#adapter.clear(), this;
  }
  public clone(): CollectionCore<E, T> {
    return new (this.constructor as any)(this.#adapter.value, this.#adapter);
  }
  public destroy(): this {
    return this.clear(),
      this.#adapter = null as any,
      this;
  }
  public delete(...element: E[]): boolean {
    return element.every(e => this.#adapter.delete(e));
  }
  public forEach(callbackfn: (element: E, element2: E, collection: CollectionCore<E, T>) => void, thisArg?: any): this {
    return this.#adapter.forEach(callbackfn as any, thisArg), this;
  }
  public has(element: E): boolean {
    return this.#adapter.has(element);
  }
  public lock(): this {
    return this.#adapter.lock?.(), this;
  }
  public set(value: T): this {
    return this.#adapter.set(value), this;
  }
}
