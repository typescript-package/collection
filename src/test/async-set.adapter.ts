import { CollectionAdapter } from "@typedly/collection";
import { IterValue } from "@typedly/data";

export class AsyncSetAdapter<
  E,
  T extends Set<E> = Set<E>,
> implements CollectionAdapter<E, T, true> {
  public version: string = '1.0.0';
  get [Symbol.toStringTag](): string {
    return 'AsyncSetAdapter';
  }
  * [Symbol.iterator](): IterableIterator<IterValue<T>> {
    yield* this.#collection as unknown as IterableIterator<IterValue<T>>;
  }
  public get async(): true {
    return true;
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
  #collection: T;
  constructor(...elements: E[]) {
    this.#collection = new Set(elements) as T;
    console.log(`AsyncSetAdapter initialized with elements: `, elements, this.async);
  }
  public async add(...element: E[]): Promise<this> {
    return element.forEach(e => this.collection.add(e)), this;
  }
  public async clear(): Promise<this> {
    return this.collection.clear(), this;
  }
  public async destroy(): Promise<this> {
    return this.clear(), (this.#collection = null as any), this;
  }
  public async delete(...element: E[]): Promise<boolean> {
    return element.every(e => this.collection.delete(e));
  }
  public async forEach(callbackfn: (element: E, nextElement: E, collection: CollectionAdapter<E, T, true>) => void, thisArg?: any): Promise<this> {
    return this.collection.forEach((element, nextElement) => callbackfn.call(thisArg, element, nextElement, this as any)), this;
  }
  public async getValue(): Promise<T> {
    return this.collection;
  }
  public async has(...element: E[]): Promise<boolean> {
    return element.every(e => this.collection.has(e));
  }
  public lock(): this {
    return Object.freeze(this.collection), this;
  }
  public async setValue(value: T): Promise<this> {
    return (this.#collection = value), this;
  }
}
