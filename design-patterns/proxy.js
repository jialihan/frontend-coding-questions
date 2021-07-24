// const obj = {};
// const proxyedObj = new Proxy(obj, {
//     get: function(target, property) {
//       if(property === 'age')
//       {
//           return 10;
//       }
//       return undefined;
//     }
//   });
//   console.log(proxyedObj.age); // 10

// const obj = {};
// const proxyedObj = new Proxy(obj, {
//     set: function(target, property, value) {
//       if(property === 'size' && !['large', 'small', 'medium'].includes(value.toLowerCase()))
//       {
//           throw('invalid size value');
//       }
//       target[property] = value;
//     }
//   });
// proxyedObj["size"] = 'small';
// console.log(proxyedObj["size"]); // 'small'
// // proxyedObj["size"] = 'xs'; // ERROR

// const obj = {};
// const proxyedObj = new Proxy(obj, {
//     has: function(target, prop) {
//       if(prop === 'size')
//       {
//         return false;
//       }
//      return prop in target;
//     }
//   });
// proxyedObj["size"] = 'small';
// console.log("size" in proxyedObj); // false

/**
 * @param {any[]} arr
 * @returns {?} - sorry no type hint for this
 */
function wrap(arr) {
  return new Proxy(arr, {
    get: function (target, property) {
      if (property === Symbol.iterator) {
        // #Bug1
        return target[property].bind(target);
      }
      if (parseInt(property) < 0) {
        property = -property;
        if (property > target.length) {
          return undefined;
        }
        return target[target.length - property];
      }
      return target[property];
    },
    set: function (target, property, value) {
      if (parseInt(property) < 0) {
        property = -property;
        if (property > target.length) {
          throw "invalid negative index";
        }
        property = target.length - property;
      }
      // console.log('normal: ', property, target[property])
      target[property] = value;
      return true; // bug
    }
  });
}
const originalArr = [1, 2, 3];
const arr = wrap(originalArr);
// arr[0] // 1
// arr[1] // 2
// arr[2] // 3
// console.log(arr[3]); // undefined
// console.log(arr[-1]); // 3
// console.log(arr[-2]) // 2
// console.log(arr[-3]); // 1
// console.log(arr[-4]); // undefined

// // const arr = wrap([1,2,3])
// arr[-2] = 'bfe'
// console.log(arr[-2]);
// // expect(arr[-2]).toEqual('bfe')
// console.log(arr[1]);
// // expect(arr[1]).toEqual('bfe')

arr.push(4);
