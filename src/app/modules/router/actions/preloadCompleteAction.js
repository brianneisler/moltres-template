import { createAction } from '../../../../utils/redux'

const preloadComplete = createAction(
  'ROUTER:PRELOAD_COMPLETE',
  ({ location, previousLocation }) => ({
    location,
    previousLocation
  })
)

export default preloadComplete
