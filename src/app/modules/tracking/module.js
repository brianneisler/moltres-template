import { withContext } from '../../../core'
import { compose } from '../../../utils/lang'
import { handleAction, takeEvery } from '../../../utils/redux'

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
