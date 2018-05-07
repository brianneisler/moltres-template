import { pick } from 'ramda'

const newModule = (props) => pick([
  'name',
  'path'
], props)

export default newModule
