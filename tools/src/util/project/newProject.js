import { pick } from 'moltres-utils'

const newProject = (props) => ({
  ...pick(['dependsOn', 'modules', 'name', 'path', 'projects', 'scripts', 'version'], props),
  type: 'project'
})

export default newProject
