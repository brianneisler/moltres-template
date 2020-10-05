import { takeEvery } from '../../../../utils/redux'
import { EntityChangedAction } from '../schemas'

const takeEveryEntityChanged = ({ changeType, entityType }, handler, args) =>
  takeEvery(
    (action) =>
      action.type === EntityChangedAction.type &&
      action.payload.entityType === entityType &&
      (changeType ? action.payload.changeType === changeType : true),
    handler,
    args
  )

export default takeEveryEntityChanged
