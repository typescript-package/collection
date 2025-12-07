// Interface.
import { CollectionAdapter } from '@typedly/collection';
/**
 * @description The Set collection adapter.
 * @export
 * @class SetAdapter
 * @template Element The type of the elements in the Set.
 * @template [Type=Set<Element>] The type of the underlying Set collection.
 * @implements {CollectionAdapter<Element, Type>}
 */
export class SetAdapter<
  Element,
  Type = Set<Element>
> implements CollectionAdapter<Element, Type> {
  public version: string = '1.0.0';

  get [Symbol.toStringTag](): string {
    return 'SetAdapter';
  }

  get [Symbol.iterator](): Iterator<Element> {
    return (this.#collection as unknown as Set<Element>)[Symbol.iterator]();
  }


  protected get collection(): Type {
    return this.#collection;
  }

  public get size(): number {
    return (this.collection as unknown as Set<Element>).size;
  }

  public get value(): Type {
    return this.collection as unknown as Type;
  }

  #collection: Type;

  constructor(...collection: Element[]) {
    this.#collection = new Set(collection) as Type;
  }

  public add(element: Element): this {
    return (this.collection as unknown as Set<Element>).add(element), this;
  }

  public clear(): this {
    return (this.collection as unknown as Set<Element>).clear(), this;
  }

  public destroy(): this {
    return this.clear(), (this.#collection = null as any), this;
  }

  public delete(element: Element): boolean {
    return (this.collection as unknown as Set<Element>).delete(element);
  }

  public forEach(callbackfn: (element: Element, element2: Element, collection: CollectionAdapter<Element, Type>) => void, thisArg?: any): this {
    return (this.collection as unknown as Set<Element>).forEach((value, value2) => callbackfn.call(thisArg, value, value2, this as any)), this;
  }

  public has(element: Element): boolean {
    return (this.collection as unknown as Set<Element>).has(element);
  }

  public lock(): this {
    return Object.freeze(this.collection), this;
  }

  public set(value: Type): this {
    return (this.#collection = value), this;
  }
}
