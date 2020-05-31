import { createAction } from 'redux-actions'

const setScrollPathnameTarget = createAction(
  'SCROLL:SET_SCROLL_PATHNAME_TARGET',
  ({ pathname, target }) => ({
    pathname,
    target
  })
)

export default setScrollPathnameTarget
