import { prop } from 'ramda'
import setup from '../../setup'

const action = async (instance, args, context) =>
  setup(prop('options', args), context)

export default action
