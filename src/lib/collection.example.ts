import { Collection } from "./collection";
import { CollectionBehavior } from "./collection.behavior";

// Then use values, not class statics
const ArrayBehavior: CollectionBehavior<any[], any> = {
  create: (...elements) => [...elements],
  add: (arr, ...elements) => arr.push(...elements),
  delete: (arr, ...elements) => {
    let deleted = true;
    for (const el of elements) {
      const idx = arr.indexOf(el);
      if (idx >= 0) arr.splice(idx, 1);
      else deleted = false;
    }
    return deleted;
  },
  has: (arr, ...elements) => elements.every(e => arr.includes(e)),
  toArray: (arr) => arr.slice(),
  size: (arr) => arr.length,
  clear: (arr) => { arr.length = 0; },
};

// Version 1: factory for behaviors
function arrayBehavior<E>(...elements: E[]): CollectionBehavior<E[], E> {
  return {
    create: (...elements: E[]) => [...elements],
    add: (arr, ...elements) => arr.push(...elements),
    delete: (arr, ...elements) => {
      let deleted = true;
      for (const el of elements) {
        const idx = arr.indexOf(el);
        if (idx >= 0) arr.splice(idx, 1);
        else deleted = false;
      }
      return deleted;
    },
    has: (arr, ...elements) => elements.every(e => arr.includes(e)),
    toArray: (arr) => arr.slice(),
    size: (arr) => arr.length,
    clear: (arr) => { arr.length = 0; },
  };
}

// Version 1: factory for behaviors
function setBehavior<E>(...elements: E[]): CollectionBehavior<Set<E>, E> {
  return {
    create: (...elements: E[]) => new Set(elements),
    add: (set, ...elements) => {
      for (const el of elements) {
        set.add(el);
      }
    },
    delete: (set, ...elements) => {
      let deleted = true;
      for (const el of elements) {
        if (set.has(el)) {
          set.delete(el);
        } else {
          deleted = false;
        }
      }
      return deleted;
    },
    has: (set, ...elements) => elements.every(e => set.has(e)),
    toArray: (set) => Array.from(set),
    size: (set) => set.size,
    clear: (set) => { set.clear(); },
  };
}

Collection.behavior = ArrayBehavior;

// const collection: Collection<Iterable<number>, number, false>
const collection = new Collection(1, 2, 3);

// const arrayCollection: Collection<any[], any, false>
const arrayCollection = new Collection(arrayBehavior, 1, 2, 3);

// const setCollection: Collection<Set<number>, number, false>
const setCollection = new Collection(setBehavior, 1, 2, 3);
