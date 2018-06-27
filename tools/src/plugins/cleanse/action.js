import { prop } from 'moltres-utils'
import cleanse from '../../cleanse'

const action = async (instance, args, context) => cleanse(prop('options', args), context)

export default action
