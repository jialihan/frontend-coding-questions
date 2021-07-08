// 23. create a sum()

// Create a sum(), which makes following possible

// const sum1 = sum(1)
// sum1(2) == 3 // true
// sum1(3) == 4 // true
// sum(1)(2)(3) == 6 // true
// sum(5)(-1)(2) == 6 // true

function sum(num) {
  const func = function (num2) {
    return num2 ? sum(num + num2) : num;
  };

  func.valueOf = () => num;
  return func;
}

// Reference:
// - https://bigfrontend.dev/problem/create-a-sum/discuss
// - [Object to primitive conversion](https://javascript.info/object-toprimitive)
