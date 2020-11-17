import { withConfig, withContext } from 'moltres/core'
import { compose } from 'moltres/lang'
import { call, handleAction, takeEvery } from 'moltres/redux'
import { TrackAction } from '../tracking'

import { mixpanelTrack } from './util'

const enhance = compose(withConfig(), withContext())

const mod = () => ({
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
})

export default mod
