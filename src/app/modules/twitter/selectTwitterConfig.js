import { createSelector, select } from '../../../utils/data'

const selectTwitterConfig = select(createSelector('twitter.config'))

export default selectTwitterConfig
