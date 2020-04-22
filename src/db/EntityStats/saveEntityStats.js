import createEntityStats from './createEntityStats'
import findEntityStatsByEntityTypeAndEntityId from './findEntityStatsByEntityTypeAndEntityId'
import updateEntityStats from './updateEntityStats'

const saveEntityStats = async (context, data) => {
  const entityStats = await findEntityStatsByEntityTypeAndEntityId(
    context,
    data.entityType,
    data.entityId
  )
  if (entityStats) {
    return updateEntityStats(context, entityStats.id, data)
  }
  return createEntityStats(context, data)
}

export default saveEntityStats
