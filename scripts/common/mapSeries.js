const { append, curry, reduce } = require('ramda')

const mapSeries = curry(async (fn, data) => reduce(
  async (promise, value) => {
    const accum = await promise
    const result = await fn(value)
    return append(result, accum)
  },
  Promise.resolve([]),
  data
))

module.exports = mapSeries
