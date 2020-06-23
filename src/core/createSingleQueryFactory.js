import {
  assocPath,
  canBeSelector,
  createPropStore,
  equals,
  invariant,
  isFunction,
  isNull,
  isObject,
  isString,
  select
} from '../utils/lang'
import createFactory from './createFactory'
import isQuery from './isQuery'
import monitorQuery from './monitorQuery'

const createSingleQueryFactory = ({
  baseFactory,
  createQuery,
  queryExtensions,
  queryOptions,
  selector,
  statePath
}) => {
  invariant(isFunction(baseFactory), 'baseFactory must be a defined Function')
  invariant(isFunction(createQuery), 'createQuery must be a defined Function')
  invariant(
    isObject(queryExtensions),
    'queryExtensions must be a defined Object'
  )
  invariant(isObject(queryOptions), 'queryOptions must be a defined Object')
  invariant(
    canBeSelector(selector),
    'selector must be a coercable to a Selector'
  )
  invariant(isString(statePath), 'statePath must be a defined String')

  let query = null
  let queryTask = null
  let selectedProps = null
  let propStore = null
  let first

  return createFactory(function* (props, channel, context, ...rest) {
    if (!propStore) {
      propStore = createPropStore(channel)
      first = true
    }
    const nextSelectedProps = select(selector, props)
    if (!equals(nextSelectedProps, selectedProps)) {
      selectedProps = nextSelectedProps
      const nextQuery = yield call(
        createQuery,
        context,
        nextSelectedProps,
        queryOptions
      )
      invariant(
        isQuery(nextQuery) || isNull(nextQuery),
        'nextQuery must be a Query or null'
      )
      let nextQueryTask = null
      if (nextQuery !== query || first) {
        if (nextQuery) {
          nextQueryTask = yield call(monitorQuery, {
            propStore,
            query: nextQuery,
            queryExtensions
          })
          channel.put({
            payload: { task: nextQueryTask },
            type: 'add_task'
          })
        } else {
          propStore.put({
            type: 'set',
            value: {}
          })
        }

        if (queryTask) {
          channel.put({
            payload: { task: queryTask },
            type: 'remove_task'
          })
        }
        query = nextQuery
        queryTask = nextQueryTask
      }
      // TODO BRN: If we're performing a one time query, then wait for the
      // results and then cancel the active query here

      // NOTE BRN: Wait for the first properties to arrive into the
      // queryPropStore
      if (first) {
        first = false
        yield propStore.take()
      }
    }
    return yield call(
      baseFactory,
      // TODO BRN: This seems like it will cause the props to be a different
      // object every time. This could have adverse affects on caching...
      assocPath(statePath, propStore.getProps(), props),
      channel,
      context,
      ...rest
    )
  })
}

export default createSingleQueryFactory
