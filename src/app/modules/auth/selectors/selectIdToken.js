import { createSelector, select } from '../../../../utils/lang'

const selectIdToken = select(createSelector('auth.idToken'))

export default selectIdToken
