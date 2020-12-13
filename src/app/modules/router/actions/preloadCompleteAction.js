import { createAction } from 'moltres/redux'

const preloadComplete = createAction(
  'ROUTER:PRELOAD_COMPLETE',
  ({ location, previousLocation }) => ({
    location,
    previousLocation
  })
)

export default preloadComplete
