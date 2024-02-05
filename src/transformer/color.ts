import { transformImportant, isHex, transformColorToKey } from './utils'

export function color(_: string, val: string, prefix: string = 'c') {
  const [value, important] = transformImportant(val)
  const color = transformColorToKey(value)
  if (color) {
    return `${prefix}-${color}${important}`
  } else if (isHex(value)) {
    return `${prefix}-${value.replace('#', 'hex-')}${important}`
  }
}
