import { createSelector, select } from 'moltres/lang'

const selectAuthState = select(createSelector('auth.authState'))

export default selectAuthState
