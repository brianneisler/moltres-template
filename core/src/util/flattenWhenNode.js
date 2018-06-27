import { forEach, get, keys } from 'moltres-utils'
import { DEFAULT_NAMESPACE, ACTION_TYPE_DELIMITER } from '../constants'

const flattenWhenNode = (predicate) => {
  const flatten = (
    map,
    { namespace = DEFAULT_NAMESPACE, prefix } = {},
    partialFlatMap = {},
    partialFlatActionType = ''
  ) => {
    function connectNamespace(type) {
      if (!partialFlatActionType) {
        return type
      }
      const types = type.toString().split(ACTION_TYPE_DELIMITER)
      const partials = partialFlatActionType.split(ACTION_TYPE_DELIMITER)
      return []
        .concat(...partials.map((partial) => types.map((t) => `${partial}${namespace}${t}`)))
        .join(ACTION_TYPE_DELIMITER)
    }

    function connectPrefix(type) {
      if (partialFlatActionType || !prefix) {
        return type
      }

      return `${prefix}${namespace}${type}`
    }

    forEach((type) => {
      const nextNamespace = connectPrefix(connectNamespace(type))
      const mapValue = get(type, map)

      if (predicate(mapValue)) {
        flatten(mapValue, { namespace, prefix }, partialFlatMap, nextNamespace)
      } else {
        partialFlatMap[nextNamespace] = mapValue
      }
    }, keys(map))

    return partialFlatMap
  }
  return flatten
}

export default flattenWhenNode
