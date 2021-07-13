// https://bigfrontend.dev/problem/create-a-browser-history

class BrowserHistory {
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.q = [url];
    this.index = 0;
  }
  /**
   * @param { string } url
   */
  visit(url) {
    this.index++;
    this.q = this.q.slice(0, this.index);
    this.q.push(url);
  }

  /**
   * @return {string} current url
   */
  get current() {
    return this.q[this.index];
  }

  // go to previous entry
  goBack() {
    this.index = this.index > 0 ? this.index - 1 : 0;
  }

  // go to next visited url
  forward() {
    this.index = this.index < this.q.length - 1 ? this.index + 1 : this.index;
  }
}
