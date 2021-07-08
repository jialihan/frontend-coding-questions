// 4 Commands:
// "push": only on Arrays
// "set": on both Array and Object
// "merge": only on Object
// "apply": on both Array and Object

// How to update data on the original object?
// array: mutate data on the array object
// object: need a "parent pointer" and mutate values on the "parent[key]"

/**
 * @param {any} data
 * @param {Object} command
 */
var cmds = ["$push", "$set", "$merge", "$apply"];
function update(data, command) {
  return helper(data, command);
}
function helper(data, command, parentData, k) {
  for (var key of Object.keys(command)) {
    if (cmds.includes(key)) {
      console.log("command find: ", key);
      console.log("cur data: ", data);
      switch (key) {
        case "$push":
          if (!Array.isArray(data)) {
            throw new Error("object is not an array!");
          }
          data.push(...command[key]); // directly push to data
          break;
        case "$set":
          parentData[k] = command[key];
          break;
        case "$merge":
          if (typeof data !== "object") {
            throw new Error("merge should be on an object!");
          }
          // object need to update on it's parent key
          parentData[k] = { ...parentData[k], ...command[key] };
          break;
        case "$apply":
          parentData[k] = command[key].call(null, parentData[k]);
          break;
        default:
          throw new Error("error command");
      }
    } else {
      if (command[key]) {
        helper(data[key], command[key], data, key);
      }
    }
  }
  return data;
}
/*************************************************
 * Test
 ************************************************/
let state, arr, newArr, newState;
// test1: push
arr = [1, 2, 3, 4];
newArr = update(arr, { $push: [5, 6] });
// [1, 2, 3, 4, 5, 6]
console.log("ans: ", newArr);

// test2: set test
state = {
  a: {
    b: {
      c: 1
    }
  },
  d: 2
};

newState = update(state, { a: { b: { c: { $set: 3 } } } });
console.log("ans: ", newState);
/*
  {
    a: {
      b: {
        c: 3
      }
    },
    d: 2
  }
  */

arr = [1, 2, 3, 4];
newArr = update(arr, { 0: { $set: 0 } });
//  [0, 2, 3, 4]
console.log("ans: ", newArr);

// test3: merge test
state = {
  a: {
    b: {
      c: 1
    }
  },
  d: 2
};

newState = update(state, { a: { b: { $merge: { e: 5 } } } });
console.log("ans: ", newState);
/*
  {
    a: {
      b: {
        c: 1,
        e: 5
      }
    },
    d: 2
  }
  */

// // test4: apply test
// const arr = [1, 2, 3, 4]
// const newArr = update(arr, {0: {$apply: (item) => item * 2}})
// [2, 2, 3, 4]
// console.log("ans: ",newArr);
