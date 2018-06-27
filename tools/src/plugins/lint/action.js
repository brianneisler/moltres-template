import { prop } from 'moltres-utils'
import lint from '../../lint'

const action = async (instance, args, context) => lint(prop('options', args), context)

export default action
