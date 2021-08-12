// enable myCookie
function install() {
  var map = new Map(); // <key, {value, time}>
  Object.defineProperty(document, "myCookie", {
    configurable: true,
    get() {
      var now = Date.now();
      var res = [];
      for (var key of map.keys()) {
        var item = map.get(key);
        if (item.time && item.time <= now) {
          map.delete(key);
          continue;
        }
        res.push(key + "=" + item.value);
      }
      return res.join("; ");
    },
    set(val) {
      val = val.replaceAll(" ", "");
      if (val.indexOf("max-age") >= 0) {
        var [kv, option] = val.split(";");
        var [k, v] = kv.split("=");
        var [maxAge, time] = option.split("=");
        time = parseInt(time) * 1000 + Date.now();
        var item = { value: v, time };
        map.set(k, item);
      } else {
        var [k, v] = val.split("=");
        map.set(k, { value: v });
      }
    }
  });
}

// disable myCookie
function uninstall() {
  delete document.myCookie;
}

// Tests
document.myCookie = "bfe = dev";
console.log(document.myCookie);
