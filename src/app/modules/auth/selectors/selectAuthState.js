import { createSelector, select } from '../../../../utils/data'

const selectAuthState = select(createSelector('auth.authState'))

export default selectAuthState
