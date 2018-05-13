import { path } from 'ramda'
import build from '../../build'

const action = async (instance, args, context) =>
  build(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )


export default action
