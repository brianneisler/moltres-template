import { isGenerator, isMap, isPlainObject } from 'moltres-utils'
import flattenWhenNode from './flattenWhenNode'

const flattenReducerMap = flattenWhenNode(
  (node) => (isPlainObject(node) || isMap(node)) && !isGenerator(node)
)

export default flattenReducerMap
