const { merge } = require('ramda')

const getProject = (data) => {
  const packageData = loadPackageJson(data.path)
  return merge(packageData, data)
}

module.exports = getProject
