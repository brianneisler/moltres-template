import { pick } from 'moltres-utils'

const newPlugin = (props) => ({
  ...pick([
    'code',
    'command',
    'description',
    'name',
    'options',
    'path',
    'plugin',
    'version'
  ], props),
  type: 'plugin'
})

export default newPlugin
