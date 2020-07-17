import { ACCESS_DENIED, NOT_FOUND } from '../constants/Code'
import { formatSnapshot } from '../utils/db'
import { expected } from '../utils/error'
import { invariant, isObject, isPropStore } from '../utils/lang'
import { call, spawn } from '../utils/redux'

import isQuery from './isQuery'
import monitorQueryChannel from './monitorQueryChannel'

const monitorQuery = function* ({ propStore, query, queryExtensions }) {
  invariant(isPropStore(propStore), 'propStore must be a defined PropStore')
  invariant(isQuery(query), 'query must be a defined Query')
  invariant(
    isObject(queryExtensions),
    'queryExtensions must be a defined Object'
  )

  return yield spawn(monitorQueryChannel, {
    *onError(error) {
      if (error.code === 'permission-denied') {
        error = expected({
          code: ACCESS_DENIED,
          message: error.message
        })
      }
      propStore.put({
        error,
        key: '$',
        type: 'error'
      })
    },
    *onSnapshot(snapshot) {
      // NOTE BRN: This allows for extension of query handling such as
      // saving the next cursor
      if (queryExtensions && queryExtensions.onSnapshot) {
        yield call(queryExtensions.onSnapshot, snapshot)
      }
      const value = formatSnapshot(snapshot, queryExtensions)
      if (value === null) {
        propStore.put({
          error: expected({
            code: NOT_FOUND,
            message: `Could not find document${
              snapshot.ref ? ' at ' + snapshot.ref.path : ''
            }`
          }),
          key: '$',
          type: 'error'
        })
      } else {
        propStore.put({
          type: 'set',
          value
        })
      }
    },
    query
  })
}

export default monitorQuery
