import { path } from 'ramda'
import deploy from '../../deploy'

const action = async (instance, args, context) =>
  await deploy(
    { stage: path([ 'options', 'stage' ], args) },
    context
  )

export default action
