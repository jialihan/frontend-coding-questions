// Rewrite and Review again the "Array.prototype.flat()",
// self-implemented method, reference doc:
//  ["flat()" - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) .

// **Edge Cases:**
// - start with "0"
// - Don't forget the ending "24"

// type Interval = [number, number]

/**
 * @param {Interval[][]} schedules
 * @return {Interval[]}
 */
function findMeetingSlots(schedules) {
  var slots = myFlat(schedules, 1).sort((a, b) => a[0] - b[0]);
  slots.push([24, 24]);
  // merge and find empty intervals;
  var res = [];
  var preEnd = 0;
  for (var i = 0; i < slots.length; i++) {
    var [start, end] = slots[i];
    if (start > preEnd) {
      res.push([preEnd, start]);
    }
    preEnd = Math.max(preEnd, end);
  }
  return res;
}
function myFlat(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) => acc.concat(Array.isArray(val) ? myFlat(val, d - 1) : val),
        []
      )
    : arr.slice();
}
