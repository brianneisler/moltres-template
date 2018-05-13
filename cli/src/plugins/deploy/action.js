import { deploy } from 'moltres-tools'
import { path } from 'ramda'

const action = async (instance, args, context) =>
  await deploy(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )

export default action
