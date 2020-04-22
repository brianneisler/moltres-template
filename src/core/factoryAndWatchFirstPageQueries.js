import { all, call, invariant } from '../utils/lang'
import { isFunction, isNumber, isObject, isString } from '../utils/data'
import factoryAndWatchHeadQuery from './factoryAndWatchHeadQuery'
import factoryAndWatchPageQuery from './factoryAndWatchPageQuery'

const factoryAndWatchFirstPageQueries = function* ({
  buildQueryFactory,
  context,
  cursor,
  initialState,
  pageSize,
  queryKey
}) {
  invariant(isFunction(buildQueryFactory), 'buildQueryFactory must be a defined Function')
  invariant(isObject(context), 'context must be a defined Object')
  invariant(isObject(cursor), 'cursor must be a defined Object')
  invariant(isObject(initialState) || !initialState, 'initialState must be an Object or undefined')
  invariant(isNumber(pageSize), 'pageSize must be a Number')
  invariant(isString(queryKey), 'queryKey must be a String')

  return yield all([
    call(factoryAndWatchHeadQuery, { buildQueryFactory, context, cursor, initialState, queryKey }),
    call(factoryAndWatchPageQuery, {
      buildQueryFactory,
      context,
      cursor,
      initialState,
      pageSize,
      queryKey
    })
  ])
}

export default factoryAndWatchFirstPageQueries
