export function iterateEnum(e: Object): any[][] {
  const keys = Object.keys(e);
  return keys.slice(keys.length / 2).map(key => {
    return [key, e[key]]
  })
}