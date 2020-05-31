import { createSelector, select } from '../../../utils/data'

const selectCurrentUserProfile = select(createSelector('user_profile.currentUserProfile'))

export default selectCurrentUserProfile
