import { append, curry, reduce } from 'ramda'

const mapSeries = curry(async (fn, data) => reduce(
  async (promise, value) => {
    const accum = await promise
    const result = await fn(value)
    return append(result, accum)
  },
  Promise.resolve([]),
  data
))

export default mapSeries
