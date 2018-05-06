import { cleanProject, cleanseProject, createContext, getProject } from './util'

const cleanse = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  await cleanProject(project, context)
  return cleanseProject(project, context)
}

export default cleanse
