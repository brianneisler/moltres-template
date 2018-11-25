const { keys, pick, sort } = require('ramda')

const sortKeysWith = (sorter, obj) => pick(
  sort(
    sorter,
    keys(obj)
  ),
  obj
)

module.exports = sortKeysWith
