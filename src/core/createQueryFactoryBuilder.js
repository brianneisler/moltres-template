import { ImmutableMap, assoc, createSelector, getProp, isFunction } from '../utils/data'
import { invariant } from '../utils/lang'
import createQueryFactory from './createQueryFactory'

const createQueryFactoryBuilder = ({ createQuery, enhancer, factory }) => {
  invariant(isFunction(createQuery), 'createQuery must be a defined Function')
  invariant(isFunction(enhancer) || !enhancer, 'createQuery must be a Function or undefined')
  invariant(isFunction(factory), 'factory must be a defined Function')

  let queryFactories = ImmutableMap({})

  return ({ queryExtensions = {}, queryOptions = {}, statePath }) => {
    if (!statePath) {
      throw new Error('statePath must be defined')
    }
    const factoryKey = `key:${statePath}${queryOptions.cursor ? ':' + queryOptions.cursor.id : ''}${
      queryOptions.head ? ':head' : ''
    }`
    let queryFactory = getProp(factoryKey, queryFactories)
    if (!queryFactory) {
      queryFactory = createQueryFactory({
        createQuery,
        enhancer,
        factory,
        queryExtensions,
        queryOptions,
        selector: createSelector('$'),
        statePath
      })
      queryFactories = assoc(factoryKey, queryFactory, queryFactories)
    }

    return queryFactory
  }
}

export default createQueryFactoryBuilder
