import {
  getFirstProperty,
  getLastProperty,
  joinWithLine,
  transformImportant,
} from './utils'

export function grid(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key.startsWith('grid-template')) {
    const matcher = value.match(/repeat\s*\(\s*([0-9]+)/)
    if (matcher) {
      return `grid-${getLastProperty(key) === 'rows' ? 'rows' : 'cols'}-${
        matcher[1]
      }${important}`
    }
    return `grid-${
      getLastProperty(key) === 'rows' ? 'rows' : 'cols'
    }-${value}${important}`
  }
  if (key === 'grid-auto-flow') {
    return `grid-flow-${joinWithLine(value).replace(
      'column',
      'col'
    )}${important}`
  }
  if (key.startsWith('grid-auto')) {
    const matcher = value.match(/minmax\s*\(\s*0\s*,\s*1fr/)
    return `auto-${getLastProperty(key) === 'rows' ? 'rows' : 'cols'}-${
      matcher ? 'fr' : getFirstProperty(value)
    }${important}`
  }
  const matcher = value.match(/span\s+([0-9])/)
  if (matcher) {
    return `${key.slice(5).replace('column', 'col')}-span-${
      matcher[1]
    }${important}`
  }
  if (value === '1/-1')
    return `${key.slice(5).replace('column', 'col')}-span-full${important}`
  return `${key.slice(5).replace('column', 'col')}-${value}${important}`
}
