// Important:

// use a "map" to record already cloned objects, avoid cycle
// special types: eg: Date, symboled key object ...

// The lodash implementation actually covers a lot of data types, for simplicity, your code just need to cover

// primitive types and their wrapper Object
// Plain Objects (Object literal) with all enumerable properties
// Array

function cloneDeep(data, map = new Map()) {
  if (data === null || typeof data !== "object") {
    return data;
  }
  if (data instanceof Date) {
    // #1. date is also an 'object'
    return new Date(data);
  }
  if (map.has(data)) {
    // #2. avoid cycle while recursion call
    return map.get(data);
  }
  if (Array.isArray(data)) {
    // #3. process array
    var arr = [];
    map.set(data, arr);
    data.forEach((el) => arr.push(cloneDeep(el, map))); // #5. loop with current map
    return arr;
  }
  var obj = {};
  map.set(data, obj);
  var keys = [
    ...Object.keys(data),
    ...Object.getOwnPropertySymbols(data) // #4. must include symbol keys
  ];
  for (var key of keys) {
    obj[key] = cloneDeep(data[key], map); // #5. loop with current map
  }
  return obj;
}
