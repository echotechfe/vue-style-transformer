import { transformImportant } from './utils'
const map: any = {
  'margin-left': 'ml',
  'margin-right': 'mr',
  'margin-top': 'mt',
  'margin-bottom': 'mb',
  'padding-left': 'pl',
  'padding-right': 'pr',
  'padding-top': 'pt',
  'padding-bottom': 'pb',
}
export function edge(key: string, val: string) {
  const [value, important] = transformImportant(val)

  const special = map[key]

  if (special) {
    return `${special}-${value}${important}`
  }

  const values = value.split(' ')
  const len = values.length

  const edge = key.startsWith('margin') ? 'm' : 'p'

  if (len === 1) {
    return `${edge}-${values[0]}${important}`
  }
  if (len === 2) {
    const [yVal, xVal] = values
    const x = `${edge}x-${xVal}${important}`
    const y = `${edge}y-${yVal}${important}`
    return `${x} ${y}`
  }
  if (len === 3) {
    const [topVal, xVal, bottomVal] = values
    const x = `${edge}x-${xVal}${important}`
    const top = `${edge}t-${topVal}${important}`
    const bottom = `${edge}b-${bottomVal}${important}`

    return `${top} ${x} ${bottom}`
  }

  const top = `${edge}t-${values[0]}${important}`
  const right = `${edge}r-${values[1]}${important}`
  const bottom = `${edge}b-${values[2]}${important}`
  const left = `${edge}l-${values[3]}${important}`
  return `${top} ${right} ${bottom} ${left}`
}
