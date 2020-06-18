import { createAction } from '../../../../utils/redux'

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
