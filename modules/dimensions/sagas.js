import { Dimensions } from 'react-native'
import { eventChannel } from 'redux-saga'
import { all, call, put, spawn } from 'redux-saga/effects'
import { dimensionsChanged } from './actions'
import watchChannel from '../../util/watchChannel'


export function* setupDimensions() {
  return yield all([
    spawn(monitorDimensions)
  ])
}

function* monitorDimensions() {
  return yield call(watchDimensionsChannel, handleDimensions)
}

function* handleDimensions(event) {
  yield put(dimensionsChanged(event))
}

export function* watchDimensionsChannel(handler) {
  const channel = createDimensionsChannel()
  return yield call(watchChannel, channel, handler)
}

export function createDimensionsChannel() {
  return eventChannel((emitter) => {
    const listener = (event) => {
      emitter(event)
    }
    Dimensions.addEventListener('change', listener)
    return () => {
      Dimensions.removeEventListener('change', listener)
    }
  })
}
