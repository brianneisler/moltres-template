import { withConfig, withContext } from '../../../core'
import { append, compose } from '../../../utils/lang'
import { call, handleAction, takeEvery } from '../../../utils/redux'
import { TrackAction } from '../tracking'

const mixpanelTrack = async (mixpanel, { eventName, options, properties }) =>
  new Promise((resolve) => {
    let args = [eventName]
    if (properties) {
      args = append(properties, args)
    }
    if (options) {
      args = append(options, args)
    }
    args = append((after) => {
      // eslint-disable-next-line no-console
      console.log('after tracking - after:', after)
      resolve(after)
    }, args)
    const result = mixpanel.track.apply(mixpanel, args)
    if (!result) {
      return resolve(result)
    }
  })

const enhance = compose(withConfig(), withContext())

const mod = {
  *run() {
    yield takeEvery(
      TrackAction.name,
      handleAction(
        enhance(function* (context, { payload }) {
          if (context.mixpanel) {
            return yield call(mixpanelTrack, context.mixpanel, payload)
          }
          context.logger.log(
            'mixpanel is not in context. Ignoring tracking call.'
          )
        })
      )
    )
  }
}

export default mod
