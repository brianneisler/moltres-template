import { withContext } from 'moltres/core'
import { compose } from 'moltres/lang'
import { handleAction, takeEvery } from 'moltres/redux'

import { TrackAction } from './schemas'

const enhance = compose(withContext())

const mod = () => ({
  *run() {
    yield takeEvery(
      TrackAction.name,
      handleAction(
        enhance(function* (context, { payload }) {
          context.logger.log(`Track ${JSON.stringify(payload, null, 2)}`)
        })
      )
    )
  }
})

export default mod
