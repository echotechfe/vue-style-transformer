import { getFirstProperty, getVal, transformImportant } from './utils'

export function size(key: string, val: string) {
  const [value, important] = transformImportant(val)
  let transVal = getVal(value, getFirstProperty)
  if (transVal === '-100pct') {
    transVal = '-full'
  }

  return `${key[0]}${transVal}${important}`
}
