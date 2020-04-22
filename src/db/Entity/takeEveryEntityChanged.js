import { EntityChangedAction } from './schemas'
import { takeEvery } from 'redux-saga/effects'

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
