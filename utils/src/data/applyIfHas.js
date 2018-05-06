import { curry, has, is } from 'ramda'

const applyIfHas = curry((prop, fn, value) => {
  if (has(prop, value)) {
    return fn(value)
  }
  return value
})

export default applyIfHas
