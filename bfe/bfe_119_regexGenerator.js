/**
 * @param {string} str
 * @return {Generator}
 */
function* tokenize(str) {
  var reg = /(\d+)|[\+\-\*\/\(\)]/g;
  var arr = str.match(reg);
  for (var item of arr) {
    yield item;
  }
}
// test
const tokens = tokenize(" 1 * (20 -   300      ) ");
while (true) {
  let token = tokens.next();
  if (token.done) {
    break;
  }
  console.log(token.value);
}
// 1 * (20 -   300      )

// 1 * ((20 + 300) - 4) / ((100 / 6))

// 11234
