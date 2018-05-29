import { newException } from 'moltres-utils'
import { isNil } from 'ramda'

const validate = async (context) => {
  if (isNil(context.graph)) {
    throw newException(`Could not find a project or a module at the path ${context.cwd}`)
  }
}

export default validate
