import { pick } from 'ramda'

const newModule = (def) => pick([
  'name',
  'path'
], def)

export default newModule
