import { prop } from 'ramda'
import clean from '../../clean'

const action = async (instance, args, context) =>
  clean(prop('options', args), context)

export default action
