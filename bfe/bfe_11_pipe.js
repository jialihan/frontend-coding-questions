// what is pipe?
// https://whatthefuck.is/composition

// usage:
// pipe([
//     times(2),
//     plus(3),
//     times(4)
//   ])
//   // (x * 2 + 3) * 4

//   pipe([
//     times(2),
//     subtract(3),
//     divide(4)
//   ])
//   // (x * 2 - 3) / 4

/**
 * @param {Array<(arg: any) => any>} funcs
 * @return {(arg: any) => any}
 */
// function pipe(funcs) {
// 	return function(arg){
// 		var ans = arg;
// 		for(var fn of funcs)
// 		{
// 			ans = fn.call(this, ans);
// 		}
// 		return ans;
// 	}
// }

function pipe(funcs) {
  // reduce version
  return function (arg) {
    return funcs.reduce((acc, fn) => {
      acc = fn.call(this, acc);
      return acc;
    }, arg);
  };
}
