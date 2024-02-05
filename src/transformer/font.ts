import { transformImportant } from './utils'

export function font(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'font-size') return `text-${value}${important}`
  if (key === 'font-weight') return `fw-${value}${important}`
  if (key === 'font-family' && value === 'Roboto') {
    return `font-num${important}`
  }
  if (key === 'font-style') {
    if (value === 'normal') return `font-not-italic${important}`
    return `font-${value}${important}`
  }
}
