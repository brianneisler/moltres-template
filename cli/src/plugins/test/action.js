import { test } from 'moltres-tools'

const action = async (instance, args, context) =>
  test(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )

export default action