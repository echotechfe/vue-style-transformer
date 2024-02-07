import { test, expect } from 'vitest'
import { line } from '../src/transformer/line'

test('line-height', () => {
  expect(line('line-height', '10px')).toBe('lh-10px')
  expect(line('line-height', '10rpx')).toBe('lh-10rpx')
})
