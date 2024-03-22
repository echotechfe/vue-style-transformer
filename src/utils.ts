import postcss from 'postcss'
import { toUnoCSS } from './transformer/index'

export function splitClassNamesString(classNamesString: string) {
  return classNamesString
    .split(' ')
    .map((i) => i.trim())
    .filter((i) => i)
}

interface SelectorClassMap {
  selector: string
  unoClassList: string[]
  remainClassList: string[]
  weight: number
  transAll: boolean
}

export function getStyleMapFromCSS(css: string) {
  const selectorClassMapList: SelectorClassMap[] = []
  postcss.parse(css).walkRules((rule) => {
    const selectorClassMap = {
      selector: rule.selector,
      unoClassList: [],
      remainClassList: [],
      weight: calculateWeight(rule.selector),
      transAll: false,
    } as SelectorClassMap
    rule.walkDecls((decl) => {
      const declaration = `${decl.prop}: ${decl.value};`
      const unoClass = toUnoCSS(declaration) as string | undefined
      if (unoClass) {
        selectorClassMap.unoClassList.push(unoClass)
      } else {
        selectorClassMap.remainClassList.push(declaration)
      }
    })
    if (selectorClassMap.remainClassList.length === 0) {
      selectorClassMap.transAll = true
    }
    selectorClassMapList.push(selectorClassMap)
  })

  return selectorClassMapList
}

function calculateWeight(c: string) {
  const data = c.split(' ').filter((i) => i !== '+' && i !== '>')
  let num = 0

  data.forEach((item) => {
    item.replace(/#\w+/g, () => {
      num += 100
      return ''
    })
    item.replace(/.\w+/, () => {
      num += 10
      return ''
    })
    item.replace(/^\w+/, () => {
      num += 10
      return ''
    })
    item.replace(/\[[\w\s='"-]+\]/g, () => {
      num += 10
      return ''
    })
    item.replace(/:\w+/g, () => {
      num += 1
      return ''
    })
  })

  return num
}
