import { transformImportant } from './utils'
import { color } from './color'
export function background(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'background-color') {
    const val = color(key, value, 'bg')
    return `${val}${important}`
  }
}
