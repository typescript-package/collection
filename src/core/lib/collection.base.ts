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
> extends CollectionCore<E, T, A> {
  /**
   * @description The protected getter and setter for the adapter.
   * @protected
   * @type {A}
   */
  public get adapter() {
    return this.#adapter;
  }

  #adapter: A;

  constructor(
    adapter: new (...elements: E[]) => A,
    ...elements: E[]
  ) {
    super();
    this.#adapter = new adapter(...elements) as unknown as A;
  }

  public override destroy(): this {
    return super.clear(),
      super.destroy(),
      this.#adapter = null as any,
      this;
  }
}
