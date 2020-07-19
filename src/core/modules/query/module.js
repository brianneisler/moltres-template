import { assocPath, createPath, dissocPath, getProp } from '../../../utils/lang'
import {
  call,
  handleAction,
  handleActions,
  select,
  takeEvery
} from '../../../utils/redux'

import {
  clearQueryAction,
  nextPageAction,
  setQueryAction,
  setQueryCursorAction,
  setQueryCursorNextAction
} from './actions'
import { selectQuery } from './selectors'

const mod = {
  reducer: handleActions(
    {
      [clearQueryAction]: (state, action) =>
        dissocPath(createPath(action.payload.queryKey), state),
      [setQueryAction]: (state, action) =>
        assocPath(
          createPath(action.payload.queryKey),
          action.payload.query,
          state
        ),
      [setQueryCursorAction]: (state, action) =>
        assocPath(
          createPath(`${action.payload.queryKey}.cursor`),
          action.payload.cursor,
          state
        ),
      [setQueryCursorNextAction]: (state, action) =>
        assocPath(
          createPath(`${action.payload.queryKey}.cursorNext`),
          action.payload.cursor,
          state
        )
    },
    {}
  ),
  run: function* run() {
    yield takeEvery(
      nextPageAction,
      handleAction(function* (context, action) {
        const query = yield select(selectQuery(action.payload.queryKey))
        const result = yield call(getProp('nextPage', query))
        return result
      })
    )
  }
}

export default mod
