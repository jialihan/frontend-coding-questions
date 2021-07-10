// 38. implement `jest.spyOn()`
// You are asked to create a spyOn(object, methodName),
// which works the same as jest.spyOn().

// To make it simple, here are the 2 requirements of spyOn
// - original method should be called when spied one is called
// - spy should have a calls array, which holds all the arguments in each call.

/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  var calls = [];
  if (!obj[methodName]) {
    throw "method not exists or not function";
  }
  var originMethod = obj[methodName];
  obj[methodName] = function (...args) {
    calls.push([...args]);
    originMethod.apply(this, args);
  };
  return {
    calls
  };
}
