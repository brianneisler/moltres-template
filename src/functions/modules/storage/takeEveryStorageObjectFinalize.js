import { takeEvery } from 'redux-saga/effects'

import matchPath from '../../../utils/url/matchPath'

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
