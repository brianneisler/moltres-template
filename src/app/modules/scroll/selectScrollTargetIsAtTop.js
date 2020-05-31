import { Scroll } from '../../../constants'
import { curry, getPath } from '../../../utils/data'

const selectScrollTargetIsAtTop = curry((name, state) => {
  const scrollTop = getPath(['scroll', 'targets', name, 'scrollTop'], state)
  if (name === 'window') {
    return scrollTop <= Scroll.PAGE_TOP
  }
  return scrollTop === 0
})

export default selectScrollTargetIsAtTop
