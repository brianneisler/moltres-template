import { prop } from 'ramda'
import test from '../../test'

const action = async (instance, args, context) =>
  test(prop('options', args), context)

export default action