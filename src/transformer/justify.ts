import { getLastProperty, transformImportant } from './utils'

export function justify(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'justify-content')
    return `justify-${getLastProperty(value)}${important}`
  return `${key}-${getLastProperty(value)}${important}`
}
