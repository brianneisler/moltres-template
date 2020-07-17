import { EntityChangeType } from '../../../constants'
import {
  Notification,
  findEnhancedNotificationById
} from '../../../db/Notification'
import { call, handleAction } from '../../../utils/redux'
import { compose } from '../../../utils/lang'
import { sendNotification } from './util'
import { takeEveryEntityChanged } from '../../../db/Entity'
import { withConfig, withContext } from '../../../core'

const enhance = compose(
  withContext(),
  withConfig((config) => ({
    config
  }))
)

const mod = {
  run: function* run() {
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
}

export default mod
