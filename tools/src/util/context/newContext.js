import { pick } from 'ramda'

const newContext = (props) => {
  const context = pick([
    'cwd',
    'graph',
    'logger',
    'plugins',
    'project',
    'stage'
  ], props)

  return {
    ...context,
    merge: (value) => newContext({
      ...context,
      ...value
    })
  }
}

export default newContext
