import { createAction } from 'redux-actions'

const scrollEvent = createAction(
  'SCROLL:SCROLL_EVENT',
  ({ event, name, target }) => ({
    event,
    name,
    target
  })
)

export default scrollEvent
