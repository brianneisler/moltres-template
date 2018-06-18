import { isPlainObject } from 'moltres-utils'
import flattenWhenNode from './flattenWhenNode'

const flattenActionMap = flattenWhenNode(isPlainObject)

export default flattenActionMap
