import {
  transformImportant,
  isHex,
  kebabCase,
  transformColorToKey,
  extractVarAndOptionallyDefault,
} from './utils'

function processColor(value: string, important: string, prefix: string = 'c') {
  const color = transformColorToKey(value)
  if (color) {
    return `${prefix}-${color}${important}`
  } else if (isHex(value)) {
    return `${prefix}-${value.replace('#', 'hex-')}${important}`
  }
}

export function color(_: string, val: string, prefix: string = 'c') {
  const [value, important] = transformImportant(val)
  const extracted = extractVarAndOptionallyDefault(value)
  if (extracted) {
    const { variable, defaultValue } = extracted
    if (variable) {
      return processColor(`var(--${kebabCase(variable)})`, important, prefix)
    }
    if (defaultValue) {
      return processColor(defaultValue, important, prefix)
    }
  }
  return processColor(value, important, prefix)
}
