const { join } = require('path')
const { has, mergeDeepRight, prop } = require('ramda')
const requireScaffold = require('./requireScaffold')
const registry = require('../scaffolds')

const CONFIG_FILE = 'scaffold.js'

const loadScaffold = (query) => {
  let scaffoldMeta
  if (has(query, registry)) {
    scaffoldMeta = prop(query, registry)
  } else {
    scaffoldMeta = requireScaffold(join(query, CONFIG_FILE))
  }
  let parentMeta = {}
  if (has('extends', scaffoldMeta)) {
    parentMeta = loadScaffold(scaffoldMeta.extends)
  }
  return mergeDeepRight(parentMeta, scaffoldMeta)
}

module.exports = loadScaffold
