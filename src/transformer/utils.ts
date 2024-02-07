import { colorMap } from './consts'

export function getFirstProperty(s: string) {
  return s.split('-')[0]
}

export function getLastProperty(s: string) {
  return s.split('-').at(-1)
}

export function isPercent(s: string) {
  return s.endsWith('%')
}

export function isHex(hex: string) {
  return /^#[0-9A-Fa-f]{2,}$/.test(hex)
}

export function isRgb(s: string) {
  return s.startsWith('rgb')
}

export function getVal(val: string, transform?: Function) {
  return `-${transform ? transform(val) : val}`
}

// calc | var | url | linear-gradient
export function isSupportValue(v: string) {
  return !/(calc|var|url|linear-gradient)/.test(v)
}

export function joinWithLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('-')
}

export function replaceUnit(v: string) {
  return v.replace(
    /([0-9\.]+)(rpx|px)/g,
    (_: string, v: string, unit: string) =>
      `${unit === 'rpx' ? (+v / 2).toFixed(0) : v}`
  )
}

export function transformImportant(v: string) {
  v = v
    .replace(/\s+/, ' ')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*\/\s*/, '/')
  if (/rgb/.test(v)) {
    v = v.replace(/rgba?\(([^\)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(
        k,
        _k
          .map((i: string, index: number) =>
            i.endsWith(',') ? i : i + (_k.length - 1 === index ? '' : ',')
          )
          .join('')
      )
    })
  }

  if (/hsl/.test(v)) {
    v = v.replace(/hsla?\(([^\)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(
        k,
        _k
          .map((i: string, index: number) =>
            i.endsWith(',') ? i : i + (_k.length - 1 === index ? '' : ',')
          )
          .join('')
      )
    })
  }

  if (/var\([^\)]+\)/.test(v)) {
    v = v.replace(/var\(([^\)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(
        k,
        _k
          .map((i: string, index: number) =>
            i.endsWith(',') ? i : i + (_k.length - 1 === index ? '' : ',')
          )
          .join('')
      )
    })
  }

  // transform 100% to 100pct
  if (/%/.test(v)) {
    v = v.replace(/([0-9.]+)%/g, (_: string, v: string) => `${v}pct`)
  }

  if (v.endsWith('!important'))
    return [v.replace(/\s*\!important/, '').trim(), '!']
  return [v.trim(), '']
}

export function transformColorToKey(
  value: string,
  colors: any = colorMap,
  prefix: string = ''
): string | undefined {
  // 遍历颜色信息，寻找匹配的键
  for (const key of Object.keys(colors)) {
    const colorValue = colors[key]

    // 构建当前键的前缀
    const currentPrefix = prefix ? `${prefix}-` : ''

    // 如果颜色值是字符串且匹配，则返回带前缀的键
    if (
      typeof colorValue === 'string' &&
      colorValue.toLowerCase() === value.toLowerCase()
    ) {
      // 如果键是数字，转化为对应的数字形式
      const transformedKey = isNaN(Number(key)) ? key : Number(key) / 100
      return `${currentPrefix}${transformedKey}`
    }

    // 如果颜色值是对象，递归查找
    if (typeof colorValue === 'object') {
      const nestedResult = transformColorToKey(
        value,
        colorValue,
        `${currentPrefix}${key}`
      )
      if (nestedResult) {
        return nestedResult
      }
    }
  }

  // 未找到匹配项
  return undefined
}
