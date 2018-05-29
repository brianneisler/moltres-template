const { pick } = require('ramda')

const newModule = (props) => ({
  ...pick([
    'dependsOn',
    'modulesDir',
    'name',
    'path'
  ], props),
  type: 'module'
})

module.exports = newModule
