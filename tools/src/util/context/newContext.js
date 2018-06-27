import { pick } from 'moltres-utils'

const newContext = (props) => {
  const context = pick(['cwd', 'env', 'graph', 'logger', 'plugins', 'stage'], props)

  return {
    ...context,
    merge: (value) =>
      newContext({
        ...context,
        ...value
      })
  }
}

export default newContext
