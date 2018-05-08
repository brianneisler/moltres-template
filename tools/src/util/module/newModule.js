import { pick } from 'ramda'

const newModule = (props) => pick([
  'modulesDir',
  'name',
  'path'
], props)

export default newModule
