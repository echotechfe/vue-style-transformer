import { test, expect } from 'vitest'
import { border } from '../src/transformer/border'

test('border-radius', () => {
  expect(border('border-radius', '10px')).toBe('rd-10px')
  expect(border('border-radius', '10rpx')).toBe('rd-10rpx')
  expect(border('border-radius', '10rpx 8rpx')).toBe(
    'rd-tl-10rpx rd-tr-8rpx rd-br-10rpx rd-bl-8rpx'
  )
  expect(border('border-radius', '10rpx 8rpx 6rpx')).toBe(
    'rd-tl-10rpx rd-tr-8rpx rd-br-6rpx rd-bl-8rpx'
  )
  expect(border('border-radius', '10rpx 8rpx 6rpx 4rpx')).toBe(
    'rd-tl-10rpx rd-tr-8rpx rd-br-6rpx rd-bl-4rpx'
  )
  expect(border('border-radius', '30rpx 30rpx 0 0')).toBe('rd-t-30rpx')
  expect(border('border-radius', '0 0 30rpx 30rpx')).toBe('rd-b-30rpx')
  expect(border('border-radius', '10rpx 10rpx 30rpx 30rpx')).toBe(
    'rd-t-10rpx rd-b-30rpx'
  )
  expect(border('border-radius', '30rpx 0 0 30rpx')).toBe('rd-l-30rpx')
  expect(border('border-radius', '0 30rpx 30rpx 0')).toBe('rd-r-30rpx')
  expect(border('border-radius', '10rpx 30rpx 30rpx 10rpx')).toBe(
    'rd-l-10rpx rd-r-30rpx'
  )
  expect(border('border-bottom-radius', '10rpx')).toBe('rd-b-10rpx')
  expect(border('border-top-left-radius', '10rpx')).toBe('rd-tl-10rpx')
})
