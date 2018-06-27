import { prop } from 'moltres-utils'
import clean from '../../clean'

const action = async (instance, args, context) => clean(prop('options', args), context)

export default action
