function set(obj, path, value) {
  var paths = path;
  if (typeof path === "string") {
    path = path.replaceAll("[", ".[");
    paths = path.split(".");
  }
  helper(obj, 0, paths, value);
  return;
}
function helper(parent, index, paths, data) {
  var key = paths[index];
  if (index >= paths.length - 1) {
    // process last data value
    key = key.replaceAll("[", "");
    key = key.replaceAll("]", "");
    parent[key] = data;
    return;
  }
  if (!parent[key]) {
    if (index === paths.length - 2 && paths[paths.length - 1][0] === "[") {
      // only the second last element might be considered as array
      parent[key] = [];
    } else {
      parent[key] = {};
    }
  }
  helper(parent[key], index + 1, paths, data);
}
