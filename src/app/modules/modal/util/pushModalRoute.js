import { put, select } from 'moltres/redux'
import { assocLocationQuery } from 'moltres/url'
import { pushRouteAction, selectRouterLocation } from '../../router'

const pushModalRoute = function* ({ name, options }) {
  const location = yield select(selectRouterLocation)
  yield put(
    pushRouteAction(
      assocLocationQuery(
        'showModal',
        JSON.stringify({ name, options }),
        location
      )
    )
  )
}
export default pushModalRoute
