import {
  compose,
  containsWildcard,
  invariant,
  isFunction,
  isObject,
  isSelector,
  isString
} from '../utils/lang'
import createSingleQueryFactory from './createSingleQueryFactory'
import createWildcardQueryFactory from './createWildcardQueryFactory'

const createQueryFactory = ({
  createQuery,
  enhancer,
  factory,
  queryExtensions = {},
  queryOptions = {},
  selector,
  statePath
}) => {
  invariant(isFunction(createQuery), 'createQuery must be a defined Function')
  invariant(
    isFunction(enhancer) || !enhancer,
    'enhancer must be a Function or undefined'
  )
  invariant(
    isFunction(factory) || !factory,
    'factory must be a Function or undefined'
  )
  invariant(
    isObject(queryExtensions),
    'queryExtensions must be a defined Object'
  )
  invariant(isObject(queryOptions), 'queryOptions must be a defined Object')
  invariant(isSelector(selector), 'selector must be a defined Selector')
  invariant(isString(statePath), 'queryKey must be a String')

  const methods = [
    (baseFactory) => {
      if (containsWildcard(statePath)) {
        return createWildcardQueryFactory({
          baseFactory,
          createQuery,
          queryExtensions,
          queryOptions,
          selector,
          statePath
        })
      }
      return createSingleQueryFactory({
        baseFactory,
        createQuery,
        queryExtensions,
        queryOptions,
        selector,
        statePath
      })
    }
  ]
  if (enhancer) {
    methods.push((baseFactory) => {
      const enhanceQuery = enhancer(statePath)
      return enhanceQuery(baseFactory)
    })
  }
  const enhance = compose(...methods)
  if (factory) {
    return enhance(factory)
  }
  return enhance
}

export default createQueryFactory
