import { curryN, nAry } from 'ramda'

const weakMemoizeWith = curryN(2, (mFn, fn) => {
  const cache = new WeakMap()
  return nAry(fn.length, (...args) => {
    const key = mFn(...args)
    if (!cache.has(key)) {
      const result = fn(...args)
      cache.set(key, result)
      return result
    }
    return cache.get(key)
  })
})

export default weakMemoizeWith
