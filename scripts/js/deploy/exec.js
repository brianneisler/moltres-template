import execProjectsSeries from '../common/execProjectsSeries'
import getProjects from '../common/getProjects'
import run from '../common/run'

const exec = async () => {
  const projects = getProjects()
  return execProjectsSeries([
    'npm run deploy'
  ], projects)
}

run(exec)
