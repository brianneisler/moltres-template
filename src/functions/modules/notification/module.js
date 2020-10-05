import { EntityChangeType } from '../../../constants'
import { withConfig, withContext } from '../../../core'
import { takeEveryEntityChanged } from '../../../core/sdk'
import {
  Notification,
  findEnhancedNotificationById
} from '../../../modules/notification'
import { compose } from '../../../utils/lang'
import { call, handleAction } from '../../../utils/redux'

import { sendNotification } from './util'

const enhance = compose(
  withContext(),
  withConfig((config) => ({
    config
  }))
)

const mod = () => ({
  *run() {
    yield takeEveryEntityChanged(
      {
        changeType: EntityChangeType.CREATE,
        entityType: Notification.name
      },
      handleAction(
        enhance(function* (context, action) {
          const { entityId } = action.payload
          const enhancedNotification = yield findEnhancedNotificationById(
            context,
            entityId
          )
          if (!enhancedNotification) {
            return
          }
          // TODO BRN: We'll eventually want to update this to have a delay
          yield call(sendNotification, context, enhancedNotification)
        })
      )
    )
  }
})

export default mod
