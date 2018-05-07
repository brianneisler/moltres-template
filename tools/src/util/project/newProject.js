import { pick } from 'ramda'

const newProject = (def) => pick([
  'modules',
  'name',
  'path',
  'projects',
  'scripts',
  'version'
], def)

export default newProject
