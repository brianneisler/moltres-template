import { createAction } from 'moltres/redux'

const scrollEvent = createAction(
  'SCROLL:SCROLL_EVENT',
  ({ event, name, target }) => ({
    event,
    name,
    target
  })
)

export default scrollEvent
