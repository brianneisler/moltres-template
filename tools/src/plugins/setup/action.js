import { prop } from 'moltres-utils'
import setup from '../../setup'

const action = async (instance, args, context) =>
  setup(prop('options', args), context)

export default action
