## why use array in useState instead of object?

we use `[state, setState] = useState();` instead of object `{}` to destructure. why?

reason: easy to rename.

```js
const { mystate: state, mySetState: setState } = useState();
// easy way
const [mystate, mySetState] = useState();
```

复习：

- [setState()源码](https://github.com/facebook/react/blob/main/packages/react/src/ReactHooks.js#L86)
- generics in Typescript: [official doc](https://www.typescriptlang.org/docs/handbook/2/generics.html), [myblog-ts-day7](https://jialihan.github.io/blog/#/typescript/day7_generics).
