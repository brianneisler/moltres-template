import { createAction } from 'redux-actions'

const preloadComplete = createAction(
  'ROUTER:PRELOAD_COMPLETE',
  ({ location, previousLocation }) => ({
    location,
    previousLocation
  })
)

export default preloadComplete
