import { path } from 'ramda'
import test from '../../test'

const action = async (instance, args, context) =>
  test(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )

export default action
