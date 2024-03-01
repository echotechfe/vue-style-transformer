import { test, expect } from 'vitest'
import { toUnoCSS } from '../src/transformer/index'

test('toUnoCSS', () => {
  expect(toUnoCSS('color: var(--du-primary-solidBg, #7C66FF)')).toBe('c-primary-solid-bg')
})
