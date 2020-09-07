import { createSelector, select } from '../../../../utils/lang'

const selectAppConfig = select(createSelector('app.config'))

export default selectAppConfig
