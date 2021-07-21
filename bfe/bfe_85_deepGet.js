// other regex 1:
// path = path.replace(/\[(\d+)\]/g, (str, index) => `.${index}`);
//     pathArr = path.split(".");
// other regex 2:
// First, it converts the path to be string[] format by replacing all [$digit] to .$digit
// pathArry = path.replace(/\[(.*)\]/g, '.$1')
// Reference: capture groups: https://javascript.info/regexp-groups#capturing-groups-in-replacement

function get(source, path, defaultValue = undefined) {
  var paths = Array.isArray(path)
    ? path
    : path.split(/[\.\[\]]/g).filter((el) => !!el);
  // edge case: since split by 'dot, [, ]' : ["a", "b", "c", "0", ""]
  // might have empty string in splitted string

  if (path.length === 0) {
    return undefined;
  }
  var res;
  try {
    res = paths.reduce((acc, cur) => {
      if (!acc) {
        throw "error";
      }
      return acc[cur];
    }, source);
  } catch (err) {
    res = undefined;
  }
  return res ?? defaultValue;
}
// const obj = {
//   a: {
//     b: {
//       c: [1,2,3]
//     }
//   }
// }
// console.log(get(obj, 'a.b.c[0]'));
