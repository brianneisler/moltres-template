import { deploy } from 'moltres-tools'

const action = async (instance, args, context) =>
  await deploy(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )

export default action
