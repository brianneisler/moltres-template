import { merge } from 'ramda'
import loadPackageJson from './loadPackageJson'

const getProject = (projectPath) => {
  const packageData = loadPackageJson(projectPath)
  return merge(packageData, {
    path: projectPath
  })
}

export default getProject
