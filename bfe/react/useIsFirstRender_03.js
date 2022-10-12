// https://bigfrontend.dev/react/useIsFirstRender

import { useRef } from "react";
export function useIsFirstRender(): boolean {
  const used = useRef(false);
  if (!used.current) {
    used.current = true;
    return true;
  }
  return false;
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
