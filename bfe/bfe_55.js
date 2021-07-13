// 55. highlight keywords in HTML string
// https://bigfrontend.dev/problem/highlight-keywords-in-HTML-string
// To simplify things, you need to create a function highlightKeywords(html:string, keywords: string[]), which wraps the keywords in html string, with <em> tag.

// Here is an example.

// highlightKeywords(
//   'Hello FrontEnd Lovers',
//   ['Hello', 'Front', 'JavaScript']
// )
// // '<em>Hello</em> <em>Front</em>End Lovers'
// Pay attention to the overlapping and adjacent case. You should use the least tags as possible.

// highlightKeywords(
//   'Hello FrontEnd Lovers',
//   ['Front', 'End', 'JavaScript']
// )
// // 'Hello <em>FrontEnd</em> Lovers'

/**
 * @param {string} html
 * @param {string[]} keywords
 */
function highlightKeywords(html, keywords) {
  keywords.sort((a, b) => b.length - a.length);
  var words = html.split(" ");
  var replacedWords = words.map((word) => {
    var matchedIndex = 0;
    for (var key of keywords) {
      var index = word.indexOf(key, matchedIndex);
      if (index >= 0) {
        matchedIndex = index + key.length;
      }
    }
    return `<em>${word.slice(0, matchedIndex)}</em>${word.slice(matchedIndex)}`;
  });
  return replacedWords.join(" ").replaceAll("<em></em>", "");
}

// var res = highlightKeywords(
//   'Hello FrontEnd Lovers',
//   ['Front', 'End', 'JavaScript']
// );
// res = highlightKeywords("Hello FrontEnd Lovers", [
//   "Hello",
//   "Front",
//   "JavaScript"
// ]);
// console.log(res);
