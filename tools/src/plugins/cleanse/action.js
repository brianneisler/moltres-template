import { prop } from 'ramda'
import cleanse from '../../cleanse'

const action = async (instance, args, context) =>
  cleanse(prop('options', args), context)


export default action
