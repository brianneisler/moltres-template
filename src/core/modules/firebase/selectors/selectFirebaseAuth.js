import { createSelector, select } from '../../../../utils/lang'

const selectFirebaseAuth = select(createSelector('firebase.auth'))

export default selectFirebaseAuth
