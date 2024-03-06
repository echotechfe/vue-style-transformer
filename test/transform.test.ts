import { test, expect } from 'vitest'
import { transform } from '../src/index'
import fs from 'fs'
import { globSync } from 'glob'

test('transform-class', async () => {
  await Promise.all(
    globSync('./test/sfc/*.vue').map(async (i) => {
      const beforeCode = fs.readFileSync(i, 'utf-8')
      const afterCode = fs.readFileSync(i.replace('sfc', '_sfc'), 'utf-8')
      expect(await transform(beforeCode)).toBe(afterCode)
    }),
  )
})
