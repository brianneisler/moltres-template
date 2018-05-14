import { prop } from 'ramda'
import run from '../../run'

const action = async (instance, args, context) =>
  run(prop('options', args), context)

export default action
