// /**
//  * @param {any} data
//  * @return {string}
//  */
// function stringify(data) {
//   if (typeof data === "bigint") {
//     throw new Error("JSON.stringify canNOT serialize a BigInt!");
//   }
//   if (
//     typeof data !== "object" ||
//     data === null ||
//     Array.isArray(data) ||
//     data instanceof Date
//   ) {
//     return stringifyValues(data);
//   }
//   let s = "{";
//   for (var key of Object.keys(data)) {
//     if (
//       data[key] === undefined ||
//       data[key] instanceof Function ||
//       key === undefined
//     ) {
//       // skipped
//       continue;
//     }
//     s += `"${key}":` + stringifyValues(data[key]);
//     s += ",";
//   }
//   // delete last comma if existed
//   if (s[s.length - 1] === ",") {
//     s = s.slice(0, -1);
//   }
//   s += "}";
//   return s;
// }

// function stringifyValues(val) {
//   switch (typeof val) {
//     case "string":
//       return `"${val}"`;
//     case "number":
//       if (val === Infinity || isNaN(val)) {
//         return "null";
//       }
//       return "" + val;
//     case "boolean":
//       return "" + val;
//     case "function":
//       return undefined;
//     case "symbol":
//     case "undefined":
//       return "null";
//     case "object":
//       if (val instanceof Date) {
//         return '"' + val.toISOString() + '"';
//       }
//       if (val instanceof Array) {
//         return "[" + val.map((el) => stringify(el)).join(",") + "]";
//       }
//       if (val === null) {
//         return "null";
//       }
//       return stringify(val);
//   }
// }

// //   console.log(stringify(true));
// //   console.log(stringify(1));
// //   console.log(stringify(undefined));
// //   console.log(stringify(null));
// //   console.log(stringify({ a: 1, b: "x" }));

// // undefined value should skipped to the result
// // console.log(stringify( {a: undefined, b: null, c: NaN})); // {b:null, c:null}

// // Symbol-keyed property spec  , expects "{}" but gets "}"
// console.log(stringify({ [Symbol()]: "value" }));

// // tests
// // 123
// // 'string'
// // true
// // Boolean(false)
// // Number(1)
// // String('12')
// // [1, 'string', {a: 3}]
// // [NaN, null, undefined, Infinity]
// // new Date()
// // non-number key of Array is not enumerable
// // {a: undefined, b: null, c: NaN, d: Infinity}

// // Symbol-keyed property spec  , expects "{}" but gets "}"
// // console.log(stringify({ [Symbol()]: "value" }));

// // Symbol in array
// // function
// // BigInt should lead to error
// // non-enumerable properties should be ignored
// // circular object should lead to error
// // circular array should lead to error
// // new Map() with enumerable keys
// // property in prototype should be ignored
// // emoji {a:'✌️'}

function stringify(data) {
  const dfs = (val, isValue) => {
    if (isValue) {
      if (val === undefined || isFunction(val)) {
        return;
      }
    }

    if (val === undefined || val === null || val !== val || val === Infinity) {
      return "null";
    }

    if (isNumber(val) || isBoolean(val)) {
      return String(val);
    }
    if (isString(val)) {
      return `"${val}"`;
    }

    if (isDate(val)) {
      return `"${val.toJSON()}"`;
    }

    if (isArray(val)) {
      return ["[", val.map((v) => dfs(v, 1) || "null").join(","), "]"].join("");
    }

    if (isObject(val) || isMap(val)) {
      const objStr = Object.keys(val)
        .reduce((res, k) => {
          const v = dfs(val[k], 1);
          v && res.push(`"${k}":${v}`);
          return res;
        }, [])
        .join(",");
      return `{${objStr}}`;
    }

    if (isBigInt(val)) {
      throw "isBigInt";
    }
  };

  return dfs(data);
}

function isType(val, typeName) {
  // '[object Number]'
  return (
    Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === typeName
  );
}
function isObject(val) {
  return val && isType(val, "object");
}
function isNumber(val) {
  return isType(val, "number");
}
function isBoolean(val) {
  return isType(val, "boolean");
}
function isString(val) {
  return isType(val, "string");
}
function isArray(val) {
  return isType(val, "array");
}
function isDate(val) {
  return isType(val, "date"); // '[object Date]'
}
function isFunction(val) {
  return isType(val, "function");
}
function isBigInt(val) {
  return isType(val, "bigint");
}
function isMap(val) {
  return isType(val, "map");
}

// valid: number, boolean, string, object literal {}, array, null
// invalid: undefined, symbol, function ----> null
// throw error: BigInt
