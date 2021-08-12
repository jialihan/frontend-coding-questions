/**
 * type SerializablePrimitives = undefined | null | number | string | bigint | boolean

  * type Serializable = {
    [index: string]: Serializable
  } | Serializable[] | SerializablePrimitives
*/

/**
 * @params {Serializable} data
 * @returns {string}
 */
const stringify = (data) => {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      let res = [];
      for (var item of data) {
        res.push(stringify(item));
      }
      return "[" + res.join(",") + "]";
    } else {
      let res = [];
      for (var key of Object.keys(data)) {
        var val = data[key];
        res.push(key + ":" + stringify(val));
      }
      return "{" + res.join(",") + "}";
    }
  } else {
    // primitives
    if (typeof data === "bigint") {
      return String(data) + "n";
    }
    // special flag for original string primitives
    // eg: "null" and null
    if (typeof data === "string") {
      return "String:" + data;
    }
    return String(data);
  }
};

/**
 * @params {string} data
 * @returns {Serializable}
 */
const parse = (data) => {
  if (data[0] === "{") {
    // #1 parse object
    var pairs = splitObjectKVPairs(data);
    var res = {};
    for (var p of pairs) {
      var idx = p.indexOf(":");
      var k = p.slice(0, idx);
      var v = p.slice(idx + 1);
      res[k] = parse(v);
    }
    return res;
  } else if (data[0] === "[") {
    // #2 parse array
    var items = splitArrayItems(data);
    var res = [];
    for (var item of items) {
      res.push(parse(item));
    }
    return res;
  } else {
    // #3 primitives
    if (data.indexOf("String:") === 0) {
      // originally string type
      return data.slice(7);
    } else if (data === "NaN") {
      return NaN;
    } else if (data === "true") {
      return true;
    } else if (data === "false") {
      return false;
    } else if (data === "undefined") {
      return undefined;
    } else if (data === "Infinity") {
      return Infinity;
    } else if (data === "-Infinity") {
      return -Infinity;
    } else if (data === "null") {
      return null;
    } else if (parseInt(data)) {
      // numbers
      if (data[data.length - 1] === "n") {
        var num = Number(data.slice(0, data.length - 1));
        return BigInt(num);
      }
      return Number(data);
    }
  }
};
/***************************************************************
 * Uitls to split strings for recursive calls - pretty trivial
 ****************************************************************/
function splitObjectKVPairs(data) {
  // {k:{},k1:[],k2: primitive}
  var res = [];
  var start = 1;
  while (start >= 0 && data.indexOf(":", start) >= 0) {
    var idx = data.indexOf(":", start);
    var item;
    if (data[idx + 1] === "{") {
      var ending = data.indexOf("}", idx);
      item = data.slice(start, ending + 1);
      start = ending + 2;
    } else if (data[idx + 1] === "[") {
      var ending = data.indexOf("]", idx);
      item = data.slice(start, ending + 1);
      start = ending + 2;
    } else {
      var ending = data.indexOf(",", idx);
      item = data.slice(start, ending);
      start = ending + 1;
      if (ending < 0) {
        start = -1;
      }
    }
    res.push(item);
  }
  return res;
}
function splitArrayItems(data) {
  // [{},[],primitive]
  var res = [];
  var start = 1;
  while (start >= 0 && start < data.length - 1) {
    if (data[start] === "[") {
      var j = start;
      var cnt = 0;
      while (j < data.length - 1) {
        if (data[j] === "[") {
          cnt++;
        } else if (data[j] === "]") {
          cnt--;
        }
        if (cnt === 0) {
          break;
        }
        j++;
      }
      item = data.slice(start, j + 1);
      start = j + 2;
    } else if (data[start] === "{") {
      var j = start;
      var cnt = 0;
      while (j < data.length - 1) {
        if (data[j] === "{") {
          cnt++;
        } else if (data[j] === "}") {
          cnt--;
        }
        if (cnt === 0) {
          break;
        }
        j++;
      }
      item = data.slice(start, j + 1);
      start = j + 2;
    } else {
      var ending = data.indexOf(",", start);
      item = data.slice(start, ending);
      start = ending + 1;
      if (ending < 0) {
        start = -1;
      }
    }
    res.push(item);
  }
  return res;
}

/***************************************************************
 * Tests
 ****************************************************************/
// console.log(parse("{b:[-Infinity,1n]}"));
// console.log(splitArrayItems("[-Infinity,1n]"));

// console.log(splitArrayItems("[{a:NaN},{b:[-Infinity,1n]}]"));
// // console.log(splitObjectKVPairs("{a:NaN}"));
// console.log(parse("[{a:NaN},{b:[-Infinity,1n]}]"));

// let input = [{ a: NaN }, { b: [-Infinity, 1n] }];
// var res = stringify(input);
// console.log(res);
// console.log(parse(res));

// let input = { a: undefined, b: { c: null, d: [Infinity] } };
// var res = stringify(input);
// console.log(res);
// console.log(parse(res));

// console.log(
//   splitArrayItems("[{a:undefined,b:{c:null,d:[Infinity]}},1n,[true]]")
// );
let input = [{ a: undefined, b: { c: null, d: [Infinity] } }, 1n, [true]];
var res = stringify(input);
console.log(res);
console.log(parse(res));
