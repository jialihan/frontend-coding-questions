// 27. implement completeAssign()
// Note:
// getOwnPropertyDescriptors() will return ALL descriptors
// including Symbol & Enumerable & NON-Enumerable,
// please reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors

// Note:
// If a descriptor has both [value or writable] and [get or set] keys, an exception is thrown.
function completeAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error("target is Not an object!");
  }
  target = new Object(target);
  for (const source of sources) {
    if (!source) {
      continue;
    }
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
  }
  return target;
}
