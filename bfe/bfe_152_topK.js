/*
 * @param {number[]} arr
 * @param {number} k
 * @returns {number[]}
 */
function topK(arr, k) {
  var pq = [];
  for (var num of arr) {
    pq.push(num);
    pq.sort((a, b) => b - a);
    if (pq.length > k) {
      pq.pop();
    }
  }
  return pq;
}
