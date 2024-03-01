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
  let ret
  if (extracted) {
    const { variable, defaultValue } = extracted
    let colorVal = ''
    if (variable) {
      if (variable.startsWith('--du-')) {
        colorVal = `var(--${kebabCase(variable)})`
      } else {
        colorVal = `var(--du-${kebabCase(variable)})`
      }
    }
    ret =
      processColor(colorVal, important, prefix) ||
      (defaultValue && processColor(defaultValue, important, prefix))
  }
  return ret || processColor(value, important, prefix)
}
