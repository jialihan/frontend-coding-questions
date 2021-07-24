// Given a HTML string, write a function to extract the anchor <a/> tag from it.

/**
 * @param {string} str
 * @return {string[]}
 */
function extract(str) {
  var reg = /<a(\s[^>]*)?>.*?<\s*\/\s*a>/g;
  return str.match(reg) ?? [];
}

const div = `
<div>
    <a>link1< / a><a href="https://bfe.dev">link1< / a>
    <div<abbr>bfe</abbr>div>
    <div>
<abbr>bfe</abbr><a href="https://bfe.dev" class="link2"> <abbr>bfe</abbr>   <span class="l">l</span><span  class="i">i</span>   nk2   </a>
    </div>
</div>
`;
console.log(extract(div));

// OUTPUT:
// [
//    '<a>link1< / a>',
//    '<a href="https://bfe.dev">link1< / a>',
//    '<a href="https://bfe.dev" class="link2"> <abbr>bfe</abbr>   <span class="l">l</span><span  //class="i">i</span>   nk2   </a>'
//]

// Notes:
// match the first <a href=......>: the pattern is "one-white-space + any possible chars but NOT '>' "
// match the middle content: use "non-greedy match", see docs here: .*?
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers
