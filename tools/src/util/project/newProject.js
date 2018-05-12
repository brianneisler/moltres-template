import { pick } from 'ramda'

const newProject = (props) => pick([
  'dependsOn',
  'modules',
  'name',
  'path',
  'projects',
  'scripts',
  'version'
], props)

export default newProject
