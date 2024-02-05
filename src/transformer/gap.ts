import { transformImportant } from './utils'

export function gap(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'column-gap') return `gap-x-${value}${important}`
  if (key === 'row-gap') return `gap-y-${value}${important}`
  return `${key}-${value}${important}`
}
