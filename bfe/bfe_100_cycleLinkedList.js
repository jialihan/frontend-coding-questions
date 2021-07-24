// two pointer - Space O(1) Time O(n)
/**
 * @param {Node} head
 * @return {boolean}
 */
// Space O(1)
function hasCircle(head) {
  var fast = head;
  var slow = head;
  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    if (fast == slow) {
      return true;
    }
    slow = slow.next;
  }
  return false;
}
// LEETCODE 141: https://leetcode.com/problems/linked-list-cycle/
