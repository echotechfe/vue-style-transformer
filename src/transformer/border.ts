import { getLastProperty, transformImportant } from './utils'

export function border(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'border-radius') {
    // border-radius: 0 20rpx 20rpx 0;
    if (value.includes(' ')) {
      // todo
      return
    }
    return `rd-${value}${important}`
  }
}
