const { is, map } = require('ramda')
const sortKeysWith = require('./sortKeysWith')

const sortKeysDeepWith = (sorter, value) => {
  if (Array.isArray(value)) {
    return map(
      (childValue) => sortKeysDeepWith(sorter, childValue),
      value
    )
  }
  if (is(Object, value)) {
    value = map(
      (childValue) => sortKeysDeepWith(sorter, childValue),
      value
    )
    value = sortKeysWith(sorter, value)
  }
  return value
}

module.exports = sortKeysDeepWith
