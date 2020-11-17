import { createSelector, select } from 'moltres/lang'

const selectCurrentUser = select(createSelector('auth.currentUser'))

export default selectCurrentUser
