import { createSelector, select } from '../../../../utils/lang'

const selectCurrentUser = select(createSelector('auth.currentUser'))

export default selectCurrentUser
