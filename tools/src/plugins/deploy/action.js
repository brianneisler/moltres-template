import { prop } from 'ramda'
import deploy from '../../deploy'

const action = async (instance, args, context) =>
  deploy(prop('options', args), context)

export default action
