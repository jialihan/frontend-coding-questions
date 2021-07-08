// 20. Detect data type in JavaScript

// Solution1: Object.toString.call(...)
// MDN DOC:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class%20
/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  if (data instanceof FileReader) {
    return "object";
  }
  if (typeof data === "object") {
    return Object.prototype.toString
      .call(data)
      .slice(1, -1)
      .split(" ")[1]
      .toLowerCase();
  }
  return typeof data;
}

// solution 2
// Notes:
// -   `null`  is a type of "object"
// -   `FileReader`  is a type of "filereader", but in this problem, it need to show in "object"
// -   need to call  `toLowerCase()`  for examle:  `String`,  `Number`.....

/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  if (typeof data === "object") {
    if (data === null) {
      return "null";
    }
    if (data instanceof FileReader) {
      return "object";
    }
    return data.constructor.name.toLowerCase();
  }
  return typeof data;
}
