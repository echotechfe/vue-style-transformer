import { compilerCss } from './compilerCss'
import { prettierCode } from './prettierCode'
import $ from 'gogocode'
import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
import postcss from 'postcss'

async function transform(code: string) {
  const {
    descriptor: { styles },
    errors,
  } = parse(code)
  if (errors.length) return code

  const { content: style } = styles[0]
  const css = await compilerCss(style)
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

  ast
    .find('<template></template>')
    .find([`<$_$ :class="$_$1" $$$0>$$$1</$_$>`, `<$_$ :class="$_$1" $$$0/>`])
    .each((node) => {
      // find <div :class="">xxx</div> or <div :class=""/> and replace
      const newContent = $(node.match[1][0].value)
        .find(`{$_$:$_$1}`)
        .each((n) => {
          n.match[0].forEach(({ value }) => {
            if (classNames.includes(value)) {
              console.log('class value', value)

              const rules: any[] = []

              postcss.parse(css).walkRules(`.${value}`, (rule) => {
                rule.each((e) => {
                  const value = e.toString()
                  rules.push(value)
                })
              })

              const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/
              rules.map((rule) => {
                const match = css.match(splitReg)
                if (!match) return
                const [_, key, val] = match
                console.log('match', match)
              })

              const ret = []

              n.replace(`{'${value}': $_$,$$$}`, `{'${value}': $_$,$$$}`)
            }
          })
        })
    })
}

fs.readFile('./src/index.vue', 'utf-8', async (err, data) => {
  if (err) {
    throw err
  }
  await transform(data)
})
