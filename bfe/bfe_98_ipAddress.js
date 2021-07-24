// ### Explain

// **1. IPV4**

// 4 groups, with each of them should be:
// - one digit: `[0-9]`
// - two digits: `[1-9][0-9]`, no leading zeros
// - three digits:
//     - start with **1**: `1[0-9][0-9]`
//     - start with **2**: `2[0-4][0-9]` or `25[0-5]`

// **2. IPV6**
// 8 groups, with each of them should be:
// - at least 1 digit, at most 4 digit: `{1,4}`
// - each digit should from: `[0-9a-fA-F]`
// console.log(validIPAddress('1.1.1.1'));
function isValidIP(str) {
  var ipv4 =
    /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
  var ipv6 = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/;
  return ipv4.test(str) || ipv6.test(str);
}

// LC468. https://leetcode.com/problems/validate-ip-address/
var validIPAddress = function (str) {
  var ipv4 =
    /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
  var ipv6 = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/;
  if (ipv4.test(str)) {
    return "IPv4";
  }
  if (ipv6.test(str)) {
    return "IPv6";
  }
  return "Neither";
};
