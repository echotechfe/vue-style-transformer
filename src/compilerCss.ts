import * as sass from 'sass'

export async function sassCompiler(css: string) {
  let result = css
  try {
    result = sass.compileString(css).css
  } catch (err) {}
  return result
}

export function compilerCss(css: string) {
  return sassCompiler(css)
}
