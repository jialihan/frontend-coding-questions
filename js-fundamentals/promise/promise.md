## Promise implementation code go through

#### 0. [Preface](#question0)

#### 1. [Constructor function](#question1)

#### 2. [internal executor/resolver](#question2)

#### 3. [resolve() & reject() function](#question3)

#### 4. [then() method](#question4)

#### 5. ["this.handle()" method](#question5)

#### 6. [catch() method](#question6)

#### 7. [finally() method](#question7)

#### 8. [Static Method](#question8)

#### 9. [Reference](#question9)

<div id="question0" />

### 0. Preface

How to tackle and break down this problem? it's much more easier from a API usage perspective.

- Constructor: Promise // 构造函数
- Instance method:

  - // Promise.prototype.then
  - // Promise.prototype.catch
  - // Promise.prototype.finally

- Static method:
  - Promise.resolve
  - Promise.reject
  - Promise.race
  - Promise.all

Internal State (life cycle of a promise):

- \_state === 0 // pending，当前 Promise 正在执行中
- \_state === 1 // fulfilled, 表示执行了 `resolve` 函数，并且 `_value` instanceof Promise === true
- \_state === 2 // rejected, 表示执行了`reject` 函数
- \_state === 3 // fulfilled, 执行了 `resolve 函数，并且\_value instanceof Promise === false

> Note: we can merge and simply state 1 & 3 means fulfilled & resolved, will be easier for our own implementation.

<div id="question1" />

### 1. Constructor function

- Two error check
- set initial internal state
- NO Async code in constructor, sync "executor"

```js
constructor(executor) {
	if (!(this  instanceof  MyPromise)) {
		throw  "Promise must be contructed with new!";
	}
	if (typeof  executor !== "function") {
		throw  "param must be a function!";
	}

	this.state = 0; // 0 pending 1 resolve 2 reject
	this.deferred = [];
	this.value = undefined;

	// call sync
	this.doResolve(executor);
}
```

<div id="question2" />

### 2. internal executor/resolver

We need a internal method to dispatch our "2 fns" as parameter, and we need more logic to dispatch those two functions by promise state internally.

**Important: each promise can ONLY be resolved / rejected ONCE.**

The `done` variable is very helpful here:

```js
doResolve(fn) {
	let  done = false;
	try {
		fn(
			(result) => {
				if (done) {
					return;
				}
				done = true;
				try {
					this.resolve(result);
				} catch (e) {
					this.reject(e);
				}
			},
			(error) => {
				if (done) {
					return;
				}
				done = true;
				this.reject(error);
			}
		); // end calling fn
	} catch (error) {
		if (done) {
			return;
		}
		done = true;
		this.reject(error);
	}
}
```

<div id="question3" />

### 3. resolve() & reject() function

#### 3.1 resolve() instance method

We have two situation to consider for the value to resolve:

- any "**thenable**" value: might be the same Promise object, or other compatible promise implementation, eg: Node.js's promise object
  - --> need to execute the next promise object by calling our internal executor recursively: `this.doResolve(then.bind(newValue));`
- normal value

```js
resolve(newValue) {
	if (this === newValue) {
		throw  "a promise cannot resolve itself!";
	}
	// 1) other compatible promise implementation, eg: Nodejs's promise, can be thenable
	if (
	newValue &&
	(typeof  newValue === "object" || typeof  newValue === "function")
	) {
		if (typeof  newValue.then === "function") {
		let  then = newValue.then;
		this.doResolve(then.bind(newValue));
		return;
		}
	}
	// 2) normal newValue to resolve
	this.state = 1;
	this.value = newValue;
	this.finale();
}
```

#### 3.2 instance "reject()" method

```js
reject(newValue) {
	this.state = 2;
	this.value = newValue;
	this.finale();
}
```

#### 3.3 "finale()" to emit all handler functions

**Note:**
all registered handler method should be called **ASYNC**, so all those will be executed after our promise object in code.
Here we simply use `setTimeout(()=>{}, 0)`

