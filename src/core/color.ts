import { transformImportant, isHex, transformColorToKey } from './utils'

export function color(key: string, val: string) {
  const [value, important] = transformImportant(val)
  const color = transformColorToKey(value)
  if (color) {
    return `c-${color}${important}`
  } else if (isHex(value)) {
    return `c-${value.replace('#', 'hex-')}${important}`
  }
}
