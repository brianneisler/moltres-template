import { isGenerator, isMap, isPlainObject } from '../data'
import flattenWhenNode from './flattenWhenNode'

const flattenReducerMap = flattenWhenNode(
  (node) => (isPlainObject(node) || isMap(node)) && !isGenerator(node)
)

export default flattenReducerMap
