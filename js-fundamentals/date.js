let d;
d = new Date();
console.log(d, d.toString());
d = new Date(1621234770513);
console.log(d.toString());

d = new Date(1995, 11, 17, 3, 20, 27, 0);
console.log(d.toString());

d = new Date(1995, 11);
console.log(d.toString());

// get
const date = new Date();
console.log(date.getMonth()); // 7, August
console.log(date.getDate()); //
console.log(date.getFullYear());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());

console.log(date.getUTCHours()); // 5

// set days
d.setMinutes(14);
d.setDate(5);
d.setUTCHours(4);
console.log(d.toString());

// ISOSstring
d = new Date();
console.log(d.toISOString());
console.log(d.toLocaleString("en-US"));
console.log(d.toLocaleString("en-AU"));
console.log(d.toLocaleString("zh"));

console.log(
  d.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles"
  })
);

// JSON
console.log(
  JSON.stringify({
    myDate: d
  })
);

// now
console.log(Date.now());
