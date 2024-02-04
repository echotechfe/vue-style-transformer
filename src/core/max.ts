import { getFirstProperty, transformImportant } from './utils'

export function max(key: string, val: string) {
  const [value, important] = transformImportant(val)

  const all = key.split('-')
  const firstProperty = getFirstProperty(value)
  return `${all[0]}-${all[1][0]}-${firstProperty}${important}`
}
