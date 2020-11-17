import { curry, getPath } from 'moltres/lang'

import { Scroll } from '../../../constants'

const selectScrollTargetIsAtTop = curry((name, state) => {
  const scrollTop = getPath(['scroll', 'targets', name, 'scrollTop'], state)
  if (name === 'window') {
    return scrollTop <= Scroll.PAGE_TOP
  }
  return scrollTop === 0
})

export default selectScrollTargetIsAtTop
