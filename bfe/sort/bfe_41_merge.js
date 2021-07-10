// // References:
// - https://flaviocopes.com/merge-sort-javascript/
// - https://stackabuse.com/merge-sort-in-javascript

// When return a new array
// function mergeSort(arr) {
//     if(arr.length < 2)
//     {
//       return arr;
//     }
//     var half = Math.floor(arr.length/2);
//     var left = mergeSort(arr.slice(0, half));
//     var right = mergeSort(arr.slice(half));
//     return merge(left, right);
//   }
//   function merge(left, right)
//   {
//       var res = [];
//       while(left.length && right.length)
//       {
//         if(left[0]<right[0])
//         {
//           res.push(left.shift());
//         }
//         else{
//           res.push(right.shift());
//         }
//       }
//       return res.concat(left).concat(right);
//   }

// IN-Place merge sort
// BFE 41: Do it in-place, no need to return anything.
// Follow-up:
// What is time cost for average / worst case ? Is it stable?
// O(nlog(n))

/**
 * @param {number[]} arr
 */
function mergeSort(arr) {
  if (arr.length < 2) {
    return;
  }
  var half = Math.floor(arr.length / 2);
  var left = arr.slice(0, half);
  var right = arr.slice(half);
  mergeSort(left);
  mergeSort(right);
  merge(arr, left, right);
}
function merge(arr, left, right) {
  var i = 0;
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr[i++] = left.shift();
    } else {
      arr[i++] = right.shift();
    }
  }
  while (left.length) {
    arr[i++] = left.shift();
  }
  while (right.length) {
    arr[i++] = right.shift();
  }
}
