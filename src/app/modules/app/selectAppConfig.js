import { createSelector, select } from '../../../utils/data'

const selectAppConfig = select(createSelector('app.config'))

export default selectAppConfig
