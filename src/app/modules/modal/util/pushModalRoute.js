import { buildLocation } from '../../../../utils/url'
import { pushRouteAction, selectRouterLocation } from '../../router'
import { put, select } from '../../../../utils/redux'

const pushModalRoute = function* ({ name, options }) {
  const location = yield select(selectRouterLocation)
  yield put(
    pushRouteAction(
      buildLocation({
        ...location,
        query: {
          ...location.query,
          showModal: JSON.stringify({ name, options })
        }
      })
    )
  )
}
export default pushModalRoute
