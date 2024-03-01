import { reversedShortCuts } from './consts'
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
import { line } from './line'
import { background } from './background'
import { border } from './border'
import { justify } from './justify'

const propertyMap: Record<string, Function> = {
  flex,
  display,
  align,
  justify,
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
  z: size,
  max,
  min: max,
  width: size,
  height: size,
  text,
  color,
  font,
  line,
  background,
  border,
  opacity,
  vertical,
  overflow,
}

export function toUnoCSS(css: String): string | undefined {
  const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/
  const declaration = css.match(splitReg)
  if (!declaration) return
  const [_, property, value] = declaration
  // calc | var | url | linear-gradient | rgba | rgb
  if (!isSupportValue(value)) return

  const firstProperty = getFirstProperty(property)
  const result = propertyMap[firstProperty]?.(property, value)
  if (result) {
    const replace2rpx = result.replace(
      /-([0-9\.]+)(rpx|px)/g,
      (_: string, v: string, unit: string) =>
        `-${unit === 'rpx' ? (+v / 2).toFixed(0) : v}`,
    )
    return replace2rpx
  }
}

export function replaceShortcuts(classArray: string[]) {
  Object.entries(reversedShortCuts).forEach(([classList, shortcut]) => {
    const classListArray = classList.split(' ').sort()
    const classListSet = new Set(classListArray)
    if (classListArray.every((cls) => classArray.includes(cls))) {
      classArray = classArray.filter((cls) => !classListSet.has(cls))
      classArray.push(shortcut as string)
    }
  })
  return classArray
}
