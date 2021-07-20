class MyURLSearchParams {
  /**
   * @params {string} init
   */
  constructor(init) {
    this.map = new Map();
    this.pairs = [];
    if (init[0] === "?") {
      init = init.slice(1);
    }
    var pairs = init.split("&");
    for (var p of pairs) {
      var [k, v] = p.split("=");
      this.pairs.push([k, v]);
      if (!this.map.has(k)) {
        this.map.set(k, []);
      }
      this.map.get(k).push(v);
    }
  }

  /**
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {
    value = String(value);
    this.pairs.push([name, value]);
    if (!this.map.has(name)) {
      this.map.set(name, []);
    }
    this.map.get(name).push(value);
  }

  /**
   * @params {string} name
   */
  delete(name) {
    this.map.delete(name);
    this.pairs = this.pairs.filter((el) => el[0] !== name);
  }

  /**
   * @returns {Iterator}
   */
  entries() {
    return this.makeIterator(this.pairs);
  }

  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {
    this.pairs.forEach((el) => {
      callback(el[1], el[0]); // note: reverse order
    });
  }

  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {
    return this.map.get(name) ? this.map.get(name)[0] : null;
  }

  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {
    return this.map.get(name) ?? []; // if not existed, return []
  }

  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {
    return !!this.map.has(name);
  }

  /**
   * @return {Iterator}
   */
  keys() {
    var arr = Array.from(this.map.keys());
    return makeIterator(arr);
  }

  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    value = String(value);
    this.map.set(name, [value]);
  }

  // sor all key/value pairs based on the keys
  sort() {
    var keys = Array.from(this.map.keys()).sort((a, b) => a.localeCompare(b));
    this.pairs = [];
    for (var k of keys) {
      var vals = this.map.get(k);
      vals.forEach((el) => this.pairs.push([k, el]));
    }
  }

  /**
   * @return {string}
   */
  toString() {
    let res = "";
    this.pairs.forEach((el) => {
      res += `${el[0]}=${el[1]}&`;
    });
    return res.slice(0, res.length - 1);
  }

  /**
   * @return {Iterator} values
   */
  values() {
    var arr = this.pairs.map((el) => el[1]);
    return this.makeIterator(arr);
  }
  makeIterator(arr) {
    // generic iterator maker function
    let nextIndex = 0;
    return {
      next: function () {
        return nextIndex < arr.length
          ? {
              value: arr[nextIndex++],
              done: false
            }
          : {
              value: undefined, // should return undefined value
              done: true
            };
      },
      [Symbol.iterator]: function () {
        return this;
      }
    };
  }
}
// const params = new MyURLSearchParams('?a=1&a=2&b=2')
// console.log(params.get('a')); // '1'
// console.log(params.getAll('a')); // ['1', '2']
// console.log(params.get('b')); // '2'
// console.log(params.getAll('b')) // ['2']

// console.log(params.append('a', 3));
// console.log(params.set('b', '3'));
// console.log(params.toString()); // 'a=1&a=2&b=3&a=3'

// // test key & value
// for(var k of params.keys())
// {
//   console.log("key: "+ k);
// }

// // test key & value
// for(var v of params.values())
// {
//   console.log("value: "+ v);
// }

// const params = new MyURLSearchParams('?c=2&a=2&a=1&a=2&b=2')
// console.log([...params.values()]);
// // .toEqual(['2','2','1','2','2'])
// params.sort()
// console.log([...params.values()]);
// // .toEqual(['2','1','2','2','2'])
