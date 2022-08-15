// Given a compressed string, return its original form.

// For example.

// uncompress('3(ab)') // 'ababab'
// uncompress('3(ab2(c))') // 'abccabccabcc'
// a number k followed by a pair of parenthesis, meaning to repeat the substring inside the parenthesis by k times, k is positive integer.
// inputs are guaranteed to be valid input like above example, there is no numerical digit in original form.

/**
 * @param {string} str
 * @returns {string}
 */
function uncompress(str) {
  const stack = [];
  let cur = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") {
      let num = "";
      let j = i;
      while (j < str.length && str[j] >= "0" && str[j] <= "9") {
        num += str[j];
        j++;
      }
      i = j - 1;
      stack.unshift(cur);
      stack.unshift(parseInt(num));
      cur = "";
    } else if (str[i] === "(") {
      continue;
    } else if (str[i] === ")") {
      let s = cur;
      while (stack.length > 0 && typeof stack[0] !== "number") {
        s = stack.shift() + s;
      }
      const cnt = stack.shift();
      s = s.repeat(cnt);
      stack.unshift(s);
      cur = "";
    } else {
      // letters
      cur += str[i];
    }
  }

  if (cur) {
    stack.unshift(cur);
  }

  return stack.reverse().join("");
}

// console.log(uncompress('3(ab)'));

// console.log(uncompress('1(BFE11(dev))'));
