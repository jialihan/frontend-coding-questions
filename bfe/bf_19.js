// 19. find corresponding node in two identical DOM tree

// // Recursive
// const findCorrespondingNode = (rootA, rootB, target) => {
//    if(rootA === target)
//    {
//      return rootB;
//    }
//    for(var i = 0; i<rootA.children.length; i++)
//    {
//       var ans = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
//       if(ans)
//       {
//         return ans;
//       }
//    }
// }
// Iterative
// use two queue to make A & B in the same order when BFS:

const findCorrespondingNode = (rootA, rootB, target) => {
  if (rootA === target) {
    return rootB;
  }
  var qA = [rootA];
  var qB = [rootB];
  while (qA.length > 0) {
    var nodeA = qA.shift();
    var nodeB = qB.shift();
    if (nodeA === target) {
      return nodeB;
    }
    for (var i = 0; i < nodeA.children.length; i++) {
      qA.push(nodeA.children[i]);
      qB.push(nodeB.children[i]);
    }
  }
  return null;
};

// follow up

// This could a problem on general Tree structure with only children.

// Could you solve it recursively and iteratively?

// Could you solve this problem with special DOM api for better performance?
/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
const findCorrespondingNode2 = (rootA, rootB, target) => {
  var treeWalkerA = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
  var treeWalkerB = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);
  var curNodes = [treeWalkerA.currentNode, treeWalkerB.currentNode];
  while (curNodes[0]) {
    if (curNodes[0] === target) {
      return curNodes[1];
    }
    curNodes[0] = treeWalkerA.nextNode();
    curNodes[1] = treeWalkerB.nextNode();
  }
};

// What are the time cost for each solution?
// O(V): V is the number of tree nodes
