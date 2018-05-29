const { curry, map } = require('ramda')

const mapAll = curry(async (fn, data) => Promise.all(map(
  fn,
  data
)))

module.exports = mapAll
