import { has } from 'ramda'

const validate = async (context) => {
  if (!has('graph', context)) {
    throw new Error(`Could not find a project or a module at the path ${cwd}`)
  }
}

export default validate
