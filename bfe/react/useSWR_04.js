import { useState, useEffect } from 'react';
export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>
): {
  data?: T
  error?: E
} {
  // your code here
  const res = fetcher();
  const [data, setData] = useState( res instanceof Promise ? null : res);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(res instanceof Promise) {
      Promise.resolve(res)
      .then(d => setData(d))
      .catch(err => setError(err))
    }
  }, []);
  return {data, error};
}
