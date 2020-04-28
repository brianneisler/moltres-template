import { createSelector, select } from '../../../../utils/data'

const selectFirebaseApp = select(createSelector('firebase.app'))

export default selectFirebaseApp
