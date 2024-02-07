import { transformImportant } from './utils'
import { color } from './color'
export function background(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'background-color') {
    const val = color(key, value, 'bg')
    return val ? `${val}${important}` : ''
  }
  if (key === 'background') {
    const values = value.split(' ')
    const len = values.length
    if (len === 1) {
      const val = color(key, value, 'bg')
      return val ? `${val}${important}` : ''
    }
  }
}
