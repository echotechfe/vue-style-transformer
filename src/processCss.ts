import postcss from 'postcss'

const removeDeclarationFromClass = (
  className: string,
  declarationProperty: string,
  declarationValue: string
) => ({
  postcssPlugin: 'remove-declaration-from-class',
  Once(root: postcss.Root) {
    const regex = new RegExp(`\\.${className}(\\s*\\{|\\s*$|\\s*,)`)
    root.walkRules(regex, (rule) => {
      rule.walkDecls(declarationProperty, (decl) => {
        if (decl.value === declarationValue) {
          decl.remove()
        }
      })
    })
  },
})

removeDeclarationFromClass.postcss = true

export async function processCss(
  cssString: string,
  className: string,
  declarationProperty: string,
  declarationValue: string
): Promise<string> {
  const result = await postcss([
    removeDeclarationFromClass(
      className,
      declarationProperty,
      declarationValue
    ),
  ]).process(cssString, { from: undefined })
  return result.css
}
