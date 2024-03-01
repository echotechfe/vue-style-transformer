import { test, expect } from 'vitest'
import { toUnoCSS } from '../src/transformer/index'

test('toUnoCSS', () => {
  expect(toUnoCSS('color: var(--du-primary-solidBg, #7C66FF)')).toBe('c-primary-solid-bg')
  expect(toUnoCSS('background: var(---bg_primary, #F2F0FF);')).toBe('bg-purple-1')
})
