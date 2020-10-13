import { EntityChangeType } from '../../../constants'
import { withConfig, withContext } from '../../../core'
import { takeEveryEntityChanged } from '../../../core/sdk'
import { compose, getProperty } from '../../../utils/lang'
import { handleAction } from '../../../utils/redux'

import decrementEntityStat from './decrementEntityStat'
import incrementEntityStat from './incrementEntityStat'

const enhance = compose(
  withContext(),
  withConfig((config) => ({
    config
  }))
)

const watchAndCountEntityStats = function* ({
  linkEntityIdField,
  stat,
  statEntityType,
  watchedEntityType
}) {
  yield takeEveryEntityChanged(
    {
      changeType: EntityChangeType.CREATE,
      entityType: watchedEntityType
    },
    handleAction(
      enhance(function* (context, action) {
        const { data } = action.payload
        yield incrementEntityStat(context, {
          entityId: getProperty(linkEntityIdField, data),
          entityType: statEntityType,
          stat
        })
      })
    )
  )

  yield takeEveryEntityChanged(
    {
      changeType: EntityChangeType.DELETE,
      entityType: watchedEntityType
    },
    handleAction(
      enhance(function* (context, action) {
        const { prevData } = action.payload
        // NOTE BRN: only decrement if not already removed
        if (!prevData.removedAt) {
          yield decrementEntityStat(context, {
            entityId: getProperty(linkEntityIdField, prevData),
            entityType: statEntityType,
            stat
          })
        }
      })
    )
  )

  yield takeEveryEntityChanged(
    {
      changeType: EntityChangeType.REMOVE,
      entityType: watchedEntityType
    },
    handleAction(
      enhance(function* (context, action) {
        const { prevData } = action.payload
        yield decrementEntityStat(context, {
          entityId: getProperty(linkEntityIdField, prevData),
          entityType: statEntityType,
          stat
        })
      })
    )
  )

  yield takeEveryEntityChanged(
    {
      changeType: EntityChangeType.UPDATE,
      entityType: watchedEntityType
    },
    handleAction(
      enhance(function* (context, action) {
        const { data, prevData } = action.payload
        if (prevData.removedAt && data.removedAt === null) {
          yield incrementEntityStat(context, {
            entityId: getProperty(linkEntityIdField, data),
            entityType: statEntityType,
            stat
          })
        }
      })
    )
  )
}

export default watchAndCountEntityStats
