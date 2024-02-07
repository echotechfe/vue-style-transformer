import {
  transformImportant,
  replaceUnit,
  getLastProperty,
  isHex,
  isRgb,
} from './utils'
import { color } from './color'

const borderSize = [
  'border-left',
  'border-top',
  'border-right',
  'border-bottom',
]

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
  if (key === 'border-color') {
    if (value.includes(' ')) {
      const len = value.split(' ').length
      const vs = value.split(' ').map((s) => {
        if (isHex(s) || isRgb(s)) {
          const val = color(key, s, '')
          return val ? `${val}` : 'not supported'
        }
        return `-${s}`
      })
      if (!vs.includes('not supported')) {
        const [top, right, bottom, left] = vs
        switch (len) {
          case 2:
            return `b-y${top}${important} b-x${right}${important}`
          case 3:
            return `b-t${top}${important} b-b${bottom}${important} b-x${right}${important}`
          case 4:
            return `b-t${top}${important} b-b${bottom}${important} b-r${right}${important} b-l${left}${important}`
        }
      }
    }
    const val = color(key, value, 'b')
    return val ? `${val}${important}` : ''
  }

  const lastProperty = getLastProperty(key)
  if (lastProperty === 'radius') {
    const regex = /border-(top|bottom)-(left|right)-radius\s*/
    const match = key.match(regex)
    if (!match) return
    const [, vertical, horizontal] = match
    if (vertical && horizontal) {
      return `rd-${vertical[0]}${horizontal[0]}-${value}${important}`
    }
  }

  if (borderSize.some((b) => key.startsWith(b))) {
    const values = value.split(' ')
    const map = values.map((v) => {
      if (isHex(v) || isRgb(v)) {
        const val = color(key, v, '')

        return val ? `b-${key.split('-')[1][0]}${val}` : 'not supported'
      }
      return `b-${key.split('-')[1][0]}-${v}${important}`
    })
    if (!map.includes('not supported')) {
      return map.join(' ')
    }
  }

  // border: 1px solid #000
  const values = value.split(' ')
  const map = values.map((v) => {
    if (isHex(v) || isRgb(v)) {
      const val = color(key, v, 'b')

      return val ? `${val}` : 'not supported'
    }
    return `b-${v}${important}`
  })
  if (!map.includes('not supported')) {
    return map.join(' ')
  }
}
