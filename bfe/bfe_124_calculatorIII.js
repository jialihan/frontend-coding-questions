// Reference: LC 772. https://leetcode.com/problems/basic-calculator-iii/

// Now please calculate() the result of the string.
// You can use the tokenizer you wrote before.
// calculate('1 * (20 -   300      ) ')
// // -280
// calculate('     1/0 ')
// // Infinity

/**
 * @param {string} str
 * @returns {Number}
 */
function calculate(str) {
  var arr = [];
  for (var item of tokenize(str)) {
    arr.push(item);
  }
  // calculate
  return helper(arr);
}
function helper(arr) {
  if (!arr || arr.length == 0) {
    return 0;
  }
  var preOp = "+";
  var cur = 0;
  var preNum = 0;
  var sum = 0;
  var i = 0;
  arr.push("+");
  while (i < arr.length) {
    var c = arr[i];
    if (c === "+" || c === "-" || c === "*" || c === "/") {
      // process previous Operator
      if (preOp == "+") {
        sum += preNum;
        preNum = cur;
      } else if (preOp == "-") {
        sum += preNum;
        preNum = -cur;
      } else if (preOp == "*") {
        preNum = preNum * cur;
      } else if (preOp == "/") {
        preNum = preNum / cur;
      }
      // update current operator
      preOp = c;
      cur = 0;
    } else if (c === "(") {
      var j = i;
      var cnt = 0;
      while (i < arr.length) {
        if (arr[i] === "(") {
          cnt++;
        } else if (arr[i] === ")") {
          cnt--;
        }
        if (cnt === 0) {
          break;
        }
        i++;
      }
      cur = helper(arr.slice(j + 1, i));
      // console.log("recursion result: ", cur);
    } else {
      cur = +c;
    }
    i++;
  } // end while
  return sum + preNum;
}
function* tokenize(str) {
  var reg = /(\d+)|[\+\-\*\/\(\)]/g;
  var arr = str.match(reg);
  for (var item of arr) {
    yield item;
  }
}
// Test
console.log(calculate("1 * (20 -   300      ) "));
// console.log(calculate("20 -   300     "));
