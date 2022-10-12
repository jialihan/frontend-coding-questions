import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = (useRef < T) | (undefined > undefined);
  useEffect(() => {
    // when value changes, set the current value
    ref.current = value;
  }, [value]);
  return ref.current;
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
