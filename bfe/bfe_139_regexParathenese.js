function t(translation, data) {
  var reg = /\{\{([\w\s\{\}]*?)\}\}/g;
  const array = [...translation.matchAll(reg)].map((el) => el[1]); // keys
  for (var key of array) {
    var template = "{{" + key + "}}";
    console.log(template);
    if (data && data[key]) {
      translation = translation.replaceAll(template, data[key]);
    } else {
      translation = translation.replaceAll(template, "");
    }
  }
  return translation;
}
// console.log(t("{{website}} {{verb}} {{evaluation}} {{period}} "));
// //.toBe('    ')
// console.log(
//   t("{{website}} {{verb}} {{evaluation}} {{period}}", {
//     website: "BFE.dev",
//     evaluation: "面白い"
//   })
// );
// //.toBe("BFE.dev  面白い ");
//console.log(t("BFE.dev is {{}}{{}}{{}}{{evaluation", { evaluation: "cool" }));
// .toBe('BFE.dev is {{evaluation')

console.log(t("BFE.dev is {{{evaluation}}", { evaluation: "cool" }));
//.toBe('BFE.dev is ')

// function t(translation, data = {}) {
//   var reg = /\{\{([\w\d\s\{\}]*?)\}\}/g;
//   return translation.replaceAll(reg, (_, key) => data[key] || "");
// }

// /\{\{(\w*)\}\}/g - need consider empty "" in capture part
// /\{\{(\w*?)\}\}/g - need to include as many as '{' and '}' in middle part
// /\{\{([\w\{\}]*?)\}\}/g - need consider white space char in middle part as ▫
// /\{\{([\w\s\{\}]*?)\}\}/g - passed

// /\{\{(.*?)\}\}/g - i know this is a better solution
