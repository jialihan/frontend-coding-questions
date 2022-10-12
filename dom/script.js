function selectElements_id(node, s) {
  const id = s.slice(1, s.length);
  let res = [];
  function dfs(_node) {
    if (_node.id === id) {
      res.push(_node);
    }
    for (const el of _node.children) {
      dfs(el);
    }
  }
  dfs(node);
  return res;
}

function selectElements_class(node, s) {
  const cname = s.slice(1, s.length);
  let res = [];
  function dfs(_node) {
    if (_node.className === cname) {
      res.push(_node);
    }
    for (const el of _node.children) {
      dfs(el);
    }
  }
  dfs(node);
  return res;
}

function selectElements_comb(node, s) {
  const s_arr = s.split(" ");
  let ans = new Set();
  function dfs(cur, selectors, index) {
    if (!cur || index >= selectors.length) {
      return;
    }
    const s = selectors[index];
    let res;
    if (s[0] === "#") {
      res = selectElements_id(cur, s);
    } else {
      res = selectElements_class(cur, s);
    }
    console.log("index at " + index, res);
    if (index === selectors.length - 1) {
      ans.add(res);
      return;
    }
    for (const el of res) {
      dfs(el, selectors, index + 1);
    }
  }
  dfs(node, s_arr, 0);
  return Array.from(ans);
}

let a = selectElements_id(document.body, "#selector1"); // (2) [div#selector1, div#selector1]
let b = selectElements_comb(document.body, "#selector1 .selector2");
console.log(b);
