// Abstract.
import { CollectionBehavior } from "./collection.behavior";
import { CollectionCore } from "./collection.core";
// Type.
import { AsyncReturn, IterableElement } from "@typedly/data";
/**
 * @description The collection concrete class with adapter support.
 * @export
 * @class Collection
 * @template {Iterable<E>} T 
 * @template [E=IterableElement<T>] 
 * @template {boolean} [S=false] 
 * @extends {CollectionCore<T, E, S>}
 */
export class Collection<
  T extends Iterable<E>,
  E = IterableElement<T>,
  S extends boolean = false,
> extends CollectionCore<T, E, S> {
  get async(): S {
    return false as S;
  }
  public get behavior(): CollectionBehavior<T, E> {
    return this.#behavior;
  }
  get size(): number {
    return 0;
  }
  get value(): T {
    return this.#value;
  }
  override [Symbol.iterator](): IterableIterator<IterableElement<T>> {
    return [][Symbol.iterator]();
  }
  override get [Symbol.toStringTag](): string {
    return "Collection";
  }

  #behavior!: CollectionBehavior<T, E>;
  #value!: T;
  constructor(...elements: E[])
  constructor(behaviorFactory: (...elements: E[]) => CollectionBehavior<T, E>, ...elements: E[])
  constructor(behavior: CollectionBehavior<T, E>, ...elements: E[])
  constructor(behaviorOrElement?: CollectionBehavior<T, E> | E, ...elements: E[]) {
    super();
    this.initialize(behaviorOrElement, ...elements);
  }

  //#region  Collection
  public add(...element: E[]): AsyncReturn<S, this> {
    this.#behavior.add(this.#value, ...element);
    return this as AsyncReturn<S, this>;
  }
  public delete(...element: E[]): AsyncReturn<S, boolean> {
    return this.#behavior.delete(this.#value, ...element) as AsyncReturn<S, boolean>;
  }
  public forEach(callbackfn: (element: E, collection: this) => void, thisArg?: any): AsyncReturn<S, this> {
    return this as AsyncReturn<S, this>;
  }
  public has(...element: E[]): AsyncReturn<S, boolean> {
    return this.#behavior.has(this.#value, ...element) as AsyncReturn<S, boolean>;
  }
  public toArray(): AsyncReturn<S, E[]> {
    return this.#behavior.toArray(this.#value) as AsyncReturn<S, E[]>;
  }
  //#endregion

  //#region Data
  public clear(): AsyncReturn<S, this> {
    this.#behavior.clear(this.#value);
    return this as AsyncReturn<S, this>;
  }
  public destroy(): AsyncReturn<S, this> {
    this.#value = null as unknown as T;
    return this as AsyncReturn<S, this>;
  }
  public getValue(): AsyncReturn<S, T> {
    return this.#value as unknown as AsyncReturn<S, T>;
  }
  public lock(): this {
    return this;
  }
  public setValue(value: T): AsyncReturn<S, this> {
    this.#value = value;
    return this as AsyncReturn<S, this>;
  }
  //#endregion

  protected initialize(...args: any[]): void {
    if (args.length === 0) {
      throw new Error("No elements or behavior provided");
    }

    let behavior: CollectionBehavior<T, E> | undefined;
    let elements: E[] = [];

    const first = args[0];

    if (this.isBehavior(first)) {
      // Case: new Collection(behaviorObject, ...elements)
      behavior = first;
      elements = args.slice(1) as E[];
    } else if (this.isBehaviorFactory(first)) {
      // Case: new Collection(createArrayBehavior, ...elements)
      behavior = (first as ((...elements: E[]) => CollectionBehavior<T, E>))(...args.slice(1));
      elements = args.slice(1) as E[];
    } else {
      // Case: new Collection(element1, element2, ...)
      behavior = Collection.behavior as unknown as CollectionBehavior<T, E>;
      elements = args as E[];
    }

    if (!behavior) {
      throw new Error("No behavior could be resolved.");
    }

    this.#behavior = behavior;
    this.#value = this.#behavior.create(...elements);
  }

  protected isBehavior(obj: any): obj is CollectionBehavior<T, E> {
    return obj &&
      typeof obj.create === "function" &&
      typeof obj.add === "function" && typeof obj.delete === "function" && typeof obj.has === "function" && typeof obj.toArray === "function" && typeof obj.size === "function" && typeof obj.clear === "function";
  }

  protected isBehaviorFactory(obj: any): obj is (...elements: E[]) => CollectionBehavior<T, E> {
    return typeof obj === "function";
  }
}
