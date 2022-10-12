// This is weird, I cannot use [ref.current] as dependency array, then even useLayoutEffect won't work. What I tried:

// useEffect with [ref.current] - FAILED
// useLayoutEffect with [ref.current] - FAILED
// useLayoutEffect on every re-render - SUCCESS
// Why it has to be trigger on every re-render and cannot depend on [ref.current] changes?

import { Ref, useRef, useState, useLayoutEffect, useCallback } from "react";

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef();
  const handleMouseOver = useCallback(() => setIsHover(true), []);
  const handleMouseOut = useCallback(() => setIsHover(false), []);
  useLayoutEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);
    }
    return () => {
      element.removeEventListener("mouseover", handleMouseOver);
      element.removeEventListener("mouseout", handleMouseOut);
    };
  });
  return [ref, isHover];
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
