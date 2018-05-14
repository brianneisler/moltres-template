import { prop } from 'ramda'
import lint from '../../lint'

const action = async (instance, args, context) =>
  lint(prop('options', args), context)

export default action
