import { pick } from 'ramda'

const newContext = (props) => {
  const context = pick([
    'cwd',
    'env',
    'graph',
    'logger',
    'plugins',
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
