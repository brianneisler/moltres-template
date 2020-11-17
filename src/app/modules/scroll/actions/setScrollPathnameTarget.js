import { createAction } from 'moltres/redux'

const setScrollPathnameTarget = createAction(
  'SCROLL:SET_SCROLL_PATHNAME_TARGET',
  ({ pathname, target }) => ({
    pathname,
    target
  })
)

export default setScrollPathnameTarget
