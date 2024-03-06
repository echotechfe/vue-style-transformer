export function splitClassNamesString(classNamesString: string) {
  return classNamesString
    .split(' ')
    .map((i) => i.trim())
    .filter((i) => i)
}
