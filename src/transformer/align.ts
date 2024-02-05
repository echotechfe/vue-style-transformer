import { getLastProperty, transformImportant } from './utils'

export function align(key: string, val: string) {
  const [value, important] = transformImportant(val)
  return `${getLastProperty(key)}-${getLastProperty(value)}${important}`
}
