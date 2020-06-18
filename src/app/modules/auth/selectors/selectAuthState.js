import { createSelector, select } from '../../../../utils/lang'

const selectAuthState = select(createSelector('auth.authState'))

export default selectAuthState
