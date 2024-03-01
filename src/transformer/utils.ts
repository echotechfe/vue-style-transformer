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
  return !/(calc|url|linear-gradient)/.test(v)
}

export function joinWithLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('-')
}

export function replaceUnit(v: string) {
  return v.replace(
    /([0-9\.]+)(rpx|px)/g,
    (_: string, v: string, unit: string) =>
      `${unit === 'rpx' ? (+v / 2).toFixed(0) : v}`,
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
            i.endsWith(',') ? i : i + (_k.length - 1 === index ? '' : ','),
          )
          .join(''),
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
            i.endsWith(',') ? i : i + (_k.length - 1 === index ? '' : ','),
          )
          .join(''),
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
            i.endsWith(',') ? i : i + (_k.length - 1 === index ? '' : ','),
          )
          .join(''),
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
  prefix: string = '',
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
        `${currentPrefix}${key}`,
      )
      if (nestedResult) {
        return nestedResult
      }
    }
  }

  // 未找到匹配项
  return undefined
}

export function kebabCase(str: string) {
  return (
    str
      // 首先，使用正则表达式匹配所有大写字母，并在它们前面加上空格
      .replace(/([A-Z])/g, ' $1')
      // 将所有非字母数字字符转换为空格
      .replace(/[^a-zA-Z\d]/g, ' ')
      // 去除首尾空格
      .trim()
      // 将连续的空格替换为一个短横线
      .replace(/\s+/g, '-')
      // 转换为小写
      .toLowerCase()
  )
}

export function extractVarAndOptionallyDefault(str: string) {
  // 更新正则表达式，使逗号和默认值部分变为可选
  const match = str.match(/var\(([^,]+?)(?:,\s*([^)]+))?\)/)
  if (match) {
    // match[1] 是变量名
    // match[2] 是默认值，如果存在的话
    return {
      variable: match[1].trim(), // 去除可能的前后空格
      defaultValue: match[2] ? match[2].trim() : undefined, // 去除可能的前后空格，如果没有默认值则为undefined
    }
  }
  return null // 如果没有匹配，返回null
}
