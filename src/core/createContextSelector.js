import { createSelector, select } from '../utils/data'
import { selectContext } from './modules/context/selectors'

const createContextSelector = (selector) => createSelector(selectContext, select(selector))

export default createContextSelector
