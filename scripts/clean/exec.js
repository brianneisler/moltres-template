const execProjectsSeries = require('../common/execProjectsSeries')
const getProjects = require('../common/getProjects')
const run = require('../common/run')

const exec = async () => {
  const projects = getProjects()
  return execProjectsSeries([
    'npm run clean'
  ], projects)
}

run(exec)
