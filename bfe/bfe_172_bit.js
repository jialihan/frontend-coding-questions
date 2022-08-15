function clz32(num) {
  if (num < 0) {
    return 0;
  }
  let cnt = 0;
  for (let i = 0; i < 32; i++) {
    if ((num >> i) & 1) {
      cnt = 0;
    } else {
      cnt++;
    }
  }
  return cnt;
}
console.log(clz32(-1));
// https://www.w3schools.com/js/js_bitwise.asp
