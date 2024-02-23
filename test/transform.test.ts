import { test, expect } from 'vitest'
import { transform } from '../src/index'
import fs from 'fs'

test('transform-class', async () => {
  const beforeCode = fs.readFileSync('test/before.vue', 'utf-8')
  const afterCode = fs.readFileSync('test/after.vue', 'utf-8')
  expect(await transform(beforeCode)).toBe(afterCode)
})
