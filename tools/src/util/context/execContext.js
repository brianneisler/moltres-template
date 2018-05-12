import { execGraph } from 'moltres-utils'

const execContext = async (fn, context) =>
  execGraph(
    async (value) => fn(value, context),
    context.graph
  )

export default execContext
