import { isImmutable, map, toImmutable, toPlain } from '../lang'

import all from './all'
import call from './call'

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
