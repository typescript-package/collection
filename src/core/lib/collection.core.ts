// Interface.
import { CollectionShape } from '@typedly/collection';
/**
 * @description The core abstract class for `Type` collections of elements `Element` type.
 * @export
 * @abstract
 * @class CollectionCore
 * @template Element type in collection.
 * @template Type of the collection.
 * @implements {CollectionShape<Element, Type>}
 */
export abstract class CollectionCore<Element, Type> implements CollectionShape<Element, Type> {
  abstract get [Symbol.toStringTag](): string;
  abstract get [Symbol.iterator](): Iterator<Element>;
  abstract value: Type;
  abstract add(...element: Element[]): this;
  abstract clear(): this;
  abstract delete(...element: Element[]): boolean;
  abstract destroy(): this;
  abstract forEach(callbackfn: (element: Element, element2: Element, collection: CollectionShape<Element, Type>) => void, thisArg?: any): void;
  abstract has(element: Element): boolean;
  abstract lock(): this;
  abstract set(value: Type): this;
  abstract readonly size: number;
}
