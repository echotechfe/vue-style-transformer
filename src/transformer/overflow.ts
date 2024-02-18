import { transformImportant } from './utils'

export function overflow(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'overflow') {
    return `overflow-${value}${important}`
  }
  return `${key}-${value}${important}`
}
