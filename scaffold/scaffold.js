const { propOr } = require('ramda')
const generator = require('./generator')
const { loadScaffold } = require('./utils')

const scaffold = (options = {}) => {
  const cwd = propOr(process.cwd(), 'cwd', options)
  const scaf = loadScaffold(cwd)

  console.log('scaf:', scaf)
  return generator(scaf, { cwd })
}

module.exports = scaffold