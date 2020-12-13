import { createAction } from 'moltres/redux'

const scrollTo = createAction(
  'SCROLL:SCROLL_TO',
  ({ behavior, left, name, top }) => ({
    behavior,
    left,
    name,
    top
  })
)

export default scrollTo
