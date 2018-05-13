import { pick } from 'ramda'

const newProject = (props) => ({
  ...pick([
    'dependsOn',
    'modules',
    'name',
    'path',
    'projects',
    'scripts',
    'version'
  ], props),
  type: 'project'
})

export default newProject
