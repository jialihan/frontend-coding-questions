// 22. implement JSON.parse()

/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(s) {
  if (s === "") {
    throw new Error("Use Double Quots in JSON");
  }
  if (s[0] === "'") {
    throw new Error("Use Double Quots in JSON");
  }
  if (s === "[]") {
    return [];
  } else if (s === "null") {
    return null;
  } else if (s === "true") {
    return true;
  } else if (s === "false") {
    return false;
  } else if (s === "{}") {
    return {};
  } else if (s[0] === '"') {
    return s.slice(1, -1);
  } else if (+s === +s) {
    return Number(s);
  } else if (s[0] === "[") {
    return s
      .slice(1, -1)
      .split(",")
      .map((value) => parse(value));
  } else if (s[0] === "{") {
    return parseObj(s);
  } else {
    return null;
  }
}
function parseObj(str) {
  // parse object
  var obj = {};
  var arr = str.slice(1, -1).split(",");
  for (var s of arr) {
    var idx = s.indexOf(":");
    var key = s.slice(0, idx);
    var val = s.slice(idx + 1, s.length);
    obj[parse(key)] = parse(val);
  }
  return obj;
}

// **Test Cases:**
// ```js
// '{}'

// '{"a":3}' spec , expects {a:3} but gets {}
// 'true'

// '123'

// '"123"'

// 'null'

// '[{"a":{"b":{"c":[1]}}},null,"str"]' spec , expects [{a:{b:{c:[1]}}},null,"str"] but gets [{},null,"str"]

// '{"a":"✌️"}' spec , expects {a:"✌️"} but gets {}

// '[1,2,]'

// '{'a':3}' spec Expected function to throw an exception.

// '{"a":}' spec Expected function to throw an exception.
// ```
