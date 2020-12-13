import { takeEvery } from 'moltres/redux'
import { matchPath } from 'moltres/url'

import { StorageObjectFinalizeAction } from './schemas'

const takeEveryStorageObjectFinalize = ({ route }, handler, args) =>
  takeEvery(
    (action) =>
      action.type === StorageObjectFinalizeAction.type &&
      !!matchPath(action.payload.name, route),
    (action) =>
      handler(action, { match: matchPath(action.payload.name, route) }),
    args
  )

export default takeEveryStorageObjectFinalize
