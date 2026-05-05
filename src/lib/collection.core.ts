// Abstract.
import { DataCore } from '@typescript-package/data';
// Interface.
import type { CollectionShape } from '@typedly/collection';
// Type.
import type { AsyncReturn, IterableElement } from '@typedly/data';
import type { CollectionBehavior } from './collection.behavior';
/**
 * @description The core abstract class for `Type` collections of elements `Element` type.
 * @export
 * @abstract
 * @class CollectionCore
 * @template {Iterable<E>} T 
 * @template [E=IterableElement<T>] 
 * @template {boolean} [S=false] 
 * @extends {DataCore<T, S>}
 * @implements {CollectionShape<T, E, S>}
 */
export abstract class CollectionCore<
  T extends Iterable<E>,
  E = IterableElement<T>,
  S extends boolean = false,
> extends DataCore<T, S>
  implements CollectionShape<T, E, S> {
  static behavior?: CollectionBehavior<any[], any>;
  protected abstract readonly behavior: CollectionBehavior<T, E>;

  //#region Abstract properties
  public abstract get size(): number;
  public abstract override [Symbol.iterator](): IterableIterator<IterableElement<T>>;
  public abstract override get [Symbol.toStringTag](): string;
  //#endregion

  //#region Public methods
  public abstract add(...element: E[]): AsyncReturn<S, this>;
  public abstract delete(...element: E[]): AsyncReturn<S, boolean>;
  public abstract forEach(callbackfn: (element: E, collection: this) => void, thisArg?: any): AsyncReturn<S, this>;
  public abstract has(...element: E[]): AsyncReturn<S, boolean>;
  public abstract override lock(): this;
  public abstract toArray(): AsyncReturn<S, E[]>;
  //#endregion
}
