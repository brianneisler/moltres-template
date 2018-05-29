import { isNil, prop } from 'ramda'

const validate = async (context) => {
  if (isNil(prop('graph', context))) {
    throw new Error(`Could not find a project or a module at the path ${cwd}`)
  }
}

export default validate
