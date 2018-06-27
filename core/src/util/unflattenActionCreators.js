import { isEmpty } from 'moltres-utils'
import { DEFAULT_NAMESPACE } from '../constants'
import camelCaseAction from './camelCaseAction'

const unflattenActionCreators = (
  flatActionCreators,
  { namespace = DEFAULT_NAMESPACE, prefix } = {}
) => {
  function unflatten(
    flatActionType,
    partialNestedActionCreators = {},
    partialFlatActionTypePath = []
  ) {
    const nextNamespace = camelCaseAction(partialFlatActionTypePath.shift())
    if (isEmpty(partialFlatActionTypePath)) {
      partialNestedActionCreators[nextNamespace] = flatActionCreators[flatActionType]
    } else {
      if (!partialNestedActionCreators[nextNamespace]) {
        partialNestedActionCreators[nextNamespace] = {}
      }
      unflatten(
        flatActionType,
        partialNestedActionCreators[nextNamespace],
        partialFlatActionTypePath
      )
    }
  }

  const nestedActionCreators = {}
  Object.getOwnPropertyNames(flatActionCreators).forEach((type) => {
    const unprefixedType = prefix ? type.replace(`${prefix}${namespace}`, '') : type
    return unflatten(type, nestedActionCreators, unprefixedType.split(namespace))
  })

  return nestedActionCreators
}

export default unflattenActionCreators
