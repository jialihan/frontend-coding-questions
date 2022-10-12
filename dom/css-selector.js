// 3. 前端：这道题主要考的是用javascript对DOM节点的查询。实现querySelector(selector)这个函数。
//   3.1. 现在给你一个id selector，比如"#myNode"，找到这个节点并返回这个节点。
//   3.2. 再给你一个class selector，比如".myClass"，找到这个collection返回，注意查找class的时候节点可以不为唯一，所以要返回array。
//   3.3. 然后给你一个组合selector，就是上面id和class的组合"#myNode .myClass"。这里也要返回collection。这里还考到对DOM Tree的traverse。因为你要保证".myClass"是"#myNode"的descendants。

function selectElement_id(node, s) {
  const id = s.slice(1, s.length);
  let res = [];
  function dfs(_node) {
    if (node.id === id) {
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
    if (node.className === cname) {
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
  let ans = [];
  function dfs(cur, selectors, index) {
    if (!cur) {
      return;
    }
    const s = selectors[index];
    let res;
    if (s[0] === "#") {
      res = selectElement_id(cur, s);
    } else {
      res = selectElements_class(cur, s);
    }
    if (index === selectors.length - 1) {
      ans = ans.concat(res);
      return;
    }
    console.log("res at index" + index, res);
    for (const el of res) {
      dfs(el, selectors, index + 1);
    }
  }
  dfs(node, s_arr, 0);
  return ans;
}
