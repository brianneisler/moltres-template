const { join, resolve } = require('path')
const { map } = require('ramda')
const getProject = require('./getProject')

const ROOT_PATH = resolve(__dirname, '..', '..')

// NOTE BRN: These are in order of dependency, items later in the list depend on the earlier
const PROJECTS = [
  join(ROOT_PATH, 'utils'),
  join(ROOT_PATH, 'test'),
  join(ROOT_PATH, 'core'),
  join(ROOT_PATH, 'tools'),
  join(ROOT_PATH, 'cli'),
  join(ROOT_PATH, 'modules')
]

const getProjects = () => map(getProject, PROJECTS)

module.exports = getProjects
