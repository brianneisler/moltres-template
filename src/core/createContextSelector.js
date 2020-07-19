import { createSelector, select } from '../utils/lang'

import { selectContext } from './modules/context/selectors'

const createContextSelector = (selector) =>
  createSelector(selectContext, select(selector))

export default createContextSelector
