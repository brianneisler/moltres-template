import { assocPath, createPath, dissocPath, getProp } from '../../../utils/lang'
import {
  call,
  handleAction,
  handleActions,
  select,
  takeEvery
} from '../../../utils/redux'

import {
  ClearQueryAction,
  NextPageAction,
  SetQueryAction,
  SetQueryCursorAction,
  SetQueryCursorNextAction
} from './schemas'
import { selectQuery } from './selectors'

const mod = () => ({
  reducer: handleActions(
    {
      [ClearQueryAction.name]: (state, action) =>
        dissocPath(createPath(action.payload.queryKey), state),
      [SetQueryAction.name]: (state, action) =>
        assocPath(
          createPath(action.payload.queryKey),
          action.payload.query,
          state
        ),
      [SetQueryCursorAction.name]: (state, action) =>
        assocPath(
          createPath(`${action.payload.queryKey}.cursor`),
          action.payload.cursor,
          state
        ),
      [SetQueryCursorNextAction.name]: (state, action) =>
        assocPath(
          createPath(`${action.payload.queryKey}.cursorNext`),
          action.payload.cursor,
          state
        )
    },
    {}
  ),
  *run() {
    yield takeEvery(
      NextPageAction.name,
      handleAction(function* (context, action) {
        const query = yield select(selectQuery(action.payload.queryKey))
        const result = yield call(getProp('nextPage', query))
        return result
      })
    )
  }
})

export default mod
