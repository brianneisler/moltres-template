import { Delimiter, Namespace } from './constants'
import forEach from '../lang/forEach'
import getProp from '../lang/getProp'
import keys from '../lang/keys'

const flattenWhenNode = (predicate) => {
  const flatten = (
    map,
    { namespace = Namespace.DEFAULT, prefix } = {},
    partialFlatMap = {},
    partialFlatActionType = ''
  ) => {
    function connectNamespace(type) {
      if (!partialFlatActionType) {
        return type
      }
      const types = type.toString().split(Delimiter.ACTION_TYPE)
      const partials = partialFlatActionType.split(Delimiter.ACTION_TYPE)
      return []
        .concat(
          ...partials.map((partial) =>
            types.map((t) => `${partial}${namespace}${t}`)
          )
        )
        .join(Delimiter.ACTION_TYPE)
    }

    function connectPrefix(type) {
      if (partialFlatActionType || !prefix) {
        return type
      }

      return `${prefix}${namespace}${type}`
    }

    forEach((type) => {
      const nextNamespace = connectPrefix(connectNamespace(type))
      const mapValue = getProp(type, map)

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
