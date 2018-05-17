const getProjects = require('../common/getProjects')
const run = require('../common/run')

const exec = async () => {
  const projects = getProjects()
  return execProjects([
    'npm run clean'
  ], projects)
}

run(exec)
