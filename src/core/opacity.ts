import { transformImportant } from './utils'

export function opacity(key: string, val: string) {
  const [value, important] = transformImportant(val)
  return `op-${+value * 100}${important}`
}
