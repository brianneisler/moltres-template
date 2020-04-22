import { createSelector, select } from '../../../utils/data'

const selectFirebaseAuth = select(createSelector('firebase.auth'))

export default selectFirebaseAuth
