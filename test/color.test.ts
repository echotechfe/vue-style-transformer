import { test, expect } from 'vitest'
import { color } from '../src/transformer/color'

test('color', () => {
  expect(color('color', '#7C66FF')).toBe('c-purple-5')
  expect(color('color', 'var(--du-primary-solidBg)')).toBe('c-primary-solid-bg')
  expect(color('color', 'var(--text-primary)')).toBe(undefined)
  expect(color('color', 'var(--c-neutral-9)')).toBe(undefined)
  expect(color('color', 'var(--du-primary-solid-bg)')).toBe('c-primary-solid-bg')
  expect(color('color', 'var(--du-primary-soft-bg)')).toBe('c-primary-soft-bg')
  expect(color('color', 'var(--du-primary-solid-bg, #7C66FF)')).toBe('c-primary-solid-bg')
})
