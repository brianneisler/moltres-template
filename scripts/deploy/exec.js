const execProjectsSeries = require('../common/execProjectsSeries')
const getProjects = require('../common/getProjects')
const run = require('../common/run')

const exec = async () => {
  dotenv.config()
  const projects = getProjects()
  return execProjectsSeries([
    'npm run deploy'
  ], projects)
}

run(exec)
