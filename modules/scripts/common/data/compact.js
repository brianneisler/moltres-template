const { isNil, reject } = require('ramda')

const compact = reject(isNil)

module.exports = compact
