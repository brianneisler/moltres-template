import { withConfig, withContext } from 'moltres/core'
import { compose } from 'moltres/lang'
import { call, handleAction } from 'moltres/redux'

import { EntityChangeType } from '../../../constants'
import { takeEveryEntityChanged } from 'moltres/core'
import {
  Notification,
  findEnhancedNotificationById
} from '../../../modules/notification'

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
