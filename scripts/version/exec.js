const execProjectsSeries = require('../common/execProjectsSeries')
const getProjects = require('../common/getProjects')
const run = require('../common/run')

const exec = async () => {
  const versionType = process.argv[2]
  const projects = getProjects()
  return execProjectsSeries([
    `npm run version:${versionType}`
  ], projects)
}

run(exec)
