import { getFirstProperty, getVal, transformImportant } from './utils'

export function size(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return `${key[0]}${getVal(value, getFirstProperty)}${important}`
}
