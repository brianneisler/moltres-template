import { createSelector, select } from '../../../utils/data'

const selectFirebaseDatabase = select(createSelector('firebase.database'))

export default selectFirebaseDatabase
