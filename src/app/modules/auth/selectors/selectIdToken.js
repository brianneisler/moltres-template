import { createSelector, select } from 'moltres/lang'

const selectIdToken = select(createSelector('auth.idToken'))

export default selectIdToken
