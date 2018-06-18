import { isNil } from 'moltres-utils'

const validate = async (context) => {
  if (isNil(context.graph)) {
    throw new Error(`Could not find a project or a module at the path ${context.cwd}`)
  }
}

export default validate
