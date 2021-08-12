// global index patterns:

// len=1: 0....51
// len=2: 00, 01, 02, ......5151
// len=3: 000,001, 002,.....515151
// ...
var globalIndex = [0]; // [index]
var table = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 52 chars
function getUniqueClassName() {
  var res = globalIndex.map((el) => table[el]).join("");
  // update index
  var flag = false;
  for (var i = globalIndex.length - 1; i >= 0; i--) {
    if (globalIndex[i] === 51) {
      globalIndex[i] = 0;
      continue;
    }
    globalIndex[i]++;
    flag = true;
    break;
  }
  if (!flag) {
    globalIndex.push(0);
  }
  return res;
}

getUniqueClassName.reset = function () {
  globalIndex = [0];
};
