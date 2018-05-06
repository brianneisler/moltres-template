import { createContext, getProject, testProject } from './util'

const test = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  return testProject(project, context)
}

export default test
