/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  if (target == null || target === undefined) {
    throw new Error("invalid target object!");
  }
  var obj = new Object(target);
  for (var src of sources) {
    if (src === null || src === undefined) {
      continue;
    }
    var keys = [
      ...Object.keys(src),
      ...Object.getOwnPropertySymbols(src)
    ].filter((item) => Object.getOwnPropertyDescriptor(src, item).enumerable);
    for (var k of keys) {
      if (Object.getOwnPropertyDescriptor(obj, k).writable === false) {
        throw new Error("this prop can NOT be written!");
      }
      obj[k] = src[k];
    }
  }
  return obj;
}

// Bug 1: symbol keys
// Bug 2: some prop cannot be written
// const target = Object.defineProperty({}, 'foo', {
//     value: 1,
//     writable: false
//   }); // target.foo is a read-only property

//   expect(() => objectAssign(target,
//                             { bar: 2 },
//                             { foo2: 3, foo: 3, foo3: 3 },
//                             { baz: 4 })
//         ).toThrow()
//   expect(target).toEqual({bar: 2, foo2: 3})

// Consider Example:
// console.log(objectAssign({}, [1,2]));   // {0:1, 1:2, length:2}
// console.log(Object.assign({}, [1,2]));  // {0:1, 1:2}
// function filteredDescriptors(obj)
// {
//     // filter the props with enumerable: true
//     var res = {};
//     Object.keys(obj).forEach(k=>{
//         if(obj[k].enumerable)
//         {
//             res[k] = {...obj[k]};
//         }
//     });
//     return res;
// }
// // Eg:
//   var obj = Object.defineProperties({}, {
//     foo: { value: 123, enumerable: true },
//     bar: { value: "abc", enumerable: true }
// });

// Symbol test case
// const key = Symbol('key')
// const a = {
//   [key]: 3,
//   b: 4
// }

// Case 2: prop cannot be written
const a = {
  value: 1,
  writable: false
}; // target.foo is a read-only property

const target = {};
// console.log(Object.keys(a));
// console.log(Object.getOwnPropertyDescriptors(a));
// console.log(Object.getOwnPropertySymbols(a));
console.log(objectAssign(target, a));

/************************************************
 * Wrong Solution
 */
// function objectAssign(target, ...sources) {
//   if (target === undefined || target === null) {
//     throw new Error("target is not valid object!");
//   }
//   var obj = Object(target);
//   for (var source of sources) {
//     if (source === undefined || source === null) {
//       continue;
//     }
//     Object.defineProperties(obj, Object.getOwnPropertyDescriptors(source));

//     for (const symbol of Object.getOwnPropertySymbols(source)) {
//       obj[symbol] = source[symbol];
//     }
//   }
//   return obj;
// }
// // ERROR case:
// console.log(objectAssign({}, [1,2]));   // {0:1, 1:2, length:2}
// console.log(Object.assign({}, [1,2]));  // {0:1, 1:2}
