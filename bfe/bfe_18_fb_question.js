// 18. Improve a function
// https://bigfrontend.dev/problem/improve-a-function

// Given an input of array,
// which is made of items with >= 3 properties

// let items = [
//   {color: 'red', type: 'tv', age: 18},
//   {color: 'silver', type: 'phone', age: 20},
//   {color: 'blue', type: 'book', age: 17}
// ]

// // an exclude array made of key value pair
// const excludes = [
//   {k: 'color', v: 'silver'},
//   {k: 'type', v: 'tv'},
//   ...
// ]

// function excludeItems(items, excludes) {
//   excludes.forEach( pair => {
//     items = items.filter(item => item[pair.k] === item[pair.v])
//   })

//   return items
// }

// 1. What does this function excludeItems do?
// 2. Is this function working as expected ?
// 3. What is the time complexity of this function?
// 4. How would you optimize it ?

/*************************************************************
 * Solution
 *************************************************************/

// Time Complexity
// Original Time : O(m * n),  m excludes pair, n items
// OptimizedTime: O(m + n*k), k is the property number of each item

function excludeItems(items, excludes) {
  // 1. pre process exlcudes
  var map = new Map(); // <k, value Set>
  excludes.forEach((pair) => {
    if (!map.has(pair.k)) {
      map.set(pair.k, new Set());
    }
    map.get(pair.k).add(pair.v);
  });
  // 2. filter the items
  return items.filter((item) => {
    for (var key of Object.keys(item)) {
      if (map.has(key) && map.get(key).has(item[key])) {
        return false;
      }
    }
    return true;
  });
}
