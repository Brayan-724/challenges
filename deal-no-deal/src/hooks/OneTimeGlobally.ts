const mapOfOneTimeGlobally = new Map<string, unknown>();

export function useOneTimeGlobally<A extends [], R>(fn: (...args: A) => R, args: A): R {
  const key = fn.toString();
  
  if (!mapOfOneTimeGlobally.has(key)) {
    mapOfOneTimeGlobally.set(key, fn(...args));
  }

  return mapOfOneTimeGlobally.get(key) as R;
}