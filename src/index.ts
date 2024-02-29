import $ from 'gogocode'
import { parse } from '@vue/compiler-sfc'
import postcss from 'postcss'
import synchronizedPrettier from '@prettier/sync'
import { compilerCss } from './compilerCss'
import { replaceShortcuts } from './transformer'
import { toUnoCSS } from './transformer/index'
import { processCss } from './processCss'

type RemoveCSSType = {
  className: string
  key: string
  val: string
}

function getCSSRules(css: string, className: string) {
  const rules: string[] = []
  postcss.parse(css).walkRules((rule) => {
    const regex = new RegExp(`\\.${className}(\\s*\\{|\\s*$|\\s*,)`)
    if (rule.selectors.some((selector) => regex.test(selector))) {
      rule.walkDecls((decl) => {
        const declaration = `${decl.prop}: ${decl.value};`
        rules.push(declaration)
      })
    }
  })
  return rules
}

function unique(removeCSS: RemoveCSSType[]) {
  const uniqueRules = new Set()
  const uniqueRemoveCSS: RemoveCSSType[] = []

  removeCSS.forEach((item) => {
    const identifier = `${item.className}|${item.key}|${item.val}`
    if (!uniqueRules.has(identifier)) {
      uniqueRules.add(identifier)
      uniqueRemoveCSS.push(item)
    }
  })

  return uniqueRemoveCSS
}

export async function transform(code: string) {
  const {
    descriptor: { styles },
    errors,
  } = parse(code)
  if (errors.length) return code
  if (!styles.length) return code
  const { content: style } = styles[0]
  let css = await compilerCss(style)
  code = code.replace(style, `\n${css}\n`)

  const classNames: string[] = []
  postcss.parse(css).walkRules((rule) => {
    const classSelectors = rule.selector
      .split(' ')
      .filter((s) => s.startsWith('.'))
    classSelectors.forEach((i) => {
      const name = i.substring(1)
      if (classNames.indexOf(name) === -1) {
        classNames.push(name)
      }
    })
  })

  const ast = $(code, {
    parseOptions: {
      language: 'vue',
    },
  })

  const removeCSS: RemoveCSSType[] = []

  ast
    .find('<template></template>')
    .find([`<$_$ :class="$_$1" $$$0>$$$1</$_$>`, `<$_$ :class="$_$1" $$$0/>`])
    .each((node) => {
      const newContent = $(node.match[1][0].value)
        .find(`{$_$:$_$1}`)
        .each((n) => {
          n.match[0].forEach(async ({ value }) => {
            if (classNames.includes(value)) {
              const rules = getCSSRules(css, value)
              const ret: string[] = []
              const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/
              rules.map((rule) => {
                const match = rule.match(splitReg)
                if (!match) return
                const [declaration, key, val] = match
                const res = toUnoCSS(declaration)
                if (res) {
                  removeCSS.push({ className: value, key, val })
                  ret.push(res)
                }
              })

              if (ret.length) {
                const replaceRet = replaceShortcuts(ret)
                n.replace(
                  `{'${value}': $_$,$$$}`,
                  `{'${value} ${replaceRet.join(' ')}': $_$,$$$}`,
                )
              }
            }
          })
        })
        .root()
        .find(`"$_$"`)
        .each((n) => {
          n.match[0].forEach(async ({ value }) => {
            if (classNames.includes(value)) {
              const rules = getCSSRules(css, value)
              const ret: string[] = []
              const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/
              rules.map((rule) => {
                const match = rule.match(splitReg)
                if (!match) return
                const [declaration, key, val] = match
                const res = toUnoCSS(declaration)
                if (res) {
                  removeCSS.push({ className: value, key, val })
                  ret.push(res)
                }
              })
              if (ret.length) {
                const replaceRet = replaceShortcuts(ret)
                n.replace(`"${value}"`, `"${value} ${replaceRet.join(' ')}"`)
              }
            }
          })
        })
        .root()
        .generate()
      const nodeContent = node.match[1][0].node
      Object.assign(nodeContent, {
        content: newContent.replace(/"/g, "'"),
      })
    })
    .root()
    .find('<template></template>')
    .find([`<$_$ class="$_$1" $$$1>$$$2</$_$>`, `<$_$ class="$_$1" $$$1/>`])
    .each((node) => {
      const classList = node.match[1][0].value.split(' ')
      let hasMatched = false
      classList.forEach((i, idx) => {
        if (classNames.includes(i)) {
          hasMatched = true
          classList[idx] = `'${i}'`
        }
      })

      if (hasMatched) {
        const newContentAst = $(JSON.stringify(classList))
        newContentAst.find(`'$_$'`).each((n) => {
          const str = n.match[0][0].value
          if (str.startsWith("'") && str.endsWith("'")) {
            const value = str.replace(/'/g, '')
            const rules = getCSSRules(css, value)
            const ret: string[] = []
            const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/
            rules.map((rule) => {
              const match = rule.match(splitReg)
              if (!match) return
              const [declaration, key, val] = match
              const res = toUnoCSS(declaration)
              if (res) {
                removeCSS.push({ className: value, key, val })
                ret.push(res)
              }
            })
            if (ret.length) {
              const replaceRet = replaceShortcuts(ret)
              n.replaceBy(`'${value} ${replaceRet.join(' ')}'`)
            }
          }
        })

        const nodeContent = node.match[1][0].node
        Object.assign(nodeContent, {
          content: JSON.parse(newContentAst.generate())
            .join(' ')
            .replaceAll(/\'/g, ''),
        })
      }
    })

  for (const task of unique(removeCSS)) {
    css = await processCss(css, task.className, task.key, task.val)
  }
  const cssCode = postcss()
    .use((root: postcss.Root) => {
      root.walkRules((rule) => {
        if (rule.nodes.length === 0) {
          rule.remove() // 删除空的规则
        }
      })
    })
    .process(css, { from: undefined })
    .toString()
  ;(ast as any).rootNode.node.styles[0].content = `\n${cssCode}\n`
  const vueCode = ast.generate({ isPretty: true })
  const prettierVueCode = synchronizedPrettier.format(vueCode, {
    parser: 'vue',
    semi: false,
    tabWidth: 2,
    singleQuote: true,
    htmlWhitespaceSensitivity: 'ignore',
  })
  return prettierVueCode
}
