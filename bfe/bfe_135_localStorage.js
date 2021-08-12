// localStorage is a simple and handy client-side storage, but you should avoid using it because it is synchronous.

// Also Safari's ITP actually deletes client-side script-writable storage after 7 days of Safari use without interacting on your website, and localStorage is included.

// Unlike Cookie, localStorage doesn't expire.

// In this problem, please create a localStorage wrapper with expiration support

// myLocalStorage.setItem('bfe', 'dev', 1000)
// myLocalStorage.getItem('bfe')
// // 'dev'
// after 1 second:

// myLocalStorage.getItem('bfe')
// // null

window.myLocalStorage = {
  getItem(key) {
    var item = window.localStorage.getItem(key);
    if (item) {
      var { value, time } = JSON.parse(item);
      if (time) {
        var now = Date.now();
        if (time < now) {
          window.localStorage.removeItem(key);
          return null;
        }
      }
      return value;
    }
    return null;
  },

  setItem(key, value, maxAge) {
    if (maxAge === 0) {
      // if maxAge is 0, NOT go async
      window.localStorage.removeItem(key);
      return null;
    }
    var item = { value };
    if (maxAge) {
      // if not pass a time, it will be persisted forever
      item.time = Date.now() + maxAge;
    }
    window.localStorage.setItem(key, JSON.stringify(item));
  },

  removeItem(key) {
    window.localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
// myLocalStorage.setItem('bfe', 'dev', 1000)
// console.log(myLocalStorage.getItem('bfe'))
