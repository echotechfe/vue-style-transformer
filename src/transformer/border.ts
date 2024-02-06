import { transformImportant, replaceUnit, getLastProperty } from './utils'

export function border(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'border-radius') {
    const radii = value.split(/\s+/)
    const [topLeft, topRight, bottomRight, bottomLeft] = radii
    const classes = []
    switch (radii.length) {
      case 1:
        return `rd-${topLeft}`
      case 2:
        return `rd-tl-${topLeft} rd-tr-${topRight} rd-br-${topLeft} rd-bl-${topRight}`
      case 3:
        return `rd-tl-${topLeft} rd-tr-${topRight} rd-br-${bottomRight} rd-bl-${topRight}`
      case 4:
        // 应用简化的类名规则
        if (topLeft === topRight && bottomRight === bottomLeft) {
          Boolean(+replaceUnit(topLeft)) && classes.push(`rd-t-${topLeft}`)
          Boolean(+replaceUnit(bottomRight)) &&
            classes.push(`rd-b-${bottomRight}`)
        } else if (topLeft === bottomLeft && topRight === bottomRight) {
          Boolean(+replaceUnit(topLeft)) && classes.push(`rd-l-${topLeft}`)
          Boolean(+replaceUnit(topRight)) && classes.push(`rd-r-${topRight}`)
        } else {
          if (topLeft !== '0') classes.push(`rd-tl-${topLeft}`)
          if (topRight !== '0') classes.push(`rd-tr-${topRight}`)
          if (bottomRight !== '0') classes.push(`rd-br-${bottomRight}`)
          if (bottomLeft !== '0') classes.push(`rd-bl-${bottomLeft}`)
        }
        return classes.join(' ')
      default:
        return ''
    }
  }
  const lastProperty = getLastProperty(key)
  if (lastProperty === 'radius') {
    const regex =
      /border-(top|right|bottom|left)(?:-(left|right))?-(?:radius)\s*/
    const match = key.match(regex)
    if (!match) return
    const [, direction, lr] = match
    if (direction && !lr) {
      return `rd-${direction[0]}-${value}${important}`
    } else if (direction && lr) {
      return `rd-${direction[0]}${lr[0]}-${value}${important}`
    }
  }
}
