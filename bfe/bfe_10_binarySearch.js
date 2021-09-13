// solution 1

/*
 type TypIsBad = (version: number) => boolean
 */

/**
 * @param {TypIsBad} isBad
 */
function firstBadVersion(isBad) {
  // firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  return function check(version) {
    var l = 0;
    var r = version + 1;
    while (l < r) {
      var mid = Math.floor((l + r) / 2);
      if (!isBad(mid)) {
        l = mid + 1;
      } else {
        r = mid;
      }
    }
    return l > version ? -1 : l;
  };
}

// solution 2: note: version is included as a valid result

/*
 type TypIsBad = (version: number) => boolean
 */

/**
 * @param {TypIsBad} isBad
 */
function firstBadVersion(isBad) {
  // firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  return function check(version) {
    var l = 0;
    var r = version;
    while (l <= r) {
      var mid = Math.floor((l + r) / 2);
      if (!isBad(mid)) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return l > version ? -1 : l;
  };
}
