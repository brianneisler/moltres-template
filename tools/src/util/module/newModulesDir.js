import { pick } from 'moltres-utils'

const newModulesDir = (props) => ({
  ...pick(['path'], props),
  type: 'modulesDir'
})

export default newModulesDir
