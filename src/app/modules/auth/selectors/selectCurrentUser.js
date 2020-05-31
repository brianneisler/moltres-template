import { createSelector, select } from '../../../../utils/data'

const selectCurrentUser = select(createSelector('auth.currentUser'))

export default selectCurrentUser
