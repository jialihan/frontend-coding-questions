/**
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @returns {any[]}
 */
function getIntersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const res = [];
  for (const num of set2) {
    if (set1.has(num)) {
      res.push(num);
    }
  }
  return res;
}
