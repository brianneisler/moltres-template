import { prop } from 'moltres-utils'
import deploy from '../../deploy'

const action = async (instance, args, context) =>
  deploy(prop('options', args), context)

export default action
