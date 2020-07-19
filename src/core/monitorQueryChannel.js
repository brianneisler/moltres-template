import { invariant, isFunction, noop } from '../utils/lang'
import { call, handleChannel } from '../utils/redux'

import createQueryChannel from './createQueryChannel'
import isQuery from './isQuery'

const monitorQueryChannel = function* ({
  onEnd = noop,
  onError = noop,
  onSnapshot = noop,
  query
}) {
  invariant(isFunction(onEnd), 'onEnd must be a defined Function')
  invariant(isFunction(onError), 'onError must be a defined Function')
  invariant(isFunction(onSnapshot), 'onSnapshot must be a defined Function')
  invariant(isQuery(query), 'query must be a defined Query')
  const channel = createQueryChannel(query)
  yield call(
    handleChannel,
    channel,
    function* (event) {
      if (event.error) {
        return yield call(onError, event.error)
      }
      return yield call(onSnapshot, event.snapshot)
    },
    function* () {
      return yield call(onEnd)
    }
  )
}

export default monitorQueryChannel
