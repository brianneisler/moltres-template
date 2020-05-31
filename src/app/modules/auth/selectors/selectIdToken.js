import { createSelector, select } from '../../../../utils/data'

const selectIdToken = select(createSelector('auth.idToken'))

export default selectIdToken
