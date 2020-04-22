import { createSelector, select } from '../utils/data'
import { selectConfig } from './modules/config/selectors'

const createConfigSelector = (selector) => createSelector(selectConfig, select(selector))

export default createConfigSelector
