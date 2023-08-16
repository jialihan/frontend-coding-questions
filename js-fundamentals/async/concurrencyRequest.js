/**
 * Return a array of response of each request: resp[res1, res2, ....], each is a promise
 * @param {string[]} urls
 * @param {number} maxNum
 */
function concurrencyRequest(urls, maxNum) {
  const n = urls.length;
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    const res = [];
    let index = 0;
    let completedCount = 0;
    async function request() {
      if (index >= n) {
        // if larger than array's length, just return
        return;
      }
      const curIdx = index++;
      const url = urls[curIdx];
      console.log("request: ", url);
      fetch(url)
        .then((resp) => {
          res[curIdx] = resp;
        })
        .catch((err) => {
          res[curIdx] = err;
        })
        .finally(() => {
          if (++completedCount >= n) {
            resolve(res);
            return;
          }
          request();
        });
    }
    const k = Math.min(n, maxNum);
    for (let i = 0; i < k; i++) {
      request();
    }
  });
}

// Test the code
const urls = [];
for (let i = 0; i < 10; i++) {
  urls.push(`https://jsonplaceholder.typicode.com/todos/${i + 1}`);
}
console.log("urls:", urls);
concurrencyRequest(urls, 3).then((resp) => {
  console.log(resp);
});