```js
finale() {
	setTimeout(() => {
		this.deferred.forEach((h) => {
			if (this.state === 1) {
				h.onFulfilled(this.value);
			} else  if (this.state === 2) {
				h.onRejected(this.value);
			}
		});
		this.deferred = [];
	}, 0);
}
```

<div id="question4" />

### 4. then() method

This is really important how we chain values in the promise object, and remember `then()` should always return another promise object with chained value.

Here the most easy way is to pass the two register functions "onFulfilled" & "onRejected" directly to the `handle()` method.

Idea here is that:

```text
current promise obj  ---> this.value
                               |
                               | handle(onFulfilled, onRejected)
                               v
return new promise obj ---> this.value (will be the chained value)
```

```js
then(onFulfilled, onRejected) {
	return  new  MyPromise((resolve, reject) => {
		this.handle(
			// param 1
			(result) => {
				if (typeof  onFulfilled === "function") {
					try {
						return  resolve(onFulfilled(result));
					} catch (e) {
						return  reject(e);
					}
				}
				// if has no handler, the returned promise adopts the final state of
				// the original Promise on which then was called.
				resolve(result);
			},
			// param 2
			(error) => {
				if (typeof  onRejected === "function") {
					try {
						return  resolve(onRejected(error));
					} catch (e) {
						return  reject(e);
					}
				}
				// if has no handler, the returned promise adopts the final state of
				// the original Promise on which then was called.
				reject(error);
			}
			);
	});
}
```

Use cases for "then()":

- `pro.then(4);` skip and pass, original promise result NOT changed
- `pro.then(()=>pro2).then((data)=>console.log(data))` can chained the previous promise result

<div id="question5" />

### 5. "this.handle()" method

Note: should call ASYNC to settle the next promise object based on previous promise object

```js
handle(onFulfilled, onRejected) {
	if (this.state === 0) {
		// 1) if pending, no exect, just queue it and return
		this.deferred.push({ onFulfilled, onRejected });
		return;
	}
	setTimeout(() => {
		if (this.state === 1) {
			// 2) resolved
			if (typeof  onFulfilled === "function") {
				onFulfilled(this.value);
			}
		}
		if (this.state === 2) {
			// 3) rejected
			if (typeof  onRejected === "function") {
				onRejected(this.value);
			}
		}
	}, 0);
}
```

<div id="question6" />

### 6. catch()

This is really easy, we just call internal `then()` with different params

```js
catch(onRejected) {
	return  this.then(null, onRejected);
}
```

<div id="question7" />

### 7. finally()

**Doc**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

```js
finally(callback) {
// 1. callback will never receive a parameter
// 2. not change orignal promise result, EXCEPT throw an error in finally block, will reject with the error
// 3. it will return another promise object
// https://github.com/taylorhakes/promise-polyfill/blob/master/src/index.js
return  this.then(
	(value) =>  MyPromise.resolve(callback()).then(() =>  value),
	(reason) =>
		MyPromise.resolve(callback()).then(() => {
			// throw reason;
			return  MyPromise.reject(reason);
		})
	);
}
```

Use-case test for "finally()":

```js
var finallyTest = MyPromise.resolve(1).finally(() => {
  return 2;
});
// output:
// MyPromise {state: 1, deferred: Array(0), value: 1}

finallyTest = MyPromise.resolve(1).finally(() => {
  throw "error in finally";
  return 2;
});
// output:
// MyPromise {state: 2, deferred: Array(0), value: 'error in finally'}
```

<div id="question8" />

### 8. static methods

```js
static  resolve(value) {
	// If the value is a promise, that promise is returned;
	if (value && typeof  value === "object" && value.constructor === MyPromise) {
		return  value;
	}
	return  new  MyPromise((resolve) => {
		resolve(value);
	});
}

static  reject(value) {
	return  new  MyPromise(function (resolve, reject) {
		reject(value);
	});
}
```

<div id="question9" />

### 9. Reference and source code

- https://github.com/lahmatiy/es6-promise-polyfill/blob/master/promise.js
- https://github.com/taylorhakes/promise-polyfill/blob/master/src/finally.js
