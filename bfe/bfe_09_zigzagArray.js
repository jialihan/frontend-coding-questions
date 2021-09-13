// https://bigfrontend.dev/problem/decode-message
/**
 * Your are given a 2-D array of characters. There is a hidden message in it.

I B C A L K A
D R F C A E A
G H O E L A D 
The way to collect the message is as follows

start at top left
move diagonally down right
when cannot move any more, try to switch to diagonally up right
when cannot move any more, try switch to diagonally down right, repeat 3
stop when cannot neither move down right or up right. the character on the path is the message
for the input above, IROCLED should be returned.
 */

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
  // your code here
  if (!message || message.length === 0 || message[0].length === 0) {
    return "";
  }
  var i = 0,
    j = 0;
  var m = message.length;
  var n = message[0].length;
  var path = [];
  var d = [1, 1]; // [-1,1]
  while (i >= 0 && i < m && j >= 0 && j < n) {
    path.push(message[i][j]);
    i += d[0];
    j += d[1];
    if (i >= m) {
      d[0] = -1;
      i -= 2;
    } else if (i < 0) {
      d[0] = 1;
      i += 2;
    }
  }
  return path.join("");
}
