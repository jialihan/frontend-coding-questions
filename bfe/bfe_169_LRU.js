// This is a JavaScript coding problem from BFE.dev

/**
 * @typedef {object} OriginData
 * @property {string} origin
 * @property {number} lastUsed
 * @property {number} size
 * @property {boolean} persistent
 */

class MyLRUStorage {
  /**
   * @param {number} capacity
   * @param {() => number} getTimestamp
   */
  constructor(capacity, getTimestamp) {
    this.capacity = capacity;
    this.getTimestamp = getTimestamp;
    this.map = new Map(); // origin, obj
    this.curSize = 0;
  }

  /**
   * @param {string} origin
   * @returns {OriginData | undefined}
   */
  getData(origin) {
    if (this.map.has(origin)) {
      const obj = this.map.get(origin);
      obj.lastUsed = this.getTimestamp();
      return obj;
    }
    return undefined;
  }

  /**
   * time complexity: sort - O(nlogn)
   * @param {string} origin
   * @param {number} size
   * @returns {boolean}
   */
  setData(origin, size) {
    if (size > this.capacity) {
      return false;
    }
    let newSize = 0;
    let existed = this.map.has(origin);
    // calc new size
    if (existed) {
      const obj = this.map.get(origin);
      newSize = this.curSize - obj.size + size;
    } else {
      newSize = this.curSize + size;
    }

    // remove lru if needed
    if (this.capacity < newSize) {
      // sort by time ascending order
      let list = [...this.map.values()]
        .filter((obj) => obj.persistent === false && obj.origin !== origin)
        .sort((a, b) => a.lastUsed - b.lastUsed);
      if (list.length === 0) {
        if (existed) {
          this.map.delete(origin);
        }
        return false; // cannot remove
      }
      while (this.capacity < newSize && list.length > 0) {
        const removed = list.shift();
        newSize -= removed.size;
        this.map.delete(removed.origin);
      }
    }
    this.curSize = newSize;

    // update obj
    if (existed) {
      this.map.get(origin).lastUsed = this.getTimestamp();
      this.map.get(origin).size = size;
    } else {
      this.map.set(origin, {
        origin,
        lastUsed: this.getTimestamp(),
        size,
        persistent: false
      });
    }
    return true;
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  clearData(origin) {
    if (this.map.has(origin)) {
      const obj = this.map.get(origin);
      this.curSize -= obj.size;
      this.map.delete(origin);
    }
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  makePersistent(origin) {
    if (this.map.has(origin)) {
      const obj = this.map.get(origin);
      obj.persistent = true;
    }
  }
}

/**
 * Improve time to O(n)
 */
class MyLRUStorage {
  /**
   * @param {number} capacity
   * @param {() => number} getTimestamp
   */
  constructor(capacity, getTimestamp) {
    this.capacity = capacity;
    this.getTimestamp = getTimestamp;
    this.map = new Map(); // origin, obj
    this.nonPersistedList = []; // sorted array of non-persisted LRU list
    this.curSize = 0;
  }

  /**
   * Time: O(1) getObj + O(n) update list
   * @param {string} origin
   * @returns {OriginData | undefined}
   */
  getData(origin) {
    if (this.map.has(origin)) {
      const obj = this.map.get(origin);
      obj.lastUsed = this.getTimestamp();
      // update LRU list
      const exsistingIndex = this.nonPersistedList.findIndex(
        (el) => el.origin === origin
      );
      if (exsistingIndex >= 0) {
        this.nonPersistedList.splice(exsistingIndex, 1);
        this.nonPersistedList.push(obj); // append to the tail
      }
      return obj;
    }
    return undefined;
  }

  /**
   * time complexity: O(n) - loop sorted list
   * @param {string} origin
   * @param {number} size
   * @returns {boolean}
   */
  setData(origin, size) {
    if (size > this.capacity) {
      return false;
    }
    let newSize = 0;
    let existed = this.map.has(origin);
    // calc new size
    if (existed) {
      const obj = this.map.get(origin);
      newSize = this.curSize - obj.size + size;
    } else {
      newSize = this.curSize + size;
    }

    // remove lru if needed
    if (this.capacity < newSize) {
      while (this.capacity < newSize && this.nonPersistedList.length > 0) {
        const removed = this.nonPersistedList.shift();
        if (removed.origin === origin) {
          this.nonPersistedList.push(removed);
        } else {
          newSize -= removed.size;
          this.map.delete(removed.origin);
        }
      }
    }
    if (this.capacity < newSize) {
      if (existed) {
        this.map.delete(origin);
        const exsistingIndex = this.nonPersistedList.findIndex(
          (el) => el.origin === origin
        );
        if (exsistingIndex >= 0) {
          this.nonPersistedList.splice(exsistingIndex, 1); // delete one element
        }
      }
      return false; // cannot set data
    }
    this.curSize = newSize;

    // update obj
    if (existed) {
      const obj = this.map.get(origin);
      obj.lastUsed = this.getTimestamp();
      obj.size = size;
      const exsistingIndex = this.nonPersistedList.findIndex(
        (el) => el.origin === origin
      );
      if (exsistingIndex >= 0) {
        this.nonPersistedList.splice(exsistingIndex, 1);
        this.nonPersistedList.push(obj); // append to the tail
      }
    } else {
      const obj = {
        origin,
        lastUsed: this.getTimestamp(),
        size,
        persistent: false
      };
      this.map.set(origin, obj);
      this.nonPersistedList.push(obj);
    }
    return true;
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  clearData(origin) {
    if (this.map.has(origin)) {
      const obj = this.map.get(origin);
      this.curSize -= obj.size;
      this.map.delete(origin);
      const exsistingIndex = this.nonPersistedList.findIndex(
        (el) => el.origin === origin
      );
      if (exsistingIndex >= 0) {
        this.nonPersistedList.splice(exsistingIndex, 1);
      }
    }
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  makePersistent(origin) {
    if (this.map.has(origin)) {
      const obj = this.map.get(origin);
      obj.persistent = true;
      const exsistingIndex = this.nonPersistedList.findIndex(
        (el) => el.origin === origin
      );
      if (exsistingIndex >= 0) {
        this.nonPersistedList.splice(exsistingIndex, 1);
      }
    }
  }
}
