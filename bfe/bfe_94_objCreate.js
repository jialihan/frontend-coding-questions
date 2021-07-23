// Can you write your own myObjectCreate() to do the same(well for the basic usage) ?

// Note

// 1. you don't need to support propertiesObject - 2nd parameter of Object.create
// 2. throw an Error if non-object is passed in. (why?)
// https://stackoverflow.com/questions/18198178/null-prototype-object-prototype-and-object-create
// 3. Object.create() and Object.setPrototypeOf() should not be used.

/**
 * @param {any} proto
 * @return {object}
 */
function myObjectCreate(proto) {
  if (proto === null || typeof proto !== "object") {
    throw "cannot create null prototype";
  }
  var obj = {};
  obj.__proto__ = proto;
  return obj;
}
