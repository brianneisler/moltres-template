import all from '../redux/all'
import call from '../redux/call'

import isImmutable from './isImmutable'
import map from './map'
import toImmutable from './toImmutable'
import toPlain from './toPlain'

const mapAll = (fn, value) =>
  call(function* () {
    if (isImmutable(value)) {
      const results = yield all(
        toPlain(map((...args) => call(fn, ...args), value))
      )
      return toImmutable(results)
    }
    return yield all(map((...args) => call(fn, ...args), value))
  })

export default mapAll
