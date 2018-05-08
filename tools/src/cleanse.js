import createContext from './createContext'
import { cleanProject, cleanseProject } from './util'

const cleanse = async (options, context = createContext(options)) => {
  await cleanProject(context.project, context)
  return cleanseProject(context.project, context)
}

export default cleanse
