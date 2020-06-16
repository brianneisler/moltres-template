import { all, call, handleChannel, put } from '../../../../utils/lang'
import { scrollEvent } from '../actions'
import createScrollChannel from './createScrollChannel'
import createScrollClientChannel from './createScrollClientChannel'

function* monitorScroll(target, name) {
  const scrollChannel = createScrollChannel(target)
  const scrollClientChannel = createScrollClientChannel(target)
  yield all([
    call(handleChannel, scrollChannel, function* () {
      yield put(scrollEvent({ name, target }))
    }),
    call(handleChannel, scrollClientChannel, function* () {
      yield put(scrollEvent({ name, target }))
    })
  ])
}

export default monitorScroll
