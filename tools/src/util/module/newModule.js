import { pick } from 'ramda'

const newModule = (props) => ({
  ...pick([
    'modulesDir',
    'name',
    'path'
  ], props),
  type: 'module'
})

export default newModule
