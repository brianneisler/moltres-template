import { prop } from 'moltres-utils'
import build from '../../build'

const action = async (instance, args, context) =>
  build(prop('options', args), context)

export default action
