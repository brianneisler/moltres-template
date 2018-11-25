import execProjectsSeries from '../common/execProjectsSeries'
import getProjects from '../common/getProjects'
import run from '../common/run'

console.log('process.argv:', process.argv)

const exec = async () => {
  const projects = getProjects()
  return execProjectsSeries([
    'npm run clean'
  ], projects)
}

run(exec)
