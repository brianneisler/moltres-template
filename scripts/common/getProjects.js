import { join, resolve } from 'path'
import { map } from 'ramda'
import getProject from './getProject'

const ROOT_PATH = resolve(__dirname, '..', '..')

// NOTE BRN: These are in order of dependency, items later in the list depend on the earlier
const PROJECTS = [
  join(ROOT_PATH, 'utils'),
  join(ROOT_PATH, 'test'),
  join(ROOT_PATH, 'core'),
  join(ROOT_PATH, 'react'),
  join(ROOT_PATH, 'functions'),
  join(ROOT_PATH, 'tools'),
  join(ROOT_PATH, 'cli'),
  join(ROOT_PATH, 'modules')
]

const getProjects = () => map(getProject, PROJECTS)

export default getProjects
