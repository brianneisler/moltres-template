import { test } from 'moltres-tools'
import { path } from 'ramda'

const action = async (instance, args, context) =>
  test(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )

export default action
