const { join, resolve } = require('path')
const { map }

const ROOT_PATH = resolve(__dirname, '..', '..')

// NOTE BRN: These are in order of dependency, items later in the list depend on the earlier
const PROJECTS = [
  { name: 'utils', path: join(ROOT_PATH, 'utils') },
  { name: 'test', path: join(ROOT_PATH, 'test') },
  { name: 'core', path: join(ROOT_PATH, 'core') },
  { name: 'tools', path: join(ROOT_PATH, 'tools') },
  { name: 'cli', path: join(ROOT_PATH, 'cli') },
  { name: 'modules', path: join(ROOT_PATH, 'modules') }
]

const getProjects = () => map(getProject, PROJECTS)

module.exports = getProjects
