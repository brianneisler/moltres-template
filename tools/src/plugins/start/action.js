import { prop } from 'ramda'
import start from '../../start'

const action = async (instance, args, context) =>
  start(prop('options', args), context)

export default action
