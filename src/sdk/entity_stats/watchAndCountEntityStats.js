import { EntityChangeType } from '../../constants'
import { withConfig, withContext } from '../../core'
import { takeEveryEntityChanged } from '../../db/Entity'
import { decrementEntityStat, incrementEntityStat } from '../../db/EntityStats'
import { compose, getProp } from '../../utils/lang'
import { handleAction } from '../../utils/redux'

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
          entityId: getProp(linkEntityIdField, data),
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
            entityId: getProp(linkEntityIdField, prevData),
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
          entityId: getProp(linkEntityIdField, prevData),
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
            entityId: getProp(linkEntityIdField, data),
            entityType: statEntityType,
            stat
          })
        }
      })
    )
  )
}

export default watchAndCountEntityStats
