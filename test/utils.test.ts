import { test, expect } from 'vitest'
import { isRgb } from '../src/transformer/utils'

test('isRgb', () => {
  expect(isRgb('rgb(0, 0, 0)')).toBe(true)
  expect(isRgb('rgba(0, 0, 0, 0)')).toBe(true)
})
