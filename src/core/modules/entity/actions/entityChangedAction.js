import { actionBuilder } from '../../../../utils/redux'
import { EntityChangedAction } from '../schemas'

const addCausedByEntity = ({ currentUser, serviceAccount }, data) => {
  if (currentUser) {
    return {
      ...data,
      causedByEntityId: currentUser.id,
      causedByEntityType: 'User'
    }
  }
  if (serviceAccount) {
    return {
      ...data,
      causedByEntityId: serviceAccount.id,
      causedByEntityType: 'ServiceAccount'
    }
  }
  return {
    ...data,
    causedByEntityId: null,
    causedByEntityType: null
  }
}

const entityChangedAction = actionBuilder({
  Schema: EntityChangedAction,
  // TODO BRN: Update this to pick based upon the schema
  meta: (context) => addCausedByEntity(context, {}),
  // TODO BRN: Update this to pick based upon the schema
  payload: (
    context,
    { changeType, data, entityId, entityPath, entityType, prevData }
  ) => ({
    changeType,
    data,
    entityId,
    entityPath,
    entityType,
    prevData
  })
})

export default entityChangedAction
