// https://en.wikipedia.org/wiki/Base64
// btoa() accepts a binary string and returns a Base64-encoded ASCII string from it. Characters in a binary string are the ASCII character for each byte of the binary data.

// Please read Base64 wiki and implement your own btoa().

// myBtoa('BFE')
// // 'QkZF'

// myBtoa('BFE.dev')
// // 'QkZFLmRldg=='

function myBtoa(str) {
  var n = str.length;
  var map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var res = "";

  // build the real binary string, eg: '0110011200......'
  var s = "";
  for (var i = 0; i < str.length; i++) {
    s += str[i].charCodeAt(0).toString(2).padStart(8, "0");
  }

  // build the base64 for each 6 bits
  while (s.length > 0) {
    if (s.length < 6) {
      var remaining = 6 - s.length;
      for (var i = 0; i < remaining; i++) {
        s += "0";
      }
    }
    var cur = s.slice(0, 6);
    var num = parseInt(cur, 2);
    res += map[num];
    s = s.slice(6);
  }

  // process padding
  var paddingCnt = n % 3 > 0 ? 3 - (n % 3) : 0;
  for (var i = 0; i < paddingCnt; i++) {
    res += "=";
  }
  return res;
}

// Test:
console.log(myBtoa("BFE"));
// 'QkZF'
console.log(myBtoa("BFE.dev"));
// 'QkZFLmRldg=='
