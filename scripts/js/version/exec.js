import execProjectsSeries from '../common/execProjectsSeries'
import getProjects from '../common/getProjects'
import run from '../common/run'

const exec = async () => {
  const versionType = process.argv[2]
  const projects = getProjects()
  return execProjectsSeries([
    `npm run version:${versionType}`
  ], projects)
}

run(exec)
