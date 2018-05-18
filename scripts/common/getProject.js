const { merge } = require('ramda')
const loadPackageJson = require('./loadPackageJson')

const getProject = (projectPath) => {
  const packageData = loadPackageJson(projectPath)
  return merge(packageData, {
    path: projectPath
  })
}

module.exports = getProject
