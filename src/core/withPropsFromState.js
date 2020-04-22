import {
  assocMerge,
  assocProp,
  containsWildcard,
  createPropStore,
  getProp,
  identity,
  keys,
  reduce,
  replaceWildcards,
  selectWildcards
} from '../utils/data'
import { call, select, spawn, takeEvery } from 'redux-saga/effects'
import createFactory from './createFactory'

function* takeEveryState(propStore, propsBuilder) {
  const pickState = function* () {
    const state = yield select(identity)
    const stateProps = propsBuilder(state)
    propStore.put({
      type: 'set',
      value: stateProps
    })
  }

  yield call(pickState)
  yield takeEvery('*', pickState)
}

const assocWildProp = (selector, value, collection, props) =>
  reduce(
    (accum, wildcardValues) => {
      const resolvedSelector = replaceWildcards(wildcardValues, selector)
      return assocProp(resolvedSelector, value, accum)
    },
    collection,
    selectWildcards(selector, props)
  )

const mergeProps = (stateProps, props) => {
  const selectors = keys(stateProps)
  const resolvedStateProps = reduce(
    (accum, selector) => {
      if (containsWildcard(selector)) {
        return assocWildProp(selector, getProp(selector, stateProps), accum, props)
      }
      return assocProp(selector, getProp(selector, stateProps), accum)
    },
    {},
    selectors
  )

  return assocMerge(resolvedStateProps, props)
}

const withPropsFromState = (propsBuilder) => (baseFactory) => {
  let propStore = null
  let first
  return createFactory(function* (props, channel, ...rest) {
    if (!propStore) {
      propStore = createPropStore(channel)
      first = true
      const task = yield spawn(takeEveryState, propStore, propsBuilder)

      // NOTE BRN: If this factory has a channel then notify the channel of the
      // task so that it's cleaned up at the end.
      if (channel) {
        channel.put({
          payload: { task },
          type: 'add_task'
        })
      }
    }
    if (first) {
      first = false
      yield propStore.take()
    }

    return yield call(baseFactory, mergeProps(propStore.getProps(), props), channel, ...rest)
  })
}

export default withPropsFromState
