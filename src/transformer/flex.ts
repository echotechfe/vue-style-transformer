import { getFirstProperty, getLastProperty, transformImportant } from './utils'

const propertyMaps = ['flex-basis', 'flex-grow', 'flex-shrink']

export function flex(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (propertyMaps.includes(key)) {
    return `${getLastProperty(key)}-${value}${important}`
  }

  if (value === '1') return `flex-1${important}`

  // flex: *
  if (key === 'flex') {
    const values = value.split(' ')
    const len = values.length
    if (len === 3) {
      const [grow, shrink, basis] = values
      return `grow-${grow} shrink-${shrink} basis-${basis}${important}`
    }
  }

  // flex-*: *
  return `${getFirstProperty(key)}-${value.replace(
    'column',
    'col'
  )}${important}`
}
