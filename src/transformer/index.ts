import { getFirstProperty, isSupportValue } from './utils'
import { display } from './display'
import { flex } from './flex'
import { align } from './align'
import { gap } from './gap'
import { edge } from './edge'
import { opacity } from './opacity'
import { vertical } from './vertical'
import { text } from './text'
import { overflow } from './overflow'
import { max } from './max'
import { size } from './size'
import { color } from './color'
import { font } from './font'
import { background } from './background'
import { border } from './border'

const propertyMap: Record<string, Function> = {
  flex,
  display,
  align,
  gap,
  row: gap,
  column: gap,
  float: gap,
  margin: edge,
  padding: edge,
  position: display,
  top: gap,
  right: gap,
  bottom: gap,
  left: gap,
  max,
  min: max,
  width: size,
  height: size,
  text,
  color,
  font,
  background,
  border,
  opacity,
  vertical,
  overflow,
}

export function toUnoCSS(css: String) {
  const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/
  const declaration = css.match(splitReg)
  if (!declaration) return
  const [_, property, value] = declaration
  // calc | var | url | linear-gradient | rgba | rgb
  if (!isSupportValue(value)) return

  console.log('declaration', declaration)
  const firstProperty = getFirstProperty(property)
  console.log('firstProperty', firstProperty)
  const result = propertyMap[firstProperty]?.(property, value)
  if (result) {
    const replace2rpx = result.replace(
      /-([0-9\.]+)(rpx|px)/g,
      (_: string, v: string, unit: string) =>
        `-${unit === 'rpx' ? (+v / 2).toFixed(0) : v}`
    )

    console.log('replace2rpx', replace2rpx)
    return replace2rpx
  }
}

const ret = toUnoCSS('border-radius: 25% 10%;')
console.log('ret', ret)
