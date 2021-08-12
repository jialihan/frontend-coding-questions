// Given a time string in format HH:mm,
// please return the angle between hour hand and minute hand.

// Tricky parts:
// - calc the hour's angle precisely, including the middle part of whole integer
// - return the smaller value if larger than "180 deg"

/**
 * @param {string} time
 * @returns {number}
 */
function angle(time) {
  var [h, m] = time.split(":");
  h = parseInt(h);
  h = h > 12 ? h - 12 : h;
  if (h === 12) {
    h = 0;
  }
  m = parseInt(m);
  var degM = (m / 60) * 360;
  var degH = (h / 12) * 360 + (m / 60) * 30; // tricky part

  var diff = Math.abs(degH - degM);
  // You should return rounded integer representing the smaller angle in degrees.
  if (diff > 180) {
    diff = 360 - diff;
  }
  return Math.round(diff);
}
// Test:
// console.log(angle("12:00"));
// // 0
// console.log(angle("23:30"));
// // 165

console.log(angle("12:34"));
// 173
