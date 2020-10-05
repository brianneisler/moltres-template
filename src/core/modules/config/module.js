import { handleActions } from '../../../utils/redux'

import * as selectors from './selectors'

const mod = () => ({
  reducer: handleActions({}, {}),
  selectors
})

export default mod
