import { TrackAction } from '../tracking'
import { call, handleAction, takeEvery } from '../../../utils/redux'
import { compose } from '../../../utils/lang'
import { withConfig, withContext } from '../../../core'

const mixpanelTrack = async (mixpanel, { eventName, options, properties }) =>
  new Promise((resolve) => {
    mixpanel.track(eventName, properties, options, resolve)
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
