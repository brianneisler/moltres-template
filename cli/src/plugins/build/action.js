import { build } from 'moltres-tools'
import { path } from 'ramda'

const action = async (instance, args, context) =>
  build(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )


export default action
