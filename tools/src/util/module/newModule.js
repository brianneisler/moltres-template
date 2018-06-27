import { pick } from 'moltres-utils'

const newModule = (props) => ({
  ...pick(['dependsOn', 'modulesDir', 'name', 'path'], props),
  type: 'module'
})

export default newModule
